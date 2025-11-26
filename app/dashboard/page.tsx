"use client";

import DashboardPage from "@/components/dashboard-page";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleNavigate = (view: "landing" | "dashboard" | "client" | "project-editor") => {
    switch (view) {
      case "landing":
        router.push("/");
        break;
      case "dashboard":
        // Already on dashboard
        break;
      case "client":
        router.push("/client"); // Assuming this route exists or will exist
        break;
      case "project-editor":
        router.push("/project/new"); // Placeholder for project editor route
        break;
    }
  };

  return <DashboardPage onNavigate={handleNavigate} />;
}
