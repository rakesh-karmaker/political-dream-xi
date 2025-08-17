import type React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";

export default function ImageSwiper(): React.ReactNode {
  const images: string[] = [
    "/slide-img-1.png",
    "/slide-img-2.png",
    "/slide-img-3.jpg",
    "/slide-img-4.jpg",
    "/slide-img-5.webp",
  ];
  return (
    <div className="w-full min-w-screen h-full absolute top-0 left-0 -z-[9999] bg-black">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        modules={[EffectFade, Autoplay]}
        className="w-full h-full brightness-25"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="w-full h-full">
            <img src={image} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
