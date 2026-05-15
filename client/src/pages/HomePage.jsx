import { Link } from 'react-router-dom';
import { useProducts, useFeaturedProducts } from '../hooks/useProducts';

const HomePage = () => {
  const { products: clothProducts, loading: clothLoading } = useProducts({ category: 'Clothes and wear' });
  const { products: techProducts, loading: techLoading } = useProducts({ category: 'Computer and tech' });
  const { products: featuredProducts, loading: featuredLoading } = useFeaturedProducts();

  return (
    <div className="bg-gray-100 min-h-screen">
      
      {/* HERO SECTION */}
      <div className="container-x py-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-3 hidden lg:block">
            <ul className="space-y-1 text-gray-600 text-sm font-medium">
              <li><Link to={`/products?category=${encodeURIComponent('Automobiles')}`} className="bg-blue-50 text-blue-600 px-3 py-2 rounded-md block">Automobiles</Link></li>
              <li><Link to={`/products?category=${encodeURIComponent('Clothes and wear')}`} className="hover:bg-gray-50 px-3 py-2 rounded-md block">Clothes and wear</Link></li>
              <li><Link to={`/products?category=${encodeURIComponent('Home interiors')}`} className="hover:bg-gray-50 px-3 py-2 rounded-md block">Home interiors</Link></li>
              <li><Link to={`/products?category=${encodeURIComponent('Computer and tech')}`} className="hover:bg-gray-50 px-3 py-2 rounded-md block">Computer and tech</Link></li>
              <li><Link to={`/products?category=${encodeURIComponent('Tools, equipments')}`} className="hover:bg-gray-50 px-3 py-2 rounded-md block">Tools, equipments</Link></li>
              <li><Link to={`/products?category=${encodeURIComponent('Sports and outdoor')}`} className="hover:bg-gray-50 px-3 py-2 rounded-md block">Sports and outdoor</Link></li>
              <li><Link to={`/products?category=${encodeURIComponent('Animal and pets')}`} className="hover:bg-gray-50 px-3 py-2 rounded-md block">Animal and pets</Link></li>
              <li><Link to={`/products?category=${encodeURIComponent('Machinery')}`} className="hover:bg-gray-50 px-3 py-2 rounded-md block">Machinery</Link></li>
              <li><Link to="/products" className="hover:bg-gray-50 px-3 py-2 rounded-md block">More categories</Link></li>
            </ul>
          </div>

          {/* Center Banner */}
          <div className="lg:col-span-7 bg-orange-100 rounded-lg p-8 flex flex-col justify-between h-[300px] lg:h-auto" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div>
              <p className="text-gray-800 text-xl">Latest trending</p>
              <h1 className="text-gray-900 text-3xl font-bold mt-1">Electronic items</h1>
            </div>
            <div>
              <button className="bg-white text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-50 transition">Source now</button>
            </div>
          </div>

          {/* Right Sidebar - User / Promo */}
          <div className="lg:col-span-2 space-y-4 hidden lg:block">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold">U</div>
                <p className="text-gray-800 text-sm">Hi, user<br/>let's get started</p>
              </div>
              <Link to="/signup" className="w-full bg-blue-600 text-white text-sm py-1.5 rounded-md hover:bg-blue-700 transition mb-2 block text-center font-medium">Join now</Link>
              <Link to="/login" className="w-full bg-white text-blue-600 text-sm py-1.5 rounded-md border border-gray-200 hover:bg-gray-50 transition block text-center font-medium">Log in</Link>
            </div>
            <div className="bg-orange-500 rounded-lg p-4 text-white">
              <p className="text-sm">Get US $10 off with a new supplier</p>
            </div>
            <div className="bg-teal-500 rounded-lg p-4 text-white">
              <p className="text-sm">Send quotes with supplier preferences</p>
            </div>
          </div>
        </div>
      </div>

      {/* DEALS AND OFFERS */}
      <div className="container-x py-4">
        <div className="bg-white border border-gray-200 rounded-lg flex flex-col lg:flex-row overflow-hidden">
          
          {/* Countdown timer box */}
          <div className="p-6 lg:w-1/4 border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Deals and offers</h2>
              <p className="text-gray-500 text-sm">Hygiene equipments</p>
            </div>
            <div className="flex gap-2 mt-4 lg:mt-0">
              <div className="bg-gray-800 text-white w-12 h-12 rounded-md flex flex-col items-center justify-center">
                <span className="font-bold">04</span>
                <span className="text-xs">Days</span>
              </div>
              <div className="bg-gray-800 text-white w-12 h-12 rounded-md flex flex-col items-center justify-center">
                <span className="font-bold">13</span>
                <span className="text-xs">Hour</span>
              </div>
              <div className="bg-gray-800 text-white w-12 h-12 rounded-md flex flex-col items-center justify-center">
                <span className="font-bold">34</span>
                <span className="text-xs">Min</span>
              </div>
              <div className="bg-gray-800 text-white w-12 h-12 rounded-md flex flex-col items-center justify-center">
                <span className="font-bold">56</span>
                <span className="text-xs">Sec</span>
              </div>
            </div>
          </div>

          {/* Deal items */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-center text-sm">
            {featuredLoading ? (
              <div className="col-span-5 py-8 text-gray-500">Loading deals...</div>
            ) : (
              featuredProducts.slice(0, 5).map((product) => (
                <Link key={product._id} to={`/products/${product._id}`} className="p-4 border-r border-b border-gray-200 last:border-r-0 hover:bg-gray-50 transition flex flex-col items-center justify-center">
                  <div className="h-28 flex items-center justify-center mb-2">
                    <img src={product.image} alt={product.name} className="object-contain max-h-full" />
                  </div>
                  <p className="text-gray-800 font-medium truncate w-full">{product.name}</p>
                  <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-bold mt-1">-${Math.round(product.price * 0.2)}</span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* HOME AND OUTDOOR (Interior) */}
      <div className="container-x py-4">
        <div className="bg-white border border-gray-200 rounded-lg flex flex-col lg:flex-row overflow-hidden">
          
          {/* Left Feature Image */}
          <div className="lg:w-1/4 p-6 flex flex-col justify-between h-[200px] lg:h-auto" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <h2 className="text-xl font-bold text-gray-800">Home and outdoor</h2>
            <div>
              <button className="bg-white text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-50 transition text-sm">Source now</button>
            </div>
          </div>

          {/* Grid of items */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-sm">
            {clothLoading ? (
              <div className="col-span-4 py-8 text-gray-500 text-center">Loading items...</div>
            ) : (
              clothProducts.slice(0, 8).map((product) => (
                <Link key={product._id} to={`/products/${product._id}`} className="p-4 border-r border-b border-gray-200 hover:bg-gray-50 transition flex flex-col">
                  <p className="text-gray-800 font-medium">{product.name}</p>
                  <p className="text-gray-400 text-xs mt-1">From USD {product.price}</p>
                  <div className="h-24 flex items-center justify-end mt-2">
                    <img src={product.image} alt={product.name} className="object-contain max-h-full" />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* CONSUMER ELECTRONICS (Tech) */}
      <div className="container-x py-4">
        <div className="bg-white border border-gray-200 rounded-lg flex flex-col lg:flex-row overflow-hidden">
          
          {/* Left Feature Image */}
          <div className="lg:w-1/4 p-6 flex flex-col justify-between h-[200px] lg:h-auto" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <h2 className="text-xl font-bold text-gray-800">Consumer electronics</h2>
            <div>
              <button className="bg-white text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-gray-50 transition text-sm">Source now</button>
            </div>
          </div>

          {/* Grid of items */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-sm">
            {techLoading ? (
              <div className="col-span-4 py-8 text-gray-500 text-center">Loading items...</div>
            ) : (
              techProducts.slice(0, 8).map((product) => (
                <Link key={product._id} to={`/products/${product._id}`} className="p-4 border-r border-b border-gray-200 hover:bg-gray-50 transition flex flex-col">
                  <p className="text-gray-800 font-medium">{product.name}</p>
                  <p className="text-gray-400 text-xs mt-1">From USD {product.price}</p>
                  <div className="h-24 flex items-center justify-end mt-2">
                    <img src={product.image} alt={product.name} className="object-contain max-h-full" />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* RECOMMENDED ITEMS */}
      <div className="container-x py-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recommended items</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {featuredLoading ? (
            <div className="col-span-5 py-8 text-gray-500 text-center">Loading recommendations...</div>
          ) : (
            featuredProducts.map((product) => (
              <Link key={product._id} to={`/products/${product._id}`} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition flex flex-col">
                <div className="h-40 flex items-center justify-center">
                  <img src={product.image} alt={product.name} className="object-contain max-h-full" />
                </div>
                <p className="text-gray-800 font-bold mt-2">${product.price}</p>
                <p className="text-gray-500 text-sm mt-1 flex-1">{product.name}</p>
              </Link>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default HomePage;
