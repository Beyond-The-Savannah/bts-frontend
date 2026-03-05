import * as React from "react";
import {
  Body,
  //   Button,
  Container,
  Head,
  Html,
  Img,
  //   Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export default function BtsCandidateInviteEmailTemplate({
  firstName,
  email,
}: {
  firstName: string;
  email: string;
}) {
  return (
    <>
      <Html>
        <Head />
        <Preview>Beyond The Savannah, Candidate Profile Invite Setup</Preview>
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
                We are excited to invite you to join our updated website! To
                ensure you are fully integrated into the network, we need you to
                complete your professional profile.
              </Text>
              <Text style={text}>
                Please follow these steps to get started:
              </Text>
              <Text style={text}>
                1. Visit the our website: https://beyondthesavannah.co.ke
              </Text>
              <Text style={text}>
                2. Sign up: Click the “Sign Up” button. Use this email: &quot;{email}&quot;
                It is important that you register using the same email address
                where you received this message to ensure your account is
                correctly linked.
              </Text>
              <Text style={text}>
                3. Complete your profile: Once logged in, navigate to the
                “Profile” section on the left side bar and input your
                professional information.
              </Text>

              <Text style={text}>
                Having a complete profile helps us ensure you&apos;re visible to
                the right organisations who need your expertise.
              </Text>
              <Text style={text}>
                If you run into any issues, and let us know.
              </Text>
              <Text style={text}>See you on the inside!</Text>

                <br /><br /><br />
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
  fontWeight: "400",
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

// const anchor = {
//   textDecoration: "underline",
// };
