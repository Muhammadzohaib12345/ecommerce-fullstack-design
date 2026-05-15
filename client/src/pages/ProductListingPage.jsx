import { Link, useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useState, useEffect } from 'react';
import { useWishlist } from '../context/WishlistContext';

const ProductListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [brand, setBrand] = useState(searchParams.get('brand') || '');
  const [page, setPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [sort, setSort] = useState(searchParams.get('sort') || '');
  const [viewMode, setViewMode] = useState('grid');
  
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);
  
  const [features, setFeatures] = useState(searchParams.get('features') || '');
  const [condition, setCondition] = useState(searchParams.get('condition') || '');
  const [rating, setRating] = useState(searchParams.get('rating') || '');
  
  const [openFilters, setOpenFilters] = useState({});

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setPage(parseInt(searchParams.get('page')) || 1);
    setSort(searchParams.get('sort') || '');
    setCategory(searchParams.get('category') || '');
    setBrand(searchParams.get('brand') || '');
    const min = searchParams.get('minPrice') || '';
    const max = searchParams.get('maxPrice') || '';
    setMinPrice(min);
    setMaxPrice(max);
    setLocalMin(min);
    setLocalMax(max);
    setFeatures(searchParams.get('features') || '');
    setCondition(searchParams.get('condition') || '');
    setRating(searchParams.get('rating') || '');
  }, [searchParams]);

  const { products, loading, error, totalPages } = useProducts({ search, category, brand, minPrice, maxPrice, features, condition, rating, page, sort });

  const toggleFilter = (filter) => {
    setOpenFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage);
    setSearchParams(newParams);
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (newSort) newParams.set('sort', newSort);
    else newParams.delete('sort');
    setSearchParams(newParams);
  };


  return (
    <div className="bg-gray-100 min-h-screen pb-12">
      <div className="container-x py-4">
        
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>&gt;</span>
          <Link to="/products" className="hover:text-blue-600">Products</Link>
          {category && (
            <>
              <span>&gt;</span>
              <span className="text-gray-800">{category}</span>
            </>
          )}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-3 space-y-4 hidden lg:block">
            
            {/* Category */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3 flex justify-between items-center">
                Category
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="hover:text-blue-600 cursor-pointer" onClick={() => setSearchParams({ category: 'Clothes and wear' })}>Clothes and wear</li>
                <li className="hover:text-blue-600 cursor-pointer" onClick={() => setSearchParams({ category: 'Home interiors' })}>Home interiors</li>
                <li className="hover:text-blue-600 cursor-pointer" onClick={() => setSearchParams({ category: 'Computer and tech' })}>Computer and tech</li>
                <li className="text-blue-600 cursor-pointer" onClick={() => setSearchParams({})}>See all</li>
              </ul>
            </div>

            {/* Brands */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3 flex justify-between items-center cursor-pointer" onClick={() => toggleFilter('brands')}>
                Brands
                <svg className={`w-4 h-4 transform transition-transform ${openFilters['brands'] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </h3>
              {!openFilters['brands'] && (
                <ul className="text-sm text-gray-600 space-y-2">
                  {['Samsung', 'Apple', 'Huawei', 'Pocco', 'Lenovo'].map((b) => (
                    <li 
                      key={b} 
                      className={`flex items-center gap-2 cursor-pointer hover:text-blue-600 ${brand === b ? 'text-blue-600 font-bold' : ''}`}
                      onClick={() => {
                        const newParams = Object.fromEntries(searchParams);
                        if (brand === b) {
                          delete newParams.brand;
                        } else {
                          newParams.brand = b;
                        }
                        setSearchParams(newParams);
                      }}
                    >
                      <input type="checkbox" checked={brand === b} readOnly className="rounded text-blue-600" /> {b}
                    </li>
                  ))}
                  <li className="text-blue-600 cursor-pointer" onClick={() => {
                    const newParams = Object.fromEntries(searchParams);
                    delete newParams.brand;
                    setSearchParams(newParams);
                  }}>See all</li>
                </ul>
              )}
            </div>

            {/* Features */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-800 flex justify-between items-center text-sm cursor-pointer" onClick={() => toggleFilter('Features')}>
                Features
                <svg className={`w-4 h-4 transform transition-transform ${openFilters['Features'] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </h3>
              {openFilters['Features'] && (
                <div className="text-sm text-gray-600 mt-2 space-y-2">
                  {['Metallic', 'Plastic', 'Leather'].map((f) => (
                    <p 
                      key={f} 
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => {
                        const newParams = Object.fromEntries(searchParams);
                        let currentFeatures = features ? features.split(',') : [];
                        if (currentFeatures.includes(f)) {
                          currentFeatures = currentFeatures.filter((feat) => feat !== f);
                        } else {
                          currentFeatures.push(f);
                        }
                        if (currentFeatures.length > 0) newParams.features = currentFeatures.join(',');
                        else delete newParams.features;
                        setSearchParams(newParams);
                      }}
                    >
                      <input type="checkbox" checked={features.split(',').includes(f)} readOnly className="rounded text-blue-600" /> {f}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Price range */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-800 flex justify-between items-center text-sm cursor-pointer" onClick={() => toggleFilter('Price range')}>
                Price range
                <svg className={`w-4 h-4 transform transition-transform ${openFilters['Price range'] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </h3>
              {openFilters['Price range'] && (
                <div className="text-sm text-gray-600 mt-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-500">Min</label>
                      <input 
                        type="number" 
                        placeholder="0" 
                        value={localMin}
                        onChange={(e) => setLocalMin(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-2 py-1 outline-none" 
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Max</label>
                      <input 
                        type="number" 
                        placeholder="999" 
                        value={localMax}
                        onChange={(e) => setLocalMax(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-2 py-1 outline-none" 
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const newParams = Object.fromEntries(searchParams);
                      if (localMin) newParams.minPrice = localMin;
                      else delete newParams.minPrice;
                      if (localMax) newParams.maxPrice = localMax;
                      else delete newParams.maxPrice;
                      setSearchParams(newParams);
                    }}
                    className="w-full bg-white text-blue-600 border border-gray-300 rounded-md py-1 mt-2 font-medium hover:bg-gray-50 transition"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Condition */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-800 flex justify-between items-center text-sm cursor-pointer" onClick={() => toggleFilter('Condition')}>
                Condition
                <svg className={`w-4 h-4 transform transition-transform ${openFilters['Condition'] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </h3>
              {openFilters['Condition'] && (
                <div className="text-sm text-gray-600 mt-2 space-y-2">
                  {['New', 'Used', 'Refurbished'].map((c) => (
                    <p 
                      key={c} 
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => {
                        const newParams = Object.fromEntries(searchParams);
                        if (condition === c) delete newParams.condition;
                        else newParams.condition = c;
                        setSearchParams(newParams);
                      }}
                    >
                      <input type="checkbox" checked={condition === c} readOnly className="rounded text-blue-600" /> {c}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Ratings */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-800 flex justify-between items-center text-sm cursor-pointer" onClick={() => toggleFilter('Ratings')}>
                Ratings
                <svg className={`w-4 h-4 transform transition-transform ${openFilters['Ratings'] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </h3>
              {openFilters['Ratings'] && (
                <div className="text-sm text-gray-600 mt-2 space-y-2">
                  {[5, 4, 3].map((r) => (
                    <p 
                      key={r} 
                      className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
                      onClick={() => {
                        const newParams = Object.fromEntries(searchParams);
                        if (rating === r.toString()) delete newParams.rating;
                        else newParams.rating = r.toString();
                        setSearchParams(newParams);
                      }}
                    >
                      <input type="checkbox" checked={rating === r.toString()} readOnly className="rounded text-blue-600" />
                      <span className="text-orange-400">
                        {'★'.repeat(r)}{'☆'.repeat(5 - r)}
                      </span>
                      {r < 5 && ' & up'}
                    </p>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-4">
            
            {/* Top Bar */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{products.length} items in <span className="font-bold text-gray-800">{category || 'All categories'}</span></span>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>Verified only</span>
                </label>
              </div>
              <div className="flex items-center gap-3">
                <select 
                  className="border border-gray-300 rounded-md px-3 py-1.5 text-sm outline-none cursor-pointer"
                  value={sort}
                  onChange={handleSortChange}
                >
                  <option value="">Featured</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating_desc">Rating: High to Low</option>
                </select>
                <div className="border border-gray-300 rounded-md flex overflow-hidden">
                  <button 
                    className={`p-1.5 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM11 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z"></path></svg>
                  </button>
                  <button 
                    className={`p-1.5 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white'}`}
                    onClick={() => setViewMode('list')}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 items-center text-sm">
              {category && (
                <div className="bg-white border border-gray-200 rounded-md px-3 py-1 flex items-center gap-2 text-gray-700">
                  <span>{category}</span>
                  <svg className="w-4 h-4 cursor-pointer text-gray-400 hover:text-gray-600" fill="currentColor" viewBox="0 0 20 20" onClick={() => setSearchParams({})}><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 4.293z" clipRule="evenodd"></path></svg>
                </div>
              )}
            </div>

            {/* Product Grid/List */}
            <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" : "flex flex-col gap-4"}>
              {loading ? (
                <div className="col-span-full text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="text-gray-500 mt-2">Loading products...</p>
                </div>
              ) : error ? (
                <div className="col-span-full text-center py-12 text-red-500">{error}</div>
              ) : products.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500">No products found.</div>
              ) : (
                products.map((product) => (
                  <Link key={product._id} to={`/products/${product._id}`} className={`bg-white border border-gray-200 rounded-lg p-4 flex relative hover:shadow-md transition ${viewMode === 'list' ? 'flex-row gap-4 items-center' : 'flex-col'}`}>
                    <button 
                      className={`absolute top-4 right-4 border border-gray-200 rounded-md p-1.5 hover:bg-gray-50 ${isInWishlist(product._id) ? 'text-red-500 bg-red-50' : 'text-gray-400'}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (isInWishlist(product._id)) {
                          removeFromWishlist(product._id);
                        } else {
                          addToWishlist(product);
                        }
                      }}
                    >
                      <svg className="w-5 h-5" fill={isInWishlist(product._id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    </button>
                    <div className={`${viewMode === 'list' ? 'w-40 h-40' : 'h-48'} flex items-center justify-center flex-shrink-0`}>
                      <img src={product.image} alt={product.name} className="object-contain max-h-full" />
                    </div>
                    <div className={`mt-4 flex-1 flex flex-col justify-between ${viewMode === 'list' ? 'mt-0' : ''}`}>
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-800 font-bold">${product.price}</span>
                        </div>
                        <div className="flex items-center text-orange-400 text-sm mt-1">
                          <span>★★★★☆</span>
                          <span className="text-orange-500 ml-1">4.5</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-2">{product.name}</p>
                        {viewMode === 'list' && (
                          <p className="text-gray-500 text-sm mt-2 line-clamp-2">{product.description}</p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-end mt-6">
                <div className="flex border border-gray-300 rounded-md overflow-hidden text-sm">
                  <button 
                    className={`px-3 py-2 bg-white hover:bg-gray-50 border-r border-gray-300 ${page === 1 ? 'cursor-not-allowed text-gray-400' : ''}`}
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                  >
                    &lt;
                  </button>
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    return (
                      <button
                        key={pageNum}
                        className={`px-3 py-2 border-r border-gray-300 ${page === pageNum ? 'bg-blue-600 text-white font-bold' : 'bg-white hover:bg-gray-50'}`}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button 
                    className={`px-3 py-2 bg-white hover:bg-gray-50 ${page === totalPages ? 'cursor-not-allowed text-gray-400' : ''}`}
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
