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
  lastName,
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

              {/* <section style={ticketSection}>
                <Text style={text}>Admit One</Text>
                <Text style={text}>TICKET</Text>
                <Text style={text}>Remote & Ready: A Remote Work Mixer</Text>
                <Text style={text}>Amount:ksh{amount / 10}</Text>
                <Text style={text}>Location : BaoBox</Text>
                <Text style={text}>Time : 2:00 pm to 8:00 pm</Text>
              </section> */}

              <Section style={ticketSection}>
                {/* Header/Stripe */}
                <Text style={ticketHeader}>ADMIT ONE</Text>

                <Section style={ticketBody}>
                  <Text style={ticketTitle}>{eventName}</Text>

                  {/* Dashed Divider */}
                  <div style={divider} />

                  <Text style={ticketDetail}>
                    <strong>Attendee:</strong> {firstName} {lastName}
                  </Text>
                  <Text style={ticketDetail}>
                    <strong>Amount:</strong> KES {amount/100}
                  </Text>
                  <Text style={ticketDetail}>
                    <strong>Location:</strong> BaoBox
                  </Text>
                  <Text style={ticketDetail}>
                    <strong>Time:</strong> 2:00 PM - 8:00 PM
                  </Text>
                  <Text style={ticketDetail}>
                    <strong>Date:</strong> 14-March-2026
                  </Text>

                  {/* <Text style={ticketFooter}>
                    Please present this at the entrance
                  </Text> */}
                </Section>
              </Section>

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


const anchor = {
  textDecoration: "underline",
};

const ticketSection = {
  margin: "40px 0",
  borderRadius: "8px",
  overflow: "hidden",
  border: "1px solid #e0e0e0",
  backgroundColor: "#ffffff",
  // This creates the "stub" look on the left
  borderLeft: "10px solid hsl(188, 34%, 17%)", 
  borderRight: "10px solid hsl(188, 34%, 17%)", 
  backgroundImage:"linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), url(`https://res.cloudinary.com/dh8qlzbzk/image/upload/v1736518541/BTS_Logo_xa2iht.webp`)",
  backgroundPosition:"bottom right",
  backgroundRepeat:"no-repeat",
  backgroundSize:"contain",
  position:"relative" as const,
  zIndex:"1",
};

const ticketHeader = {
  backgroundColor: "hsl(188, 34%, 17%)",
  color: "#fff",
  padding: "8px",
  margin: "0",
  fontSize: "14px",
  fontWeight: "bold",
  letterSpacing: "2px",
  textAlign: "center" as const,
  position:"relative" as const,
  zIndex:"2",
};

const ticketBody = {
  padding: "24px",
  textAlign: "left" as const,
  position:"relative" as const,
  zIndex:"2",
};

const ticketTitle = {
  fontSize: "20px",
  fontWeight: "bold",
  margin: "0 0 10px 0",
  color: "#1a1a1a",
  textAlign:"center" as const,
  position:"relative" as const,
  zIndex:"2",
};

const ticketDetail = {
  fontSize: "14px",
  margin: "4px 0",
  color: "#4a4a4a",
  position:"relative" as const,
  zIndex:"2",
};

const divider = {
  borderBottom: "1px dashed #dbdbdb",
  margin: "15px 0",
  width: "100%",
  position:"relative" as const,
  zIndex:"2",
};

// const ticketFooter = {
//   fontSize: "11px",
//   color: "#888",
//   marginTop: "20px",
//   fontStyle: "italic",
// };
