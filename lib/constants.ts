export const PROJECT_TEMPLATES = {
  'web-dev': {
    label: "Web Development",
    milestones: ["Wireframing", "UI Design", "Frontend Dev", "Backend Setup", "Deployment"]
  },
  'app-dev': {
    label: "Mobile App",
    milestones: ["Prototype", "API Design", "App Development", "Play Store Submit"]
  },
  'design': {
    label: "Brand Identity / Logo",
    milestones: ["Moodboard", "Sketching", "Vectorizing", "Final Delivery"]
  },
  'blank': {
    label: "Start from Scratch",
    milestones: []
  }
} as const;

export type ProjectTemplateKey = keyof typeof PROJECT_TEMPLATES;
