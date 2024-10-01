"use client"
import Image from "next/image";
import { Source_Code_Pro } from "next/font/google";
import { useEffect, useState } from "react";
import Img from "./Image";
import { ArrowLeftIcon, ArrowRight } from "lucide-react";
const pro = Source_Code_Pro({ subsets: ["latin"], weight: "700" });
export default function Home() {
  const [currentImage, setCurrentImage] = useState(0); 
  const [images,setImages] = useState([""]);
  const [loading, setLoading] = useState<boolean>(true);

   
    useEffect(() => {
      setImages(Img);
      const timer = setTimeout(() => {
        setLoading(false); 
      }, 100);
  
      return () => clearTimeout(timer); 
    }, []);
  if(loading){
    return(
      <div className="fixed inset-0 flex items-center justify-center  text-white z-50">
      <h1 className="text-4xl">Loading......</h1>
    </div>
    )
  }
    return (
    <div className="flex flex-col w-[100vw] h-[100vh] p-5 items-center">
      <div className="flex flex-col items-center">
        <div className={pro.className}>
          <h1 className="pt-2 text-4xl">Image Gallery</h1>
        </div>
        {/* Gallery */}
        <div className=" flex justify-between grid-cols-3 absolute top-[50%] bottom-[50%]  pt-4 items-center gap-3 ">

          {/* leftside */}
            {
              currentImage>=1&&(
                <div>
                   <Image className=" scale-75 transition-transform duration-500 opacity-40" src={images[currentImage-1]} alt={""} height={300} width={300} />
                </div>
              )||(
                <div>
                    <Image className=" scale-75 transition-transform duration-500 opacity-40" src={images[images.length-1]} alt={""} height={300} width={300} />
                </div>
              )
            }
          {/* currentImage */}
            {
              <div className="h-[550px] items-center justify-center flex overflow-hidden">
                <Image className="md:scale-125 scale-150  z-[1] transition-transform duration-500" src={images[currentImage]} alt={""} height={300} width={300} />
              </div>
            }
          {/* right side */}
              {
                  currentImage<=images.length-2&&(
                    <div> 
                       <Image className="scale-75 transition-transform duration-500 opacity-40" src={images[currentImage+1]} alt={""} height={300} width={300}  />
                    </div>
                  )||(
                    <div>
                       <Image className="scale-75 transition-transform duration-500 opacity-40" src={images[0]} alt={""} height={300} width={300}  />
                    </div>
                  )
              }

        </div>

        <div className="absolute z-[10] bottom-10 gap-10 flex">
          <button className="w-[30px] h-[30px] flex items-center justify-center bg-gray-600 rounded-full" onClick={()=>{
            if(currentImage>0){
              setCurrentImage(currentImage-1)
            }
            else{
              setCurrentImage(images.length-1)
            }
          }}>
            <ArrowLeftIcon/>
          </button>

          <div>
            {currentImage+1}
          </div>
          <button className="w-[30px] h-[30px] flex items-center justify-center bg-gray-600 rounded-full" onClick={()=>{
            if(currentImage<=images.length-2){
              setCurrentImage(currentImage+1)
            }else{
              setCurrentImage(0)
            }
          }}>
            <ArrowRight/>
          </button>
        </div>
      </div>
    </div>
  );
}
