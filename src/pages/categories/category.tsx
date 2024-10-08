import { useParams } from "react-router-dom";
import RangeSlider from "../../components/customs/InputRange";
import DefaultLayout from "../../layout/DefaultLayout"
import MainSlider from "../home/MainSlider";
import FetchProduct from "./FetchProduct";
import { useState } from "react";

const Category = () => {
    const {id} = useParams()
    const { name } = useParams<{ name: any }>();
    const decodedName = decodeURIComponent(name);

    const [isOpenFilter, setIOpenFilter] = useState(false)

    const [loading, setLoading] = useState(false)

    const [range, setRange] = useState<[number, number]>([0, 100]);

    const handleRangeChange = (values: [number, number]) => {
        setLoading(true)
        setRange(values);

        setTimeout(() => {
            setLoading(false)
        }, 1000);
    };
    const handleToggleFilter = () => {
        setIOpenFilter(!isOpenFilter)
    }
    return (
        <DefaultLayout>
            <div className="container">
                <MainSlider />
                <div className="category_wrapper">
                    {
                        isOpenFilter && (
                            <div className="hide-content" onClick={() => {setIOpenFilter(false)}}></div>
                        )
                    }
                    <div className={"filter" + (isOpenFilter ? " open" : "")}>
                        <div className="head">
                            <h1>Filters</h1>
                            <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.125 9.125V17.75C12.125 18.0484 12.0065 18.3345 11.7955 18.5455C11.5845 18.7565 11.2984 18.875 11 18.875C10.7016 18.875 10.4155 18.7565 10.2045 18.5455C9.99353 18.3345 9.875 18.0484 9.875 17.75V9.125C9.875 8.82663 9.99353 8.54048 10.2045 8.3295C10.4155 8.11853 10.7016 8 11 8C11.2984 8 11.5845 8.11853 11.7955 8.3295C12.0065 8.54048 12.125 8.82663 12.125 9.125ZM17.75 15.5C17.4516 15.5 17.1655 15.6185 16.9545 15.8295C16.7435 16.0405 16.625 16.3266 16.625 16.625V17.75C16.625 18.0484 16.7435 18.3345 16.9545 18.5455C17.1655 18.7565 17.4516 18.875 17.75 18.875C18.0484 18.875 18.3345 18.7565 18.5455 18.5455C18.7565 18.3345 18.875 18.0484 18.875 17.75V16.625C18.875 16.3266 18.7565 16.0405 18.5455 15.8295C18.3345 15.6185 18.0484 15.5 17.75 15.5ZM20 11.75H18.875V1.25C18.875 0.951631 18.7565 0.665483 18.5455 0.454505C18.3345 0.243526 18.0484 0.125 17.75 0.125C17.4516 0.125 17.1655 0.243526 16.9545 0.454505C16.7435 0.665483 16.625 0.951631 16.625 1.25V11.75H15.5C15.2016 11.75 14.9155 11.8685 14.7045 12.0795C14.4935 12.2905 14.375 12.5766 14.375 12.875C14.375 13.1734 14.4935 13.4595 14.7045 13.6705C14.9155 13.8815 15.2016 14 15.5 14H20C20.2984 14 20.5845 13.8815 20.7955 13.6705C21.0065 13.4595 21.125 13.1734 21.125 12.875C21.125 12.5766 21.0065 12.2905 20.7955 12.0795C20.5845 11.8685 20.2984 11.75 20 11.75ZM4.25 12.5C3.95163 12.5 3.66548 12.6185 3.4545 12.8295C3.24353 13.0405 3.125 13.3266 3.125 13.625V17.75C3.125 18.0484 3.24353 18.3345 3.4545 18.5455C3.66548 18.7565 3.95163 18.875 4.25 18.875C4.54837 18.875 4.83452 18.7565 5.0455 18.5455C5.25647 18.3345 5.375 18.0484 5.375 17.75V13.625C5.375 13.3266 5.25647 13.0405 5.0455 12.8295C4.83452 12.6185 4.54837 12.5 4.25 12.5ZM6.5 8.75H5.375V1.25C5.375 0.951631 5.25647 0.665483 5.0455 0.454505C4.83452 0.243526 4.54837 0.125 4.25 0.125C3.95163 0.125 3.66548 0.243526 3.4545 0.454505C3.24353 0.665483 3.125 0.951631 3.125 1.25V8.75H2C1.70163 8.75 1.41548 8.86853 1.2045 9.0795C0.993526 9.29048 0.875 9.57663 0.875 9.875C0.875 10.1734 0.993526 10.4595 1.2045 10.6705C1.41548 10.8815 1.70163 11 2 11H6.5C6.79837 11 7.08452 10.8815 7.2955 10.6705C7.50647 10.4595 7.625 10.1734 7.625 9.875C7.625 9.57663 7.50647 9.29048 7.2955 9.0795C7.08452 8.86853 6.79837 8.75 6.5 8.75ZM13.25 4.25H12.125V1.25C12.125 0.951631 12.0065 0.665483 11.7955 0.454505C11.5845 0.243526 11.2984 0.125 11 0.125C10.7016 0.125 10.4155 0.243526 10.2045 0.454505C9.99353 0.665483 9.875 0.951631 9.875 1.25V4.25H8.75C8.45163 4.25 8.16548 4.36853 7.9545 4.5795C7.74353 4.79048 7.625 5.07663 7.625 5.375C7.625 5.67337 7.74353 5.95952 7.9545 6.1705C8.16548 6.38147 8.45163 6.5 8.75 6.5H13.25C13.5484 6.5 13.8345 6.38147 14.0455 6.1705C14.2565 5.95952 14.375 5.67337 14.375 5.375C14.375 5.07663 14.2565 4.79048 14.0455 4.5795C13.8345 4.36853 13.5484 4.25 13.25 4.25Z" fill="black" fill-opacity="0.4" />
                            </svg>
                        </div>
                        <div className="option">
                            <div className="head">
                                <h3>Price</h3>
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.46745 9.96927L7.46745 4.96927C7.53713 4.89935 7.61992 4.84387 7.71108 4.80602C7.80225 4.76816 7.89999 4.74867 7.9987 4.74867C8.09741 4.74867 8.19515 4.76816 8.28631 4.80602C8.37748 4.84387 8.46027 4.89935 8.52995 4.96927L13.5299 9.96927C13.6708 10.1102 13.75 10.3013 13.75 10.5005C13.75 10.6998 13.6708 10.8909 13.5299 11.0318C13.3891 11.1727 13.198 11.2518 12.9987 11.2518C12.7994 11.2518 12.6083 11.1727 12.4674 11.0318L7.99807 6.56239L3.5287 11.0324C3.3878 11.1733 3.19671 11.2524 2.99745 11.2524C2.79819 11.2524 2.6071 11.1733 2.4662 11.0324C2.3253 10.8915 2.24615 10.7004 2.24615 10.5011C2.24615 10.3019 2.3253 10.1108 2.4662 9.96989L2.46745 9.96927Z" fill="black" />
                                </svg>
                            </div>
                            <div className="slider_wrapper">
                                <RangeSlider min={0} max={10000} step={10} onChange={handleRangeChange} />
                            </div>
                        </div>
                        <div className="option">
                            <div className="head">
                                <h3>Categories</h3>
                                <button>Reset</button>
                            </div>
                            <div className="input-check-group">
                                <label htmlFor="">
                                    <input type="checkbox" name="categories" id="category_1" />
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M5 12l5 5l10 -10" />
                                        </svg>                                    </span>
                                    All categories
                                </label>
                                10
                            </div>
                            <div className="input-check-group">
                                <label htmlFor="">
                                    <input type="checkbox" name="categories" id="category_1" />
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M5 12l5 5l10 -10" />
                                        </svg>                                    </span>
                                    Tablet
                                </label>
                                5
                            </div>
                        </div>
                        <div className="option">
                            <div className="head">
                                <h3>Avaliability</h3>
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.46745 9.96927L7.46745 4.96927C7.53713 4.89935 7.61992 4.84387 7.71108 4.80602C7.80225 4.76816 7.89999 4.74867 7.9987 4.74867C8.09741 4.74867 8.19515 4.76816 8.28631 4.80602C8.37748 4.84387 8.46027 4.89935 8.52995 4.96927L13.5299 9.96927C13.6708 10.1102 13.75 10.3013 13.75 10.5005C13.75 10.6998 13.6708 10.8909 13.5299 11.0318C13.3891 11.1727 13.198 11.2518 12.9987 11.2518C12.7994 11.2518 12.6083 11.1727 12.4674 11.0318L7.99807 6.56239L3.5287 11.0324C3.3878 11.1733 3.19671 11.2524 2.99745 11.2524C2.79819 11.2524 2.6071 11.1733 2.4662 11.0324C2.3253 10.8915 2.24615 10.7004 2.24615 10.5011C2.24615 10.3019 2.3253 10.1108 2.4662 9.96989L2.46745 9.96927Z" fill="black" />
                                </svg>
                            </div>
                            <div className="input-check-group">
                                <label htmlFor="stock_1">
                                    <input type="checkbox" name="stock" id="stock_1" />
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M5 12l5 5l10 -10" />
                                        </svg>                                    </span>
                                    In stock
                                </label>
                                5
                            </div>
                            <div className="input-check-group">
                                <label htmlFor="">
                                    <input type="checkbox" name="stock" id="stock_2" />
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M5 12l5 5l10 -10" />
                                        </svg>                                    </span>
                                    Out of stock
                                </label>
                                0
                            </div>
                        </div>
                        <button>Apply Filter</button>
                    </div>
                    <div>
                        <div style={{display: 'flex', justifyContent: "space-between"}} className="category_head">
                        <h1
                            style={{
                                fontSize: 22,
                                fontWeight: 600,
                                textAlign: 'left',
                                marginBottom: 16
                            }}
                            >{decodedName}</h1>
                            <button className="filter_btn" onClick={handleToggleFilter}>
                                <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect y="0.5" width="32" height="32" rx="16" fill="#F0F0F0"/>
                                <path d="M16.75 16.25V22C16.75 22.1989 16.671 22.3897 16.5303 22.5303C16.3897 22.671 16.1989 22.75 16 22.75C15.8011 22.75 15.6103 22.671 15.4697 22.5303C15.329 22.3897 15.25 22.1989 15.25 22V16.25C15.25 16.0511 15.329 15.8603 15.4697 15.7197C15.6103 15.579 15.8011 15.5 16 15.5C16.1989 15.5 16.3897 15.579 16.5303 15.7197C16.671 15.8603 16.75 16.0511 16.75 16.25ZM20.5 20.5C20.3011 20.5 20.1103 20.579 19.9697 20.7197C19.829 20.8603 19.75 21.0511 19.75 21.25V22C19.75 22.1989 19.829 22.3897 19.9697 22.5303C20.1103 22.671 20.3011 22.75 20.5 22.75C20.6989 22.75 20.8897 22.671 21.0303 22.5303C21.171 22.3897 21.25 22.1989 21.25 22V21.25C21.25 21.0511 21.171 20.8603 21.0303 20.7197C20.8897 20.579 20.6989 20.5 20.5 20.5ZM22 18H21.25V11C21.25 10.8011 21.171 10.6103 21.0303 10.4697C20.8897 10.329 20.6989 10.25 20.5 10.25C20.3011 10.25 20.1103 10.329 19.9697 10.4697C19.829 10.6103 19.75 10.8011 19.75 11V18H19C18.8011 18 18.6103 18.079 18.4697 18.2197C18.329 18.3603 18.25 18.5511 18.25 18.75C18.25 18.9489 18.329 19.1397 18.4697 19.2803C18.6103 19.421 18.8011 19.5 19 19.5H22C22.1989 19.5 22.3897 19.421 22.5303 19.2803C22.671 19.1397 22.75 18.9489 22.75 18.75C22.75 18.5511 22.671 18.3603 22.5303 18.2197C22.3897 18.079 22.1989 18 22 18ZM11.5 18.5C11.3011 18.5 11.1103 18.579 10.9697 18.7197C10.829 18.8603 10.75 19.0511 10.75 19.25V22C10.75 22.1989 10.829 22.3897 10.9697 22.5303C11.1103 22.671 11.3011 22.75 11.5 22.75C11.6989 22.75 11.8897 22.671 12.0303 22.5303C12.171 22.3897 12.25 22.1989 12.25 22V19.25C12.25 19.0511 12.171 18.8603 12.0303 18.7197C11.8897 18.579 11.6989 18.5 11.5 18.5ZM13 16H12.25V11C12.25 10.8011 12.171 10.6103 12.0303 10.4697C11.8897 10.329 11.6989 10.25 11.5 10.25C11.3011 10.25 11.1103 10.329 10.9697 10.4697C10.829 10.6103 10.75 10.8011 10.75 11V16H10C9.80109 16 9.61032 16.079 9.46967 16.2197C9.32902 16.3603 9.25 16.5511 9.25 16.75C9.25 16.9489 9.32902 17.1397 9.46967 17.2803C9.61032 17.421 9.80109 17.5 10 17.5H13C13.1989 17.5 13.3897 17.421 13.5303 17.2803C13.671 17.1397 13.75 16.9489 13.75 16.75C13.75 16.5511 13.671 16.3603 13.5303 16.2197C13.3897 16.079 13.1989 16 13 16ZM17.5 13H16.75V11C16.75 10.8011 16.671 10.6103 16.5303 10.4697C16.3897 10.329 16.1989 10.25 16 10.25C15.8011 10.25 15.6103 10.329 15.4697 10.4697C15.329 10.6103 15.25 10.8011 15.25 11V13H14.5C14.3011 13 14.1103 13.079 13.9697 13.2197C13.829 13.3603 13.75 13.5511 13.75 13.75C13.75 13.9489 13.829 14.1397 13.9697 14.2803C14.1103 14.421 14.3011 14.5 14.5 14.5H17.5C17.6989 14.5 17.8897 14.421 18.0303 14.2803C18.171 14.1397 18.25 13.9489 18.25 13.75C18.25 13.5511 18.171 13.3603 18.0303 13.2197C17.8897 13.079 17.6989 13 17.5 13Z" fill="black"/>
                                </svg>
                            </button>
                        </div>
                        {
                            !loading && (
                                <FetchProduct categoryId={id as any}  />
                            )
                        }
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Category;