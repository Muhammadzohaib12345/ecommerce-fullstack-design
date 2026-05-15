import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-card hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
      <div
        className="aspect-square overflow-hidden bg-gray-50 cursor-pointer relative"
        onClick={() => navigate(`/products/${product._id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/600x600?text=No+Image';
          }}
        />
        {product.featured && (
          <span className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-accent-500 font-semibold uppercase tracking-widest">
          {product.category}
        </p>
        <h3
          className="font-semibold text-navy-800 mt-2 line-clamp-1 cursor-pointer hover:text-accent-500 transition"
          onClick={() => navigate(`/products/${product._id}`)}
        >
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold text-navy-800">${product.price.toFixed(2)}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="bg-navy-800 text-white text-sm px-4 py-2 rounded-md hover:bg-accent-500 transition font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
