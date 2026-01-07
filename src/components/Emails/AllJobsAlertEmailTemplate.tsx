import * as React from "react";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Html,
  Img,
  // Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { ListingRemoteJobs } from "@/types/remoteJobsListing";

export default function AllJobsAlertEmailTemplate({
  firstName,
  jobs,
}: {
  firstName: string;
  jobs: ListingRemoteJobs[];
}) {
  return (
    <>
      <Html>
        <Head />
        <Preview>Your next job could be here!</Preview>
        <Body style={main}>
          <Container style={container}>
            <Section style={logo}>
              <Img
                src={`https://res.cloudinary.com/dh8qlzbzk/image/upload/v1736518541/BTS_Logo_xa2iht.webp`}
                width="114"
                alt="Beyond The Savannah Logo"
              />
            </Section>
            <Section>
              <Text style={text}>Hi {firstName ?? "There"},</Text>
              <Text style={text}>
                Check out the following new openings from the following
                companies and apply for your next career move:
              </Text>
              
              {jobs.map((job, index) => (
                <Section key={index} style={jobSection}>
                  <Row>
                    <Column style={imageColumn}>
                      <Img
                        src={job.imageUrl}
                        width="80"
                        height="80"
                        alt={`${job.companyName} logo`}
                        style={companyImage}
                      />
                    </Column>
                    <Column style={jobDetailsColumn}>
                      <Text style={jobTitle}>{job.jobName}</Text>
                      <Text style={companyName}>{job.companyName}</Text>
                    </Column>
                    <Column style={buttonColumn}>
                      <Button
                        style={button1}
                        href={`https://beyondthesavannah.co.ke/Customer/find-jobs/${job.jobsId}`}
                      >
                        View Opening
                      </Button>
                    </Column>
                  </Row>
                </Section>
              ))}

              <Text style={text}>
                Best of luck with your application!
              </Text>
              <Text style={text}>
                Warm Regards,
                <br />
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
  maxWidth: "700px",
  width: "100%",
};

const logo = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  margin: "0 auto 30px auto",
};

const jobSection = {
  backgroundColor: "#f9f9f9",
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  padding: "25px",
  marginBottom: "20px",
};

const imageColumn = {
  width: "120px",
  verticalAlign: "top",
  paddingRight: "20px",
};

const jobDetailsColumn = {
  verticalAlign: "top",
  paddingRight: "20px",
};

const buttonColumn = {
  width: "140px",
  verticalAlign: "top",
  textAlign: "center" as const,
};

const companyImage = {
  borderRadius: "8px",
  border: "1px solid #e0e0e0",
  objectFit: "contain" as const,
};

const jobTitle = {
  fontSize: "18px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "700",
  color: "#2c3e50",
  lineHeight: "24px",
  margin: "0 0 8px 0",
};

const companyName = {
  fontSize: "14px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "400",
  color: "#7f8c8d",
  lineHeight: "20px",
  margin: "0",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button1 = {
  backgroundColor: "hsl(188, 34%, 17%)",
  borderRadius: "6px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "110px",
  padding: "12px 8px",
  border: "none",
};


