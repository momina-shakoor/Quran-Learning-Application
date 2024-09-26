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
    <div>
      <NavBar />
      <HeroSection />
      <Example />
      <MultipleItems />
      <Services />
      <Information />
      <ContactForm />
      <Footer />
    </div>
  );
}
