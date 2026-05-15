import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import Spinner from '../components/Spinner';
import { useCart } from '../context/CartContext';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('Description');

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  return (
    <div className="bg-gray-100 min-h-screen pb-12">
      <div className="container-x py-4">
        
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>&gt;</span>
          <Link to="/products" className="hover:text-blue-600">Clothings</Link>
          <span>&gt;</span>
          <Link to="/products" className="hover:text-blue-600">Men's wear</Link>
          <span>&gt;</span>
          <span className="text-gray-800">{product.name}</span>
        </nav>

        {/* Product Main Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left - Images */}
          <div className="lg:col-span-4 space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-center h-80">
              <img src={product.image} alt={product.name} className="object-contain max-h-full" />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="border border-gray-200 rounded-md p-1 cursor-pointer hover:border-blue-500 h-16 flex items-center justify-center">
                  <img src={product.image} alt="Thumb" className="object-contain max-h-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Center - Info */}
          <div className="lg:col-span-5 space-y-4">
            <p className="text-green-600 text-sm font-medium flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
              In stock ({product.stock})
            </p>
            <h1 className="text-xl font-bold text-gray-800">{product.name}</h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center text-orange-400">
                <span>★★★★☆</span>
                <span className="text-orange-500 ml-1">4.5</span>
              </div>
              <span>•</span>
              <span>32 reviews</span>
              <span>•</span>
              <span>154 sold</span>
            </div>

            {/* Price Tiers */}
            <div className="bg-orange-50 p-4 rounded-md grid grid-cols-3 text-center border border-orange-100">
              <div>
                <p className="text-red-500 font-bold text-lg">${product.price}</p>
                <p className="text-gray-500 text-xs">1-10 pcs</p>
              </div>
              <div className="border-l border-orange-200">
                <p className="text-gray-800 font-bold text-lg">${(product.price * 0.9).toFixed(2)}</p>
                <p className="text-gray-500 text-xs">10-50 pcs</p>
              </div>
              <div className="border-l border-orange-200">
                <p className="text-gray-800 font-bold text-lg">${(product.price * 0.8).toFixed(2)}</p>
                <p className="text-gray-500 text-xs">50+ pcs</p>
              </div>
            </div>

            {/* Details Table */}
            <div className="text-sm text-gray-600 space-y-2 pt-2">
              <div className="grid grid-cols-3">
                <span className="text-gray-500">Category:</span>
                <span className="col-span-2 text-gray-800">{product.category}</span>
              </div>
              <div className="grid grid-cols-3 border-t border-gray-100 pt-2">
                <span className="text-gray-500">Description:</span>
                <span className="col-span-2 text-gray-800">{product.description}</span>
              </div>
            </div>
          </div>

          {/* Right - Supplier Info */}
          <div className="lg:col-span-3 space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center text-blue-600 font-bold">S</div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">Supplier</p>
                  <p className="text-gray-500 text-xs">Verified Vendor</p>
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-4 space-y-2 border-t border-gray-100 pt-2">
                <p className="flex items-center gap-2">
                  <span className="w-5 h-3 bg-gray-300 inline-block"></span>
                  Germany, Berlin
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 4.925-3.04 9.133-7.31 11.055a1 1 0 01-.738 0C5.6 16.133 2.56 11.925 2.56 7c0-.68.056-1.35.166-2.001zm8.384 10.66a9.96 9.96 0 005.15-7.3c-.022-.534-.055-1.066-.1-1.593l-.15.01a10.233 10.233 0 01-4.9 3.44l-.1.02.1.423zm-1.1 0a9.96 9.96 0 01-5.15-7.3c.022-.534.055-1.066.1-1.593l.15.01a10.233 10.233 0 004.9 3.44l.1.02-.1.423z" clipRule="evenodd"></path></svg>
                  Verified Seller
                </p>
              </div>
              <div className="mt-4 space-y-2">
                <button 
                  className={`w-full py-2 rounded-md font-medium transition ${added ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  onClick={handleAddToCart}
                >
                  {added ? '✓ Added to Cart' : 'Add to Cart'}
                </button>
                <button className="w-full bg-white text-blue-600 border border-gray-200 py-2 rounded-md font-medium hover:bg-gray-50 transition">Seller's profile</button>
              </div>
            </div>
            <button className="w-full border border-gray-200 bg-white text-gray-700 py-2 rounded-md font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              Save for later
            </button>
          </div>
        </div>

        {/* Tabs and Content Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left - Tabs and Content */}
          <div className="lg:col-span-9 bg-white border border-gray-200 rounded-lg p-6">
            {/* Tabs Header */}
            <div className="flex border-b border-gray-200 text-sm text-gray-500 font-medium">
              {['Description', 'Reviews', 'Shipping', 'About Seller'].map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-3 border-b-2 transition ${activeTab === tab ? 'border-blue-600 text-blue-600 font-bold' : 'border-transparent hover:text-blue-600'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {/* Tab Content */}
            <div className="mt-6">
              {activeTab === 'Description' && (
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Product Details</h2>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  
                  {/* Details Table */}
                  <div className="border border-gray-200 rounded-md overflow-hidden text-sm max-w-xl">
                    <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 p-3">
                      <span className="text-gray-500">Model</span>
                      <span className="col-span-2 text-gray-800">#ALB-87868</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-gray-200 p-3">
                      <span className="text-gray-500">Style</span>
                      <span className="col-span-2 text-gray-800">New</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-gray-200 p-3">
                      <span className="text-gray-500">Certificate</span>
                      <span className="col-span-2 text-gray-800">ISO-9001:2015</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-gray-200 p-3">
                      <span className="text-gray-500">Size</span>
                      <span className="col-span-2 text-gray-800">Standard Export</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-gray-200 p-3">
                      <span className="text-gray-500">Material</span>
                      <span className="col-span-2 text-gray-800">Premium Grade</span>
                    </div>
                    <div className="grid grid-cols-3 p-3">
                      <span className="text-gray-500">Origin</span>
                      <span className="col-span-2 text-gray-800">Germany</span>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'Reviews' && <div className="text-gray-500">No reviews yet.</div>}
              {activeTab === 'Shipping' && <div className="text-gray-500">Free shipping to Berlin. Delivery within 3-5 days.</div>}
              {activeTab === 'About Seller' && <div className="text-gray-500">Verified seller from Germany. Top rated.</div>}
            </div>
          </div>
          
          {/* Right - Recommended Items */}
          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-lg p-6 h-fit">
            <h2 className="text-sm font-bold text-gray-800 mb-4">RECOMMENDED ITEMS</h2>
            <div className="space-y-4">
              {[
                { name: 'hy', price: 23.00, img: product.image },
                { name: 'HD Mirrorless Camera', price: 850.00, img: product.image },
                { name: 'Noise Cancelling Headphones', price: 299.00, img: product.image },
                { name: 'Mechanical Keyboard', price: 150.00, img: product.image },
                { name: 'Smart Watch Gen 5', price: 199.99, img: product.image },
              ].map((item, index) => (
                <div key={index} className="flex gap-3 text-sm items-center">
                  <div className="w-16 h-16 border border-gray-200 rounded-md p-1 flex items-center justify-center flex-shrink-0">
                    <img src={item.img} alt={item.name} className="object-contain max-h-full" />
                  </div>
                  <div>
                    <p className="text-gray-800 hover:text-blue-600 cursor-pointer line-clamp-2">{item.name}</p>
                    <p className="text-gray-500 mt-1 font-bold">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
