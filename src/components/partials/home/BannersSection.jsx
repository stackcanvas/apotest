import ALink from "@/components/features/ALink";
import { Button } from "antd";
import Image from "next/image";

const BannersSection = () => {
  return (
    <section className="my-5">
      <div className="grid grid-flex-row grid-cols-12 lg:grid-cols-10">
        <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-2">
          <div className="group banner relative bg-[#ff9987] overflow-hidden">
            <Image
              className="w-full group-hover:opacity-0 transition-all"
              src={"/images/banners/1.png"}
              width={285}
              height={450}
              alt="Banner"
            />

            <h4 className="absolute top-12 left-0 right-0 text-center text-xl uppercase">
              Klamydia
            </h4>

            <div className="h-[80%] animate p-5 absolute bottom-0 left-0 right-0 bg-[#ff9987] translate-y-[100%] transition-all group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
              <p className="mb-10">
                Du modtager en neutral konvolut med alt hvad du skal bruge for
                at kunne teste dig selv derhjemme. Hvis du er positiv udskriver
                vi en recept på medicin som du modtager med posten.
              </p>

              <ALink href={"/orders/herpes-on-the-sexual-oragans"}>
                <Button
                  size="large"
                  className="block bg-red-400 border-red-400 mb-4 w-full"
                >
                  køb
                </Button>
              </ALink>

              <Button
                size="large"
                className="block bg-white hover:bg-[#CCCCCB] transition-all border-white hover:border-[#CCCCCB] w-full"
              >
                Læs mere
              </Button>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-2">
          <div className="group banner relative bg-[#f1b1b5] overflow-hidden">
            <Image
              className="w-full group-hover:opacity-0 transition-all"
              src={"/images/banners/2.png"}
              width={285}
              height={450}
              alt="Banner"
            />

            <h4 className="absolute top-12 left-0 right-0 text-center text-xl uppercase">
              FORNY P-PILLER
            </h4>

            <div className="h-[80%] animate p-5 absolute bottom-0 left-0 right-0 bg-[#f1b1b5] translate-y-[100%] transition-all group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
              <p className="mb-10">
                Har du allerede en recept på p-piller, vil vi kunne forny din
                recept alle ugens 7 dage døgnet rundt. Du skal blot svare på
                nogle enkelte spørgsmål, for at for fornyet din recept på
                p-piller.
              </p>

              <ALink href={"/orders/order-2"}>
                <Button
                  size="large"
                  className="block mb-4 w-full bg-[#E67F86] border-[#E67F86]"
                >
                  køb
                </Button>
              </ALink>

              <Button
                size="large"
                className="block bg-white hover:bg-[#CCCCCB] transition-all border-white hover:border-[#CCCCCB] w-full"
              >
                Læs mere
              </Button>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-2">
          <div className="group banner relative bg-[#85ccd6] overflow-hidden">
            <Image
              className="w-full group-hover:opacity-0 transition-all"
              src={"/images/banners/3.png"}
              width={285}
              height={450}
              alt="Banner"
            />

            <h4 className="absolute top-12 left-0 right-0 text-center text-xl uppercase">
              Klamydia
            </h4>

            <div className="h-[80%] animate p-5 absolute bottom-0 left-0 right-0 bg-[#85ccd6] translate-y-[100%] transition-all group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
              <p className="mb-10">
                Du modtager en neutral konvolut med alt hvad du skal bruge for
                at kunne teste dig selv derhjemme. Hvis du er positiv udskriver
                vi en recept på medicin som du modtager med posten.
              </p>

              <ALink href={"/orders/genital-warts"}>
                <Button
                  size="large"
                  className="block bg-[#0AB0D9] border-[#0AB0D9] mb-4 w-full"
                >
                  køb
                </Button>
              </ALink>

              <Button
                size="large"
                className="block bg-white hover:bg-[#CCCCCB] transition-all border-white hover:border-[#CCCCCB] w-full"
              >
                Læs mere
              </Button>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-2">
          <div className="group banner relative bg-[#f9d395] overflow-hidden">
            <Image
              className="w-full group-hover:opacity-0 transition-all"
              src={"/images/banners/4.png"}
              width={285}
              height={450}
              alt="Banner"
            />

            <h4 className="absolute top-12 left-0 right-0 text-center text-xl uppercase">
              Klamydia
            </h4>

            <div className="h-[80%] animate p-5 absolute bottom-0 left-0 right-0 bg-[#f9d395] translate-y-[100%] transition-all group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
              <p className="mb-10">
                Du modtager en neutral konvolut med alt hvad du skal bruge for
                at kunne teste dig selv derhjemme. Hvis du er positiv udskriver
                vi en recept på medicin som du modtager med posten.
              </p>

              <ALink href={"/orders/chlamydia"}>
                <Button
                  size="large"
                  className="block bg-[#F3AE57] border-[#F3AE57] mb-4 w-full"
                >
                  køb
                </Button>
              </ALink>

              <Button
                size="large"
                className="block bg-white hover:bg-[#CCCCCB] transition-all border-white hover:border-[#CCCCCB] w-full"
              >
                Læs mere
              </Button>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-2">
          <div className="group banner relative bg-[#cccccc] overflow-hidden">
            <Image
              className="w-full group-hover:opacity-0 transition-all"
              src={"/images/banners/5.png"}
              width={285}
              height={450}
              alt="Banner"
            />

            <h4 className="absolute top-12 left-0 right-0 text-center text-xl uppercase">
              Klamydia
            </h4>

            <div className="h-[80%] animate p-5 absolute bottom-0 left-0 right-0 bg-[#cccccc] translate-y-[100%] transition-all group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
              <p className="mb-10">
                Du modtager en neutral konvolut med alt hvad du skal bruge for
                at kunne teste dig selv derhjemme. Hvis du er positiv udskriver
                vi en recept på medicin som du modtager med posten.
              </p>

              <ALink href={"/orders/urinary-tract-infection"}>
                <Button
                  size="large"
                  className="block bg-[#A7A7A5] border-[#A7A7A5] mb-4 w-full"
                >
                  køb
                </Button>
              </ALink>

              <Button
                size="large"
                className="block bg-white hover:bg-[#CCCCCB] transition-all border-white hover:border-[#CCCCCB] w-full"
              >
                Læs mere
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannersSection;
