-- Script kiểm tra nhanh trạng thái phân loại sản phẩm
-- Chạy script này để xem các sản phẩm và danh mục của chúng

USE tinvietvp;

-- Xem tất cả sản phẩm và danh mục
SELECT 
    p.id as 'ID',
    p.sku as 'SKU',
    p.name as 'Tên sản phẩm',
    p.brand as 'Thương hiệu',
    CASE 
        WHEN COUNT(c.id) = 0 THEN '❌ CHƯA CÓ DANH MỤC'
        ELSE GROUP_CONCAT(c.name SEPARATOR ', ')
    END as 'Danh mục',
    COUNT(c.id) as 'Số danh mục'
FROM products p
LEFT JOIN product_categories pc ON p.id = pc.product_id
LEFT JOIN categories c ON pc.category_id = c.id
GROUP BY p.id, p.sku, p.name, p.brand
ORDER BY COUNT(c.id) ASC, p.id;

-- Thống kê theo danh mục
SELECT 
    c.name as 'Danh mục',
    COUNT(pc.product_id) as 'Số sản phẩm'
FROM categories c
LEFT JOIN product_categories pc ON c.id = pc.category_id
GROUP BY c.id, c.name
ORDER BY COUNT(pc.product_id) DESC;

