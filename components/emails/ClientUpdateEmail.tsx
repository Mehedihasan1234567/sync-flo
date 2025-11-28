import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Row,
  Column,
} from "@react-email/components";
import * as React from "react";

interface ClientUpdateEmailProps {
  clientName?: string;
  projectName?: string;
  progress?: number;
  currentTask?: string;
  statusLink?: string;
}

export const ClientUpdateEmail = ({
  clientName = "Client",
  projectName = "Website Redesign",
  progress = 45,
  currentTask = "Implementing Homepage Hero Section",
  statusLink = "https://syncflow.com/p/demo-project",
}: ClientUpdateEmailProps) => {
  const previewText = `Update: ${projectName}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Text className="text-black text-[24px] font-bold text-center p-0 my-[30px] mx-0">
                SyncFlow
              </Text>
            </Section>
            <Heading className="text-black text-[20px] font-normal text-center p-0 my-[30px] mx-0">
              Update: {projectName}
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {clientName},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Here is the latest progress on your project.
            </Text>

            <Section className="my-[20px]">
              <Text className="text-black text-[14px] font-semibold mb-[10px]">
                Progress: {progress}%
              </Text>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </Section>

            <Section className="bg-[#f3f4f6] rounded p-[15px] my-[20px]">
              <Text className="text-black text-[12px] font-bold uppercase tracking-wider mb-[5px] text-gray-500">
                Current Focus
              </Text>
              <Text className="text-black text-[14px] m-0 font-medium">
                {currentTask}
              </Text>
            </Section>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#2563eb] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={statusLink}
              >
                View Full Status Page
              </Button>
            </Section>
            <Text className="text-[#666666] text-[12px] leading-[24px] text-center mt-[32px]">
              © 2025 SyncFlow. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ClientUpdateEmail;
