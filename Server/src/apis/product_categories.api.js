const express = require('express');
const router = express.Router();
const connection = require('../../database');


// *Lấy tất cả danh sách danh mục sản phẩm
router.get('/', (req, res) => {
    const { search = '', page = 1, limit = 10 } = req.query;

    // Chuyển đổi giá trị limit thành số nguyên, mặc định là 10 nếu không có
    const limitNumber = parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10; // Kiểm tra limit có phải là số nguyên dương không, nếu không thì dùng 10

    // Đảm bảo page và pageSize là số nguyên
    const pageNumber = parseInt(page, 10);
    const offset = (pageNumber - 1) * limitNumber; // Tính toán offset
    const sea = `%${search}%`; // Thêm dấu % cho tìm kiếm

    // SQL truy vấn để lấy tổng số bản ghi (categories table doesn't have status column)
    const sqlCount = 'SELECT COUNT(*) as total FROM categories WHERE name LIKE ?';

    // SQL truy vấn để lấy danh sách categories phân trang
    let sql = 'SELECT * FROM categories WHERE name LIKE ? ORDER BY id DESC';

    // Nếu có phân trang, thêm LIMIT và OFFSET
    const queryParams = [sea];
    if (page && limit) {
        sql += ' LIMIT ? OFFSET ?';
        queryParams.push(limitNumber, offset);
    }

    // Đếm tổng số bản ghi khớp với tìm kiếm
    connection.query(sqlCount, [sea], (err, countResults) => {
        if (err) {
            console.error('Error counting categories:', err);
            return res.status(500).json({ error: 'Failed to count categories' });
        }

        const totalCount = countResults[0].total;
        const totalPages = Math.ceil(totalCount / limitNumber); // Tính tổng số trang

        // Lấy danh sách categories cho trang hiện tại
        connection.query(sql, queryParams, (err, results) => {
            if (err) {
                console.error('Error fetching categories:', err);
                return res.status(500).json({ error: 'Failed to fetch categories' });
            }

            // Format dữ liệu để tương thích với frontend
            const formattedResults = results.map(category => ({
                id: category.id,
                name: category.name,
                slug: category.slug,
                parent_id: category.parent_id,
                status: 1 // Mặc định active cho schema mới
            }));

            // Trả về kết quả với thông tin phân trang
            res.status(200).json({
                message: 'Show list categories successfully',
                results: formattedResults,
                totalCount,
                totalPages,
                currentPage: pageNumber,
                limit: limitNumber,
            });
        });
    });
});

// *Lấy tất cả danh sách danh mục sản phẩm - Cập nhật cho schema mới
router.get('/noPage', (req, res) => {
    // SQL truy vấn để lấy danh mục sản phẩm (schema mới: bảng categories)
    const sql = 'SELECT * FROM categories ORDER BY id ASC';

    // Lấy danh sách danh mục
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching categories:', err);
            return res.status(500).json({ error: 'Failed to fetch product categories' });
        }

        // Format dữ liệu để tương thích với frontend
        const formattedResults = results.map(category => ({
            id: category.id,
            name: category.name,
            slug: category.slug,
            parent_id: category.parent_id,
            status: 1 // Mặc định active cho schema mới
        }));

        // Trả về kết quả
        res.status(200).json({
            message: 'Show list product categories successfully',
            results: formattedResults,
        });
    });
});

// *Lấy tất cả danh sách danh mục sản phẩm hoạt động
router.get('/hoat_dong', (req, res) => {
    const { search = '', page = 1, limit = 10 } = req.query;

    // Chuyển đổi giá trị limit thành số nguyên, mặc định là 10 nếu không có
    const limitNumber = parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10; // Kiểm tra limit có phải là số nguyên dương không, nếu không thì dùng 10

    // Đảm bảo page và pageSize là số nguyên
    const pageNumber = parseInt(page, 10);
    const offset = (pageNumber - 1) * limitNumber; // Tính toán offset
    const sea = `%${search}%`; // Thêm dấu % cho tìm kiếm

    // SQL truy vấn để lấy tổng số bản ghi (categories table doesn't have status, so we return all)
    const sqlCount = 'SELECT COUNT(*) as total FROM categories WHERE name LIKE ?';

    // SQL truy vấn để lấy danh sách categories phân trang
    let sql = 'SELECT * FROM categories WHERE name LIKE ? ORDER BY id DESC';

    // Nếu có phân trang, thêm LIMIT và OFFSET
    const queryParams = [sea];
    if (page && limit) {
        sql += ' LIMIT ? OFFSET ?';
        queryParams.push(limitNumber, offset);
    }

    // Đếm tổng số bản ghi khớp với tìm kiếm
    connection.query(sqlCount, [sea], (err, countResults) => {
        if (err) {
            console.error('Error counting categories:', err);
            return res.status(500).json({ error: 'Failed to count categories' });
        }

        const totalCount = countResults[0].total;
        const totalPages = Math.ceil(totalCount / limitNumber); // Tính tổng số trang

        // Lấy danh sách categories cho trang hiện tại
        connection.query(sql, queryParams, (err, results) => {
            if (err) {
                console.error('Error fetching categories:', err);
                return res.status(500).json({ error: 'Failed to fetch categories' });
            }

            // Format dữ liệu để tương thích với frontend
            const formattedResults = results.map(category => ({
                id: category.id,
                name: category.name,
                slug: category.slug,
                parent_id: category.parent_id,
                status: 1 // Mặc định active cho schema mới
            }));

            // Trả về kết quả với thông tin phân trang
            res.status(200).json({
                message: 'Show list categories successfully',
                results: formattedResults,
                totalCount,
                totalPages,
                currentPage: pageNumber,
                limit: limitNumber,
            });
        });
    });
});

