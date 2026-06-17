import { Navbar } from "@/components/Navbar";
import { FloatingActions } from "@/components/FloatingActions";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { ProcessVideo } from "@/components/sections/ProcessVideo";
import { Products } from "@/components/sections/Products";
import { WhyUs } from "@/components/sections/WhyUs";
import { OrderForm } from "@/components/sections/OrderForm";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Process />
      <About />
      <ProcessVideo />
      <Products />
      <WhyUs />
      <OrderForm />
      <Footer />
      <FloatingActions />
    </main>
  );
}
