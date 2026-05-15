import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600 text-sm">
      <div className="container-x py-12">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-xl">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
              </div>
              <span className="text-2xl font-bold text-gray-800">Brand</span>
            </div>
            <p className="text-gray-500 mb-4">
              Best information about the company gies here but now lorem ipsum is
            </p>
            <div className="flex gap-3">
              {['facebook', 'twitter', 'linkedin', 'instagram', 'youtube'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-full bg-gray-200 hover:bg-blue-600 hover:text-white flex items-center justify-center text-gray-600 transition"
                  aria-label={s}
                >
                  <span className="text-xs font-bold">{s[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          <div>
            <h3 className="text-gray-800 font-bold mb-4">About</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-blue-600">About Us</Link></li>
              <li><Link to="/products" className="hover:text-blue-600">Find store</Link></li>
              <li><Link to="/products" className="hover:text-blue-600">Categories</Link></li>
              <li><Link to="/products" className="hover:text-blue-600">Blogs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-800 font-bold mb-4">Partnership</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-blue-600">About Us</Link></li>
              <li><Link to="/products" className="hover:text-blue-600">Find store</Link></li>
              <li><Link to="/products" className="hover:text-blue-600">Categories</Link></li>
              <li><Link to="/products" className="hover:text-blue-600">Blogs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-800 font-bold mb-4">Information</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="hover:text-blue-600">Help Center</Link></li>
              <li><Link to="/faq" className="hover:text-blue-600">Money Refund</Link></li>
              <li><Link to="/faq" className="hover:text-blue-600">Shipping</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600">Contact us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-800 font-bold mb-4">For users</h3>
            <ul className="space-y-2">
              <li><Link to="/login" className="hover:text-blue-600">Login</Link></li>
              <li><Link to="/signup" className="hover:text-blue-600">Register</Link></li>
              <li><Link to="/products" className="hover:text-blue-600">Settings</Link></li>
              <li><Link to="/orders" className="hover:text-blue-600">My Orders</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
          <p>&copy; 2023 Ecommerce.</p>
          <div className="flex items-center gap-4 mt-2 md:mt-0">
            <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
              <span className="w-5 h-3 bg-red-500 inline-block"></span> {/* Flag */}
              <span>English</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
