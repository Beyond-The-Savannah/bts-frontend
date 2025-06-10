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
} from "@react-email/components"


export default function AllJobsAlertEmailTemplate({firstName}:{firstName:string}) {
  return (
    <>
     <Html>
            <Head />
            {/* <Preview>Beyond The Savannah calendly session Link</Preview> */}
            <Preview>
              Beyond The Savannah, New Job Alert
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
                    We have new jobs oppenings that we have posted on the site.
                    Head over to the site and see what opportunities await you
                    Thank you once again for choosing Beyond the Savannah for your
                    services. We&apos;re excited to begin working with you.
                  </Text>
                  <Button style={button} href={`https://beyondthesavannah.co.ke/Customer`}>
                        View New Jobs
                      </Button>
                  {/* {specificCalendlyLink?.link != "" ? (
                    <>
                      <Text style={text}>
                        To make it as convenient as possible, please go ahead and
                        select a date and time that works best for you
                      </Text>
                      <Text style={text}>
                        Just click the button below to view our availability and
                        book your session:
                      </Text>
                    </>
                  ) : (
                    <></>
                  )} */}
    
                  {/* {specificCalendlyLink?.link != "" ? (
                    <>
                      <Button style={button} href={`${specificCalendlyLink?.link}`}>
                        Calendly Link
                      </Button>
                      <Text style={text}>
                        Once scheduled, you&apos;ll receive a confirmation email
                        with all the details.If you have any questions or need
                        further assistance, please don&apos;t hesitate to reach out
                        to us through the email : info@beyondthesavannah.co.ke
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text style={text}>
                        Please reach out to our team using the email :
                        info@beyondthesavannah.co.ke or give us a call on 0737 120
                        764 for us to send you the correct calendly link.
                      </Text>
                      <Text style={text}>
                        A small head up, we might require you to share the
                        transaction details of the paystack payment receipt to help
                        with verification and make the process easier to send you
                        the correct link.
                      </Text>
                      <Text style={text}>
                        If you have any questions or need further assistance, please
                        don&apos;t hesitate to reach out to us
                      </Text>
                    </>
                  )} */}
    
                  <Text style={text}>
                    Looking forward to our session!
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
  )
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
