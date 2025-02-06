import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
// import { EmailProps } from "@/types/email";

// export default function EmailTemplate({ email }: EmailProps) {
export default function EmailTemplate() {
  return (
    <>
      <Html>
        <Head />
        <Preview>Beyond The Savannah calendly session Link</Preview>
        <Body style={main}>
          <Container style={container}>
            <Section style={logo}>
              <Img
                src={`https://res.cloudinary.com/dh8qlzbzk/image/upload/v1736518541/BTS_Logo_xa2iht.webp`}
                width="114"
                //   height="33"
                alt="Dropbox"
              />
            </Section>
            <Section>
              {/* <Text style={text}>Hi {email},</Text> */}
              <Text style={text}>Dear Client,</Text>
              <Text style={text}>
                Thank you once again for choosing Beyond the Savannah for your
                service(s). We&apos;re excited to begin working with you.
              </Text>
              <Text style={text}>
                To make it as convenient as possible, please go ahead and select
                a date and time that works best for you
              </Text>
              <Text style={text}>
                Just click the button below to view our availability and book
                your session:
              </Text>
              <Button
                style={button}
                href={`https://calendly.com/beyondthesavannah-info`}
              >
                Calendly Link
              </Button>
              <Text style={text}>
                Once scheduled, you&apos;ll receive a confirmation email with
                all the details.If you have any questions or need further
                assistance, please don&apos;t hesitate to reach out to us the
                email : info@beyondthesavannah.co.ke
              </Text>
              <Text style={text}>
                Looking forward to our session!
                <Link
                  style={anchor}
                  href="https://beyondthesavannah.co.ke/"
                ></Link>
              </Text>
              <Text style={text}>Regards, <br/>Beyond the Savannah Team</Text>
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
//   padding: 30,
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
  backgroundColor: "#007ee6",
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
