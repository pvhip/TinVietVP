DROP DATABASE IF EXISTS tinvietvp;



CREATE DATABASE tinvietvp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE tinvietvp;

SET NAMES utf8mb4;

CREATE TABLE users (

  id            INT AUTO_INCREMENT PRIMARY KEY,

  full_name     VARCHAR(120) NOT NULL,

  email         VARCHAR(150) NOT NULL UNIQUE,

  phone         VARCHAR(20)  NULL,

  password_hash VARCHAR(255) NOT NULL,

  role          ENUM('customer','admin') NOT NULL DEFAULT 'customer',

  is_active     TINYINT(1) NOT NULL DEFAULT 1,

  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  updated_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

) ENGINE=InnoDB;

CREATE TABLE user_sessions (

  id          BIGINT AUTO_INCREMENT PRIMARY KEY,

  user_id     INT NOT NULL,

  token_hash  CHAR(64) NOT NULL UNIQUE,

  user_agent  VARCHAR(255) NULL,

  ip_address  VARCHAR(45) NULL,

  expires_at  DATETIME NOT NULL,

  revoked_at  DATETIME NULL,

  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_us_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

) ENGINE=InnoDB;

CREATE TABLE password_resets (

  id          BIGINT AUTO_INCREMENT PRIMARY KEY,

  user_id     INT NOT NULL,

  token_hash  CHAR(64) NOT NULL UNIQUE,

  expires_at  DATETIME NOT NULL,

  used_at     DATETIME NULL,

  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_pr_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

) ENGINE=InnoDB;

CREATE TABLE addresses (

  id            INT AUTO_INCREMENT PRIMARY KEY,

  user_id       INT NOT NULL,

  label         VARCHAR(60) NULL,

  receiver_name VARCHAR(120) NOT NULL,

  receiver_phone VARCHAR(20) NOT NULL,

  line1         VARCHAR(255) NOT NULL,

  ward          VARCHAR(120) NULL,

  district      VARCHAR(120) NULL,

  city          VARCHAR(120) NOT NULL,

  is_default    TINYINT(1) NOT NULL DEFAULT 0,

  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_addr_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

) ENGINE=InnoDB;

CREATE TABLE categories (

  id        INT AUTO_INCREMENT PRIMARY KEY,

  name      VARCHAR(120) NOT NULL UNIQUE,

  slug      VARCHAR(140) NOT NULL UNIQUE,

  parent_id INT NULL,

  CONSTRAINT fk_cat_parent FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL

) ENGINE=InnoDB;

CREATE TABLE products (

  id               INT AUTO_INCREMENT PRIMARY KEY,

  sku              VARCHAR(60) NOT NULL UNIQUE,

  name             VARCHAR(200) NOT NULL,

  description      TEXT NULL,

  brand            VARCHAR(80) NULL,

  monthly_price    INT NOT NULL,

  deposit_required INT NOT NULL DEFAULT 0,

  stock            INT NOT NULL DEFAULT 0,

  status           ENUM('active','hidden','archived') NOT NULL DEFAULT 'active',

  created_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  updated_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FULLTEXT KEY ft_products (name, description)

) ENGINE=InnoDB;

CREATE TABLE product_categories (

  product_id INT NOT NULL,

  category_id INT NOT NULL,

  PRIMARY KEY (product_id, category_id),

  CONSTRAINT fk_pc_product  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,

  CONSTRAINT fk_pc_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE

) ENGINE=InnoDB;

CREATE TABLE product_images (

  id          INT AUTO_INCREMENT PRIMARY KEY,

  product_id  INT NOT NULL,

  image_url   VARCHAR(500) NOT NULL,

  sort_order  INT NOT NULL DEFAULT 0,

  CONSTRAINT fk_pimg_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE

) ENGINE=InnoDB;

