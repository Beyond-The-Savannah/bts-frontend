import * as React from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { PaystackWebhookEmailProps } from "@/types/email";


export default function PaystackWebhookTemplate({
    firstName,
    email,
    paystackId,
    customerId,
    eventName,
}:PaystackWebhookEmailProps
) {
  return (
    <>
      <Html>
        <Head />
        <Preview>
          `Webhook Subscription Event - {eventName}`
        </Preview>
        <Body style={main}>
          <Container style={container}>
            <Section style={logo}>
              <Img
                src={`https://res.cloudinary.com/dh8qlzbzk/image/upload/v1736518541/BTS_Logo_xa2iht.webp`}
                width="114"
                //   height="33"
                alt="Beyond The Savannah Logo"
              />
            </Section>
            <Section>
              <Text style={text}>Hi {firstName ?? "There"},</Text>
              <br/>
              <Text style={text}>
                There was a subcription cancellation
              </Text>
              <Text style={text}>
                Here are their details:
              </Text>
              <Text style={text}>
                Email: {email}
              </Text>
              <Text style={text}>
                Paystack Id: {paystackId}
              </Text>
              <Text style={text}>
                Customer Id: {customerId}
              </Text>

            <br/>
            <br/>
            <br/>
            <br/>
              <Text style={text}>
                Regards, <br />
                Beyond the Savannah Team
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};
const logo = {
  display: "flex",
  justifyContent: "center",
  alingItems: "center",
  width: "580px",
  margin: "0 auto",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};



