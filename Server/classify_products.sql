-- Script phân loại sản phẩm tự động
-- Chạy script này để phân loại các sản phẩm vào các danh mục phù hợp

USE tinvietvp;

-- Bước 1: Xem các sản phẩm chưa có danh mục
SELECT 
    p.id,
    p.sku,
    p.name,
    p.brand,
    'CHƯA CÓ DANH MỤC' as status
FROM products p
WHERE NOT EXISTS (
    SELECT 1 FROM product_categories pc WHERE pc.product_id = p.id
)
ORDER BY p.id;

-- Bước 2: Phân loại sản phẩm vào các danh mục

-- Máy in (tìm theo: máy in, printer, inkjet, laser, brother, canon, hp, epson)
INSERT INTO product_categories(product_id, category_id)
SELECT p.id, c.id 
FROM products p 
CROSS JOIN categories c 
WHERE c.slug = 'may-in'
AND (
    LOWER(p.name) LIKE '%máy in%' OR 
    LOWER(p.name) LIKE '%may in%' OR
    LOWER(p.name) LIKE '%printer%' OR
    LOWER(p.name) LIKE '%inkjet%' OR
    LOWER(p.name) LIKE '%laser%' OR
    (LOWER(p.name) LIKE '%brother%' AND (LOWER(p.name) LIKE '%hl-%' OR LOWER(p.name) LIKE '%mfc-%' OR LOWER(p.name) LIKE '%dcp-%')) OR
    (LOWER(p.name) LIKE '%canon%' AND (LOWER(p.name) LIKE '%lbp%' OR LOWER(p.name) LIKE '%pixma%' OR LOWER(p.name) LIKE '%imageclass%')) OR
    (LOWER(p.name) LIKE '%hp%' AND (LOWER(p.name) LIKE '%laserjet%' OR LOWER(p.name) LIKE '%deskjet%' OR LOWER(p.name) LIKE '%officejet%')) OR
    (LOWER(p.name) LIKE '%epson%' AND (LOWER(p.name) LIKE '%ecotank%' OR LOWER(p.name) LIKE '%l%')) OR
    LOWER(p.sku) LIKE '%print%' OR
    LOWER(p.sku) LIKE '%ink%' OR
    LOWER(p.sku) LIKE '%lbp%' OR
    LOWER(p.sku) LIKE '%pixma%' OR
    LOWER(p.sku) LIKE '%hl-%' OR
    LOWER(p.sku) LIKE '%laserjet%'
)
AND NOT EXISTS (
    SELECT 1 FROM product_categories pc 
    WHERE pc.product_id = p.id AND pc.category_id = c.id
);

-- Máy photocopy (tìm theo: photocopy, copy, multifunction, ricoh, xerox, sharp, konica, canon ir-adv)
INSERT INTO product_categories(product_id, category_id)
SELECT p.id, c.id 
FROM products p 
CROSS JOIN categories c 
WHERE c.slug = 'may-photocopy'
AND (
    LOWER(p.name) LIKE '%photocopy%' OR 
    LOWER(p.name) LIKE '%photo copy%' OR
    (LOWER(p.name) LIKE '%copy%' AND NOT LOWER(p.name) LIKE '%hủy%' AND NOT LOWER(p.name) LIKE '%huy%') OR
    LOWER(p.name) LIKE '%multifunction%' OR
    LOWER(p.name) LIKE '%mfp%' OR
    (LOWER(p.name) LIKE '%ricoh%' AND (LOWER(p.name) LIKE '%mp%' OR LOWER(p.name) LIKE '%im%')) OR
    (LOWER(p.name) LIKE '%xerox%' AND (LOWER(p.name) LIKE '%versalink%' OR LOWER(p.name) LIKE '%workcentre%')) OR
    (LOWER(p.name) LIKE '%sharp%' AND (LOWER(p.name) LIKE '%mx%' OR LOWER(p.name) LIKE '%ar%')) OR
    (LOWER(p.name) LIKE '%konica%' AND (LOWER(p.name) LIKE '%bizhub%' OR LOWER(p.name) LIKE '%c%')) OR
    (LOWER(p.name) LIKE '%canon%' AND LOWER(p.name) LIKE '%ir-adv%') OR
    LOWER(p.sku) LIKE '%copy%' OR
    LOWER(p.sku) LIKE '%photo%' OR
    LOWER(p.sku) LIKE '%mp%' OR
    LOWER(p.sku) LIKE '%mx%' OR
    LOWER(p.sku) LIKE '%ir-adv%' OR
    LOWER(p.sku) LIKE '%canir%'
)
AND NOT EXISTS (
    SELECT 1 FROM product_categories pc 
    WHERE pc.product_id = p.id AND pc.category_id = c.id
);

