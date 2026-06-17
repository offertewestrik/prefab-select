import { Navbar } from "@/components/Navbar";
import { FloatingActions } from "@/components/FloatingActions";
import { JsonLd } from "@/components/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { ProcessVideo } from "@/components/sections/ProcessVideo";
import { Products } from "@/components/sections/Products";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { OrderForm } from "@/components/sections/OrderForm";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative">
      <JsonLd />
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Process />
      <ProcessVideo />
      <Products />
      <ServiceAreas />
      <WhyUs />
      <Testimonials />
      <Faq />
      <OrderForm />
      <Footer />
      <FloatingActions />
    </main>
  );
}
