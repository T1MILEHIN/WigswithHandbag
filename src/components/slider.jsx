"use client"
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Parallax } from 'react-scroll-parallax';
import Image from 'next/image';
import arrival_one from "../app/images/arr1.png"
import arrival_two from "../app/images/arr2.png"
import arrival_three from "../app/images/arr3.png"
import arrival_four from "../app/images/arr4.png"
import SlideController from './slideController';

const Slider = ({best1, best2, best3, best4, rtl}) => {
    return (
            <section className="slider">
                <Splide aria-label="My Favorite Images" options={{
                    type : 'loop',
                    perPage: 3,
                    perMove: 1,
                    autoplay: true,
                    interval: 3000,
                    speed: 3000,
                    pauseOnHover: true,
                    arrows: true,
                    pagination: false,
                    gap: "40px",
                    drag : 'free',
                    snap : true,
                    width: "100%",
                    height:"100%",
                    direction: rtl ? "rtl" : "ltr",
                     breakpoints: {
                        640: {
                            type : 'loop',
                            perPage: 1,
                            perMove: 1,
                        }
                    }
                }}
                 className="overflow-hidden relative">
                    <SlideController />
                    <SplideSlide>
                    <div className="">
                        <Image placeholder='blur' src={best1 || arrival_one} width={1000} height={1000} alt="arrival-one-img" className="w-full aspect-square object-cover" />
                    </div>
                    </SplideSlide>
                    <SplideSlide>
                        <div className="">
                        <Image placeholder='blur' src={best2 || arrival_two} width={1000} height={1000} alt="arrival-two-img" className="w-full aspect-square object-cover" />
                        </div>
                    </SplideSlide>
                    <SplideSlide>
                    <div className="">
                        <Image placeholder='blur' src={best3 || arrival_three} width={1000} height={1000} alt="arrival-three-img" className="w-full aspect-square object-cover" />
                    </div>
                    </SplideSlide>
                    <SplideSlide>
                    <div className="">
                        <Image placeholder='blur' src={best4 || arrival_four} width={1000} height={1000} alt="arrival-four-img" className="w-full aspect-square object-cover" />
                    </div>
                    </SplideSlide>
                </Splide>
            </section>
    )
}

export default Slider;