-- Máy hủy giấy (tìm theo: hủy giấy, shredder, destroy, roco, silicon, fellowes, intimus, royal)
INSERT INTO product_categories(product_id, category_id)
SELECT p.id, c.id 
FROM products p 
CROSS JOIN categories c 
WHERE c.slug = 'may-huy-giay'
AND (
    LOWER(p.name) LIKE '%hủy giấy%' OR 
    LOWER(p.name) LIKE '%huy giay%' OR
    LOWER(p.name) LIKE '%shredder%' OR
    LOWER(p.name) LIKE '%destroy%' OR
    LOWER(p.name) LIKE '%roco%' OR
    LOWER(p.name) LIKE '%silicon%' OR
    LOWER(p.name) LIKE '%fellowes%' OR
    LOWER(p.name) LIKE '%intimus%' OR
    LOWER(p.name) LIKE '%royal%' OR
    LOWER(p.name) LIKE '%aurora%' OR
    LOWER(p.name) LIKE '%koblenz%' OR
    LOWER(p.sku) LIKE '%shred%' OR
    LOWER(p.sku) LIKE '%huy%' OR
    LOWER(p.sku) LIKE '%destroy%' OR
    LOWER(p.sku) LIKE '%rc-%' OR
    LOWER(p.sku) LIKE '%ps-%'
)
AND NOT EXISTS (
    SELECT 1 FROM product_categories pc 
    WHERE pc.product_id = p.id AND pc.category_id = c.id
);

-- Máy tính bàn (tìm theo: máy tính, desktop, pc, computer, gaming, prodesk)
INSERT INTO product_categories(product_id, category_id)
SELECT p.id, c.id 
FROM products p 
CROSS JOIN categories c 
WHERE c.slug = 'may-tinh-ban'
AND (
    LOWER(p.name) LIKE '%máy tính%' OR 
    LOWER(p.name) LIKE '%may tinh%' OR
    LOWER(p.name) LIKE '%desktop%' OR
    (LOWER(p.name) LIKE '%pc%' AND NOT LOWER(p.name) LIKE '%ram%' AND NOT LOWER(p.name) LIKE '%ssd%') OR
    LOWER(p.name) LIKE '%computer%' OR
    LOWER(p.name) LIKE '%optiplex%' OR
    LOWER(p.name) LIKE '%elitedesk%' OR
    LOWER(p.name) LIKE '%thinkcentre%' OR
    LOWER(p.name) LIKE '%gaming%' OR
    LOWER(p.name) LIKE '%prodesk%' OR
    LOWER(p.sku) LIKE '%pc%' OR
    LOWER(p.sku) LIKE '%desktop%' OR
    LOWER(p.sku) LIKE '%opt%' OR
    LOWER(p.sku) LIKE '%elite%' OR
    LOWER(p.sku) LIKE '%think%' OR
    LOWER(p.sku) LIKE '%gaming%'
)
AND NOT EXISTS (
    SELECT 1 FROM product_categories pc 
    WHERE pc.product_id = p.id AND pc.category_id = c.id
);

