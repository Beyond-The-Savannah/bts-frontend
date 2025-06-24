import * as React from "react";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Html,
  Img,
  Link,
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
                //   height="33"
                alt="Beyond The Savannah Logo"
              />
            </Section>
            <Section>
              <Text style={text}>Hi {firstName},</Text>
              <Text style={text}>
                Check out the following new opennings from the following
                companies and apply for your next career move:
              </Text>
              {jobs.map((job, index) => (
                <Section key={index} style={jobSection}>
                  
                  <Row className="flex justify-between items-center gap-[20px]">
                    <Column className="w-4/12 pr-[24px] flex flex-col items-center justify-center gap-[12px]">
                      <Img
                        src={job.imageUrl}
                        width="90"
                        alt={`${job.companyName} image`}
                        className="object-contain rounded-[12px]"
                      />
                    </Column>
                    <Column className="w-5/12 pr-[48px]">
                      <div className="space-y-4">
                        <Text style={textHeading}>{job.jobName}</Text>
                        <Text style={text}>{job.companyName}</Text>
                      </div>
                    </Column>
                    <Column className="w-4/12 pr-[24px] flex flex-col items-center justify-center gap-[12px]">
                      <Button
                        style={button1}
                        href={`https://beyondthesavannah.co.ke/Customer/find-jobs/${job.jobsId}`}
                      >
                        View Openning
                      </Button>
                    </Column>
                  </Row>
                </Section>
              ))}

              <Text style={text}>
                Best of luck with your application!
                <Link
                  style={anchor}
                  href="https://beyondthesavannah.co.ke/"
                ></Link>
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
};
const logo = {
  display: "flex",
  justifyContent: "center",
  alingItems: "center",
  width: "580px",
  margin: "0 auto",
};

const jobSection = {
  border: "8px",
  borderRadius: "4px",
  marginBottom: "24px",
};

// const jobRow={
//   display: "flex",
//   justifyContent: "between",
//   alingItems: "center",
//   width:"full",
//   gap:"20px"
// }

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};
const textHeading = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "700",
  color: "#404040",
  lineHeight: "26px",
};

const button1 = {
  backgroundColor: "hsl(188, 34%, 17%)",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "110px",
  padding: "7px 4px",
};
const anchor = {
  textDecoration: "underline",
};
