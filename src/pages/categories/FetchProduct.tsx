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
    range?: [number, number];
}

const FetchProduct: React.FC<FetchProductProps> = ({ categoryId, range }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        console.log('Received range in FetchProduct:', range);
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
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5796 5.76422C10.2572 6.07365 9.74804 6.07365 9.4256 5.76422L8.8486 5.2105C8.17325 4.56239 7.26088 4.16667 6.2526 4.16667C4.18154 4.16667 2.5026 5.8456 2.5026 7.91667C2.5026 9.90219 3.57742 11.5417 5.12907 12.8888C6.68204 14.237 8.53877 15.1312 9.64814 15.5876C9.8801 15.683 10.1251 15.683 10.3571 15.5876C11.4664 15.1312 13.3232 14.237 14.8761 12.8888C16.4278 11.5417 17.5026 9.90218 17.5026 7.91667C17.5026 5.8456 15.8237 4.16667 13.7526 4.16667C12.7443 4.16667 11.832 4.56239 11.1566 5.2105L10.5796 5.76422ZM10.0026 4.00798C9.02936 3.074 7.70801 2.5 6.2526 2.5C3.26106 2.5 0.835938 4.92512 0.835938 7.91667C0.835938 13.2235 6.64456 16.1542 9.0141 17.1289C9.65224 17.3914 10.353 17.3914 10.9911 17.1289C13.3607 16.1542 19.1693 13.2235 19.1693 7.91667C19.1693 4.92512 16.7441 2.5 13.7526 2.5C12.2972 2.5 10.9758 3.074 10.0026 4.00798Z" fill="#6C7275"/>
                                            </svg>
                                        </button>
                                        <button className={"add_to_cart"}>Add to cart</button>
                                        {product.images[0]?.original && (
                                            <Link to={'/product/' + product.id} className='swiper-slide' key={product.id}>
                                                <img src={product.images[0].original} alt={product.title} />
                                            </Link>
                                        )}
                                    </div>
                                    <div className="rate">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.53834 1.10997C7.70914 0.699319 8.29086 0.699318 8.46166 1.10996L9.99874 4.80556C10.0707 4.97868 10.2336 5.09696 10.4204 5.11194L14.4102 5.4318C14.8535 5.46734 15.0332 6.02059 14.6955 6.30993L11.6557 8.91378C11.5133 9.03576 11.4512 9.22715 11.4947 9.40952L12.4234 13.3028C12.5265 13.7354 12.0559 14.0773 11.6764 13.8455L8.26063 11.7592C8.10062 11.6615 7.89938 11.6615 7.73937 11.7592L4.32363 13.8455C3.94408 14.0773 3.47345 13.7354 3.57665 13.3028L4.50534 9.40952C4.54884 9.22715 4.48665 9.03576 4.34426 8.91378L1.30453 6.30993C0.966758 6.02059 1.14652 5.46734 1.58985 5.4318L5.57955 5.11194C5.76645 5.09696 5.92925 4.97868 6.00126 4.80556L7.53834 1.10997Z" fill="#FED700"/>
                                        </svg>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.53834 1.10997C7.70914 0.699319 8.29086 0.699318 8.46166 1.10996L9.99874 4.80556C10.0707 4.97868 10.2336 5.09696 10.4204 5.11194L14.4102 5.4318C14.8535 5.46734 15.0332 6.02059 14.6955 6.30993L11.6557 8.91378C11.5133 9.03576 11.4512 9.22715 11.4947 9.40952L12.4234 13.3028C12.5265 13.7354 12.0559 14.0773 11.6764 13.8455L8.26063 11.7592C8.10062 11.6615 7.89938 11.6615 7.73937 11.7592L4.32363 13.8455C3.94408 14.0773 3.47345 13.7354 3.57665 13.3028L4.50534 9.40952C4.54884 9.22715 4.48665 9.03576 4.34426 8.91378L1.30453 6.30993C0.966758 6.02059 1.14652 5.46734 1.58985 5.4318L5.57955 5.11194C5.76645 5.09696 5.92925 4.97868 6.00126 4.80556L7.53834 1.10997Z" fill="#FED700"/>
                                        </svg>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.53834 1.10997C7.70914 0.699319 8.29086 0.699318 8.46166 1.10996L9.99874 4.80556C10.0707 4.97868 10.2336 5.09696 10.4204 5.11194L14.4102 5.4318C14.8535 5.46734 15.0332 6.02059 14.6955 6.30993L11.6557 8.91378C11.5133 9.03576 11.4512 9.22715 11.4947 9.40952L12.4234 13.3028C12.5265 13.7354 12.0559 14.0773 11.6764 13.8455L8.26063 11.7592C8.10062 11.6615 7.89938 11.6615 7.73937 11.7592L4.32363 13.8455C3.94408 14.0773 3.47345 13.7354 3.57665 13.3028L4.50534 9.40952C4.54884 9.22715 4.48665 9.03576 4.34426 8.91378L1.30453 6.30993C0.966758 6.02059 1.14652 5.46734 1.58985 5.4318L5.57955 5.11194C5.76645 5.09696 5.92925 4.97868 6.00126 4.80556L7.53834 1.10997Z" fill="#FED700"/>
                                        </svg>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.53834 1.10997C7.70914 0.699319 8.29086 0.699318 8.46166 1.10996L9.99874 4.80556C10.0707 4.97868 10.2336 5.09696 10.4204 5.11194L14.4102 5.4318C14.8535 5.46734 15.0332 6.02059 14.6955 6.30993L11.6557 8.91378C11.5133 9.03576 11.4512 9.22715 11.4947 9.40952L12.4234 13.3028C12.5265 13.7354 12.0559 14.0773 11.6764 13.8455L8.26063 11.7592C8.10062 11.6615 7.89938 11.6615 7.73937 11.7592L4.32363 13.8455C3.94408 14.0773 3.47345 13.7354 3.57665 13.3028L4.50534 9.40952C4.54884 9.22715 4.48665 9.03576 4.34426 8.91378L1.30453 6.30993C0.966758 6.02059 1.14652 5.46734 1.58985 5.4318L5.57955 5.11194C5.76645 5.09696 5.92925 4.97868 6.00126 4.80556L7.53834 1.10997Z" fill="#FED700"/>
                                        </svg>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.53834 1.10997C7.70914 0.699319 8.29086 0.699318 8.46166 1.10996L9.99874 4.80556C10.0707 4.97868 10.2336 5.09696 10.4204 5.11194L14.4102 5.4318C14.8535 5.46734 15.0332 6.02059 14.6955 6.30993L11.6557 8.91378C11.5133 9.03576 11.4512 9.22715 11.4947 9.40952L12.4234 13.3028C12.5265 13.7354 12.0559 14.0773 11.6764 13.8455L8.26063 11.7592C8.10062 11.6615 7.89938 11.6615 7.73937 11.7592L4.32363 13.8455C3.94408 14.0773 3.47345 13.7354 3.57665 13.3028L4.50534 9.40952C4.54884 9.22715 4.48665 9.03576 4.34426 8.91378L1.30453 6.30993C0.966758 6.02059 1.14652 5.46734 1.58985 5.4318L5.57955 5.11194C5.76645 5.09696 5.92925 4.97868 6.00126 4.80556L7.53834 1.10997Z" fill="#343839"/>
                                        </svg>
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
