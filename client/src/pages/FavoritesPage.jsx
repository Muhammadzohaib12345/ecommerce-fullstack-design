import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="container-x py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Favourite Products</h1>
        
        {wishlist.length === 0 ? (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
            <p className="text-gray-500 mb-4">Your favorites list is empty.</p>
            <Link to="/products" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((product) => (
              <div key={product._id} className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col relative hover:shadow-md transition">
                <button 
                  className="absolute top-4 right-4 text-red-500 border border-gray-200 rounded-md p-1.5 hover:bg-gray-50"
                  onClick={() => removeFromWishlist(product._id)}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </button>
                <div className="h-48 flex items-center justify-center">
                  <img src={product.image} alt={product.name} className="object-contain max-h-full" />
                </div>
                <div className="mt-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800 text-sm truncate">{product.name}</h3>
                    <p className="text-blue-600 font-bold mt-1">${product.price}</p>
                  </div>
                  <Link to={`/products/${product._id}`} className="text-blue-600 text-sm font-medium mt-4 hover:underline text-center border border-blue-600 rounded-md py-2 hover:bg-blue-50 transition">
                    View Product
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
