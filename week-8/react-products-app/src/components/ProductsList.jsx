import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';

function ProductsList() {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [titleFilter, setTitleFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [ratingFilter, setRatingFilter] = useState('');

    const navigate = useNavigate();

    const goToProduct = (productObj) => {
        navigate('/product', { state: { product: productObj } })
    }

    // apply all filters instantly
    useEffect(() => {
        let filtered = allProducts;

        if (titleFilter.trim()) {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(titleFilter.toLowerCase())
            );
        }
        if (categoryFilter) {
            filtered = filtered.filter(p =>
                p.category === categoryFilter
            );
        }
        if (minPrice !== '') {
            filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
        }
        if (maxPrice !== '') {
            filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));
        }
        if (ratingFilter) {
            filtered = filtered.filter(p => p.rating.rate >= parseFloat(ratingFilter));
        }

        setProducts(filtered);
    }, [titleFilter, categoryFilter, minPrice, maxPrice, ratingFilter, allProducts]);

    useEffect(() => {
        async function getProducts() {
            setLoading(true);
            try {
                let res = await fetch("https://fakestoreapi.com/products");
                if (res.status === 200) {
                    let data = await res.json();
                    setProducts(data);
                    setAllProducts(data);
                } else {
                    throw new Error("Something went wrong");
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        getProducts();
    }, [])

    const resetFilters = () => {
        setTitleFilter('');
        setCategoryFilter('');
        setMinPrice('');
        setMaxPrice('');
        setRatingFilter('');
    }

    if (loading) return <p className='text-2xl text-center mt-20'>Loading....</p>
    if (error) return <p className='text-2xl text-center mt-20 text-red-500'>{error.message}</p>

    return (
        <div>
            {/* Filter Panel */}
            <div className='bg-gray-100 rounded-2xl p-6 mb-8 flex flex-wrap gap-4 items-end'>

                {/* Title */}
                <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-gray-600'>Search by Title</label>
                    <input
                        type="text"
                        value={titleFilter}
                        onChange={(e) => setTitleFilter(e.target.value)}
                        placeholder="e.g. jacket"
                        className='border border-gray-300 rounded-lg px-4 py-2 w-52 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    />
                </div>

                {/* Category */}
                <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-gray-600'>Category</label>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className='border border-gray-300 rounded-lg px-4 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white'
                    >
                        <option value="">All Categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="jewelery">Jewelery</option>
                        <option value="men's clothing">Men's Clothing</option>
                        <option value="women's clothing">Women's Clothing</option>
                    </select>
                </div>

                {/* Price Range */}
                <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-gray-600'>Price Range ($)</label>
                    <div className='flex gap-2'>
                        <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            placeholder="Min"
                            className='border border-gray-300 rounded-lg px-3 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-blue-400'
                        />
                        <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            placeholder="Max"
                            className='border border-gray-300 rounded-lg px-3 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-blue-400'
                        />
                    </div>
                </div>

                {/* Rating */}
                <div className='flex flex-col gap-1'>
                    <label className='text-sm font-medium text-gray-600'>Min Rating</label>
                    <select
                        value={ratingFilter}
                        onChange={(e) => setRatingFilter(e.target.value)}
                        className='border border-gray-300 rounded-lg px-4 py-2 w-36 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white'
                    >
                        <option value="">Any Rating</option>
                        <option value="4.5">4.5★ & above</option>
                        <option value="4">4★ & above</option>
                        <option value="3">3★ & above</option>
                        <option value="2">2★ & above</option>
                    </select>
                </div>

                {/* Reset */}
                <button
                    onClick={resetFilters}
                    className='bg-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-400 transition'
                >
                    Reset
                </button>
            </div>

            {/* Results count */}
            <p className='text-sm text-gray-500 mb-4'>{products.length} products found</p>

            {/* Products Grid */}
            {products.length === 0
                ? <p className='text-center text-gray-500 mt-20'>No products match your filters.</p>
                : <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                    {products.map((productObj) => (
                        <div
                            onClick={() => goToProduct(productObj)}
                            key={productObj.id}
                            className='shadow-md p-6 rounded-2xl cursor-pointer hover:shadow-xl transition text-center'
                        >
                            <img src={productObj.image} className='h-44 object-contain block mx-auto mb-4' />
                            <p className='text-sm font-medium'>{productObj.title}</p>
                            <p className='text-xs text-gray-400 mt-1 capitalize'>{productObj.category}</p>
                            <div className='flex justify-center items-center gap-2 mt-2'>
                                <span className='text-blue-600 font-semibold'>${productObj.price}</span>
                                <span className='text-yellow-500 text-xs'>★ {productObj.rating.rate}</span>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default ProductsList