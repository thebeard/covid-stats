export interface Record {
  confirmed: number;
  date: string;
  deaths: number;
  id: number;
  recovered: number;
  tests: number;
  ec: Partial<Record>;
  fs: Partial<Record>;
  gp: Partial<Record>;
  kzn: Partial<Record>;
  lp: Partial<Record>;
  mp: Partial<Record>;
  nc: Partial<Record>;
  nw: Partial<Record>;
}
