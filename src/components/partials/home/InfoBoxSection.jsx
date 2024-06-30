const InfoBoxSection = () => {
  return (
    <section className="py-12 my-5 bg-[#F6F6F6]">
      <div className="container">
        <div className="grid grid-flex-row grid-cols-12 gap-5">
          <div className="col-span-12 lg:col-span-4">
            <div className="info-box">
              <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center text-white mb-2">
                1
              </div>

              <div className="details text-[#36454F]">
                <h3 className="uppercase font-medium mb-3">
                  bestil test online
                </h3>

                <p>
                  Log ind med MitID og bestil en test, for det du gerne vil
                  testes for. Hvis du bestiller testen inden kl 14.00 modtager
                  du testen samme aften.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="info-box">
              <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center text-white mb-2">
                2
              </div>

              <div className="details text-[#36454F]">
                <h3 className="uppercase font-medium mb-3">test dig selv</h3>

                <p>
                  Følg anvisningerne og lav selv testen derhjemme. Du får
                  afklaring på om du er smittet indenfor kun 10 minutter.
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="info-box">
              <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center text-white mb-2">
                3
              </div>

              <div className="details text-[#36454F]">
                <h3 className="uppercase font-medium mb-3">
                  Bliv behandlet hjemme
                </h3>

                <p>
                  Hvis du er smittet sender du et billede af testen til os.
                  Indenfor 24 timer modtager du en recept og link til hvor du
                  kan købe medicinen online.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxSection;
