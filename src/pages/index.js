// Import Custom Components
import ALink from "@/components/features/ALink";
import BannerSection from "@/components/partials/home/BannerSection";
import BannersSection from "@/components/partials/home/BannersSection";
import ContactFormSection from "@/components/partials/home/ContactForm";
import InfoBoxSection from "@/components/partials/home/InfoBoxSection";
import IntroSection from "@/components/partials/home/IntroSection";

export default function Home() {
  return (
    <main>
      <IntroSection />
      <ContactFormSection />
      <InfoBoxSection />
      <BannersSection />

      <section className="py-12 my-5 bg-[#E1EEF0]">
        <div className="container text-center">
          <h3 className="text-lg uppercase font-medium mb-2">Stil spørgsmål anonymt</h3>

          <p className="mb-10">
            Få svar på dine spørgsmål anonymt i vores chat.{" "}
            <br className="hidden lg:block" />
            Vi har hørt alle spørgsmålene før og intet er pinligt at tale om.
          </p>

          <div className="flex justify-center">
            <ALink href={"/"} className="bg-primary text-white px-14 py-3">
              Få svar på spørgsmål
            </ALink>
          </div>
        </div>
      </section>

      <BannerSection />
    </main>
  );
}
