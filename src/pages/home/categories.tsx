import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Import navigation styles
import { Navigation, Autoplay, Pagination, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Category {
  id: number;
  name: string;
  image: string | null;
}

const CategoriesSlider: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://excite.techno-era.co/en/api/oscar/categories/');
        const fetchedCategories = response.data.data.map((category: any) => ({
          id: category.id,
          name: category.name,
          image: category.image,
        }));
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="categories_slider_wrapper">
      <div className="head">
        <h1>Browse By Category</h1>
        <div className="navigation">
          <button className="prev">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 5L4 12L11 19M4 12H20" stroke="#B5B5B5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="next">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.5 12H20M20 12L13 5M20 12L13 19" stroke="#FFC633" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <Swiper
        spaceBetween={8}
        slidesPerView={2}
        freeMode={true}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        loop={true}
        speed={500}
        breakpoints={{
          575: {
            slidesPerView: 3,
          },
          767: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 6,
          },
        }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: '.next',
          prevEl: '.prev',
        }}
        modules={[Pagination, Autoplay, Navigation]}
        className="browse-by-category"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <img src={category.image || 'default-image-url.jpg'} alt={category.name} />
            <h1>{category.name}</h1>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoriesSlider;
