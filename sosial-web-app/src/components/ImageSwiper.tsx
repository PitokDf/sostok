import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ImageSwiper({ images }: { images: string[] }) {
    return (
        <> {/* Container dengan fixed height */}
            <Swiper
                className="h-full w-full"
                pagination={{
                    type: 'bullets',
                    clickable: true
                }}
                modules={[Pagination, Navigation]}
                style={{
                    '--swiper-pagination-bottom': '20px', // Atur posisi pagination
                } as React.CSSProperties}
            >
                {images?.map((image, idx) => (
                    <SwiperSlide
                        key={idx}
                        className="flex justify-center items-center bg-black"
                    >
                        <div className="relative h-full w-full flex justify-center items-center">
                            <img
                                loading="lazy"
                                src={image}
                                alt={`Post ${idx + 1}`}
                                className="object-contain max-h-full max-w-full"
                                style={{
                                    width: 'auto',
                                    height: 'auto',
                                    maxHeight: '100%',
                                    maxWidth: '100%',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)'
                                }}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <style jsx global>{`
                .swiper-slide {
                    height: 100% !important;
                    min-height: 100% !important;
                }
                
                .swiper-wrapper {
                    align-items: center !important;
                }
                
                .swiper-pagination-bullet {
                    background: rgba(255,255,255,0.5) !important;
                    opacity: 1 !important;
                }
                
                .swiper-pagination-bullet-active {
                    background: #fff !important;
                }
            `}</style>
        </>
    );
}