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
  Hr,
} from "@react-email/components";
import * as React from "react";

interface FeedbackEmailProps {
  clientName?: string;
  projectName?: string;
  feedback?: string;
}

export const FeedbackEmail = ({
  clientName = "Client",
  projectName = "Project",
  feedback = "No feedback provided.",
}: FeedbackEmailProps) => {
  const previewText = `New feedback from ${clientName}`;

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
              New Feedback Received 💬
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>{clientName}</strong> sent feedback for <strong>{projectName}</strong>:
            </Text>
            <Section className="bg-gray-50 p-4 rounded-md border border-gray-100 my-4">
              <Text className="text-black text-[14px] leading-[24px] m-0 italic">
                "{feedback}"
              </Text>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              Log in to your dashboard to reply or take action.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#6d28d9] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href="https://syncflow.com/dashboard"
              >
                View Dashboard
              </Button>
            </Section>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px] text-center">
              © 2025 SyncFlow. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default FeedbackEmail;