// *Lấy tất cả danh sách danh mục sản phẩm - Cập nhật cho schema mới
// QUAN TRỌNG: Route này phải đặt TRƯỚC route /:id để tránh conflict
router.get('/danh_muc', (req, res) => {
    const { search = '' } = req.query;

    // SQL truy vấn để lấy danh mục sản phẩm (schema mới: bảng categories)
    const sql = 'SELECT * FROM categories WHERE name LIKE ? ORDER BY id ASC';

    // Lấy danh sách danh mục
    connection.query(sql, [`%${search}%`], (err, results) => {
        if (err) {
            console.error('Error fetching categories:', err);
            return res.status(500).json({ error: 'Failed to fetch product categories' });
        }

        // Format dữ liệu để tương thích với frontend
        const formattedResults = results.map(category => ({
            id: category.id,
            name: category.name,
            slug: category.slug,
            parent_id: category.parent_id,
            status: 1 // Mặc định active cho schema mới
        }));

        // Trả về kết quả
        res.status(200).json({
            message: 'Show list product categories successfully',
            results: formattedResults,
        });
    });
});

// *Lấy thông tin danh mục sản phẩm theo id
// QUAN TRỌNG: Route này phải đặt SAU các route cụ thể như /danh_muc, /noPage, /hoat_dong
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM categories WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error fetching category:', err);
            return res.status(500).json({ error: 'Failed to fetch category' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        
        // Format dữ liệu để tương thích với frontend
        const category = results[0];
        const formattedCategory = {
            id: category.id,
            name: category.name,
            slug: category.slug,
            parent_id: category.parent_id,
            status: 1 // Mặc định active cho schema mới
        };
        
        res.status(200).json({
            message: 'Show information Category successfully',
            data: formattedCategory
        });
    });
});

// *Thêm danh mục sản phẩm mới
router.post('/', (req, res) => {
    const { name, slug, parent_id } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    // Generate slug from name if not provided
    const categorySlug = slug || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const sql = 'INSERT INTO categories (name, slug, parent_id) VALUES (?, ?, ?)';
    connection.query(sql, [name, categorySlug, parent_id || null], (err, results) => {
        if (err) {
            console.error('Error creating category:', err);
            return res.status(500).json({ error: 'Failed to create category' });
        }
        res.status(201).json({ message: "Category products add new successfully" });
    });
});

// *Cập nhật danh mục sản phẩm theo id bằng phương thức put
router.put('/:id', (req, res) => {
    const { id } = req.params
    const { name, slug, parent_id } = req.body;
    
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    
    // Generate slug from name if not provided
    const categorySlug = slug || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    const sql = 'UPDATE categories SET name = ?, slug = ?, parent_id = ? WHERE id = ?';
    connection.query(sql, [name, categorySlug, parent_id || null, id], (err, results) => {
        if (err) {
            console.error('Error updating category:', err);
            return res.status(500).json({ error: 'Failed to update category' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ message: "Category products update successfully" });
    });
});

// *Cập nhật danh mục sản phẩm theo id bằng phương thức patch
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { name, slug, parent_id } = req.body;
    
    // Build update query dynamically
    const updates = [];
    const values = [];
    
    if (name !== undefined) {
        updates.push('name = ?');
        values.push(name);
    }
    if (slug !== undefined) {
        updates.push('slug = ?');
        values.push(slug);
    } else if (name !== undefined) {
        // Auto-generate slug if name is updated but slug is not provided
        const categorySlug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        updates.push('slug = ?');
        values.push(categorySlug);
    }
    if (parent_id !== undefined) {
        updates.push('parent_id = ?');
        values.push(parent_id || null);
    }
    
    if (updates.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
    }
    
    values.push(id);
    const sql = `UPDATE categories SET ${updates.join(', ')} WHERE id = ?`;
    
    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error partially updating category:', err);
            return res.status(500).json({ error: 'Failed to partially update category' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ message: "Category products update successfully" });
    });
});

