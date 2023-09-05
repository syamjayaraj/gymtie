import Header from "../components/Header";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Testimonial from "../components/Testimonial";
import Navigation from "../components/Navigation";

export default function Home() {
  return (
    <div>
      <Navigation />
      <Header />
      <Features />
      <Pricing />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
}
