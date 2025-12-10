const express = require('express');
const router = express.Router();
const connection = require('../../database');

// *Lấy tất cả danh sách sản phẩm
router.get('/', (req, res) => {
    const { searchName = '', page = 1, pageSize = 10 } = req.query;

    // Đảm bảo page và pageSize là số nguyên
    const pageNumber = parseInt(page, 10) || 1;
    const size = parseInt(pageSize, 10) || 10;
    const offset = (pageNumber - 1) * size;

    // SQL truy vấn để lấy tổng số bản ghi
    const sqlCount = 'SELECT COUNT(*) as total FROM products WHERE name LIKE ?';

    // SQL truy vấn để lấy danh sách promotion phân trang
    let sql = 'SELECT * FROM products WHERE name LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?';

    // Đếm tổng số bản ghi khớp với tìm kiếm
    connection.query(sqlCount, [`%${searchName}%`], (err, countResults) => {
        if (err) {
            console.error('Error counting products:', err);
            return res.status(500).json({ error: 'Failed to count products' });
        }

        const totalCount = countResults[0].total;
        const totalPages = Math.ceil(totalCount / size); // Tính tổng số trang

        // Lấy danh sách products cho trang hiện tại
        connection.query(sql, [`%${searchName}%`, size, offset], (err, results) => {
            if (err) {
                console.error('Error fetching products:', err);
                return res.status(500).json({ error: 'Failed to fetch products' });
            }

            // Trả về kết quả với thông tin phân trang
            res.status(200).json({
                message: 'Show list products successfully',
                results,
                totalCount,
                totalPages,
                currentPage: pageNumber
            });
        });
    });
});

// *Lấy tất cả danh sách sản phẩm hoạt động - Cập nhật cho schema mới
router.get('/hoat_dong', (req, res) => {
    const { searchName = '', searchCateID = '', page = 1, limit = 10 } = req.query;

    // Chuyển đổi giá trị limit thành số nguyên, mặc định là 10 nếu không có
    const limitNumber = parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10;
    const pageNumber = parseInt(page, 10) || 1;
    const offset = (pageNumber - 1) * limitNumber;
    const seaName = `%${searchName}%`;
    const seaCateID = searchCateID ? `%${searchCateID}%` : '%';

    // SQL truy vấn để lấy tổng số bản ghi với join categories
    const sqlCount = `
        SELECT COUNT(DISTINCT p.id) as total 
        FROM products p
        LEFT JOIN product_categories pc ON p.id = pc.product_id
        WHERE p.status = 'active' 
        AND p.name LIKE ?
        AND (pc.category_id LIKE ? OR ? = '%')
    `;

    // SQL truy vấn để lấy danh sách sản phẩm với hình ảnh và danh mục
    let sql = `
        SELECT 
            p.id,
            p.sku,
            p.name,
            p.description,
            p.brand,
            p.monthly_price,
            p.deposit_required,
            p.stock,
            p.status,
            p.created_at,
            p.updated_at,
            CONCAT('/assets/', p.sku, '.jpg') as image,
            GROUP_CONCAT(DISTINCT pc.category_id) as categories_id
        FROM products p
        LEFT JOIN product_categories pc ON p.id = pc.product_id
        WHERE p.status = 'active'
        AND p.name LIKE ?
        AND (pc.category_id LIKE ? OR ? = '%')
        GROUP BY p.id
        ORDER BY p.id DESC
    `;

    if (page && limit) {
        sql += ' LIMIT ? OFFSET ?';
    }

    // Đếm tổng số bản ghi
    connection.query(sqlCount, [seaName, seaCateID, seaCateID], (err, countResults) => {
        if (err) {
            console.error('Error counting products:', err);
            return res.status(500).json({ error: 'Failed to count products' });
        }

        const totalCount = countResults[0].total;
        const totalPages = Math.ceil(totalCount / limitNumber);

        // Lấy danh sách products
        const queryParams = [seaName, seaCateID, seaCateID];
        if (page && limit) {
            queryParams.push(limitNumber, offset);
        }

        connection.query(sql, queryParams, (err, results) => {
            if (err) {
                console.error('Error fetching products:', err);
                return res.status(500).json({ error: 'Failed to fetch products' });
            }

            // Format dữ liệu để tương thích với frontend
            const formattedResults = results.map(product => ({
                id: product.id,
                product_code: product.sku,
                sku: product.sku,
                name: product.name,
                description: product.description,
                brand: product.brand,
                image: product.image || '/assets/default-product.jpg',
                price: product.monthly_price,
                monthly_price: product.monthly_price,
                deposit_required: product.deposit_required,
                sale_price: 0,
                stock: product.stock,
                status: 1,
                categories_id: product.categories_id ? parseInt(product.categories_id.split(',')[0]) : null,
                created_at: product.created_at,
                updated_at: product.updated_at
            }));

            res.status(200).json({
                message: 'Show list products successfully',
                results: formattedResults,
                totalCount,
                totalPages,
                currentPage: pageNumber,
                limit: limitNumber,
            });
        });
    });
});


