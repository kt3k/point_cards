export interface User {
  id: string;
  pointCards: PointCard[];
}

export interface PointCardSpec {
  id: string;
  points: number;
  max: number;
  subtitle: string;
  row?: number;
}

export interface PointCard {
  id: string;
  type: PointCardSpec;
  points: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
}
