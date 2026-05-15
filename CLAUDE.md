# CLAUDE.md — eCommerce Fullstack Project Guide

## Project Overview

Build a fully functional eCommerce web application called **ecommerce-fullstack-design**.

- **Figma Design Reference:** https://figma.com/design/8Igr4IzlG1bE1ko7gOyNQP/Ecommerce-Web-Design--Community-?node-id=0-1&p=f&t=gjLKFfhhmPDJ0YCj-0
- **Deadline:** 5th June, 2026
- **GitHub Repo Name:** `ecommerce-fullstack-design`

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React.js + Vite + TailwindCSS       |
| Backend    | Node.js + Express.js                |
| Database   | MongoDB + Mongoose                  |
| Auth       | JWT (JSON Web Tokens)               |
| State Mgmt | React Context API + localStorage    |
| Deployment | Vercel (frontend) + Render (backend)|

---

## Folder Structure to Create

```
ecommerce-fullstack-design/
├── client/                    # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── CartItem.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductListingPage.jsx
│   │   │   ├── ProductDetailsPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   └── admin/
│   │   │       └── AdminPanel.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── hooks/
│   │   │   └── useProducts.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                    # Express backend
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── productController.js
│   │   ├── authController.js
│   │   └── cartController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   ├── models/
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── authRoutes.js
│   │   └── cartRoutes.js
│   ├── seed/
│   │   └── seedProducts.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Step-by-Step Build Instructions

### PHASE 1 — Project Setup

#### 1. Initialize the Repo

```bash
mkdir ecommerce-fullstack-design
cd ecommerce-fullstack-design
git init
```

#### 2. Setup Frontend (React + Vite + Tailwind)

```bash
npm create vite@latest client -- --template react
cd client
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install react-router-dom axios
```

In `tailwind.config.js`:
```js
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
```

In `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### 3. Setup Backend (Node + Express)

```bash
mkdir server && cd server
npm init -y
npm install express mongoose dotenv cors bcryptjs jsonwebtoken
npm install -D nodemon
```

In `server/package.json` scripts:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

---

### PHASE 2 — Backend Development

#### 4. MongoDB Connection (`server/config/db.js`)

```js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

#### 5. Environment Variables (`server/.env`)

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ecommerce
JWT_SECRET=your_super_secret_key_here
PORT=5000
```

#### 6. Product Model (`server/models/Product.js`)

```js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  price:       { type: Number, required: true },
  image:       { type: String, required: true },
  description: { type: String, required: true },
  category:    { type: String, required: true },
  stock:       { type: Number, default: 0 },
  featured:    { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
```

#### 7. User Model (`server/models/User.js`)

```js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin:  { type: Boolean, default: false },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

#### 8. Auth Middleware (`server/middleware/authMiddleware.js`)

```js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch {
    res.status(401).json({ message: 'Token failed' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user?.isAdmin) return next();
  res.status(403).json({ message: 'Admin access only' });
};

module.exports = { protect, adminOnly };
```

#### 9. Product Routes (`server/routes/productRoutes.js`)

```js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// GET all products (with optional search/category filter)
router.get('/', async (req, res) => {
  const { search, category } = req.query;
  let query = {};
  if (search) query.name = { $regex: search, $options: 'i' };
  if (category) query.category = category;
  const products = await Product.find(query);
  res.json(products);
});

// GET featured products
router.get('/featured', async (req, res) => {
  const products = await Product.find({ featured: true }).limit(8);
  res.json(products);
});

// GET single product
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
});

// POST create product (admin)
router.post('/', protect, adminOnly, async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// PUT update product (admin)
router.put('/:id', protect, adminOnly, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
});

// DELETE product (admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
});

module.exports = router;
```

#### 10. Auth Routes (`server/routes/authRoutes.js`)

```js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'User already exists' });
  const user = await User.create({ name, email, password });
  res.status(201).json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, token: generateToken(user._id) });
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, token: generateToken(user._id) });
});