// *Lấy menu - Cập nhật cho schema mới
router.get('/menu', (req, res) => {
    const { search = '' } = req.query;

    console.log('📋 Fetching menu items with search:', search);

    // SQL truy vấn để lấy sản phẩm với hình ảnh và danh mục
    // Sử dụng query đơn giản, không cần bảng product_images (sẽ dùng fallback)
    const sql = `
        SELECT 
            p.id,
            p.sku,
            p.name,
            p.description,
            p.brand,
            p.monthly_price,
            p.deposit_required,
            p.stock,
            p.status,
            p.created_at,
            p.updated_at,
            CONCAT('/assets/', p.sku, '.jpg') as image,
            GROUP_CONCAT(DISTINCT c.id) as categories_id,
            GROUP_CONCAT(DISTINCT c.name) as category_names
        FROM products p
        LEFT JOIN product_categories pc ON p.id = pc.product_id
        LEFT JOIN categories c ON pc.category_id = c.id
        WHERE p.name LIKE ? AND p.status = 'active'
        GROUP BY p.id, p.sku, p.name, p.description, p.brand, p.monthly_price, p.deposit_required, p.stock, p.status, p.created_at, p.updated_at
        ORDER BY p.id DESC
    `;

    // Lấy danh sách sản phẩm
    connection.query(sql, [`%${search}%`], (err, results) => {
        if (err) {
            console.error('❌ Error fetching menu items:', err);
            console.error('SQL Error Details:', {
                message: err.message,
                code: err.code,
                sqlState: err.sqlState,
                sqlMessage: err.sqlMessage
            });
            return res.status(500).json({ 
                error: 'Failed to fetch menu items',
                details: err.message 
            });
        }

        console.log(`✅ Found ${results.length} products`);

        // Format dữ liệu để tương thích với frontend
        const formattedResults = results.map(product => ({
            id: product.id,
            product_code: product.sku,
            sku: product.sku,
            name: product.name,
            description: product.description,
            brand: product.brand,
            image: product.image || '/assets/default-product.jpg',
            price: product.monthly_price,
            monthly_price: product.monthly_price,
            deposit_required: product.deposit_required,
            sale_price: 0, // Không có sale_price trong schema mới
            stock: product.stock,
            status: product.status === 'active' ? 1 : 0,
            categories_id: product.categories_id ? parseInt(product.categories_id.split(',')[0]) : null,
            category_names: product.category_names,
            created_at: product.created_at,
            updated_at: product.updated_at
        }));

        console.log(`📦 Returning ${formattedResults.length} formatted products`);

        // Trả về kết quả
        res.status(200).json({
            message: 'Show menu successfully',
            results: formattedResults,
        });
    });
});


