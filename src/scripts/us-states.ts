import states from "../../public/data/us-states.json" with { type: "json" };

export const censusRegions = ["Northeast", "Midwest", "South", "West"] as const;

export type CensusRegion = (typeof censusRegions)[number];

export interface UsState {
  name: string;
  chineseName: string;
  code: string;
  capital: string;
  aliases: string[];
  region: CensusRegion;
}

export const regionLabels: Record<CensusRegion, string> = {
  Northeast: "東北",
  Midwest: "中西",
  South: "南方",
  West: "西部",
};

function isCensusRegion(value: string): value is CensusRegion {
  return censusRegions.some((region) => region === value);
}

export function stateSlug(name: string): string {
  return name.toLowerCase().replaceAll(" ", "-");
}

export const usStates: UsState[] = states.map((state) => {
  if (!isCensusRegion(state.region)) {
    throw new Error(`Unknown region for ${state.name}: ${state.region}`);
  }

  return {
    name: state.name,
    chineseName: state.chineseName,
    code: state.code,
    capital: state.capital,
    aliases: state.aliases,
    region: state.region,
  };
});

if (usStates.length !== 50) {
  throw new Error(`Expected 50 states, found ${usStates.length}.`);
}

const codes = new Set(usStates.map((state) => state.code));
if (codes.size !== 50) {
  throw new Error("State codes must be unique.");
}
