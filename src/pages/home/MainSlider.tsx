import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Import navigation styles
import { Navigation, Autoplay, Pagination, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import slide from './../../images/slide.jpeg'

const MainSlider = () => {
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
        <SwiperSlide>
          <img src={slide} />
          <div className="text">
            <h1>Sale up to 50% off</h1>
            <h4>12 inch hd display</h4>
            <a href="">Shop Now</a>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide} />
          <div className="text">
            <h1>Sale up to 50% off</h1>
            <h4>12 inch hd display</h4>
            <a href="">Shop Now</a>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide} />
          <div className="text">
            <h1>Sale up to 50% off</h1>
            <h4>12 inch hd display</h4>
            <a href="">Shop Now</a>
          </div>
        </SwiperSlide>
      </Swiper>
    )
}

export default MainSlider;