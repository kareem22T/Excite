import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DefaultLayout from "../../layout/DefaultLayout";
import { AppDispatch, RootState } from '../../store';
import { fetchCartDetails, fetchCartProductDetails, removeProductFromCart, updateProductQuantity } from '../../features/cart/cartSlice';

const Cart = () => {
    const dispatch = useDispatch<AppDispatch>()
    const Cart = useSelector((state: RootState) => state.cart);

    useEffect(() => {
        dispatch(fetchCartDetails()).then(() => {
            dispatch(fetchCartProductDetails({cartId: Cart.cart?.id || 0}))
        })
    }, [dispatch])

    return (
        <DefaultLayout>
            <div className="cart_page_wrapper">
                <div className="container">
                    <div className="products">
                        <h1>Cart<span>{Cart.cart?.num_lines} ITEMS</span></h1>
                        <div className="product_wrapper">
                            {
                                Cart.cart?.num_lines ? (
                                Cart.status === 'succeeded' &&
                                Cart.cart && 
                                Array.isArray(Cart.cart.lines) && 
                                Cart.cart.lines.length > 0 ? (
                                Cart.cart.lines.map(item => (
                                    <div className="product" key={item.id}>
                                        <div className="img">
                                            <img src={item.product_detail.images[0].original} alt={item.product_detail.title} />
                                        </div>
                                        <div className="text">
                                            <div className="title">
                                                <h3>{item.product_detail.title}</h3>
                                                <h4>{item.product_detail.price.excl_tax} {item.product_detail.price.currency}</h4>
                                            </div>
                                            <div className="bottom_wrapper">
                                                <div className="quantity" style={{width: 'max-content'}}>
                                                    <button onClick={() => dispatch(updateProductQuantity({cartId: Cart.cart?.id || 0, itemId: item.id, quantity: (item.quantity > 1 ? item.quantity - 1 : item.quantity)}))}>
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M3.22656 8H12.5599" stroke="#121212" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    </button>
                                                    {item.quantity}
                                                    <button onClick={() => dispatch(updateProductQuantity({cartId: Cart.cart?.id || 0, itemId: item.id, quantity: item.quantity + 1}))}>
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.3776 3.3335C8.3776 3.12639 8.20971 2.9585 8.0026 2.9585C7.7955 2.9585 7.6276 3.12639 7.6276 3.3335V7.62516H3.33594C3.12883 7.62516 2.96094 7.79306 2.96094 8.00016C2.96094 8.20727 3.12883 8.37516 3.33594 8.37516H7.6276V12.6668C7.6276 12.8739 7.7955 13.0418 8.0026 13.0418C8.20971 13.0418 8.3776 12.8739 8.3776 12.6668V8.37516H12.6693C12.8764 8.37516 13.0443 8.20727 13.0443 8.00016C13.0443 7.79306 12.8764 7.62516 12.6693 7.62516H8.3776V3.3335Z" fill="#121212"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                                <button className="remove" onClick={() => dispatch(removeProductFromCart({cartId: Cart.cart?.id || 0, itemId: item.id}))}>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                ) : (
                                    <h3 style={{minWidth: 300, marginTop: 40, marginBottom: 40}}>Loading ...</h3>
                                )
                                ) : (
                                    <h3 style={{minWidth: 300, marginTop: 40, marginBottom: 40, textAlign: 'center'}}>There is no added items</h3>
                                )
                            }
                        </div>
                        {Cart.cart?.lines && Cart.cart.lines.length > 0 && (
                            <div className="disc">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 5L5 19" stroke="#3AA39F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6.5 9C7.88071 9 9 7.88071 9 6.5C9 5.11929 7.88071 4 6.5 4C5.11929 4 4 5.11929 4 6.5C4 7.88071 5.11929 9 6.5 9Z" stroke="#3AA39F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M17.5 20C18.8807 20 20 18.8807 20 17.5C20 16.1193 18.8807 15 17.5 15C16.1193 15 15 16.1193 15 17.5C15 18.8807 16.1193 20 17.5 20Z" stroke="#3AA39F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                10% Instant Discount with Federal Bank Debit Cards on a min spend of $150. TCA
                            </div>
                        )}
                    </div>

                    {Cart.cart?.lines && Cart.cart.lines.length > 0 && (
                        <div className="order_summary">
                            <h2>Order Summary</h2>
                            <div className="row">
                                <h3>Price</h3>
                                <h4>{Cart.cart?.total_excl_tax} {Cart.cart?.currency}</h4>
                            </div>
                            <div className="row">
                                <h3>Discount</h3>
                                <h4>$0.00</h4>
                            </div>
                            <div className="row">
                                <h3>Shipping</h3>
                                <h4 className="free">Free</h4>
                            </div>
                            <div className="row">
                                <h3>Coupon Applied</h3>
                                <h4 className="free">$0.00</h4>
                            </div>
                            <hr />
                            <div className="total-row">
                                <h3>TOTAL</h3>
                                <h4>{Cart.cart?.total_incl_tax} {Cart.cart?.currency}</h4>
                            </div>
                            <div className="total-row">
                                <h3>Estimated Delivery by</h3>
                                <h4 className="free">01 Feb, 2023</h4>
                            </div>
                            <form action="" className="coupon_form">
                                <input type="text" placeholder="Coupon Code" />
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.59 13.41L13.42 20.58C13.2343 20.766 13.0137 20.9135 12.7709 21.0141C12.5281 21.1148 12.2678 21.1666 12.005 21.1666C11.7422 21.1666 11.4819 21.1148 11.2391 21.0141C10.9963 20.9135 10.7757 20.766 10.59 20.58L2 12V2H12L20.59 10.59C20.9625 10.9647 21.1716 11.4716 21.1716 12C21.1716 12.5284 20.9625 13.0353 20.59 13.41V13.41Z" stroke="#17183B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M7 7H7.01" stroke="#17183B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </form>
                            <button className="checkout_btn">Proceed to Checkout</button>
                        </div>
                    )}
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Cart;
