import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, updateQty, clearCart, cartTotal, cartCount } = useCart();

  return (
    <div className="bg-gray-100 min-h-screen pb-12">
      <div className="container-x py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My cart ({cartCount})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Cart Items */}
          <div className="lg:col-span-9 space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              
              {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Your cart is empty. <Link to="/products" className="text-blue-600 hover:underline">Go shopping</Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item._id} className="flex flex-col md:flex-row items-center gap-4 py-4 border-b border-gray-100 last:border-b-0">
                    <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="object-contain max-h-full" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium">{item.name}</p>
                      <p className="text-gray-500 text-sm mt-1">Category: {item.category}</p>
                      <p className="text-gray-500 text-sm">Seller: Verified Vendor</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <button 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeFromCart(item._id)}
                        >
                          Remove
                        </button>
                        <button className="text-blue-600 hover:text-blue-800">Save for later</button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-gray-800">${item.price}</p>
                      </div>
                      <select 
                        className="border border-gray-300 rounded-md px-2 py-1 outline-none text-gray-700"
                        value={item.qty}
                        onChange={(e) => updateQty(item._id, parseInt(e.target.value))}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((q) => (
                          <option key={q} value={q}>Qty: {q}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))
              )}

            </div>

            <div className="flex justify-between mt-4">
              <Link to="/products" className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to shop
              </Link>
              {cart.length > 0 && (
                <button 
                  className="text-blue-600 border border-gray-200 bg-white px-6 py-2 rounded-md font-medium hover:bg-gray-50 transition"
                  onClick={clearCart}
                >
                  Remove all
                </button>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.11v4.71c0 4.43-3.05 8.53-7 9.71-3.95-1.18-7-5.28-7-9.71V6.29l7-3.11zm0 2.82c-1.66 0-3 1.34-3 3 0 1.31.83 2.42 2 2.83V16h2v-2.17c1.17-.41 2-1.52 2-2.83 0-1.66-1.34-3-3-3z"/></svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">Secure payment</p>
                  <p className="text-gray-500 text-xs">Have you ever finally just</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">Customer support</p>
                  <p className="text-gray-500 text-xs">Have you ever finally just</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">Free delivery</p>
                  <p className="text-gray-500 text-xs">Have you ever finally just</p>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar - Summary */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-gray-600 text-sm mb-2">Have a coupon?</p>
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <input type="text" placeholder="Add coupon" className="flex-1 px-3 py-2 outline-none text-sm" />
                <button className="bg-white text-blue-600 px-4 py-2 border-l border-gray-300 font-medium hover:bg-gray-50 transition text-sm">Apply</button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm text-gray-600 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium text-gray-800">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount:</span>
                <span className="text-red-500">- $0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span className="text-green-500">+ $0.00</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-800 text-lg">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button 
                className="w-full bg-green-600 text-white py-3 rounded-md font-bold text-base hover:bg-green-700 transition mt-4 disabled:bg-gray-400"
                disabled={cart.length === 0}
                onClick={() => alert('Proceeding to checkout...')}
              >
                Checkout
              </button>
              <div className="flex justify-center gap-2 mt-4">
                <span className="w-10 h-6 bg-gray-200 rounded-sm"></span>
                <span className="w-10 h-6 bg-gray-200 rounded-sm"></span>
                <span className="w-10 h-6 bg-gray-200 rounded-sm"></span>
                <span className="w-10 h-6 bg-gray-200 rounded-sm"></span>
              </div>
            </div>
          </div>
        </div>

        {/* SAVED FOR LATER */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Saved for later</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { price: '$99.50', desc: 'GoPro HERO6 4K Action Camera - Black', img: 'https://images.unsplash.com/photo-1526170315876-4908913806a4?w=200' },
              { price: '$99.50', desc: 'GoPro HERO6 4K Action Camera - Black', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200' },
              { price: '$99.50', desc: 'GoPro HERO6 4K Action Camera - Black', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200' },
              { price: '$99.50', desc: 'GoPro HERO6 4K Action Camera - Black', img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200' },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col">
                <div className="h-40 flex items-center justify-center">
                  <img src={item.img} alt={item.desc} className="object-contain max-h-full" />
                </div>
                <p className="text-gray-800 font-bold mt-2">{item.price}</p>
                <p className="text-gray-500 text-sm mt-1 flex-1">{item.desc}</p>
                <button className="mt-4 border border-blue-600 text-blue-600 py-2 rounded-md font-medium hover:bg-blue-50 transition flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  Move to cart
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartPage;
