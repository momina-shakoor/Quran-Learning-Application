import React from "react";
import HeroSection from "./heroSection";
import Example from "./stats";
import MultipleItems from "./Courses";
import Services from "./services";
import Information from "./course-info";
import ContactForm from "./contact";
import Footer from "./footer";
import NavBar from "./navbar";

export default function Home() {
  return (
    <div id="home">
      <NavBar />
      <HeroSection />
      <Example />

      <section id="courses" className="scroll-mt-20">
        <MultipleItems />
      </section>

      <section id="learning" className="scroll-mt-20">
        <Services />
        <Information />
      </section>

      <section id="contact" className="scroll-mt-20">
        <ContactForm />
      </section>

      <Footer />
    </div>
  );
}
