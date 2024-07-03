import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import Card from "react-credit-cards";
import axios from "axios";

const OrderPage = () => {
  const slug = useRouter().query.slug;
  const [step, setStep] = useState("01");
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });

  const onFinish = async (values) => {
    setStep(step.concat("1"));
  };

  const onPayment = async (values) => {
    try {
      const response = await axios.post("/api/credit-card", card);
      // Handle successful payment
      console.log(response.data.message);
      setStep(step.concat("2"));
    } catch (error) {
      // Handle payment error
      console.error("Error processing payment:", error.response.data.error);
    }
  };

  const onCancel = () => {
    if (step !== "0") {
      setStep(step.slice(0, -1));
    }
  };

  const handleInputChange = ({ target }) => {
    if (target.name === "number") {
      setCard({ ...card, number: target.value });
    } else if (target.name === "expiry") {
      setCard({ ...card, expiry: target.value });
    } else if (target.name === "cvc") {
      setCard({ ...card, cvc: target.value });
    } else if (target.name === "name") {
      setCard({ ...card, name: target.value });
    }
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

        <div className="page-content pt-10 pb-10">
          <div className="relative">
            {step !== "0" && (
              <a
                href="#"
                className="flex items-center space-x-2 hover:text-primary transition-all xl:absolute xl:right-full xl:pr-7 xl:top-[1px] mb-5"
                onClick={(e) => {
                  e.preventDefault();
                  onCancel();
                }}
              >
                <ArrowLeftOutlined />
                <span>Tilbage</span>
              </a>
            )}

            {step.length === 1 && step.includes("0") && (
              <>
                <h3 className="text-lg font-medium mb-2">Leveringsadresse</h3>

                <p className="max-w-[730px] mb-10">
                  Vi sender pakken til dig på denne adresse i en anonym hvid
                  kuvert. Pakken bliver leveret med Burd alle hverdage imellem
                  kl 18 og 22, hvis du har bestilt inden kl 14 eller
                  efterfølgende hverdagsaften, hvis du har bestilt en hverdag
                  efter kl 14.
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
                          <Input
                            size="large"
                            className="md:w-[100px] h-[47px]"
                          />
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
                          <Input
                            size="large"
                            className="md:w-[200px] h-[47px]"
                          />
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
                          <Input
                            size="large"
                            className="md:w-[200px] h-[47px]"
                          />
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
                          <Input
                            size="large"
                            className="md:w-[479px] h-[47px]"
                          />
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
                          <Input
                            size="large"
                            className="md:w-[479px] h-[47px]"
                          />
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
                          <Input
                            size="large"
                            className="md:w-[479px] h-[47px]"
                          />
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
                <h3 className="text-lg font-medium mb-2">
                  Betalingsoplysninger
                </h3>

                <p className="max-w-[730px] mb-10">
                  Indtast dine kortoplysninger og godkend købet. Vi behandler
                  dine betalingsoplysninger anonymt
                </p>

                <div className="h-0 opacity-0">
                  <Card
                    number={card.number}
                    name={card.name}
                    expiry={card.expiry}
                    cvc={card.cvc}
                    focused={card.focused}
                  />
                </div>

                <Form onFinish={onPayment}>
                  <div className="grid grid-flex-row grid-cols-12 gap-5">
                    <div className="col-span-12 lg:col-span-6">
                      <div className="flex items-center space-x-5 mb-5">
                        <h3 className="font-medium w-[160px]">Navn</h3>

                        <div className="flex-1">
                          <Form.Item
                            name="cardName"
                            className="mb-0"
                            rules={[
                              {
                                required: true,
                                message: "Please input your credit card name",
                              },
                            ]}
                          >
                            <Input
                              name="name"
                              className="w-full h-[47px]"
                              onChange={handleInputChange}
                            />
                          </Form.Item>
                        </div>
                      </div>

                      <div className="flex items-center space-x-5 mb-5">
                        <h3 className="font-medium w-[160px]">Kortnummer</h3>

                        <div className="flex-1">
                          <Form.Item
                            name="cardNumber"
                            className="mb-0"
                            rules={[
                              {
                                required: true,
                                message: "Please input your credit card number",
                              },
                              {
                                pattern: /^[0-9\s]{16,22}$/,
                                message:
                                  "Please enter a valid credit card number",
                              },
                            ]}
                          >
                            <Input
                              type="tel"
                              name="number"
                              className="w-full h-[47px]"
                              onChange={handleInputChange}
                            />
                          </Form.Item>
                        </div>
                      </div>

                      <div className="flex items-center space-x-5 mb-5">
                        <h3 className="font-medium w-[160px]">Udløbsdato</h3>

                        <div className="flex-1">
                          <Form.Item
                            name="expirationDate"
                            className="mb-0"
                            rules={[
                              {
                                required: true,
                                message:
                                  "Please enter your credit card expiration date",
                              },
                              {
                                pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
                                message:
                                  "Please enter a valid expiration date in the format MM/YY",
                              },
                            ]}
                          >
                            <Input
                              type="tel"
                              name="expiry"
                              className="w-[100px] h-[47px]"
                              onChange={handleInputChange}
                            />
                          </Form.Item>
                        </div>
                      </div>

                      <div className="flex items-center space-x-5 mb-5">
                        <h3 className="font-medium w-[160px]">CVC</h3>

                        <div className="flex-1">
                          <Form.Item
                            name="cvc"
                            className="mb-0"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your credit card CVC",
                              },
                              {
                                pattern: /^\d{3,4}$/,
                                message:
                                  "Please enter a valid CVC (3 or 4 digits)",
                              },
                            ]}
                          >
                            <Input
                              name="cvc"
                              className="w-[100px] h-[47px]"
                              onChange={handleInputChange}
                            />
                          </Form.Item>
                        </div>
                      </div>

                      <h3 className="font-medium text-lg mt-10">
                        Total beløb: 223,00 kr.
                      </h3>
                    </div>

                    <div className="col-span-12 lg:col-span-6 lg:pl-10">
                      <div className="max-w-[300px]">
                        <h3 className="text-lg font-medium mb-5">
                          Detaljer om købet
                        </h3>

                        <ul className="text-lg">
                          <li className="flex items-center justify-between">
                            <span>Klamydia Test</span>
                            <span>99,00 kr.</span>
                          </li>

                          <li className="flex items-center justify-between">
                            <span>Konsultation</span>
                            <span>99,00 kr.</span>
                          </li>

                          <li className="flex items-center justify-between">
                            <span>Forsendelse</span>
                            <span>25,00 kr.</span>
                          </li>
                        </ul>

                        <div className="flex items-center justify-between font-bold text-lg mt-10">
                          <span>Total</span>
                          <span>223,00 kr.</span>
                        </div>
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
                          <span>Bekræft</span>

                          <ArrowRightOutlined />
                        </Button>
                      </Form.Item>
                    </div>
                  </div>
                </Form>
              </>
            )}

            {step.length === 3 && step.includes("2") && (
              <>
                <h3 className="text-lg font-medium mb-2">Konsultation</h3>

                <p className="max-w-[730px] mb-10">
                  For at vi kan udskrive en recept til dig i tilfælde af at du
                  får en positiv test, skal du besvare nogle spørgsmål der
                  hjælper os med at sikre, at du modtager den korrekte
                  behandling. Det er vigtigt at du svarer ærligt, så din
                  behandling kommer til at forløbe så problemfrit som muligt.
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
                        Hvis du oplever nogen af disse symptomer, bør du
                        kontakte din egen læge. Disse symptomer kræver akut
                        klinisk vurdering.
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
                      onClick={() => setStep(step.concat("3"))}
                    >
                      <span>Bekræft bestilling</span>

                      <ArrowRightOutlined />
                    </Button>
                  </div>
                </div>
              </>
            )}

            {step.length === 4 && step.includes("3") && (
              <>
                <h3 className="text-lg font-medium mb-2">
                  Tak for din tillid. Din bestilling er modtaget.
                </h3>

                <p className="max-w-[730px] mb-10">
                  Har du bestilt en test inden kl 14.00 på en hverdag modtafger
                  du din bestilling i aften mellem kl 18.00 og 22.00. Ellers
                  modtager du den i samme tidsrum næste hverdagsaften.
                </p>

                <p className="max-w-[730px] mb-10">
                  Du modtager snart en mail med bekræftelse på din bestilling. I
                  mailen står der detaljer til din bestilling der er være
                  vigtige for dig at læse. Hvis du ikke modtager mailen indenfor
                  de næste 30 minutter skal du se efter den i din spam mappe.
                  Hvis den ikke er der skal du skrive til os på info@apotest.dk.
                  Så sender vi den til dig igen.
                </p>

                <h3 className="text-lg font-medium mb-2">
                  Vi er her for at hjælpe med at besvare dine spørgsmål.
                </h3>

                <p className="max-w-[730px] mb-10">
                  Hvis du har nogen spørgsmål er vi klar til at besvare dem på
                  chatten 24/7.
                </p>

                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="flex items-center justify-between w-[236px] mt-10"
                >
                  <span>Chat med os</span>

                  <ArrowRightOutlined />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderPage;
