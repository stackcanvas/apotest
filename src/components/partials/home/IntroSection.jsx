import { useEffect, useState } from "react";
import { Reveal, Tween } from "react-gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";

// Import Custom Components
import ALink from "@/components/features/ALink";

const IntroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper?.activeIndex);
  };

  return (
    <section className="intro relative">
      <Swiper
        modules={[EffectFade, Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        draggable={false}
        autoplay={{
          delay: 4000,
        }}
        effect="fade"
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide className="flex lg:items-center h-[950px] lg:h-[575px] bg-[#FFE5B4]">
          <div className="container text-center lg:text-left">
            <div className="relative max-w-[720px] pt-40 lg:pt-14 z-10">
              <h1 className="text-4xl lg:text-5xl mb-5">
                Bliv testet og behandlet indenfor 24 timer uden at forlade dit
                hjem.
              </h1>

              <p className="text-lg mb-5">
                Vi hjælper dig med at teste dig selv og sender dig den
                <br className="hidden lg:block" /> medicin du skal bruge for at
                blive behandlet.{" "}
              </p>

              <h1 className="text-4xl lg:text-5xl mb-2">Kun 99,00 kr.</h1>

              <p className="mb-10">+ 25 kr i forsendelse.</p>

              <div className="flex justify-center lg:justify-start">
                <ALink href={"/"} className="bg-primary text-white px-14 py-3">
                  Bestil hjemmetest
                </ALink>
              </div>
            </div>

            {currentIndex === 0 && (
              <Tween
                from={{ x: "100%" }}
                to={{ x: "200", duration: 0.4 }}
                repeat={1}
                repeatDelay={2}
                delay={1}
                yoyo={true}
              >
                <img
                  src="/images/slides/slide-1.png"
                  className="thumb absolute right-28 lg:right-0 bottom-0"
                  alt="background"
                />
              </Tween>
            )}
          </div>
        </SwiperSlide>

        <SwiperSlide className="flex lg:items-center h-[950px] lg:h-[575px] bg-[#f6cdcf]">
          <div className="container text-center lg:text-left">
            <div className="relative max-w-[720px] pt-40 lg:pt-14 z-10">
             <h1 className="text-4xl lg:text-5xl mb-5">
                Bliv testet og behandlet indenfor 24 timer uden at forlade dit
                hjem.
              </h1>

              <p className="text-lg mb-5">
                Vi hjælper dig med at teste dig selv og sender dig den
                <br className="hidden lg:block" /> medicin du skal bruge for at
                blive behandlet.{" "}
              </p>

              <h1 className="text-4xl lg:text-5xl mb-2">Kun 99,00 kr.</h1>

              <p className="mb-10">+ 25 kr i forsendelse.</p>

              <div className="flex justify-center lg:justify-start">
                <ALink href={"/"} className="bg-primary text-white px-14 py-3">
                  Bestil hjemmetest
                </ALink>
              </div>
            </div>
          </div>

          {currentIndex === 1 && (
            <Tween
              from={{ y: "100%" }}
              to={{ y: "0", duration: 0.4 }}
              repeat={1}
              repeatDelay={2}
              delay={1}
              yoyo={true}
            >
              <img
                src="/images/slides/slide-2.png"
                className="thumb absolute lg:right-20 bottom-0"
                alt="background"
              />
            </Tween>
          )}
        </SwiperSlide>

        <SwiperSlide className="flex lg:items-center h-[950px] lg:h-[575px] bg-[#cde0f9]">
          <div className="container text-center lg:text-left">
            <div className="relative max-w-[720px] pt-40 lg:pt-14 z-10">
             <h1 className="text-4xl lg:text-5xl mb-5">
                Bliv testet og behandlet indenfor 24 timer uden at forlade dit
                hjem.
              </h1>

              <p className="text-lg mb-5">
                Vi hjælper dig med at teste dig selv og sender dig den
                <br className="hidden lg:block" /> medicin du skal bruge for at
                blive behandlet.{" "}
              </p>

              <h1 className="text-4xl lg:text-5xl mb-2">Kun 99,00 kr.</h1>

              <p className="mb-10">+ 25 kr i forsendelse.</p>

              <div className="flex justify-center lg:justify-start">
                <ALink href={"/"} className="bg-primary text-white px-14 py-3">
                  Bestil hjemmetest
                </ALink>
              </div>
            </div>
          </div>

          {currentIndex === 2 && (
            <Tween
              from={{ x: "100%" }}
              to={{ x: "0", duration: 0.4 }}
              repeat={1}
              repeatDelay={2}
              delay={1}
              yoyo={true}
            >
              <img
                src="/images/slides/slide-3.png"
                className="thumb absolute right-0 bottom-20"
                alt="background"
              />
            </Tween>
          )}
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default IntroSection;