CREATE TABLE product_specs (

  id          INT AUTO_INCREMENT PRIMARY KEY,

  product_id  INT NOT NULL,

  spec_key    VARCHAR(120) NOT NULL,

  spec_value  VARCHAR(255) NOT NULL,

  CONSTRAINT fk_pspec_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,

  KEY idx_ps_key (spec_key)

) ENGINE=InnoDB;

CREATE TABLE carts (

  id          BIGINT AUTO_INCREMENT PRIMARY KEY,

  user_id     INT NULL,

  session_id  VARCHAR(64) NULL,

  status      ENUM('active','converted','abandoned') NOT NULL DEFAULT 'active',

  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT uq_cart_owner UNIQUE (user_id, session_id),

  CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL

) ENGINE=InnoDB;

CREATE TABLE cart_items (

  cart_id       BIGINT NOT NULL,

  product_id    INT NOT NULL,

  qty           INT NOT NULL CHECK (qty > 0),

  price_snapshot INT NOT NULL,

  PRIMARY KEY (cart_id, product_id),

  CONSTRAINT fk_ci_cart    FOREIGN KEY (cart_id)    REFERENCES carts(id)    ON DELETE CASCADE,

  CONSTRAINT fk_ci_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT

) ENGINE=InnoDB;

CREATE TABLE orders (

  id           BIGINT AUTO_INCREMENT PRIMARY KEY,

  user_id      INT NOT NULL,

  cart_id      BIGINT NULL,

  address_id   INT NULL,

  status       ENUM('pending','confirmed','delivering','completed','cancelled') NOT NULL DEFAULT 'pending',

  subtotal     INT NOT NULL DEFAULT 0,

  discount     INT NOT NULL DEFAULT 0,

  deposit      INT NOT NULL DEFAULT 0,

  total        INT NOT NULL DEFAULT 0,

  note         VARCHAR(500) NULL,

  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_order_user    FOREIGN KEY (user_id)    REFERENCES users(id),

  CONSTRAINT fk_order_cart    FOREIGN KEY (cart_id)    REFERENCES carts(id),

  CONSTRAINT fk_order_address FOREIGN KEY (address_id) REFERENCES addresses(id) ON DELETE SET NULL

) ENGINE=InnoDB;

CREATE TABLE order_items (

  order_id     BIGINT NOT NULL,

  product_id   INT NOT NULL,

  qty          INT NOT NULL CHECK (qty > 0),

  price_snapshot INT NOT NULL,

  line_total   INT AS (qty * price_snapshot) STORED,

  PRIMARY KEY (order_id, product_id),

  CONSTRAINT fk_oi_order   FOREIGN KEY (order_id)  REFERENCES orders(id)   ON DELETE CASCADE,

  CONSTRAINT fk_oi_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT

) ENGINE=InnoDB;

CREATE TABLE rentals (

  id             BIGINT AUTO_INCREMENT PRIMARY KEY,

  order_id       BIGINT NOT NULL,

  start_date     DATE NOT NULL,

  end_date       DATE NULL,

  billing_cycle  ENUM('monthly') NOT NULL DEFAULT 'monthly',

  next_billing   DATE NULL,

  status         ENUM('active','paused','ended') NOT NULL DEFAULT 'active',

  created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_rent_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE

) ENGINE=InnoDB;

CREATE TABLE payments (

  id        BIGINT AUTO_INCREMENT PRIMARY KEY,

  order_id  BIGINT NOT NULL,

  amount    INT NOT NULL,

  method    ENUM('cash','bank','momo','vnpay') NOT NULL,

  status    ENUM('pending','paid','failed','refunded') NOT NULL DEFAULT 'pending',

  paid_at   DATETIME NULL,

  txn_code  VARCHAR(120) NULL UNIQUE,

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT fk_pay_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE

) ENGINE=InnoDB;

CREATE TABLE audit_logs (

  id        BIGINT AUTO_INCREMENT PRIMARY KEY,

  actor_id  INT NULL,

  action    VARCHAR(100) NOT NULL,

  target    VARCHAR(100) NULL,

  detail    JSON NULL,

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  KEY idx_action (action),

  CONSTRAINT fk_log_user FOREIGN KEY (actor_id) REFERENCES users(id) ON DELETE SET NULL

) ENGINE=InnoDB;

