export interface LegalSection {
  heading: string;
  body: string;
}

export interface LegalDocument {
  updated: string;
  sections: LegalSection[];
}

export type LegalKey = "privacy" | "cookies" | "terms";
