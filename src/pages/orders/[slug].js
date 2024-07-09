import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Loading from "@/components/features/Loading";
import { toast } from "react-toastify";
import { getSingleService } from "@/lib/strapi";
import axios from "axios";

const style = {
  iconStyle: "solid",
  base: {
    color: "#303238",
    fontSize: "16px",
    fontFamily: '"Open Sans", sans-serif',
    fontSmoothing: "antialiased",
    "::placeholder": {
      color: "#CFD7DF",
    },
  },
  invalid: {
    color: "#e5424d",
    ":focus": {
      color: "#303238",
    },
  },
};

const OrderPage = () => {
  const slug = useRouter().query.slug;
  const [service, setService] = useState();
  const [loading, setLoading] = useState(false);
  const [billingDetails, setBillingDetails] = useState();
  const [step, setStep] = useState("0");
  const [customerName, setCustomerName] = useState("");
  const [question1, setQuestion1] = useState(-1);
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState(-1);
  const [confirm, setConfirm] = useState(false);
  const navigation = useRouter();

  const consultationFee = 99;
  const shipmentFee = 25;

  const urlParamsObject = {
    populate: {
      media: {
        populate: "*",
      },
    },
  };

  useEffect(() => {
    if (slug) {
      const getSingleProductFunc = async (slug) => {
        const data = await getSingleService(
          `services?filters[slug][$eq]=${slug}`,
          urlParamsObject
        );

        setService(data ? data[0]?.attributes : {});
      };

      getSingleProductFunc(slug);
    }
  }, [slug]);

  const onFinish = (values) => {
    setBillingDetails(values);
    setStep(step.concat("1"));
  };

  const onCancel = () => {
    if (step !== "0") {
      setStep(step.slice(0, -1));
    }
  };

  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStep(step.concat("2"));
  };

  const handleOrderComplete = async () => {
    setLoading(true);

    console.log(service, "service");

    if (!stripe || !elements) {
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            title: service?.title,
            slug: service?.slug,
            totalPrice: (
              service?.price +
              consultationFee +
              shipmentFee
            ).toFixed(2),
            orderStartDate: new Date(),
            shippingInfo: {
              zipCode: billingDetails.zipCode,
              firstName: billingDetails.firstName,
              lastName: billingDetails.lastName,
              address: billingDetails.address,
              address2: billingDetails.address2,
              email: billingDetails.email,
            },
            Question: {
              question1: question1 === 1 ? true : false,
              question2: question2,
              question3: question3 === 1 ? true : false,
              confirm: confirm,
            },
          },
        }),
      });

      if (res?.ok) {
        const card = elements.getElement(CardNumberElement);

        try {
          const { error, token } = await stripe.createToken(card);

          if (error) {
            console.log("[error]", error);
            setError(error.message);

            toast.error("Order Failed!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else {
            console.log("[token]", token);
            setError(null);

            try {
              // Send the Stripe token and the payment amount to the server-side
              const response = await axios.post("/api/charge", {
                stripeToken: token.id,
                amount: service?.price + consultationFee + shipmentFee, // Amount in the smallest currency unit (e.g., cents for USD)
                billingDetails: { ...billingDetails, fullName: customerName },
              });

              console.log("Order successful:", response.data);

              toast.success("Order Success!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });

              setTimeout(() => {
                setLoading(false);
                navigation.replace("/");
              }, 1000);
            } catch (error) {
              console.error("Order failed:", error);

              toast.warn("Amount must convert to at least 50 cents", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });

              setTimeout(() => {
                setLoading(false);
                setStep("01");
              }, 1000);
            }
          }
        } catch (error) {
          console.error(error, "Server Error");

          toast.error("Stripe Server Error!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.error(error, "Server Error");

      toast.error("CMS Error!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <>
      {loading && <Loading />}

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

              <div
                className={`top-0 left-0 right-0 bg-white ${
                  step.length === 1 && step.includes("0")
                    ? "relative opacity-100 z-10"
                    : "absolute opacity-0"
                }`}
              >
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
              </div>

              <div
                className={`top-0 left-0 right-0 bg-white ${
                  step.length === 2 && step.includes("1")
                    ? "relative opacity-100 z-10"
                    : "absolute opacity-0"
                }`}
              >
                <h3 className="text-lg font-medium mb-2">
                  Betalingsoplysninger
                </h3>

                <p className="max-w-[730px] mb-10">
                  Indtast dine kortoplysninger og godkend købet. Vi behandler
                  dine betalingsoplysninger anonymt
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-flex-row grid-cols-12 gap-5">
                    <div className="col-span-12 lg:col-span-6">
                      <div className="flex items-center mb-5">
                        <h3 className="w-[160px]">Navn</h3>

                        <div className="flex items-center flex-1 border h-[47px] rounded-lg focus:border-primary transition-all overflow-hidden">
                          <input
                            defaultValue={
                              billingDetails?.firstName +
                              " " +
                              billingDetails?.lastName
                            }
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="form-control w-full h-full px-3 border-none outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex items-center mb-5">
                        <h3 className="w-[160px]">Kortnummer</h3>

                        <div className="flex items-center flex-1 border h-[47px] rounded-lg focus:border-primary transition-all">
                          <CardNumberElement
                            className="w-full px-3"
                            options={{ style }}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="flex items-center mb-5">
                        <h3 className="w-[160px]">Udløbsdato</h3>

                        <div className="flex items-center border w-[100px] h-[47px] rounded-lg focus:border-primary transition-all">
                          <CardExpiryElement
                            className="w-full px-3"
                            options={{ style }}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="flex items-center mb-5">
                        <h3 className="w-[160px]">CVC</h3>

                        <div className="flex items-center border w-[100px] h-[47px] rounded-lg focus:border-primary transition-all">
                          <CardCvcElement
                            className="w-full px-3"
                            options={{ style }}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div>{error}</div>

                      <h3 className="font-medium text-lg mt-10">
                        Total beløb:{" "}
                        {(
                          service?.price +
                          consultationFee +
                          shipmentFee
                        )?.toFixed(2)}{" "}
                        kr.
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
                            <span>{service?.price?.toFixed(2)} kr.</span>
                          </li>

                          <li className="flex items-center justify-between">
                            <span>Konsultation</span>
                            <span>{consultationFee?.toFixed(2)} kr.</span>
                          </li>

                          <li className="flex items-center justify-between">
                            <span>Forsendelse</span>
                            <span>{shipmentFee?.toFixed(2)} kr.</span>
                          </li>
                        </ul>

                        <div className="flex items-center justify-between font-bold text-lg mt-10">
                          <span>Total</span>
                          <span>
                            {(
                              service?.price +
                              consultationFee +
                              shipmentFee
                            )?.toFixed(2)}{" "}
                            kr.
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-12">
                      <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        className="flex items-center justify-between w-[236px] mt-7"
                        disabled={!stripe || !elements}
                      >
                        <span>Bekræft</span>

                        <ArrowRightOutlined />
                      </Button>
                    </div>
                  </div>
                </form>
              </div>

              <div
                className={`top-0 left-0 right-0 bg-white ${
                  step.length === 3 && step.includes("2")
                    ? "relative opacity-100 z-10"
                    : "absolute opacity-0"
                }`}
              >
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
                          className={`block w-[100px] ${
                            question1 === 1
                              ? "bg-green-400 border-green-400"
                              : ""
                          }`}
                          onClick={() => setQuestion1(1)}
                        >
                          Ja
                        </Button>

                        <Button
                          type="primary"
                          size="large"
                          className={`block w-[100px] ${
                            question1 === 0
                              ? "bg-green-400 border-green-400"
                              : ""
                          }`}
                          onClick={() => setQuestion1(0)}
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
                          className={`block w-[100px] ${
                            question2 === "Penis" ? "bg-green-400" : ""
                          }`}
                          onClick={() => setQuestion2("Penis")}
                        >
                          Penis
                        </Button>

                        <Button
                          type="primary"
                          size="large"
                          className={`block w-[100px] ${
                            question2 === "Vagina" ? "bg-green-400" : ""
                          }`}
                          onClick={() => setQuestion2("Vagina")}
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
                          className={`block w-[100px] ${
                            question3 === 1 ? "bg-green-400" : ""
                          }`}
                          onClick={() => setQuestion3(1)}
                        >
                          Ja
                        </Button>

                        <Button
                          type="primary"
                          size="large"
                          className={`block w-[100px] ${
                            question3 === 0 ? "bg-green-400" : ""
                          }`}
                          onClick={() => setQuestion3(0)}
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
                          className={`block w-[100px] ${
                            confirm ? "bg-green-400" : ""
                          }`}
                          onClick={() => setConfirm(!confirm)}
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
              </div>

              <div
                className={`top-0 left-0 right-0 bg-white ${
                  step.length === 4 && step.includes("3")
                    ? "relative opacity-100 z-10"
                    : "absolute opacity-0"
                }`}
              >
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
                  onClick={() => {
                    handleOrderComplete();
                  }}
                  className="flex items-center justify-between w-[236px] mt-10"
                >
                  <span>Chat med os</span>

                  <ArrowRightOutlined />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default OrderPage;
