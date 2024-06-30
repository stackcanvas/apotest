import { Button, Form, Input } from "antd";

const ContactFormSection = () => {
  const onFinish = (values) => {
    console.log(values, "Contact Form");
  };

  return (
    <section className="pt-12 pb-8 my-5 bg-[#F6F6F6]">
      <div className="container">
        <div className="max-w-[770px]">
          <h3 className="text-lg uppercase font-medium mb-2">Whistleblower</h3>

          <p className="mb-5">
            Fortæl os en du har været sammen med, der potientielt er smittet. Så
            fortæller vi dem det anonnymt i en sms og giver dem 25% rabat på
            vores hjemmetest.
          </p>

          <Form layout="vertical" onFinish={onFinish}>
            <div className="grid grid-flex-row grid-cols-12 gap-2">
              <div className="col-span-12 lg:col-span-4">
                <Form.Item name="name">
                  <Input size="large" placeholder="Navn" />
                </Form.Item>
              </div>

              <div className="col-span-12 lg:col-span-4">
                <Form.Item name="phone">
                  <Input size="large" placeholder="Mobilnummer" />
                </Form.Item>
              </div>

              <div className="col-span-12 lg:col-span-4">
                <Form.Item name="phone">
                  <Button size="large" className="w-full" type="primary" htmlType="submit">
                    Send besked
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