// *Lấy tất cả danh sách sản phẩm ngưng hoạt động
router.get('/ngung_hoat_dong', (req, res) => {
    const { searchName = '', searchCateID = '', page = 1, limit = 10 } = req.query;

    // Chuyển đổi giá trị limit thành số nguyên, mặc định là 10 nếu không có
    const limitNumber = parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10; // Kiểm tra limit có phải là số nguyên dương không, nếu không thì dùng 10

    // Đảm bảo page và pageSize là số nguyên
    const pageNumber = parseInt(page, 10);
    const offset = (pageNumber - 1) * limitNumber; // Tính toán offset
    const seaName = `%${searchName}%`; // Thêm dấu % cho tìm kiếm
    const seaCateID = `%${searchCateID}%`; // Thêm dấu % cho tìm kiếm

    // SQL truy vấn để lấy tổng số bản ghi
    const sqlCount = 'SELECT COUNT(*) as total FROM products WHERE status = ? and name LIKE ? and categories_id LIKE ?';

    // SQL truy vấn để lấy danh sách promotion phân trang
    let sql = 'SELECT * FROM products WHERE status = ? and name LIKE ? and categories_id LIKE ? ORDER BY id DESC';

    // Nếu có phân trang, thêm LIMIT và OFFSET
    const queryParams = [0, seaName, seaCateID];
    if (page && limit) {
        sql += ' LIMIT ? OFFSET ?';
        queryParams.push(limitNumber, offset);
    }

    // Đầu tiên, lấy tổng số bản ghi để tính tổng số trang
    connection.query(sqlCount, [0, seaName, seaCateID], (err, countResults) => {
        if (err) {
            console.error('Error counting products:', err);
            return res.status(500).json({ error: 'Failed to count products' });
        }

        const totalCount = countResults[0].total;
        const totalPages = Math.ceil(totalCount / limitNumber); // Tính tổng số trang

        // Lấy danh sách products cho trang hiện tại
        connection.query(sql, queryParams, (err, results) => {
            if (err) {
                console.error('Error fetching products:', err);
                return res.status(500).json({ error: 'Failed to fetch products' });
            }

            // Trả về kết quả với thông tin phân trang
            res.status(200).json({
                message: 'Show list products successfully',
                results,
                totalCount,
                totalPages, // Tổng số trang
                currentPage: pageNumber, // Trang hiện tại
                limit: limitNumber, // Số bản ghi trên mỗi trang (limit)
            });
        });
    });
});

// *Hàm lấy danh sách sản phẩm theo date mới nhất - Cập nhật cho schema mới
router.get('/new', (req, res) => {
    // SQL truy vấn để lấy danh sách sản phẩm mới nhất với hình ảnh và danh mục
    const sql = `
        SELECT 
            p.id,
            p.sku,
            p.name,
            p.description,
            p.brand,
            p.monthly_price,
            p.deposit_required,
            p.stock,
            p.status,
            p.created_at,
            p.updated_at,
            CONCAT('/assets/', p.sku, '.jpg') as image,
            GROUP_CONCAT(DISTINCT pc.category_id) as categories_id
        FROM products p
        LEFT JOIN product_categories pc ON p.id = pc.product_id
        WHERE p.status = 'active'
        GROUP BY p.id
        ORDER BY p.created_at DESC
        LIMIT ?
    `;
    
    // Lấy danh sách sản phẩm mới nhất, giới hạn 8
    connection.query(sql, [8], (err, results) => {
        if (err) {
            console.error('Error fetching new products:', err);
            return res.status(500).json({ error: 'Failed to fetch new products' });
        }

        // Format dữ liệu để tương thích với frontend
        const formattedResults = results.map(product => ({
            id: product.id,
            product_code: product.sku,
            sku: product.sku,
            name: product.name,
            description: product.description,
            brand: product.brand,
            image: product.image || '/assets/default-product.jpg',
            price: product.monthly_price,
            monthly_price: product.monthly_price,
            deposit_required: product.deposit_required,
            sale_price: 0,
            stock: product.stock,
            status: 1,
            categories_id: product.categories_id ? parseInt(product.categories_id.split(',')[0]) : null,
            created_at: product.created_at,
            updated_at: product.updated_at
        }));

        // Trả về kết quả
        res.status(200).json({
            message: 'Show list of new products successfully',
            results: formattedResults
        });
    });
});

