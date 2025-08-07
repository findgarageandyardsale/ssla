import { AboutUs } from "./components/AboutUs";
import { Gallery } from "./components/Gallery";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import Header from "./components/Header/Header";
import { ImageDialog } from "../components/ImageFlyer/ImageDialog";
import { useState } from "react";
import ssla_flyer from "../assets/ssla_flyer.jpg";
import { HeaderSection } from "./components/HeaderSection";

export const Home = ({ isOpenModal, setIsOpenModal }) => {
  console.log(isOpenModal);
  return (
    <div className="bg-white">
      <section>
        <HeaderSection />
        <Header />
      </section>
      {/* <section>
        <AboutUs />
      </section> */}
      <div className="mb-11"></div>
      <section>
        <Gallery />
      </section>
      <section>
        <Testimonials />
      </section>
      <div className="mb-11"></div>
      <section>
        <Contact />
      </section>
      <div className="mb-11"></div>

    
    </div>
  );
};
