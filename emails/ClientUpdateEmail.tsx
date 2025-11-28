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
  Row,
  Column,
} from "@react-email/components";
import * as React from "react";

interface ClientUpdateEmailProps {
  clientName: string;
  projectName: string;
  progress: number;
  currentTask: string;
  projectSlug: string;
}

export const ClientUpdateEmail = ({
  clientName,
  projectName,
  progress,
  currentTask,
  projectSlug,
}: ClientUpdateEmailProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://syncflow.app";
  const projectUrl = `${baseUrl}/p/${projectSlug}`;

  return (
    <Html>
      <Head />
      <Preview>{`Project Update: ${projectName} is ${progress}% Complete`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Project Update 🚀</Heading>
          <Text style={text}>Hi {clientName},</Text>
          <Text style={text}>
            Here is the latest update on <strong>{projectName}</strong>.
          </Text>
          
          <Section style={statsContainer}>
            <Row>
              <Column style={statColumn}>
                <Text style={statLabel}>Progress</Text>
                <Text style={statValue}>{progress}%</Text>
              </Column>
              <Column style={statColumn}>
                <Text style={statLabel}>Status</Text>
                <Text style={statValue}>Active</Text>
              </Column>
            </Row>
          </Section>

          <Section style={focusSection}>
            <Text style={focusLabel}>CURRENTLY WORKING ON:</Text>
            <Text style={focusText}>{currentTask}</Text>
          </Section>

          <Section style={btnContainer}>
            <Button style={button} href={projectUrl}>
              View Project Dashboard
            </Button>
          </Section>
          
          <Hr style={hr} />
          <Text style={footer}>
            Powered by SyncFlow
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ClientUpdateEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "560px",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
};

const h1 = {
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 24px",
  padding: "0",
  color: "#1a1a1a",
  textAlign: "center" as const,
};

const text = {
  color: "#444",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const statsContainer = {
  margin: "24px 0",
  padding: "20px",
  backgroundColor: "#f8fafc",
  borderRadius: "8px",
};

const statColumn = {
  textAlign: "center" as const,
};

const statLabel = {
  fontSize: "12px",
  textTransform: "uppercase" as const,
  color: "#64748b",
  margin: "0 0 4px",
  fontWeight: "bold",
};

const statValue = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#0f172a",
  margin: "0",
};

const focusSection = {
  margin: "24px 0",
  padding: "20px",
  borderLeft: "4px solid #3b82f6",
  backgroundColor: "#eff6ff",
};

const focusLabel = {
  fontSize: "12px",
  fontWeight: "bold",
  color: "#1e40af",
  margin: "0 0 8px",
  letterSpacing: "0.5px",
};

const focusText = {
  fontSize: "16px",
  color: "#1e3a8a",
  margin: "0",
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
  display: "inline-block",
  padding: "12px 24px",
};

const hr = {
  borderColor: "#e6e6e6",
  margin: "32px 0 20px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  textAlign: "center" as const,
};
