import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

const OrderPage = () => {
  const slug = useRouter().query.slug;
  const [step, setStep] = useState("0");

  const onFinish = (values) => {
    setStep(step.concat("1"));
  };

  return (
    <main className="py-10">
      <div className="container">
        <div className="relative flex items-center">
          <div className="flex items-center justify-between max-w-[800px] mx-auto w-full z-10">
            <div
              className={`w-5 h-5 border-2 rounded-full border-black ${
                step.includes("0") ? "bg-primary" : "bg-white"
              }`}
            ></div>
            <div
              className={`w-5 h-5 border-2 rounded-full border-black ${
                step.includes("1") ? "bg-primary" : "bg-white"
              }`}
            ></div>
            <div
              className={`w-5 h-5 border-2 rounded-full border-black ${
                step.includes("2") ? "bg-primary" : "bg-white"
              }`}
            ></div>
            <div
              className={`w-5 h-5 border-2 rounded-full border-black ${
                step.includes("3") ? "bg-primary" : "bg-white"
              }`}
            ></div>
          </div>

          <hr className="border-2 border-black absolute left-0 right-0" />
        </div>

        <div className="page-content pt-10 pb-10 relative">
          {step.length === 1 && step.includes("0") && (
            <>
              <h3 className="text-lg font-medium mb-2">Leveringsadresse</h3>

              <p className="max-w-[730px] mb-10">
                Vi sender pakken til dig på denne adresse i en anonym hvid
                kuvert. Pakken bliver leveret med Burd alle hverdage imellem kl
                18 og 22, hvis du har bestilt inden kl 14 eller efterfølgende
                hverdagsaften, hvis du har bestilt en hverdag efter kl 14.
              </p>

              <Form layout="vertical" onFinish={onFinish}>
                <div className="grid grid-flex-row grid-cols-12 gap-5 items-center">
                  <div className="col-span-12 lg:col-span-2">
                    <h3 className="font-medium">Postnummer</h3>
                  </div>

                  <div className="col-span-12 lg:col-span-10">
                    <div className="flex items-center space-x-4">
                      <Form.Item
                        name="zipCode"
                        className="mb-0"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input size="large" className="md:w-[100px] h-[47px]" />
                      </Form.Item>

                      <h3 className="font-medium">
                        Vi leverer desværre ikke til dit postnummer! 😫
                        <br /> Se hvilke postnumre vi leverer til her.
                      </h3>
                    </div>
                  </div>

                  <div className="col-span-12 lg:col-span-2">
                    <h3 className="font-medium">Fornavn</h3>
                  </div>

                  <div className="col-span-12 lg:col-span-10">
                    <div className="flex items-center space-x-4">
                      <Form.Item
                        name="firstName"
                        className="mb-0"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input size="large" className="md:w-[200px] h-[47px]" />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="col-span-12 lg:col-span-2">
                    <h3 className="font-medium">Efternavn</h3>
                  </div>

                  <div className="col-span-12 lg:col-span-10">
                    <div className="flex items-center space-x-4">
                      <Form.Item
                        name="lastName"
                        className="mb-0"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input size="large" className="md:w-[200px] h-[47px]" />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="col-span-12 lg:col-span-2">
                    <h3 className="font-medium">Adresse</h3>
                  </div>

                  <div className="col-span-12 lg:col-span-10">
                    <div className="flex items-center space-x-4">
                      <Form.Item
                        name="address"
                        className="mb-0"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input size="large" className="md:w-[479px] h-[47px]" />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="col-span-12 lg:col-span-2">
                    <h3 className="font-medium">Adresse 2</h3>
                  </div>

                  <div className="col-span-12 lg:col-span-10">
                    <div className="flex items-center space-x-4">
                      <Form.Item
                        name="address2"
                        className="mb-0"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input size="large" className="md:w-[479px] h-[47px]" />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="col-span-12 lg:col-span-2">
                    <h3 className="font-medium">E-mail</h3>
                  </div>

                  <div className="col-span-12 lg:col-span-10">
                    <div className="flex items-center space-x-4">
                      <Form.Item
                        name="email"
                        className="mb-0"
                        rules={[
                          {
                            required: true,
                          },
                          {
                            type: "email",
                          },
                        ]}
                      >
                        <Input size="large" className="md:w-[479px] h-[47px]" />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="col-span-12">
                    <Form.Item className="mt-10 mb-0">
                      <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        className="flex items-center justify-between w-[236px]"
                      >
                        <span>Næste</span>

                        <ArrowRightOutlined />
                      </Button>
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </>
          )}

          {step.length === 2 && step.includes("1") && (
            <>
              <h3 className="text-lg font-medium mb-2">Konsultation</h3>

              <p className="max-w-[730px] mb-10">
                For at vi kan udskrive en recept til dig i tilfælde af at du får
                en positiv test, skal du besvare nogle spørgsmål der hjælper os
                med at sikre, at du modtager den korrekte behandling. Det er
                vigtigt at du svarer ærligt, så din behandling kommer til at
                forløbe så problemfrit som muligt.
              </p>

              <div className="grid grid-flex-row grid-cols-12 gap-5 items-center">
                <div className="col-span-12 lg:col-span-6">
                  <h3 className="font-medium mb-1">
                    Har du haft ubeskyttet sex indenfor de sidste 5 dage?
                  </h3>

                  <h3 className="mb-1">Med ubeskyttet sex mener vi :</h3>

                  <ul className="list-disc pl-5">
                    <li> Sex uden at bruge kondom </li>
                    <li>Sex hvor kondomet gik i stykker eller faldt af</li>
                  </ul>
                </div>

                <div className="col-span-12 lg:col-span-6">
                  <div className="flex items-center space-x-5">
                    <div className="space-y-2">
                      <Button
                        type="primary"
                        size="large"
                        className="block w-[100px]"
                      >
                        Ja
                      </Button>

                      <Button
                        type="primary"
                        size="large"
                        className="block w-[100px]"
                      >
                        Nej
                      </Button>
                    </div>

                    <p>
                      Klamydia kan først testes for efter 5 dage. Vent derfor
                      med at foretage testen til der er gået 5 dage fra sidste
                      gang du havde ubeskyttet sex.
                    </p>
                  </div>

                  <p className="text-red-500 italic">Du skal være én!</p>
                </div>

                <div className="col-span-12 lg:col-span-6">
                  <h3 className="font-medium mb-1">
                    Har du en penis eller en vagina?
                  </h3>

                  <h3 className="mb-1">
                    Hvordan testen skal udføres afhænger af om du har en penis
                    eller en vagina.
                  </h3>
                </div>

                <div className="col-span-12 lg:col-span-6">
                  <div className="flex items-center space-x-5">
                    <div className="space-y-2">
                      <Button
                        type="primary"
                        size="large"
                        className="block w-[100px]"
                      >
                        Penis
                      </Button>

                      <Button
                        type="primary"
                        size="large"
                        className="block w-[100px]"
                      >
                        Vagina
                      </Button>
                    </div>
                  </div>

                  <p className="text-red-500 italic">Du skal være én!</p>
                </div>

                <div className="col-span-12 lg:col-span-6">
                  <h3 className="font-medium mb-1">
                    Oplever du nogen af disse symptomer?
                  </h3>

                  <ul className="list-disc pl-5">
                    <li>Bækkensmerter eller usædvanlig vaginal blødning</li>
                    <li>Store mængder udflåd fra penis</li>
                    <li>Pludselig smerte i testiklerne</li>
                  </ul>
                </div>

                <div className="col-span-12 lg:col-span-6">
                  <div className="flex items-center space-x-5">
                    <div className="space-y-2">
                      <Button
                        type="primary"
                        size="large"
                        className="block w-[100px]"
                      >
                        Ja
                      </Button>

                      <Button
                        type="primary"
                        size="large"
                        className="block w-[100px]"
                      >
                        Nej
                      </Button>
                    </div>

                    <p>
                      Hvis du oplever nogen af disse symptomer, bør du kontakte
                      din egen læge. Disse symptomer kræver akut klinisk
                      vurdering.
                    </p>
                  </div>

                  <p className="text-red-500 italic">Du skal være én!</p>
                </div>

                <div className="col-span-12 lg:col-span-6">
                  <h3>
                    Jeg bekræfter på to og love at overstående oplysninger er
                    korrekte.
                  </h3>
                </div>

                <div className="col-span-12 lg:col-span-6">
                  <div className="flex items-center space-x-5">
                    <div className="space-y-2">
                      <Button
                        type="primary"
                        size="large"
                        className="block w-[100px]"
                      >
                        Bekræft
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="col-span-12">
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    className="flex items-center justify-between w-[236px] mt-10"
                    onClick={() => setStep(step.concat("2"))}
                  >
                    <span>Bekræft bestilling</span>

                    <ArrowRightOutlined />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default OrderPage;
