import DemoBanner from "@/components/demo-banner";
import SiteHeader from "@/components/site-header";
import Hero from "@/components/hero";
import Why from "@/components/why";
import Prices from "@/components/prices";
import Visit from "@/components/visit";
import BookingCard from "@/components/booking-card";
import FindUs from "@/components/find-us";
import Faq from "@/components/faq";
import SiteFooter from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <DemoBanner />
      <SiteHeader />
      <main>
        <Hero />
        <Why />
        <Prices />
        <Visit />
        <BookingCard />
        <FindUs />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