// *Lấy thông tin sản phẩm theo slug
router.get('/slug/:slug', (req, res) => {
    const { slug } = req.params;
    // Tạo SQL để lấy thông tin sản phẩm
    const sql = 'SELECT * FROM products WHERE name = ?';
    const decodedSlug = decodeURIComponent(slug).replace(/\.html$/, '');
    const name = decodedSlug.split('-').join(' ');

    connection.query(sql, [name], (err, results) => {
        if (err) {
            console.error('Error fetching product by slug:', err);
            return res.status(500).json({ error: 'Failed to fetch product by slug' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({
            message: 'Show information product successfully',
            data: results[0]
        });
    });
});


// *Thêm sản phẩm mới - Cập nhật cho schema mới
router.post('/', (req, res) => {
    const { sku, name, description, brand, monthly_price, deposit_required, stock, status, category_id } = req.body;

    // Validation
    if (!sku) {
        return res.status(400).json({ error: 'SKU is required' });
    }
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    if (!monthly_price) {
        return res.status(400).json({ error: 'Monthly price is required' });
    }
    if (stock === undefined || stock === null) {
        return res.status(400).json({ error: 'Stock is required' });
    }
    if (!status) {
        return res.status(400).json({ error: 'Status is required' });
    }
    if (!category_id) {
        return res.status(400).json({ error: 'Category_id is required' });
    }

    // Chuyển đổi status: 1 -> 'active', 0 -> 'inactive'
    const statusValue = status === 1 || status === '1' || status === 'active' ? 'active' : 'inactive';
    const depositValue = deposit_required || 0;
    const stockValue = parseInt(stock) || 0;
    const monthlyPriceValue = parseFloat(monthly_price) || 0;

    // Bắt đầu transaction
    connection.beginTransaction((err) => {
        if (err) {
            console.error('Error beginning transaction:', err);
            return res.status(500).json({ error: 'Failed to begin transaction' });
        }

        // Insert vào bảng products
        const sql = `INSERT INTO products (sku, name, description, brand, monthly_price, deposit_required, stock, status) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        
        connection.query(sql, [sku, name, description || '', brand || '', monthlyPriceValue, depositValue, stockValue, statusValue], (err, results) => {
            if (err) {
                return connection.rollback(() => {
                    console.error('Error creating product:', err);
                    res.status(500).json({ error: 'Failed to create product', details: err.message });
                });
            }

            const productId = results.insertId;

            // Insert vào bảng product_categories
            const categorySql = 'INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)';
            connection.query(categorySql, [productId, category_id], (err) => {
                if (err) {
                    return connection.rollback(() => {
                        console.error('Error creating product category:', err);
                        res.status(500).json({ error: 'Failed to create product category', details: err.message });
                    });
                }

                // Commit transaction
                connection.commit((err) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.error('Error committing transaction:', err);
                            res.status(500).json({ error: 'Failed to commit transaction' });
                        });
                    }

                    res.status(201).json({ 
                        message: "Product added successfully",
                        productId: productId
                    });
                });
            });
        });
    });
});

// *Cập nhật sản phẩm id bằng phương thức put - Cập nhật cho schema mới
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { sku, name, description, brand, monthly_price, deposit_required, stock, status, category_id } = req.body;

    // Validation
    if (!sku) {
        return res.status(400).json({ error: 'SKU is required' });
    }
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    if (!monthly_price) {
        return res.status(400).json({ error: 'Monthly price is required' });
    }
    if (stock === undefined || stock === null) {
        return res.status(400).json({ error: 'Stock is required' });
    }
    if (!status) {
        return res.status(400).json({ error: 'Status is required' });
    }
    if (!category_id) {
        return res.status(400).json({ error: 'Category_id is required' });
    }

    // Chuyển đổi status: 1 -> 'active', 0 -> 'inactive'
    const statusValue = status === 1 || status === '1' || status === 'active' ? 'active' : 'inactive';
    const depositValue = deposit_required || 0;
    const stockValue = parseInt(stock) || 0;
    const monthlyPriceValue = parseFloat(monthly_price) || 0;

    // Bắt đầu transaction
    connection.beginTransaction((err) => {
        if (err) {
            console.error('Error beginning transaction:', err);
            return res.status(500).json({ error: 'Failed to begin transaction' });
        }

        // Update bảng products
        const sql = `UPDATE products 
                     SET sku = ?, name = ?, description = ?, brand = ?, monthly_price = ?, 
                         deposit_required = ?, stock = ?, status = ?, updated_at = CURRENT_TIMESTAMP 
                     WHERE id = ?`;
        
        connection.query(sql, [sku, name, description || '', brand || '', monthlyPriceValue, depositValue, stockValue, statusValue, id], (err, results) => {
            if (err) {
                return connection.rollback(() => {
                    console.error('Error updating product:', err);
                    res.status(500).json({ error: 'Failed to update product', details: err.message });
                });
            }

            if (results.affectedRows === 0) {
                return connection.rollback(() => {
                    res.status(404).json({ error: 'Product not found' });
                });
            }

            // Xóa các category cũ và thêm category mới
            const deleteCategorySql = 'DELETE FROM product_categories WHERE product_id = ?';
            connection.query(deleteCategorySql, [id], (err) => {
                if (err) {
                    return connection.rollback(() => {
                        console.error('Error deleting old product categories:', err);
                        res.status(500).json({ error: 'Failed to update product categories', details: err.message });
                    });
                }

                // Insert category mới
                const categorySql = 'INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)';
                connection.query(categorySql, [id, category_id], (err) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.error('Error creating product category:', err);
                            res.status(500).json({ error: 'Failed to update product category', details: err.message });
                        });
                    }

                    // Commit transaction
                    connection.commit((err) => {
                        if (err) {
                            return connection.rollback(() => {
                                console.error('Error committing transaction:', err);
                                res.status(500).json({ error: 'Failed to commit transaction' });
                            });
                        }

                        res.status(200).json({ message: "Product updated successfully" });
                    });
                });
            });
        });
    });
});

// *Cập nhật sản phẩm theo id bằng phương thức patch
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const sql = 'UPDATE products SET ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    connection.query(sql, [updates, id], (err, results) => {
        if (err) {
            console.error('Error partially updating products:', err);
            return res.status(500).json({ error: 'Failed to partially update products' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Products not found' });
        }
        res.status(200).json({ message: "Products update successfully" });
    });
});

// *Xóa sản phẩm theo id - Cập nhật để xóa cả product_categories
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    // Bắt đầu transaction
    connection.beginTransaction((err) => {
        if (err) {
            console.error('Error beginning transaction:', err);
            return res.status(500).json({ error: 'Failed to begin transaction' });
        }

        // Xóa product_categories trước
        const deleteCategorySql = 'DELETE FROM product_categories WHERE product_id = ?';
        connection.query(deleteCategorySql, [id], (err) => {
            if (err) {
                return connection.rollback(() => {
                    console.error('Error deleting product categories:', err);
                    res.status(500).json({ error: 'Failed to delete product categories', details: err.message });
                });
            }

            // Xóa product
            const sql = 'DELETE FROM products WHERE id = ?';
            connection.query(sql, [id], (err, results) => {
                if (err) {
                    return connection.rollback(() => {
                        console.error('Error deleting product:', err);
                        res.status(500).json({ error: 'Failed to delete product', details: err.message });
                    });
                }

                if (results.affectedRows === 0) {
                    return connection.rollback(() => {
                        res.status(404).json({ error: 'Product not found' });
                    });
                }

                // Commit transaction
                connection.commit((err) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.error('Error committing transaction:', err);
                            res.status(500).json({ error: 'Failed to commit transaction' });
                        });
                    }

                    res.status(200).json({ message: 'Product deleted successfully' });
                });
            });
        });
    });
});

module.exports = router;