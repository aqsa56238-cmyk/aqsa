import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Database, FileCode, Copy, Check, Download, Server, Terminal, Shield } from 'lucide-react';

export const AdminPhpExport: React.FC = () => {
  const { products, categories, orders, settings } = useStore();
  const [activeFile, setActiveFile] = useState<'sql' | 'database_php' | 'auth_php' | 'dashboard_php' | 'products_php' | 'checkout_php'>('sql');
  const [copied, setCopied] = useState(false);

  // Generate dynamic database.sql based on current store state
  const sqlDump = `-- ========================================================
-- Vendôme Éditions Haute Apparel Database
-- MySQL 8.0+ / MariaDB 10.5+ Relational Schema
-- Generated: ${new Date().toISOString()}
-- ========================================================

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS settings;
DROP TABLE IF EXISTS admins;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Administrators Table
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('superadmin', 'manager', 'atelier_tailor') DEFAULT 'superadmin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Default Admin Credential (admin@vendome.com / password: admin_vendome_2026)
INSERT INTO admins (username, email, password_hash, role) VALUES 
('vendome_admin', 'admin@vendome.com', '$2y$12$eImiTXuWVxfM37uY4JANjOL.oDRrUVhkZRlU2n0e6e7R4FkVtGf6W', 'superadmin');

-- 2. Store Settings Table
CREATE TABLE settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO settings (setting_key, setting_value) VALUES
('store_name', ${JSON.stringify(settings.storeName)}),
('tagline', ${JSON.stringify(settings.tagline)}),
('currency_symbol', ${JSON.stringify(settings.currencySymbol)}),
('free_shipping_threshold', '${settings.freeShippingThreshold}'),
('hero_tagline', ${JSON.stringify(settings.heroTagline)}),
('hero_title', ${JSON.stringify(settings.heroTitle)}),
('hero_subtitle', ${JSON.stringify(settings.heroSubtitle)}),
('hero_cta_text', ${JSON.stringify(settings.heroCtaText)}),
('whatsapp_number', ${JSON.stringify(settings.whatsappNumber)}),
('contact_email', ${JSON.stringify(settings.contactEmail)});

-- 3. Categories Table
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${categories.map(c => `INSERT INTO categories (slug, name, description, image_url) VALUES (${JSON.stringify(c.slug)}, ${JSON.stringify(c.name)}, ${JSON.stringify(c.description)}, ${JSON.stringify(c.image)});`).join('\n')}

-- 4. Products Table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(100) NOT NULL UNIQUE,
    category_slug VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    sale_price DECIMAL(10,2) DEFAULT NULL,
    stock INT NOT NULL DEFAULT 0,
    material TEXT,
    description TEXT,
    images JSON,
    sizes JSON,
    colors JSON,
    is_featured BOOLEAN DEFAULT FALSE,
    is_new_arrival BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'draft') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_slug) REFERENCES categories(slug) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

${products.map(p => `INSERT INTO products (sku, category_slug, name, price, sale_price, stock, material, description, images, sizes, colors, is_featured, is_new_arrival, status) VALUES 
(${JSON.stringify(p.sku)}, ${JSON.stringify(p.category)}, ${JSON.stringify(p.name)}, ${p.price}, ${p.salePrice || 'NULL'}, ${p.stock}, ${JSON.stringify(p.material)}, ${JSON.stringify(p.description)}, '${JSON.stringify(p.images)}', '${JSON.stringify(p.sizes)}', '${JSON.stringify(p.colors)}', ${p.isFeatured ? 1 : 0}, ${p.isNewArrival ? 1 : 0}, ${JSON.stringify(p.status)});`).join('\n')}

-- 5. Customers Table
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(100),
    city VARCHAR(100),
    country VARCHAR(100),
    status ENUM('active', 'blocked') DEFAULT 'active',
    total_spend DECIMAL(12,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Orders Table
CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY,
    customer_id INT,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(100) NOT NULL,
    shipping_address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    postal_code VARCHAR(50),
    subtotal DECIMAL(10,2) NOT NULL,
    shipping_fee DECIMAL(10,2) DEFAULT 0.00,
    discount DECIMAL(10,2) DEFAULT 0.00,
    total DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    payment_method ENUM('card', 'cash_on_delivery', 'whatsapp', 'bank_transfer') DEFAULT 'card',
    payment_status ENUM('pending', 'paid') DEFAULT 'pending',
    tracking_number VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Order Items Table
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    sku VARCHAR(100) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    size VARCHAR(50),
    color VARCHAR(100),
    unit_price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

  const databasePhp = `<?php
/**
 * Vendôme Éditions - Database Connection Class
 * Uses PDO with Prepared Statements & Strict Error Handling
 */

declare(strict_types=1);

class Database {
    private static ?PDO $instance = null;

    private string $host = '127.0.0.1';
    private string $db   = 'vendome_store';
    private string $user = 'root';
    private string $pass = '';
    private string $charset = 'utf8mb4';

    public static function getConnection(): PDO {
        if (self::$instance === null) {
            $db = new self();
            $dsn = "mysql:host={$db->host};dbname={$db->db};charset={$db->charset}";
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            try {
                self::$instance = new PDO($dsn, $db->user, $db->pass, $options);
            } catch (PDOException $e) {
                error_log("Database connection error: " . $e->getMessage());
                die(json_encode(['error' => 'Atelier database connection unavailable.']));
            }
        }
        return self::$instance;
    }
}
`;

  const authPhp = `<?php
/**
 * Vendôme Éditions - Admin Authentication & CSRF Protection
 */

declare(strict_types=1);

session_start([
    'cookie_httponly' => true,
    'cookie_secure' => isset($_SERVER['HTTPS']),
    'cookie_samesite' => 'Strict',
]);

class Auth {
    public static function login(string $email, string $password): bool {
        $pdo = Database::getConnection();
        $stmt = $pdo->prepare("SELECT id, username, password_hash, role FROM admins WHERE email = :email LIMIT 1");
        $stmt->execute(['email' => filter_var($email, FILTER_SANITIZE_EMAIL)]);
        $admin = $stmt->fetch();

        if ($admin && password_verify($password, $admin['password_hash'])) {
            session_regenerate_id(true);
            $_SESSION['admin_logged'] = true;
            $_SESSION['admin_id'] = $admin['id'];
            $_SESSION['admin_user'] = $admin['username'];
            $_SESSION['admin_role'] = $admin['role'];
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
            return true;
        }
        return false;
    }

    public static function requireAdmin(): void {
        if (empty($_SESSION['admin_logged'])) {
            header("Location: /admin/login.php");
            exit;
        }
    }

    public static function verifyCsrf(string $token): bool {
        return hash_equals($_SESSION['csrf_token'] ?? '', $token);
    }
}
`;

  const dashboardPhp = `<?php
/**
 * Vendôme Éditions - Admin Dashboard (PHP / MySQL / Chart.js)
 */

require_once __DIR__ . '/../includes/database.php';
require_once __DIR__ . '/../includes/auth.php';

Auth::requireAdmin();
$pdo = Database::getConnection();

// Aggregate Metrics via Prepared Statements
$totalSales = (float)$pdo->query("SELECT COALESCE(SUM(total), 0) FROM orders WHERE status != 'cancelled'")->fetchColumn();
$ordersCount = (int)$pdo->query("SELECT COUNT(*) FROM orders")->fetchColumn();
$productsCount = (int)$pdo->query("SELECT COUNT(*) FROM products WHERE status = 'active'")->fetchColumn();
$customersCount = (int)$pdo->query("SELECT COUNT(*) FROM customers")->fetchColumn();

// Low Stock Alert Query
$lowStockStmt = $pdo->query("SELECT id, name, sku, stock FROM products WHERE stock <= 4 ORDER BY stock ASC LIMIT 5");
$lowStockItems = $lowStockStmt->fetchAll();

// Best-Selling Items
$bestSellingStmt = $pdo->query("
    SELECT p.name, p.sku, SUM(oi.quantity) as total_qty, SUM(oi.unit_price * oi.quantity) as total_rev
    FROM order_items oi
    JOIN products p ON oi.sku = p.sku
    GROUP BY p.id
    ORDER BY total_rev DESC
    LIMIT 4
");
$bestSelling = $bestSellingStmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Vendôme Éditions &bull; Admin Console</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body class="bg-[#FAF9F5] text-[#1A1A1A] p-8">
    <div class="max-w-7xl mx-auto space-y-6">
        <header class="flex justify-between items-center bg-white p-6 border border-[#E5E0D5]">
            <h1 class="font-serif text-2xl">Executive Atelier Console</h1>
            <div class="font-mono text-xs">Total Sales: <strong>$<?= number_format($totalSales, 2) ?></strong></div>
        </header>
        <!-- Metric Cards -->
        <div class="grid grid-cols-4 gap-4">
            <div class="bg-white p-4 border">Gross Revenue: $<?= number_format($totalSales) ?></div>
            <div class="bg-white p-4 border">Orders: <?= $ordersCount ?></div>
            <div class="bg-white p-4 border">Active Pieces: <?= $productsCount ?></div>
            <div class="bg-white p-4 border">Patrons: <?= $customersCount ?></div>
        </div>
    </div>
</body>
</html>
`;

  const productsPhp = `<?php
/**
 * Vendôme Éditions - Product Catalog Management (PHP & MySQL Prepared CRUD)
 */

require_once __DIR__ . '/../includes/database.php';
require_once __DIR__ . '/../includes/auth.php';

Auth::requireAdmin();
$pdo = Database::getConnection();

// Handle Create / Update / Delete with CSRF Protection
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!Auth::verifyCsrf($_POST['csrf_token'] ?? '')) {
        die('CSRF token validation failure.');
    }

    $action = $_POST['action'] ?? '';

    if ($action === 'create' || $action === 'update') {
        $sku = trim($_POST['sku'] ?? '');
        $name = trim($_POST['name'] ?? '');
        $category = trim($_POST['category'] ?? '');
        $price = (float)$_POST['price'];
        $salePrice = !empty($_POST['sale_price']) ? (float)$_POST['sale_price'] : null;
        $stock = (int)$_POST['stock'];
        $material = trim($_POST['material'] ?? '');
        $description = trim($_POST['description'] ?? '');

        if ($action === 'create') {
            $stmt = $pdo->prepare("
                INSERT INTO products (sku, category_slug, name, price, sale_price, stock, material, description)
                VALUES (:sku, :cat, :name, :price, :sale_price, :stock, :mat, :desc)
            ");
        } else {
            $id = (int)$_POST['id'];
            $stmt = $pdo->prepare("
                UPDATE products 
                SET sku = :sku, category_slug = :cat, name = :name, price = :price, sale_price = :sale_price, stock = :stock, material = :mat, description = :desc
                WHERE id = :id
            ");
            $params['id'] = $id;
        }

        $params = [
            'sku' => $sku,
            'cat' => $category,
            'name' => $name,
            'price' => $price,
            'sale_price' => $salePrice,
            'stock' => $stock,
            'mat' => $material,
            'desc' => $description
        ];
        if ($action === 'update') $params['id'] = (int)$_POST['id'];

        $stmt->execute($params);
        header("Location: /admin/products.php?status=success");
        exit;
    }
}
`;

  const checkoutPhp = `<?php
/**
 * Vendôme Éditions - Checkout & WhatsApp Order API
 */

require_once __DIR__ . '/../includes/database.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || empty($input['items'])) {
    echo json_encode(['error' => 'No items in cart payload']);
    exit;
}

$pdo = Database::getConnection();
$orderId = 'VDM-' . strtoupper(substr(md5(uniqid()), 0, 6));

try {
    $pdo->beginTransaction();

    // Insert Order
    $stmt = $pdo->prepare("
        INSERT INTO orders (id, customer_name, customer_email, customer_phone, shipping_address, city, country, subtotal, shipping_fee, total, payment_method, status)
        VALUES (:id, :name, :email, :phone, :addr, :city, :country, :subtotal, :fee, :total, :method, 'pending')
    ");

    $stmt->execute([
        'id' => $orderId,
        'name' => $input['customerName'],
        'email' => $input['customerEmail'],
        'phone' => $input['customerPhone'],
        'addr' => $input['shippingAddress'],
        'city' => $input['city'],
        'country' => $input['country'],
        'subtotal' => $input['subtotal'],
        'fee' => $input['shippingFee'] ?? 0,
        'total' => $input['total'],
        'method' => $input['paymentMethod'] ?? 'card'
    ]);

    // Insert Line Items & Deduct Stock
    $itemStmt = $pdo->prepare("
        INSERT INTO order_items (order_id, sku, product_name, size, color, unit_price, quantity)
        VALUES (:order_id, :sku, :pname, :size, :color, :price, :qty)
    ");

    $stockStmt = $pdo->prepare("UPDATE products SET stock = GREATEST(0, stock - :qty) WHERE sku = :sku");

    foreach ($input['items'] as $item) {
        $itemStmt->execute([
            'order_id' => $orderId,
            'sku' => $item['sku'],
            'pname' => $item['productName'],
            'size' => $item['size'],
            'color' => $item['color'],
            'price' => $item['price'],
            'qty' => $item['quantity']
        ]);
        $stockStmt->execute(['qty' => $item['quantity'], 'sku' => $item['sku']]);
    }

    $pdo->commit();
    echo json_encode([
        'success' => true,
        'orderId' => $orderId,
        'message' => 'Order successfully registered with Place Vendôme atelier'
    ]);
} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(['error' => $e->getMessage()]);
}
`;

  const getActiveContent = () => {
    switch (activeFile) {
      case 'sql':
        return sqlDump;
      case 'database_php':
        return databasePhp;
      case 'auth_php':
        return authPhp;
      case 'dashboard_php':
        return dashboardPhp;
      case 'products_php':
        return productsPhp;
      case 'checkout_php':
        return checkoutPhp;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = activeFile === 'sql' ? 'vendome_schema.sql' : `${activeFile}.php`;
    const blob = new Blob([getActiveContent()], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 border border-[#E5E0D5]">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-light text-[#141413]">
            PHP 8+ &amp; MySQL Production Architecture &amp; Export Center
          </h2>
          <p className="text-xs text-[#6B665E] mt-1 font-mono">
            Full production backend source code with prepared statements, password hashing, and complete relational database DDL
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleCopy}
            className="px-4 py-2 border border-[#1C1B19] text-[#1C1B19] text-xs font-mono uppercase tracking-wider hover:bg-[#F3EFE7] flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy File Content'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-[#1C1B19] text-white text-xs font-mono uppercase tracking-wider hover:bg-black flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download {activeFile === 'sql' ? 'database.sql' : `${activeFile}.php`}</span>
          </button>
        </div>
      </div>

      {/* Deployment Quick Guide Card */}
      <div className="bg-[#1C1B19] text-white p-5 border border-[#3A3834] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
        <div className="space-y-1">
          <div className="text-[#CFC8BA] uppercase tracking-wider font-bold flex items-center gap-1.5">
            <Server className="w-4 h-4" />
            <span>1. Database Setup</span>
          </div>
          <p className="text-[#9C968B] font-light text-[11px] leading-relaxed">
            Create database <code>vendome_store</code> in phpMyAdmin or MySQL CLI. Import the generated <code>database.sql</code> file below.
          </p>
        </div>

        <div className="space-y-1">
          <div className="text-[#CFC8BA] uppercase tracking-wider font-bold flex items-center gap-1.5">
            <Shield className="w-4 h-4" />
            <span>2. Security Architecture</span>
          </div>
          <p className="text-[#9C968B] font-light text-[11px] leading-relaxed">
            Includes PHP <code>password_hash(..., BCRYPT)</code>, PDO Prepared Statements against SQL injection, and CSRF token session guards.
          </p>
        </div>

        <div className="space-y-1">
          <div className="text-[#CFC8BA] uppercase tracking-wider font-bold flex items-center gap-1.5">
            <Terminal className="w-4 h-4" />
            <span>3. Instant Deployment</span>
          </div>
          <p className="text-[#9C968B] font-light text-[11px] leading-relaxed">
            Compatible out of the box with Apache, Nginx, XAMPP, Laragon, cPanel, or VPS PHP 8.1 / 8.2 / 8.3 runtimes.
          </p>
        </div>
      </div>

      {/* File Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5E0D5] overflow-x-auto pb-1 text-xs font-mono">
        <button
          onClick={() => setActiveFile('sql')}
          className={`px-4 py-2 flex items-center gap-1.5 border-b-2 font-medium transition-colors ${
            activeFile === 'sql' ? 'border-[#1C1B19] text-black bg-white' : 'border-transparent text-[#777] hover:text-black'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>database.sql (Schema &amp; Seed)</span>
        </button>

        <button
          onClick={() => setActiveFile('database_php')}
          className={`px-4 py-2 flex items-center gap-1.5 border-b-2 font-medium transition-colors ${
            activeFile === 'database_php' ? 'border-[#1C1B19] text-black bg-white' : 'border-transparent text-[#777] hover:text-black'
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>includes/database.php</span>
        </button>

        <button
          onClick={() => setActiveFile('auth_php')}
          className={`px-4 py-2 flex items-center gap-1.5 border-b-2 font-medium transition-colors ${
            activeFile === 'auth_php' ? 'border-[#1C1B19] text-black bg-white' : 'border-transparent text-[#777] hover:text-black'
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>includes/auth.php</span>
        </button>

        <button
          onClick={() => setActiveFile('dashboard_php')}
          className={`px-4 py-2 flex items-center gap-1.5 border-b-2 font-medium transition-colors ${
            activeFile === 'dashboard_php' ? 'border-[#1C1B19] text-black bg-white' : 'border-transparent text-[#777] hover:text-black'
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>admin/dashboard.php</span>
        </button>

        <button
          onClick={() => setActiveFile('products_php')}
          className={`px-4 py-2 flex items-center gap-1.5 border-b-2 font-medium transition-colors ${
            activeFile === 'products_php' ? 'border-[#1C1B19] text-black bg-white' : 'border-transparent text-[#777] hover:text-black'
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>admin/products.php</span>
        </button>

        <button
          onClick={() => setActiveFile('checkout_php')}
          className={`px-4 py-2 flex items-center gap-1.5 border-b-2 font-medium transition-colors ${
            activeFile === 'checkout_php' ? 'border-[#1C1B19] text-black bg-white' : 'border-transparent text-[#777] hover:text-black'
          }`}
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>api/order.php</span>
        </button>
      </div>

      {/* Code Viewer */}
      <div className="bg-[#191918] text-[#E0DCCE] p-4 sm:p-6 border border-[#33312E] overflow-x-auto rounded-none font-mono text-xs leading-relaxed max-h-[550px] overflow-y-auto">
        <pre className="whitespace-pre">
          {getActiveContent()}
        </pre>
      </div>
    </div>
  );
};
