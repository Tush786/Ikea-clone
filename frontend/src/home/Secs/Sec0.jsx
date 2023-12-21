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
          <div className="absolute top-0 left-0 text-3xl ml-8">
            <div>
            <h2 className="text-3xl text-left font-mono w-7/12 pl-7 pt-14">
              Meet Mambo, a new design with deep seats and a sculpted backrest
            </h2>
            </div>
            <div className="mr-10rem">
            <button type="button" class="py-3.5 px-8 text-sm font-medium text-gray-900 rounded bg-amber-200">SHOP BAMBO</button>
            </div>
            
          </div>

          <img src="https://media.graphassets.com/resize=w:2304,fit:crop/output=format:webp/compress/3PNy6pUrRV1hUpKjnK0A" />
        </SwiperSlide>
        <SwiperSlide>

        <div className="absolute top-0 left-0 text-3xl ml-8">
            <div>
            <h2 className="text-3xl text-left font-mono w-7/12 pl-7 pt-14">
            Discover Nomad, our best-selling and most-awarded modular seating
            </h2>
            </div>
            <div className="mr-10rem">
            <button type="button" class="py-3.5 px-8 text-sm font-medium text-gray-900 rounded bg-amber-200">SHOP NOMAD</button>
            </div>
            
          </div>
          <img src="https://media.graphassets.com/resize=w:2304,fit:crop/output=format:webp/compress/KgmsrOumQNm6nvPTbhwK" />
        </SwiperSlide>
        <SwiperSlide>
        <div className="absolute top-0 left-0 text-3xl ml-8">
            <div>
            <h2 className="text-3xl text-left font-mono w-7/12 pl-7 pt-14">
            A better suite of bedroom furniture starts with a solid frame
            </h2>
            </div>
            <div className="mr-10rem">
            <button type="button" class="py-3.5 px-8 text-sm font-medium text-gray-900 rounded bg-amber-200">SHOP BEDROOM</button>
            </div>
            
          </div>
          <img src="https://media.graphassets.com/resize=w:2304,fit:crop/output=format:webp/compress/A6fHCSq9SKdPCkJY2RpA" />
        </SwiperSlide>
        <SwiperSlide>
        <div className="absolute top-0 left-0 text-3xl ml-8">
            <div>
            <h2 className="text-3xl text-left font-mono w-7/12 pl-7 pt-14">
            Lean into Scandinavian comfort with the Range Collection
            </h2>
            </div>
            <div className="mr-10rem">
            <button type="button" class="py-3.5 px-8 text-sm font-medium text-gray-900 rounded bg-amber-200">SHOP RANGE</button>
            </div>
            
          </div>
          <img src="https://media.graphassets.com/resize=w:2304,fit:crop/output=format:webp/compress/uIF1X41RR64ILO3BtjtU" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
