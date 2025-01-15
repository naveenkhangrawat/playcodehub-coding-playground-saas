
// import { BackgroundBeams } from "@/components/aceternityUI/background-beams";

import LandingPage from "@/app/(home)/_components/landingPage/LandingPage";
import Header from "./_components/Header";
import Footer from "@/components/Footer";


export default function Home() {
  
  return (
    <>
      <div>

        {/* <div className="h-[80px]"> */}
        <Header />
        {/* </div> */}
        
        <div className="absolute z-[-1] bottom-0 left-0 right-0 top-[75px] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_80%)]">
        </div>

        <LandingPage />

        <Footer />

      </div>

      {/* <BackgroundBeams /> */}
    </>
  );
}


