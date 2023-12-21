import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../home.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
const Sec6 = () => {
  return (
    <div>
      <div className='main_div flex justify-center'>

      
        <div className='left_swiper w-3/5'>
        <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay,Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide> 
          <div className="flex-col">
            <div className="mb-40">
            <h2 className="ml-auto mr-auto text-left font-serif max-w-sm">NOMAD SOFA</h2>
            </div>
            <div className="text-4xl w-2/5 ml-64 -mt-28">
            <h2 className="font-semibold text-left">"The Burrow system works beautifully. It's comfortable, absolutely solid, and looks great."</h2>
            </div>
            <div className="mt-20 -ml-72">
              <a href="">Shop Now →</a>
            </div>
          </div>
          
        </SwiperSlide>
        <SwiperSlide>
        <div className="flex-col">
            <div className="mb-40">
            <h2 className="ml-auto mr-auto text-left font-serif max-w-sm">SERIF COFFEE TABLE</h2>
            </div>
            <div className="text-4xl w-2/5 ml-64 -mt-28">
            <h2 className="font-semibold text-left">"Not a just superficial beauty, the table is well-made and substantial, a nascent heirloom."</h2>
            </div>
            <div className="mt-20 -ml-72">
              <a href="">Shop Now →</a>
            </div>
          </div>
          </SwiperSlide>
        <SwiperSlide>
        <div className="flex-col">
            <div className="mb-40">
            <h2 className="ml-auto mr-auto text-left font-serif max-w-sm">INDEX WALL SHELF</h2>
            </div>
            <div className="text-4xl w-2/5 ml-64 -mt-28">
            <h2 className="font-semibold text-left">"The bookshelves are amazing... Everyone is asking where we got them."</h2>
            </div>
            <div className="mt-20 -ml-72">
              <a href="">Shop Now →</a>
            </div>
          </div>
        </SwiperSlide>
        </Swiper>
        </div>

        <div className='right_swiper w-3/5 '>
        <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide> <img src='https://media.graphassets.com/resize=w:1200,fit:crop/output=format:webp/compress/GmTFAa0cTlCm4jKT9lPN'/></SwiperSlide>
        <SwiperSlide><img src='https://media.graphassets.com/resize=w:1200,fit:crop/output=format:webp/compress/6s2sge3S2nbChpLUDInQ'/></SwiperSlide>
        <SwiperSlide><img src='https://media.graphassets.com/resize=w:1200,fit:crop/output=format:webp/compress/hr1irGAoTS2W1sRMpSWW'/></SwiperSlide>
        </Swiper>
        </div>

        </div>
    </div>
  )
}

export default Sec6