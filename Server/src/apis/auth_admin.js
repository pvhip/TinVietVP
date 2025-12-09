const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken'); // Nếu bạn muốn sử dụng JWT
const connection = require('../../database');
const authenticateJWT = require('./authMiddleware');
require('dotenv').config();

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET_KEY; // Thay thế bằng secret key của bạn

// Đăng nhập Admin
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // Tìm user theo email và role = 'admin'
    const sql = 'SELECT * FROM users WHERE email = ? AND role = ?';
    connection.query(sql, [email, 'admin'], async (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ error: 'Failed to fetch user' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password', message: "Email hoặc mật khẩu không đúng" });
        }

        const user = results[0];

        // Kiểm tra mật khẩu
        try {
            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid email or password', message: "Email hoặc mật khẩu không đúng" });
            }

            // Kiểm tra user có active không
            if (!user.is_active) {
                return res.status(403).json({ error: 'Account is disabled', message: "Tài khoản đã bị khóa" });
            }

            // Tạo JWT token
            const expiresIn = '24h';
            const accessToken = jwt.sign({ 
                id: user.id, 
                email: user.email, 
                role: user.role
            }, JWT_SECRET, { expiresIn });

            res.status(200).json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    full_name: user.full_name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role,
                    is_active: user.is_active
                },
                accessToken: accessToken,
                expiresIn: expiresIn
            });
        } catch (err) {
            console.error('Error comparing passwords:', err);
            return res.status(500).json({ error: 'Failed to log in' });
        }
    });
});

router.post('/forgot-password', (req, res) => {
    const { email } = req.body;
    console.log('Email nhận được:', email);

    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], (err, rows) => {
        if (err) {
            console.error('Lỗi khi lấy người dùng:', err);
            return res.status(500).json({ status: 500, message: 'Lỗi khi lấy người dùng' });
        }

        if (rows.length === 0) {
            return res.status(404).json({ status: 404, message: 'Email không tồn tại' });
        }

        const user = rows[0];

        // Tạo mã thông báo đặt lại mật khẩu và hash nó
        const resetToken = crypto.randomBytes(32).toString('hex');
        const tokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
        const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 phút

        // Lưu vào bảng password_resets
        const insertQuery = 'INSERT INTO password_resets (user_id, token_hash, expires_at) VALUES (?, ?, ?)';
        connection.query(insertQuery, [user.id, tokenHash, expiresAt], (err, result) => {
            if (err) {
                console.error('Lỗi khi tạo mã đặt lại mật khẩu:', err);
                return res.status(500).json({ status: 500, message: 'Lỗi khi tạo mã đặt lại mật khẩu' });
            }

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            // Gửi email với mã thông báo đặt lại
            const mailOptions = {
                from: process.env.EMAIL_USERNAME,
                to: email,
                subject: '[No-reply] - Đặt lại mật khẩu - công ty Tin Việt',
                html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                        <h2>Đặt lại mật khẩu</h2>
                        <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình.</p>
                        <p>Vui lòng nhấn vào nút bên dưới để đặt lại mật khẩu:</p>
                        <a href="http://localhost:5301/forgot?token=${resetToken}" style="text-decoration: none;">
                            <button style="background-color: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">
                                Đặt lại mật khẩu
                            </button>
                        </a>
                        <p><small>*Xin lưu ý rằng liên kết này chỉ có hiệu lực trong vòng 2 phút và không được chia sẻ với bất kỳ ai khác.</small></p>
                        <p><small>(Nếu bạn không yêu cầu việc đặt lại mật khẩu, vui lòng bỏ qua email này)</small></p>
                    </div>
                `,
            };

            console.log('Sending email to:', email);

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Lỗi khi gửi email:', error);
                    return res.status(500).json({ status: 500, message: 'Lỗi khi gửi email' });
                } else {
                    console.log('Email sent:', info.response);
                    return res.status(200).json({ status: 200, message: 'Email đặt lại mật khẩu đã được gửi' });
                }
            });
        });
    });
});


router.post('/change-password', (req, res) => {
    const { token, newPassword } = req.body;

    console.log('Received token:', token);
    console.log('Received new password:', newPassword);

    // Hash token để tìm trong database
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const now = new Date();

    // Tìm token trong bảng password_resets
    const query = 'SELECT * FROM password_resets WHERE token_hash = ? AND expires_at > ? AND used_at IS NULL';
    connection.query(query, [tokenHash, now], (err, rows) => {
        if (err) {
            console.error('Lỗi khi lấy thông tin token:', err);
            return res.status(500).json({ status: 'error', message: 'Lỗi khi lấy thông tin token' });
        }

        if (rows.length === 0) {
            console.warn('Mã token không hợp lệ hoặc đã hết hạn:', token);
            return res.status(400).json({ status: 'error', message: 'Mã token không hợp lệ hoặc đã hết hạn' });
        }

        const resetRecord = rows[0];
        const userId = resetRecord.user_id;

        // Hash mật khẩu mới
        bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Lỗi khi hash mật khẩu:', err);
                return res.status(500).json({ status: 'error', message: 'Lỗi khi hash mật khẩu' });
            }

            // Cập nhật mật khẩu trong bảng users
            const updateQuery = 'UPDATE users SET password_hash = ? WHERE id = ?';
            connection.query(updateQuery, [hashedPassword, userId], (err, result) => {
                if (err) {
                    console.error('Lỗi khi cập nhật mật khẩu:', err);
                    return res.status(500).json({ status: 'error', message: 'Lỗi khi cập nhật mật khẩu' });
                }

                // Đánh dấu token đã sử dụng
                const markUsedQuery = 'UPDATE password_resets SET used_at = ? WHERE id = ?';
                connection.query(markUsedQuery, [now, resetRecord.id], (err) => {
                    if (err) {
                        console.error('Lỗi khi đánh dấu token đã sử dụng:', err);
                    }

                    console.log('Đổi mật khẩu thành công cho user:', userId);
                    return res.status(200).json({ status: 'success', message: 'Đổi mật khẩu thành công' });
                });
            });
        });
    });
});

// Lấy thông tin user (không còn role_permissions vì schema mới không có bảng này)
router.get('/me', authenticateJWT, (req, res) => {
    const userId = req.user.id;

    const userSql = 'SELECT id, full_name, email, phone, role, is_active, created_at FROM users WHERE id = ?';
    connection.query(userSql, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ error: 'Failed to fetch user' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            message: 'User retrieved successfully',
            user: results[0]
        });
    });
});

module.exports = router;