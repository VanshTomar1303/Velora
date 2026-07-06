import teamData from "@/data/team.json";
import type { TeamMember } from "@/types/team";
import { mockFetch } from "./client";

export async function getTeam(): Promise<TeamMember[]> {
  return mockFetch(teamData as TeamMember[]);
}
