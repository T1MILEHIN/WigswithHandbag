import Image from "next/image";
import gallery_one from "../../images/gal1.png"
import gallery_two from "../../images/gal2.png"
import gallery_three from "../../images/gal3.png"
import gallery_four from "../../images/gal4.png"
import gallery_five from "../../images/gal5.png"
import gallery_six from "../../images/gal6.png"
import gallery_seven from "../../images/gal7.png"
import gallery_eight from "../../images/gal8.png"
import gallery_nine from "../../images/gal9.png"
import gallery_ten from "../../images/gal10.png"
import gallery_eleven from "../../images/gal11.png"
import gallery_twelve from "../../images/gal12.png"
import gallery_thirteen from "../../images/gal13.png"
import gallery_fourteen from "../../images/gal14.png"
import gallery_fiften from "../../images/gal15.png"
import gallery_sixteen from "../../images/gal16.png"
import gallery_seventeen from "../../images/gal17.png"
import gallery_eighteen from "../../images/gal18.png"


export const metadata = {
  title: "Gallery",
};

export default function GalleryPage() {
  return (
    <div className="">
      <h1 className="my-4 text-center font-bold text-xl md:text-3xl">Gallery</h1>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="w-full aspect-square">
          <Image placeholder='blur' src={gallery_one} width={1000} height={1000} alt="gallery" />
        </div>
        <div className="w-full aspect-square">
          <Image placeholder='blur' src={gallery_two} width={1000} height={1000} alt="gallery" />
        </div>
        <div className="w-full aspect-square">
          <Image placeholder='blur' src={gallery_three} width={1000} height={1000} alt="gallery" />
        </div>
        <div className="w-full aspect-square">
          <Image placeholder='blur' src={gallery_four} width={1000} height={1000} alt="gallery" />
        </div>
        <div className="w-full aspect-square">
          <Image placeholder='blur' src={gallery_five} width={1000} height={1000} alt="gallery" />
        </div>
        <div className="w-full aspect-square">
          <Image placeholder='blur' src={gallery_six} width={1000} height={1000} alt="gallery" />
        </div>
        <div className="w-full aspect-square">
          <Image placeholder='blur' src={gallery_seven} width={1000} height={1000} alt="gallery" />
        </div>
        <div className="w-full aspect-square">
          <Image placeholder='blur' src={gallery_eight} width={1000} height={1000} alt="gallery" />
        </div>
        <div className="w-full aspect-square">
          <Image placeholder='blur' src={gallery_nine} width={1000} height={1000} alt="gallery" />
        </div>
        <div className="w-full aspect-square">
          <Image placeholder='blur' src={gallery_ten} width={1000} height={1000} alt="gallery" />
        </div>
        <div className="w-full aspect-square">
          <Image placeholder='blur' src={gallery_eleven} width={1000} height={1000} alt="gallery" />
        </div>
        <div className="w-full aspect-square">
          <Image placeholder='blur' src={gallery_twelve} width={1000} height={1000} alt="gallery" />
        </div>
        <div className="w-full aspect-square">
          <Image placeholder='blur' src={gallery_thirteen} width={1000} height={1000} alt="gallery" />
        </div>
        <div className="w-full aspect-square">
          <Image placeholder='blur' src={gallery_fourteen} width={1000} height={1000} alt="gallery" />
        </div>
        <div className="w-full aspect-square">
          <Image placeholder='blur' src={gallery_fiften} width={1000} height={1000} alt="gallery" />
        </div>
        <div className="w-full aspect-square">
          <Image placeholder='blur' src={gallery_sixteen} width={1000} height={1000} alt="gallery" />
        </div>
        <div className="w-full aspect-square">
          <Image placeholder='blur' src={gallery_seventeen} width={1000} height={1000} alt="gallery" />
        </div>
        <div className="w-full aspect-square">
          <Image placeholder='blur' src={gallery_eight} width={1000} height={1000} alt="gallery" />
        </div>
      </section>
    </div>
  )
}