// *Xóa danh mục sản phẩm theo id
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    // Bước 1: Kiểm tra xem danh mục có tồn tại không
    const checkSql = 'SELECT * FROM categories WHERE id = ?';
    connection.query(checkSql, [id], (err, results) => {
        if (err) {
            console.error('Error checking category:', err);
            return res.status(500).json({ error: 'Failed to check category' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const categoryName = results[0].name;

        // Kiểm tra xem danh mục có tên "Chưa phân loại" không
        if (categoryName === 'Chưa phân loại') {
            return res.status(400).json({ error: 'Cannot delete "Chưa phân loại" category' });
        }

        // Bước 2: Kiểm tra xem danh mục có sản phẩm liên kết hay không (qua junction table)
        const checkProductsSql = 'SELECT COUNT(*) as count FROM product_categories WHERE category_id = ?';
        connection.query(checkProductsSql, [id], (err, productsResults) => {
            if (err) {
                console.error('Error checking products:', err);
                return res.status(500).json({ error: 'Failed to check products' });
            }

            const hasProducts = productsResults[0].count > 0;

            if (hasProducts) {
                // Bước 3: Kiểm tra xem danh mục "Chưa phân loại" có tồn tại không
                const checkUncategorizedSql = 'SELECT * FROM categories WHERE name = ?';
                connection.query(checkUncategorizedSql, ['Chưa phân loại'], (err, uncategorizedResults) => {
                    if (err) {
                        console.error('Error checking uncategorized category:', err);
                        return res.status(500).json({ error: 'Failed to check uncategorized category' });
                    }

                    let uncategorizedId;

                    // Nếu danh mục "Chưa phân loại" không tồn tại, tạo mới
                    if (uncategorizedResults.length === 0) {
                        const createUncategorizedSql = 'INSERT INTO categories (name, slug) VALUES (?, ?)';
                        connection.query(createUncategorizedSql, ['Chưa phân loại', 'chua-phan-loai'], (err, newCategoryResults) => {
                            if (err) {
                                console.error('Error creating uncategorized category:', err);
                                return res.status(500).json({ error: 'Failed to create uncategorized category' });
                            }
                            uncategorizedId = newCategoryResults.insertId;
                            reassignProductsAndDeleteCategory(id, uncategorizedId, res);
                        });
                    } else {
                        uncategorizedId = uncategorizedResults[0].id;
                        reassignProductsAndDeleteCategory(id, uncategorizedId, res);
                    }
                });
            } else {
                // Nếu không có sản phẩm, xóa danh mục ngay lập tức
                const deleteSql = 'DELETE FROM categories WHERE id = ?';
                connection.query(deleteSql, [id], (err) => {
                    if (err) {
                        console.error('Error deleting category:', err);
                        return res.status(500).json({ error: 'Failed to delete category' });
                    }
                    res.status(200).json({ message: 'Category deleted successfully' });
                });
            }
        });
    });
});

// Hàm để chuyển sản phẩm và xóa danh mục
function reassignProductsAndDeleteCategory(categoryId, uncategorizedId, res) {
    // Cập nhật tất cả sản phẩm sang danh mục "Chưa phân loại" (qua junction table)
    // First, get all product_ids that have this category
    const getProductsSql = 'SELECT DISTINCT product_id FROM product_categories WHERE category_id = ?';
    connection.query(getProductsSql, [categoryId], (err, productResults) => {
        if (err) {
            console.error('Error getting products:', err);
            return res.status(500).json({ error: 'Failed to get products' });
        }

        if (productResults.length === 0) {
            // No products to reassign, just delete the category
            const deleteSql = 'DELETE FROM categories WHERE id = ?';
            connection.query(deleteSql, [categoryId], (err) => {
                if (err) {
                    console.error('Error deleting category:', err);
                    return res.status(500).json({ error: 'Failed to delete category' });
                }
                res.status(200).json({ message: 'Category deleted successfully' });
            });
            return;
        }

        // Delete old category assignments and create new ones
        const deleteOldSql = 'DELETE FROM product_categories WHERE category_id = ?';
        connection.query(deleteOldSql, [categoryId], (err) => {
            if (err) {
                console.error('Error deleting old category assignments:', err);
                return res.status(500).json({ error: 'Failed to delete old category assignments' });
            }

            // Insert new assignments to uncategorized category
            const insertValues = productResults.map(p => [p.product_id, uncategorizedId]);
            const insertSql = 'INSERT INTO product_categories (product_id, category_id) VALUES ?';
            connection.query(insertSql, [insertValues], (err) => {
                if (err) {
                    console.error('Error reassigning products:', err);
                    return res.status(500).json({ error: 'Failed to reassign products' });
                }

                // Xóa danh mục cũ
                const deleteSql = 'DELETE FROM categories WHERE id = ?';
                connection.query(deleteSql, [categoryId], (err) => {
                    if (err) {
                        console.error('Error deleting category:', err);
                        return res.status(500).json({ error: 'Failed to delete category' });
                    }
                    res.status(200).json({ message: 'Category deleted and products reassigned successfully' });
                });
            });
        });
    });
}

module.exports = router;