module.exports = router;
```

#### 11. Main Server (`server/server.js`)

```js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

#### 12. Seed Database (`server/seed/seedProducts.js`)

```js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config({ path: '../.env' });
mongoose.connect(process.env.MONGO_URI);

const products = [
  { name: "Men's Casual T-Shirt", price: 29.99, image: "https://via.placeholder.com/300x400", description: "Comfortable cotton t-shirt for everyday wear.", category: "Men", stock: 50, featured: true },
  { name: "Women's Summer Dress", price: 49.99, image: "https://via.placeholder.com/300x400", description: "Light and flowy dress perfect for summer.", category: "Women", stock: 30, featured: true },
  { name: "Running Sneakers", price: 89.99, image: "https://via.placeholder.com/300x400", description: "High-performance running shoes.", category: "Footwear", stock: 20, featured: true },
  { name: "Leather Wallet", price: 24.99, image: "https://via.placeholder.com/300x400", description: "Slim leather wallet with multiple card slots.", category: "Accessories", stock: 100, featured: false },
  { name: "Denim Jacket", price: 74.99, image: "https://via.placeholder.com/300x400", description: "Classic denim jacket for all seasons.", category: "Men", stock: 15, featured: true },
  { name: "Sunglasses", price: 34.99, image: "https://via.placeholder.com/300x400", description: "UV400 protection sunglasses.", category: "Accessories", stock: 60, featured: false },
  { name: "Women's Sneakers", price: 64.99, image: "https://via.placeholder.com/300x400", description: "Stylish and comfortable everyday sneakers.", category: "Women", stock: 25, featured: true },
  { name: "Backpack", price: 54.99, image: "https://via.placeholder.com/300x400", description: "Spacious backpack with laptop compartment.", category: "Accessories", stock: 40, featured: false },
];

const seed = async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Database seeded!');
  process.exit();
};

seed();
```

Run with: `node server/seed/seedProducts.js`

---

### PHASE 3 — Frontend Development

#### 13. API Utility (`client/src/utils/api.js`)

```js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
  return config;
});

export default api;
```

#### 14. Auth Context (`client/src/context/AuthContext.jsx`)

```jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

#### 15. Cart Context (`client/src/context/CartContext.jsx`)

```jsx
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item._id === product._id);
      if (exists) return prev.map(item => item._id === product._id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item._id !== id));

  const updateQty = (id, qty) => {
    if (qty <= 0) return removeFromCart(id);
    setCart(prev => prev.map(item => item._id === id ? { ...item, qty } : item));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
```

#### 16. App.jsx with Routes

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminPanel from './pages/admin/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <AdminPanel />
              </ProtectedRoute>
            } />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
```

#### 17. Pages to Build

**HomePage.jsx**
- Hero banner section (from Figma design)
- Featured products grid (fetch from `/api/products/featured`)
- Category section
- Newsletter section

**ProductListingPage.jsx**
- SearchBar component at top
- Filter by category buttons
- Grid of ProductCard components
- Fetch from `/api/products?search=&category=`

**ProductDetailsPage.jsx**
- Fetch single product by ID from `/api/products/:id`
- Product image, name, price, description
- Quantity selector
- "Add to Cart" button using `useCart()`

**CartPage.jsx**
- List all cart items using `useCart()`
- Quantity update and remove buttons
- Order summary with total price
- Checkout button (can show "Coming Soon" for now)

**LoginPage.jsx / SignupPage.jsx**
- Form with email and password
- POST to `/api/auth/login` or `/api/auth/signup`
- On success, call `login(userData)` from AuthContext

**AdminPanel.jsx** (Protected)
- Table of all products
- Add new product form
- Edit/Delete buttons for each product

#### 18. ProductCard Component

```jsx
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-200 overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-56 object-cover cursor-pointer"
        onClick={() => navigate(`/products/${product._id}`)}
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-500 text-sm">{product.category}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-indigo-600">${product.price}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-indigo-600 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
```

#### 19. ProtectedRoute Component

```jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !user.isAdmin) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;
```

---

### PHASE 4 — Design Guidelines (from Figma)

When building pages, follow these design principles from the Figma template:

- **Primary Color:** Indigo/Dark Blue (`#1D4ED8` or similar)
- **Font:** Clean sans-serif (Inter or Poppins from Google Fonts)
- **Navbar:** Logo left, nav links center, cart icon + user avatar right
- **Hero:** Full-width banner with CTA button
- **Product Grid:** 4 columns desktop, 2 columns tablet, 1 column mobile
- **Cards:** Rounded corners, subtle shadow, hover effect
- **Footer:** Dark background with links and newsletter

Add to `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

### PHASE 5 — Responsive Design Rules

Use TailwindCSS breakpoints:
- `sm:` → 640px (mobile landscape)
- `md:` → 768px (tablet)
- `lg:` → 1024px (desktop)
- `xl:` → 1280px (large desktop)

Example product grid:
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```

Navbar: Show hamburger menu on mobile, full nav on desktop:
```jsx
<div className="hidden md:flex gap-6">...</div>
<button className="md:hidden">☰</button>
```

---

### PHASE 6 — Deployment

#### Frontend (Vercel)

```bash
cd client
npm run build
# Push to GitHub, then connect repo to vercel.com
```

Add environment variable in Vercel dashboard:
```
VITE_API_URL=https://your-backend.onrender.com/api
```

#### Backend (Render)

1. Push `server/` folder to GitHub
2. Create new Web Service on render.com
3. Set environment variables:
   - `MONGO_URI` — your MongoDB Atlas connection string
   - `JWT_SECRET` — your secret key
   - `PORT` — 5000

---

## API Endpoints Reference

| Method | Endpoint                  | Auth Required | Description              |
|--------|---------------------------|---------------|--------------------------|
| GET    | /api/products             | No            | Get all products         |
| GET    | /api/products/featured    | No            | Get featured products    |
| GET    | /api/products/:id         | No            | Get single product       |
| POST   | /api/products             | Admin         | Create product           |
| PUT    | /api/products/:id         | Admin         | Update product           |
| DELETE | /api/products/:id         | Admin         | Delete product           |
| POST   | /api/auth/signup          | No            | Register user            |
| POST   | /api/auth/login           | No            | Login user               |

---

## .gitignore

```
node_modules/
.env
dist/
.DS_Store
```

---

## Git Workflow (Weekly Commits)

```bash
# Week 1
git add .
git commit -m "Week 1: Static frontend - Home, Products, Cart, Details pages"
git push origin main

# Week 2
git add .
git commit -m "Week 2: Backend API + Dynamic frontend integration"
git push origin main

# Week 3
git add .
git commit -m "Week 3: Auth, Admin Panel, Cart persistence, Deployment"
git push origin main
```

---

## Common Commands

```bash
# Run backend
cd server && npm run dev

# Run frontend
cd client && npm run dev

# Seed database
cd server && node seed/seedProducts.js

# Build frontend for production
cd client && npm run build
```

---

## Important Notes for Claude Code

1. **Always use `_id`** (not `id`) for MongoDB document references in frontend API calls.
2. **CORS** must be enabled on the backend — `app.use(cors())` is already included.
3. **Images:** Use real product images from `unsplash.com` or `pexels.com` for the seed data.
4. **Tailwind classes only** — do not write custom CSS unless absolutely necessary.
5. **Error handling:** Wrap all API calls in try/catch and show user-friendly error messages.
6. **Loading states:** Show a spinner or skeleton loader while fetching data.
7. **The Figma design** is the source of truth for all UI — match it as closely as possible.
8. **Mobile-first:** Always write mobile styles first, then add `md:` and `lg:` overrides.
9. **Admin user:** After signup, manually set `isAdmin: true` in MongoDB Atlas for the admin account.
10. **JWT token** expires in 7 days — handle expired token errors gracefully by logging the user out.
