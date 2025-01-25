'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function SwipeSlider({ images }: { images: string[] }) {
    return (
        <div className="relative w-full max-w-[500px] mx-auto">
            <Swiper
                modules={[Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                loop={false}
                grabCursor={true}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                    // renderBullet: (index, className) =>
                    //     `<span className='${className}' style="background-color: ${index === 0 ? "#1DA1F2" : "#888"}"></span>`

                }}
                className="swiper-wrapper"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} className="flex justify-center items-center">
                        <img
                            src={image}
                            alt={`Slide ${index}`}
                            className=" h-[355px] md:h-[490px] object-contain"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <style jsx>{`
                :global(.swiper-pagination-bullet) {
                    @apply bg-gray-100;
                }
                :global(.swiper-pagination-bullet-active) {
                    @apply bg-blue-500;
                }
            `}</style>
        </div>
    );
}