INSERT INTO users(full_name, email, phone, password_hash, role) VALUES

('Quản trị viên', 'admin@tinvietvp.vn', '0901234567', '$2y$10$REPLACE_WITH_BCRYPT', 'admin'),

('Nguyễn An',     'an@example.com',    '0901112222', '$2y$10$REPLACE_WITH_BCRYPT', 'customer');

INSERT INTO categories(name, slug) VALUES

('Máy in', 'may-in'), ('Máy photocopy','may-photocopy'), ('Mực in','muc-in');

INSERT INTO products(sku, name, brand, monthly_price, deposit_required, stock, description) VALUES

('LBP2900',  'Máy in Canon LBP 2900',  'Canon', 350000, 500000, 10, 'In laser đen trắng, bền bỉ cho văn phòng.'),

('RICMP301', 'Photocopy Ricoh MP 301', 'Ricoh', 750000, 1000000, 5, 'Đa chức năng copy/in/scan.'),

('HP107W',   'Máy in HP Laser 107W',   'HP',    300000, 300000,  8, 'Kết nối WiFi, nhỏ gọn.');

INSERT INTO product_categories(product_id, category_id)

SELECT p.id, c.id FROM products p JOIN categories c ON

  ( (p.sku='LBP2900'  AND c.slug='may-in') OR

    (p.sku='RICMP301' AND c.slug='may-photocopy') OR

    (p.sku='HP107W'   AND c.slug='may-in') );

INSERT INTO product_images(product_id, image_url, sort_order)

SELECT id, CONCAT('/assets/', sku, '.jpg'), 0 FROM products;

-- View tổng tiền đơn hàng

CREATE OR REPLACE VIEW v_order_totals AS

SELECT o.id AS order_id, o.user_id,

       SUM(oi.qty * oi.price_snapshot) AS calc_subtotal,

       o.subtotal, o.discount, o.deposit, o.total, o.status, o.created_at

FROM orders o

LEFT JOIN order_items oi ON oi.order_id = o.id

GROUP BY o.id;

CREATE INDEX idx_orders_user_status ON orders(user_id, status);

CREATE INDEX idx_products_brand_status ON products(brand, status);

CREATE INDEX idx_carts_user ON carts(user_id);

DELIMITER $$

CREATE PROCEDURE sp_place_order_from_cart(IN p_cart_id BIGINT, IN p_user_id INT, IN p_address_id INT, OUT p_order_id BIGINT)

BEGIN

  DECLARE v_subtotal INT DEFAULT 0;

  DECLARE v_deposit  INT DEFAULT 0;

  START TRANSACTION;

  INSERT INTO orders(user_id, cart_id, address_id, status, subtotal, deposit, total)

  VALUES (p_user_id, p_cart_id, p_address_id, 'pending', 0, 0, 0);

  SET p_order_id = LAST_INSERT_ID();

  INSERT INTO order_items(order_id, product_id, qty, price_snapshot)

  SELECT p_order_id, ci.product_id, ci.qty, ci.price_snapshot

  FROM cart_items ci

  WHERE ci.cart_id = p_cart_id;

  SELECT IFNULL(SUM(qty * price_snapshot),0) INTO v_subtotal FROM order_items WHERE order_id = p_order_id;

  SELECT IFNULL(SUM(p.deposit_required * ci.qty),0) INTO v_deposit

  FROM cart_items ci JOIN products p ON p.id = ci.product_id

  WHERE ci.cart_id = p_cart_id;

  UPDATE orders

    SET subtotal = v_subtotal,

        deposit  = v_deposit,

        total    = v_subtotal + v_deposit

  WHERE id = p_order_id;

  UPDATE carts SET status = 'converted' WHERE id = p_cart_id;

  COMMIT;

END$$

DELIMITER ;

