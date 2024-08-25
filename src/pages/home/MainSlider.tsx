import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Import navigation styles
import { Navigation, Autoplay, Pagination, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios"; // If you're using axios

// Define the type for a single slide item
interface SlideItem {
  id: number;
  name: string;
  is_active: boolean;
  notes: string;
  image: string;
  image_small: string;
  products: any[];
}

// Define the type for the API response
interface ApiResponse {
  status: boolean;
  message: string;
  data: SlideItem[];
}

const MainSlider: React.FC = () => {
  const [slides, setSlides] = useState<SlideItem[]>([]);

  useEffect(() => {
    // Fetch the slider data from the API
    axios
      .get<ApiResponse>("https://excite.techno-era.co/en/api/ads/?section=1")
      .then((response) => {
        if (response.data.status) {
          setSlides(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching the slider data:", error);
      });
  }, []);

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      freeMode={true}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      loop={true}
      speed={700}
      pagination={{ clickable: true }} // Add pagination
      modules={[Pagination, Autoplay]}
      className="main-slider"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <img src={slide.image} alt={slide.name} />
          <div className="text">
            <h1>{slide.name}</h1>
            {slide.notes && <h4>{slide.notes}</h4>}
            <a href="">Shop Now</a>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSlider;
