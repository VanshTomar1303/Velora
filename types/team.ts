export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  social: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}
