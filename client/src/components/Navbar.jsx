import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [helpOpen, setHelpOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  const handleSearch = () => {
    let url = '/products';
    const params = [];
    if (search.trim()) params.push(`search=${encodeURIComponent(search.trim())}`);
    if (selectedCategory) params.push(`category=${encodeURIComponent(selectedCategory)}`);
    
    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }
    navigate(url);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      {/* Top Header */}
      <div className="container-x py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-xl">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
          </div>
          <span className="text-2xl font-bold text-gray-800">Brand</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl w-full flex border-2 border-blue-600 rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 px-4 py-2 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <select 
            className="px-4 py-2 border-l border-gray-200 bg-gray-50 outline-none text-gray-600 hidden md:block cursor-pointer"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All category</option>
            <option value="Clothes and wear">Clothes and wear</option>
            <option value="Home interiors">Home interiors</option>
            <option value="Computer and tech">Computer and tech</option>
            <option value="Tools, equipments">Tools, equipments</option>
            <option value="Sports and outdoor">Sports and outdoor</option>
            <option value="Machinery">Machinery</option>
          </select>
          <button 
            className="bg-blue-600 text-white px-6 py-2 hover:bg-blue-700 transition"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-6 text-gray-600 text-sm">
          {user ? (
            <div className="flex flex-col items-center cursor-pointer hover:text-blue-600" onClick={handleLogout}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h6a2 2 0 002-2v-1" />
              </svg>
              <span>Logout</span>
            </div>
          ) : (
            <Link to="/login" className="flex flex-col items-center cursor-pointer hover:text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Login</span>
            </Link>
          )}
          {user && user.isAdmin && (
            <Link to="/admin" className="flex flex-col items-center cursor-pointer hover:text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Admin</span>
            </Link>
          )}
          <Link to="/messages" className="flex flex-col items-center cursor-pointer hover:text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Message</span>
          </Link>
          <Link to="/favorites" className="flex flex-col items-center cursor-pointer hover:text-blue-600 relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>Favorites</span>
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="flex flex-col items-center cursor-pointer hover:text-blue-600 relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>My cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Sub Navbar */}
      <div className="border-t border-gray-200">
        <div className="container-x py-3 flex items-center justify-between text-sm text-gray-700 font-medium">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>All category</span>
            </Link>
            <NavLink to="/products" className="hover:text-blue-600">Hot offers</NavLink>
            <NavLink to="/products?search=box" className="hover:text-blue-600">Gift boxes</NavLink>
            <NavLink to="/products?category=Home interiors" className="hover:text-blue-600">Projects</NavLink>
            <NavLink to="/products" className="hover:text-blue-600">Menu item</NavLink>
            <div className="relative">
              <div 
                className="flex items-center gap-1 cursor-pointer hover:text-blue-600"
                onClick={() => setHelpOpen(!helpOpen)}
              >
                <span>Help</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {helpOpen && (
                <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <Link to="/help" className="block px-4 py-2 hover:bg-gray-100 text-sm">Help Center</Link>
                  <Link to="/contact" className="block px-4 py-2 hover:bg-gray-100 text-sm">Contact Us</Link>
                  <Link to="/faq" className="block px-4 py-2 hover:bg-gray-100 text-sm">FAQ</Link>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
              <span>English, USD</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
              <span>Ship to</span>
              <span className="w-5 h-4 bg-red-500 inline-block"></span> {/* Placeholder flag */}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
