import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../../home.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Sec0() {
  return (
    <>
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
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className='absolute top-0 left-0 text-3xl ml-8'>
          <p className='font-semibold' >Hello I am Here</p>
          <button>I Am Button</button>
          </div>
          
          <img src='https://media.graphassets.com/resize=w:2304,fit:crop/output=format:webp/compress/3PNy6pUrRV1hUpKjnK0A'/></SwiperSlide>
        <SwiperSlide><img src='https://media.graphassets.com/resize=w:2304,fit:crop/output=format:webp/compress/KgmsrOumQNm6nvPTbhwK'/></SwiperSlide>
        <SwiperSlide><img src='https://media.graphassets.com/resize=w:2304,fit:crop/output=format:webp/compress/A6fHCSq9SKdPCkJY2RpA'/></SwiperSlide>
        <SwiperSlide><img src='https://media.graphassets.com/resize=w:2304,fit:crop/output=format:webp/compress/uIF1X41RR64ILO3BtjtU'/></SwiperSlide>
     
      </Swiper>
    </>
  );
}
