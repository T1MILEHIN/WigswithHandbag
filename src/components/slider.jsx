"use client";
import Image from 'next/image';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';
import arrival_one from "../app/images/arr1.png"
// import arrival_two from "../app/images/arr2.png"
// import arrival_three from "../app/images/arr3.png"
// import arrival_four from "../app/images/arr4.png"
// import SlideController from './slideController';
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


const Slider = ({ best1, best2, best3, best4, rtl }) => {
    const images = [
        best1,
        best2,
        best3,
        best4
    ]
    return (
        <section className="slider">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full max-w-full"
            >
                <CarouselContent>
                    {images.map((img, index) => (
                        <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card style={{background: 'transparent', border: 'none', boxShadow: 'none'}}>
                                    <CardContent className="flex aspect-square items-center justify-center">
                                        <Image src={img || arrival_one} alt="arrival-one-img" width={260} height={350} className="rounded-md w-full aspect-square object-cover" />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    )
}

export default Slider;