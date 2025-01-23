'use client'

import { SetStateAction, useState } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImageComponent from "./image/ImageComponent";

export default function ImageSlider({ images }: { images: Array<string> }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlide = images.length;

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (_current: any, next: SetStateAction<number>) => setCurrentSlide(next),
    };
    return (
        <div>
            <Slider {...settings}
                arrows={false}
                className="max-w-[360px] object-fill max-h-[360px] md:max-w-[498px]"
            >
                {images.map((image, index) => (
                    <div>
                        <ImageComponent key={index} alt="postingan" src={image} />
                        {/* <img key={index} src={image} className="bg-cover" alt="postingan" /> */}
                    </div>
                ))}
            </Slider>
            <div className="text-center mt-2">
                {currentSlide + 1} / {totalSlide}
            </div>
        </div>
    );
}