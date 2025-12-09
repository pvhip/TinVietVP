-- Thêm các sản phẩm mới vào database
USE tinvietvp;

-- Thêm danh mục "Linh kiện máy tính" nếu chưa có
INSERT IGNORE INTO categories(name, slug) VALUES
('Linh kiện máy tính', 'linh-kien-may-tinh');

-- Thêm các sản phẩm mới
INSERT INTO products(sku, name, brand, monthly_price, deposit_required, stock, description) VALUES

-- Máy in
('EPSONL3250', 'Máy in Epson EcoTank L3250', 'Epson', 400000, 600000, 12, 'Máy in phun màu đa năng WiFi.'),
('BROHL1210W', 'Máy in Brother HL-L1210W', 'Brother', 320000, 400000, 15, 'In laser đen trắng, kết nối không dây.'),

-- Mực in
('INKC13T00V', 'Mực in Epson 003 Đen', 'Epson', 50000, 50000, 50, 'Mực in chính hãng cho dòng EcoTank.'),
('TONER12A', 'Mực in HP 12A (Q2612A)', 'HP', 80000, 80000, 40, 'Hộp mực laser dành cho máy in HP LaserJet.'),

-- Máy hủy giấy
('HUYPAPER63C', 'Máy hủy giấy Silicon PS-632C', 'Silicon', 250000, 300000, 8, 'Máy hủy giấy mini cho văn phòng.'),
('HUYRC2210', 'Máy hủy giấy Roco RC-2210', 'Roco', 300000, 350000, 6, 'Hủy vụn siêu nhỏ bảo mật cao.'),

-- Máy tính bàn
('PCVNGAMING01', 'Máy tính bàn Gaming VN G1', 'VNTech', 1500000, 5000000, 5, 'CPU i5, RAM 16GB, SSD 512GB, GTX 1660.'),
('PCHPVN01', 'Máy tính bàn HP ProDesk 400 G6', 'HP', 1200000, 4500000, 7, 'PC văn phòng bền bỉ, tiết kiệm điện.'),

-- Máy photocopy
('RICMP2014AD', 'Máy photocopy Ricoh MP 2014AD', 'Ricoh', 900000, 1500000, 4, 'Copy – Scan – In, tốc độ 20 trang/phút.'),
('CANIRADV4035', 'Máy photocopy Canon IR-ADV 4035', 'Canon', 1200000, 2000000, 3, 'Máy photocopy đa chức năng khổ A3.'),

-- Linh kiện máy tính
('RAM16GDDR4', 'Ram 16GB DDR4 Bus 3200', 'Kingston', 80000, 100000, 30, 'RAM DDR4 hiệu năng cao cho PC.'),
('SSD512GNVME', 'SSD NVMe 512GB PCIe 3.0', 'Samsung', 100000, 150000, 25, 'Ổ cứng SSD NVMe tốc độ cao.');

-- Phân loại sản phẩm vào các danh mục

-- Máy in
INSERT INTO product_categories(product_id, category_id)
SELECT p.id, c.id 
FROM products p 
CROSS JOIN categories c 
WHERE c.slug = 'may-in'
AND p.sku IN ('EPSONL3250', 'BROHL1210W')
AND NOT EXISTS (
    SELECT 1 FROM product_categories pc 
    WHERE pc.product_id = p.id AND pc.category_id = c.id
);

-- Mực in
INSERT INTO product_categories(product_id, category_id)
SELECT p.id, c.id 
FROM products p 
CROSS JOIN categories c 
WHERE c.slug = 'muc-in'
AND p.sku IN ('INKC13T00V', 'TONER12A')
AND NOT EXISTS (
    SELECT 1 FROM product_categories pc 
    WHERE pc.product_id = p.id AND pc.category_id = c.id
);

-- Máy hủy giấy
INSERT INTO product_categories(product_id, category_id)
SELECT p.id, c.id 
FROM products p 
CROSS JOIN categories c 
WHERE c.slug = 'may-huy-giay'
AND p.sku IN ('HUYPAPER63C', 'HUYRC2210')
AND NOT EXISTS (
    SELECT 1 FROM product_categories pc 
    WHERE pc.product_id = p.id AND pc.category_id = c.id
);

-- Máy tính bàn
INSERT INTO product_categories(product_id, category_id)
SELECT p.id, c.id 
FROM products p 
CROSS JOIN categories c 
WHERE c.slug = 'may-tinh-ban'
AND p.sku IN ('PCVNGAMING01', 'PCHPVN01')
AND NOT EXISTS (
    SELECT 1 FROM product_categories pc 
    WHERE pc.product_id = p.id AND pc.category_id = c.id
);

-- Máy photocopy
INSERT INTO product_categories(product_id, category_id)
SELECT p.id, c.id 
FROM products p 
CROSS JOIN categories c 
WHERE c.slug = 'may-photocopy'
AND p.sku IN ('RICMP2014AD', 'CANIRADV4035')
AND NOT EXISTS (
    SELECT 1 FROM product_categories pc 
    WHERE pc.product_id = p.id AND pc.category_id = c.id
);

-- Linh kiện máy tính
INSERT INTO product_categories(product_id, category_id)
SELECT p.id, c.id 
FROM products p 
CROSS JOIN categories c 
WHERE c.slug = 'linh-kien-may-tinh'
AND p.sku IN ('RAM16GDDR4', 'SSD512GNVME')
AND NOT EXISTS (
    SELECT 1 FROM product_categories pc 
    WHERE pc.product_id = p.id AND pc.category_id = c.id
);

-- Thêm hình ảnh mặc định cho các sản phẩm mới
INSERT INTO product_images(product_id, image_url, sort_order)
SELECT id, CONCAT('/assets/', sku, '.jpg'), 0 
FROM products 
WHERE sku IN ('EPSONL3250', 'BROHL1210W', 'INKC13T00V', 'TONER12A', 'HUYPAPER63C', 'HUYRC2210', 
              'PCVNGAMING01', 'PCHPVN01', 'RICMP2014AD', 'CANIRADV4035', 'RAM16GDDR4', 'SSD512GNVME')
AND NOT EXISTS (
    SELECT 1 FROM product_images pi WHERE pi.product_id = products.id
);

-- Hiển thị kết quả
SELECT 
    p.id,
    p.sku,
    p.name,
    p.brand,
    GROUP_CONCAT(c.name SEPARATOR ', ') as categories
FROM products p
LEFT JOIN product_categories pc ON p.id = pc.product_id
LEFT JOIN categories c ON pc.category_id = c.id
WHERE p.sku IN ('EPSONL3250', 'BROHL1210W', 'INKC13T00V', 'TONER12A', 'HUYPAPER63C', 'HUYRC2210', 
                'PCVNGAMING01', 'PCHPVN01', 'RICMP2014AD', 'CANIRADV4035', 'RAM16GDDR4', 'SSD512GNVME')
GROUP BY p.id, p.sku, p.name, p.brand
ORDER BY p.id;