-- Mực in (tìm theo: mực, ink, toner, cartridge, hộp mực)
INSERT INTO product_categories(product_id, category_id)
SELECT p.id, c.id 
FROM products p 
CROSS JOIN categories c 
WHERE c.slug = 'muc-in'
AND (
    LOWER(p.name) LIKE '%mực%' OR 
    LOWER(p.name) LIKE '%muc%' OR
    LOWER(p.name) LIKE '%ink%' OR
    LOWER(p.name) LIKE '%toner%' OR
    LOWER(p.name) LIKE '%cartridge%' OR
    LOWER(p.name) LIKE '%hộp mực%' OR
    LOWER(p.name) LIKE '%hop muc%' OR
    LOWER(p.name) LIKE '%cli-%' OR
    LOWER(p.name) LIKE '%pg-%' OR
    LOWER(p.name) LIKE '%tn-%' OR
    LOWER(p.name) LIKE '%q2612%' OR
    LOWER(p.sku) LIKE '%ink%' OR
    LOWER(p.sku) LIKE '%toner%' OR
    LOWER(p.sku) LIKE '%cart%' OR
    LOWER(p.sku) LIKE '%muc%' OR
    LOWER(p.sku) LIKE '%cli%' OR
    LOWER(p.sku) LIKE '%pg%' OR
    LOWER(p.sku) LIKE '%tn%'
)
AND NOT EXISTS (
    SELECT 1 FROM product_categories pc 
    WHERE pc.product_id = p.id AND pc.category_id = c.id
);

-- Linh kiện máy tính (tìm theo: ram, ssd, hdd, card đồ họa, vga, cpu, mainboard)
INSERT INTO product_categories(product_id, category_id)
SELECT p.id, c.id 
FROM products p 
CROSS JOIN categories c 
WHERE c.slug = 'linh-kien-may-tinh'
AND (
    LOWER(p.name) LIKE '%ram%' OR
    LOWER(p.name) LIKE '%ddr%' OR
    LOWER(p.name) LIKE '%ssd%' OR
    LOWER(p.name) LIKE '%hdd%' OR
    LOWER(p.name) LIKE '%ổ cứng%' OR
    LOWER(p.name) LIKE '%o cung%' OR
    LOWER(p.name) LIKE '%nvme%' OR
    LOWER(p.name) LIKE '%card đồ họa%' OR
    LOWER(p.name) LIKE '%vga%' OR
    LOWER(p.name) LIKE '%gtx%' OR
    LOWER(p.name) LIKE '%rtx%' OR
    LOWER(p.name) LIKE '%cpu%' OR
    LOWER(p.name) LIKE '%mainboard%' OR
    LOWER(p.name) LIKE '%bo mạch chủ%' OR
    LOWER(p.name) LIKE '%linh kiện%' OR
    LOWER(p.sku) LIKE '%ram%' OR
    LOWER(p.sku) LIKE '%ddr%' OR
    LOWER(p.sku) LIKE '%ssd%' OR
    LOWER(p.sku) LIKE '%nvme%'
)
AND NOT EXISTS (
    SELECT 1 FROM product_categories pc 
    WHERE pc.product_id = p.id AND pc.category_id = c.id
);

-- Bước 3: Xem kết quả phân loại
SELECT 
    p.id,
    p.sku,
    p.name,
    p.brand,
    CASE 
        WHEN COUNT(c.id) = 0 THEN '❌ CHƯA CÓ DANH MỤC'
        ELSE GROUP_CONCAT(c.name SEPARATOR ', ')
    END as categories,
    COUNT(c.id) as category_count
FROM products p
LEFT JOIN product_categories pc ON p.id = pc.product_id
LEFT JOIN categories c ON pc.category_id = c.id
GROUP BY p.id, p.sku, p.name, p.brand
ORDER BY category_count ASC, p.id;

-- Bước 4: Thống kê số lượng sản phẩm theo danh mục
SELECT 
    c.name as 'Danh mục',
    COUNT(pc.product_id) as 'Số lượng sản phẩm'
FROM categories c
LEFT JOIN product_categories pc ON c.id = pc.category_id
GROUP BY c.id, c.name
ORDER BY COUNT(pc.product_id) DESC;

-- Bước 5: Xem các sản phẩm vẫn chưa có danh mục (nếu có)
SELECT 
    p.id,
    p.sku,
    p.name,
    p.brand,
    p.description,
    '⚠️ CẦN PHÂN LOẠI THỦ CÔNG' as note
FROM products p
WHERE NOT EXISTS (
    SELECT 1 FROM product_categories pc WHERE pc.product_id = p.id
)
ORDER BY p.id;
