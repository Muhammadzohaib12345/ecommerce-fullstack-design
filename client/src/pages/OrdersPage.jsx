import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const orders = [
    {
      id: '#ORD-12345',
      date: 'May 10, 2026',
      status: 'Delivered',
      total: '$159.98',
      items: ['Men\'s T-Shirt x 2', 'Casual Jacket x 1'],
    },
    {
      id: '#ORD-67890',
      date: 'May 12, 2026',
      status: 'Processing',
      total: '$49.99',
      items: ['Women\'s Dress x 1'],
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="container-x py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h1>
        
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-gray-100 pb-4 mb-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Order ID</p>
                  <p className="font-bold text-gray-800">{order.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Date Placed</p>
                  <p className="text-sm font-medium text-gray-800">{order.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Amount</p>
                  <p className="text-sm font-bold text-blue-600">{order.total}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-500 mb-2">Items</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-right mt-4">
                <button className="text-blue-600 text-sm font-medium hover:underline">View Details</button>
              </div>
            </div>
          ))}
        </div>

        {/* Wishlist Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Wishlist (Saved Items)</h2>
          {wishlist.length === 0 ? (
            <p className="text-gray-500 text-center py-8 bg-white border border-gray-200 rounded-lg">Your wishlist is empty.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlist.map((product) => (
                <div key={product._id} className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col relative hover:shadow-md transition">
                  <button 
                    className="absolute top-4 right-4 text-red-500 border border-gray-200 rounded-md p-1.5 hover:bg-gray-50"
                    onClick={() => removeFromWishlist(product._id)}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  </button>
                  <div className="h-40 flex items-center justify-center">
                    <img src={product.image} alt={product.name} className="object-contain max-h-full" />
                  </div>
                  <div className="mt-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800 text-sm truncate">{product.name}</h3>
                      <p className="text-blue-600 font-bold mt-1">${product.price}</p>
                    </div>
                    <Link to={`/products/${product._id}`} className="text-blue-600 text-sm font-medium mt-4 hover:underline">View Product</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
