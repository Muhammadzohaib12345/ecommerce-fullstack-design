const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'ecommerce-fullstack-design API is running',
    dbConnected: connectDB.isDbConnected(),
  });
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, dbConnected: connectDB.isDbConnected() });
});

app.get('/api/seed', async (req, res) => {
  try {
    const Product = require('./models/Product');
    const products = [
      { name: "Men's T-Shirt", price: 29.99, image: '/images/cloth/1.jpg', description: 'Comfortable cotton t-shirt', category: 'Clothes and wear', stock: 50, featured: true },
      { name: "Women's Dress", price: 49.99, image: '/images/cloth/2.jpg', description: 'Elegant summer dress', category: 'Clothes and wear', stock: 30, featured: true },
      { name: "Casual Jacket", price: 79.99, image: '/images/cloth/3.jpg', description: 'Stylish casual jacket', category: 'Clothes and wear', stock: 20, featured: true },
      { name: "Denim Jeans", price: 39.99, image: '/images/cloth/4.jpg', description: 'Classic denim jeans', category: 'Clothes and wear', stock: 40, featured: false },
      { name: "Winter Coat", price: 119.99, image: '/images/cloth/5.jpg', description: 'Warm winter coat', category: 'Clothes and wear', stock: 15, featured: true },
      { name: "Sportswear Set", price: 59.99, image: '/images/cloth/6.jpg', description: 'Comfortable sportswear', category: 'Clothes and wear', stock: 25, featured: false },
      { name: "Formal Shirt", price: 34.99, image: '/images/cloth/7.jpg', description: 'Classic formal shirt', category: 'Clothes and wear', stock: 35, featured: false },
      { name: "Modern Sofa", price: 499.99, image: '/images/interior/1.jpg', description: 'Comfortable modern sofa', category: 'Home interiors', stock: 10, featured: true },
      { name: "Dining Table", price: 299.99, image: '/images/interior/2.jpg', description: 'Wooden dining table', category: 'Home interiors', stock: 5, featured: true },
      { name: "Office Chair", price: 89.99, image: '/images/interior/3.jpg', description: 'Ergonomic office chair', category: 'Home interiors', stock: 20, featured: false },
      { name: "Bed Frame", price: 349.99, image: '/images/interior/4.jpg', description: 'Queen size bed frame', category: 'Home interiors', stock: 8, featured: true },
      { name: "Bookshelf", price: 79.99, image: '/images/interior/5.jpg', description: '5-tier bookshelf', category: 'Home interiors', stock: 15, featured: false },
      { name: "Coffee Table", price: 129.99, image: '/images/interior/6.jpg', description: 'Glass coffee table', category: 'Home interiors', stock: 12, featured: false },
      { name: "Wardrobe", price: 399.99, image: '/images/interior/7.jpg', description: 'Spacious wardrobe', category: 'Home interiors', stock: 6, featured: false },
      { name: "Desk Lamp", price: 24.99, image: '/images/interior/8.jpg', description: 'Modern desk lamp', category: 'Home interiors', stock: 50, featured: false },
      { name: "Rug", price: 59.99, image: '/images/interior/9.jpg', description: 'Soft area rug', category: 'Home interiors', stock: 30, featured: false },
      { name: "Wall Art", price: 44.99, image: '/images/interior/10.jpg', description: 'Abstract wall art', category: 'Home interiors', stock: 25, featured: false },
      { name: "Smartphone X", price: 699.99, image: '/images/tech/1.jpg', description: 'Latest smartphone', category: 'Computer and tech', brand: 'Samsung', stock: 25, featured: true, features: ['Metallic'], condition: 'New', rating: 5 },
      { name: "Laptop Pro", price: 1199.99, image: '/images/tech/2.jpg', description: 'High performance laptop', category: 'Computer and tech', brand: 'Apple', stock: 15, featured: true, features: ['Plastic'], condition: 'New', rating: 4 },
      { name: "Wireless Earbuds", price: 129.99, image: '/images/tech/3.jpg', description: 'Noise cancelling earbuds', category: 'Computer and tech', brand: 'Huawei', stock: 40, featured: true, features: ['Plastic'], condition: 'Refurbished', rating: 3 },
      { name: "Smart Watch", price: 199.99, image: '/images/tech/4.jpg', description: 'Fitness tracking watch', category: 'Computer and tech', brand: 'Pocco', stock: 30, featured: true, features: ['Leather'], condition: 'New', rating: 4 },
      { name: "Bluetooth Speaker", price: 79.99, image: '/images/tech/5.jpg', description: 'Portable speaker', category: 'Computer and tech', brand: 'Lenovo', stock: 50, featured: false, features: ['Plastic'], condition: 'Used', rating: 2 },
      { name: "Tablet", price: 399.99, image: '/images/tech/6.jpg', description: '10-inch tablet', category: 'Computer and tech', brand: 'Samsung', stock: 20, featured: false, features: ['Metallic'], condition: 'New', rating: 4 },
      { name: "Gaming Mouse", price: 49.99, image: '/images/tech/7.jpg', description: 'RGB gaming mouse', category: 'Computer and tech', brand: 'Apple', stock: 60, featured: false, features: ['Plastic'], condition: 'New', rating: 5 },
      { name: "Mechanical Keyboard", price: 89.99, image: '/images/tech/8.jpg', description: 'Tactile keyboard', category: 'Computer and tech', brand: 'Huawei', stock: 35, featured: false, features: ['Metallic'], condition: 'New', rating: 4 },
      { name: "Monitor 4K", price: 349.99, image: '/images/tech/9.jpg', description: '27-inch 4K monitor', category: 'Computer and tech', brand: 'Pocco', stock: 12, featured: false, features: ['Plastic'], condition: 'Refurbished', rating: 4 },
      { name: "External SSD", price: 119.99, image: '/images/tech/10.jpg', description: '1TB fast storage', category: 'Computer and tech', brand: 'Lenovo', stock: 45, featured: false, features: ['Metallic'], condition: 'New', rating: 5 }
    ];
    await Product.deleteMany({});
    await Product.insertMany(products);
    res.json({ message: 'Database seeded!', count: products.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Server error' });
});

process.on('unhandledRejection', (reason) => {
  console.error('[server] Unhandled rejection:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('[server] Uncaught exception:', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
