export interface ServiceItem {
  id: string;
  title: string;
  category: "electrical" | "home_automation" | "engineering" | "industrial";
  icon: string;
  description: string;
  longDescription: string;
  bulletPoints: string[];
  keyStandards: string[]; // Normas técnicas (NBR 5410, NR10, NR12, etc.)
  technologies: string[];
}

export interface LoadCalculatorItem {
  id: string;
  name: string;
  powerW: number;
  qty: number;
  factor: number; // Fator de demanda
}

export interface ProjectDraft {
  category: "industrial" | "home" | "electrical_utility";
  sizeSquareM: number;
  automationLevel: "basic" | "intermediate" | "advanced";
  selectedServices: string[];
  powerRequirementKn: number;
}
