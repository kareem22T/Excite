import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, Typography, Grid, Pagination } from '@mui/material';
import { Link } from 'react-router-dom';

interface Image {
    id: number;
    code: string;
    original: string;
    caption: string;
    display_order: number;
    date_created: string;
}

interface Product {
    id: number;
    title: string;
    images: Image[];
    brand_name: string;
    price: {
        currency: string;
        excl_tax: number;
        incl_tax: number;
        tax: number;
    };
    in_wishlist: boolean;
    stock: number;
    slug: string;
    rating: number;
}

interface ApiResponse {
    data: {
        count: number;
        next: string | null;
        previous: string | null;
        results: Product[];
    }
}

interface FetchProductProps {
    categoryId: number;
}

const FetchProduct: React.FC<FetchProductProps> = ({ categoryId }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get<ApiResponse>(
                    `https://excite.techno-era.co/en/api/oscar/products/?ordering=-stockrecords__price%2Ctitle&category=${categoryId}&page=${currentPage}&page_size=12`
                );
                setProducts(response.data.data.results);
                setTotalPages(Math.ceil(response.data.data.count / 10)); // Assuming page_size is 10
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [categoryId, currentPage]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <div>
            <div className="products_wrapper_category">
                {
                    (products && products.length > 0) && (
                        products.map(product => (
                            product && (
                                <div className="productCard" key={product.id}>
                                    <div className="img">
                                        <div className="sale">
                                            {product.stock > 0 && <span>New</span>}
                                            <span>-50%</span>
                                        </div>
                                        <button className={"add_to_wishlist" + (product.in_wishlist ? " active" : "")}>
                                            {/* Wishlist SVG */}
                                        </button>
                                        <button className={"add_to_cart"}>Add to cart</button>
                                        {product.images[0]?.original && (
                                            <Link to={'/product/' + product.id} className='swiper-slide' key={product.id}>
                                                <img src={product.images[0].original} alt={product.title} />
                                            </Link>
                                        )}
                                    </div>
                                    <div className="rate">
                                        {/* Rating SVGs */}
                                    </div>
                                    <Link to={'/product/' + product.id}>
                                        <h3>{product.title}</h3>
                                    </Link>
                                    <div className="price">
                                        <span>{product.price?.incl_tax} {product.price?.currency}</span>
                                    </div>
                                </div>
                            )
                        ))
                    )
                }
            </div>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
            />
        </div>
    );
};

export default FetchProduct;
