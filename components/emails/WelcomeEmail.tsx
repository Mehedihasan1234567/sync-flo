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
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
  name?: string;
}

export const WelcomeEmail = ({ name = "there" }: WelcomeEmailProps) => {
  const previewText = `Welcome to SyncFlow!`;

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
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Welcome to SyncFlow! 🚀
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hi {name},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Stop sending long emails to clients. With SyncFlow, you can keep
              your clients in the loop without the friction.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Ready to impress your first client?
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#6d28d9] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href="https://syncflow.com/dashboard"
              >
                Create First Project
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

export default WelcomeEmail;
