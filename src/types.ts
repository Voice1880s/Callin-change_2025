export interface Region {
  id: string;
  name: string;
  population: number;
}

export interface Candidate {
  id: string;
  name: string;
  party: string;
  color: string;
}

export interface Vote {
  region: string;
  candidate: string;
  timestamp: string;
}