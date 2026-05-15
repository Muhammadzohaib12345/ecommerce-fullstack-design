import { useEffect, useState } from 'react';
import api from '../utils/api';

export const useProducts = ({ search = '', category = '', brand = '', minPrice = '', maxPrice = '', features = '', condition = '', rating = '', page = 1, limit = 15, sort = '' } = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (search) params.search = search;
        if (category) params.category = category;
        if (brand) params.brand = brand;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;
        if (features) params.features = features;
        if (condition) params.condition = condition;
        if (rating) params.rating = rating;
        if (sort) params.sort = sort;
        params.page = page;
        params.limit = limit;
        
        const { data } = await api.get('/products', { params });
        if (!cancelled) {
          setProducts(data.products);
          setTotalPages(data.pages);
          setTotalProducts(data.total);
        }
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, [search, category, brand, minPrice, maxPrice, features, condition, rating, page, limit, sort]);

  return { products, loading, error, totalPages, totalProducts };
};

export const useFeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get('/products/featured');
        if (!cancelled) setProducts(data);
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, error };
};
