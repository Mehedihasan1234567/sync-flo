import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
  Hr,
  Link,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  name: string;
}

export const WelcomeEmail = ({ name }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to SyncFlow! 🚀</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to SyncFlow, {name}! 👋</Heading>
        <Text style={text}>
          We're thrilled to have you on board. SyncFlow is designed to help you manage your freelance projects with ease and professionalism.
        </Text>
        <Section style={section}>
          <Text style={text}>
            Here's what you can do next:
          </Text>
          <ul style={list}>
            <li>Create your first project</li>
            <li>Invite clients to view progress</li>
            <li>Manage your timeline and milestones</li>
          </ul>
        </Section>
        <Section style={btnContainer}>
          <Button style={button} href="https://syncflow.app/dashboard">
            Go to Dashboard
          </Button>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          If you have any questions, feel free to reply to this email.
          <br />
          The SyncFlow Team
        </Text>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const h1 = {
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
  color: "#1a1a1a",
};

const text = {
  color: "#444",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const section = {
  padding: "24px",
  border: "1px solid #e6e6e6",
  borderRadius: "12px",
  margin: "24px 0",
};

const list = {
  paddingLeft: "20px",
  margin: "0",
  color: "#444",
  fontSize: "16px",
  lineHeight: "24px",
};

const btnContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#000000",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 24px",
};

const hr = {
  borderColor: "#e6e6e6",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
