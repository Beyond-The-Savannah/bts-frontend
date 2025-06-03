import * as React from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export default async function WhatsAppsEmailTemplate({
  firstName, whatsAppExpiringLink
}: {
  firstName: string;
  whatsAppExpiringLink: string;
}) {

  return (
    <>
      <Html>
        <Head />
        <Preview>
          Welcome to Beyond the Savannah’s WhatsApp Community! 🎉{" "}
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
              <Text style={text}>Hi {firstName},</Text>
              <Text style={text}>
                Welcome to the Beyond the Savannah community! We&apos;re excited
                to have you on board as we share valuable insights, job
                opportunities, and expert tips to help you navigate remote work
                successfully.
              </Text>

              <Text style={text}>
                Click the link below to join our WhatsApp group and stay
                connected:
              </Text>
              <Link
                style={button} 
                href={whatsAppExpiringLink}
              >
                WhatsApp Link
              </Link>

              <Text style={text}>
                We can&apos;t wait to connect with you!
                <Link
                  style={anchor}
                  href="https://beyondthesavannah.co.ke/"
                ></Link>
              </Text>
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

const button = {
  backgroundColor: "hsl(188, 34%, 17%)",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};
