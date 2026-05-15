import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQty, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
        onError={(e) => {
          e.currentTarget.src = 'https://via.placeholder.com/80?text=No+Image';
        }}
      />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.category}</p>
        <p className="text-indigo-600 font-bold mt-1">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQty(item._id, item.qty - 1)}
          className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-8 text-center font-medium">{item.qty}</span>
        <button
          onClick={() => updateQty(item._id, item.qty + 1)}
          className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <button
        onClick={() => removeFromCart(item._id)}
        className="text-red-500 hover:text-red-700 p-2"
        aria-label="Remove item"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"
          />
        </svg>
      </button>
    </div>
  );
};

export default CartItem;
