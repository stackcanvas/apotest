import Image from "next/image";

const BannerSection = () => {
  return (
    <section className="pt-16 pb-16 lg:pb-0">
      <div className="container">
        <div className="grid grid-flex-row grid-cols-12 gap-5">
          <div className="col-span-12 lg:col-span-4">
            <Image
              src={"/images/banner.png"}
              width={237}
              height={384}
              alt="Banner"
            />
          </div>

          <div className="col-span-12 lg:col-span-8">
            <h3 className="text-lg uppercase font-medium mb-2">
              Vi kan holde på en hemmelighed
            </h3>

            <p className="mb-5">
              Vi forstå at de informationer du deler med os for alt i verden
              skal forblive mellem os.
            </p>

            <p className="mb-5">
              Derfor garanterer vi at dit CPR nr. – ligesom resten af dine data
              – bliver opbevaret fortroligt og i overensstemmelse med gældende
              dansk lov. Vores sundhedspersoner har brug for dit danske CPR nr.
              for at kunne overholde deres journalføringspligt og sikre de har
              med den rette patient at gøre.
            </p>

            <p>
              Al trafik til og fra vores hjemmeside er krypteret. Dette kan ses
              ved at der i browseren vises https:// samt et lukket hængelås-ikon
              udfor adressen. HTTPS er en protokol, der sørger for en krypteret
              tunnel mellem din computer og det website, du får vist.
              Hjemmesider kan bruge HTTPS til at forhindre tredjeparter i at
              påvirke og læse de oplysninger som overføres.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
