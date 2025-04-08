import Link from "next/link";
import Card from "./Card/page";



export default function Home() {
  return (
    <div className="mt-5">
      <h1 className="font-bold text-3xl mt-2 mb-2 w-[70vw] mx-auto">Saqib's Blog: Your Ultimate Writing Resources</h1>
      <div className="flex relative left-0 flex-col md:flex-row gap-2 md:w-[70vw] md:h-[60vh] h-[80vh] w-[80vw] border-gray-700  mx-auto">
          <div className="relative flex-grow overflow-hidden left-0 w-[70%] h-[100%] rounded-lg shadow-[0px_5px_15px_rgba(0,0,0,0.35)]">
          
          
          <img src="../images/P1.jpg" alt="" className="h-[70%] w-[100%] absolute overflow-hidden object-cover object-center"/>
          <div className="absolute bottom-0 left-0 w-[100%] h-[30%] bg-gray-200">
            <h2 className="m-3 text-sm">Category</h2>
            <p className="ml-3 font-bold text-2xl">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
          </div>
          </div>

          <div className="md:w-[30%] md:h-[100%] w-[100%] h-[50%] bg-gray-200 flex flex-col gap-2 p-2">
            <h2>Heading</h2>
            <ol className="flex flex-col justify-around gap-2 flex-grow">
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, ab?</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, alias.</li>
              <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa, error.</li>
              <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa, error.</li>
            </ol>
          </div>
      </div>
      <Card />
        
     
    </div>
  );
}
