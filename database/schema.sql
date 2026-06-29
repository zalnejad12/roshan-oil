-- =============================================
-- روشن اویل - PostgreSQL Schema
-- =============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone VARCHAR(11) UNIQUE NOT NULL,
  name VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  full_name VARCHAR(100) NOT NULL,
  phone VARCHAR(11) NOT NULL,
  province VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  address TEXT NOT NULL,
  postal_code VARCHAR(10),
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(10),
  description TEXT,
  product_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE car_brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  name_fa VARCHAR(100) NOT NULL,
  logo_url TEXT,
  description TEXT,
  seo_text TEXT,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  category_id UUID REFERENCES categories(id),
  price BIGINT NOT NULL,
  original_price BIGINT,
  discount INTEGER DEFAULT 0,
  short_description TEXT,
  description TEXT,
  viscosity VARCHAR(20),
  api_standard VARCHAR(50),
  oil_type VARCHAR(20) CHECK (oil_type IN ('synthetic','semi-synthetic','mineral')),
  volume VARCHAR(50),
  specifications JSONB DEFAULT '{}',
  compatible_cars TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  in_stock BOOLEAN DEFAULT true,
  stock_count INTEGER DEFAULT 0,
  is_best_seller BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  sort_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false
);

-- Reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(20) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending','confirmed','processing','shipped','delivered','cancelled')),
  total_price BIGINT NOT NULL,
  shipping_cost BIGINT DEFAULT 0,
  discount_amount BIGINT DEFAULT 0,
  final_price BIGINT NOT NULL,
  payment_method VARCHAR(50),
  payment_status VARCHAR(20) DEFAULT 'pending',
  tracking_code VARCHAR(50),
  shipping_full_name VARCHAR(100),
  shipping_phone VARCHAR(11),
  shipping_province VARCHAR(50),
  shipping_city VARCHAR(50),
  shipping_address TEXT,
  shipping_postal_code VARCHAR(10),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name VARCHAR(255) NOT NULL,
  product_brand VARCHAR(100),
  quantity INTEGER NOT NULL,
  unit_price BIGINT NOT NULL,
  total_price BIGINT NOT NULL
);

-- Discount Codes
CREATE TABLE discount_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) UNIQUE NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('percentage','fixed')),
  value INTEGER NOT NULL,
  min_order BIGINT DEFAULT 0,
  max_uses INTEGER,
  used_count INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  author VARCHAR(100),
  category VARCHAR(100),
  tags TEXT[] DEFAULT '{}',
  read_time INTEGER DEFAULT 5,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- FAQs
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  car_brand_id UUID REFERENCES car_brands(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- Indexes
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_in_stock ON products(in_stock);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_reviews_product ON reviews(product_id);

-- Seed Data
INSERT INTO discount_codes (code, type, value, min_order, max_uses, is_active) VALUES
  ('ROSHAN10', 'percentage', 10, 500000, 1000, true),
  ('WELCOME20', 'percentage', 20, 1000000, 500, true),
  ('FLAT50K', 'fixed', 50000, 300000, 200, true);
