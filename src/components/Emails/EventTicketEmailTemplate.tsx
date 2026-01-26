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
import { EventTicketEmailProps } from "@/types/email";

export default function EventTicketEmailTemplate({
  firstName,
  amount,
  eventName,
}: EventTicketEmailProps) {
  return (
    <>
      <Html>
        <Head />
        <Preview>
          Beyond The Savannah, &quot;{eventName}&quot; Event Ticket
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
              <Text style={text}>
                We&apos;re excited to have you be part of our mixer event.
              </Text>
              <Text style={text}>
                Please present your ticket on the day of the event to smooth
                admittance
              </Text>

              <section style={ticketSection}>
                <Text style={text}>Admit One</Text>
                <Text style={text}>TICKET</Text>
                <Text style={text}>Remote & Ready: A Remote Work Mixer</Text>
                <Text style={text}>Amount:ksh{amount / 10}</Text>
                <Text style={text}>Location : BaoBox</Text>
                <Text style={text}>Time : 2:00 pm to 8:00 pm</Text>
              </section>

              <Text style={text}>
                Looking forward to meeting you!
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

// const button = {
//   backgroundColor: "hsl(188, 34%, 17%)",
//   borderRadius: "4px",
//   color: "#fff",
//   fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
//   fontSize: "15px",
//   textDecoration: "none",
//   textAlign: "center" as const,
//   display: "block",
//   width: "210px",
//   padding: "14px 7px",
// };

const anchor = {
  textDecoration: "underline",
};

const ticketSection = {
  backgroundColor: "hsl(188, 34%, 17%)",
  border: "1px solid #f0f0f0",
  borderRadius: "4px",
  textAlign: "center" as const,
  display: "block",
  padding: "14px 7px",
  lineHeight: "14px",
  color: "#fff",
};
