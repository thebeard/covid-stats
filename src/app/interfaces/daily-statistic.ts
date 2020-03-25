export interface DailyStatistic {
  confirmed: number;
  date: string;
  deaths: number;
  id: number;
  recovered: number;
  testsConducted: number;
  ec: Partial<DailyStatistic>;
  fs: Partial<DailyStatistic>;
  gp: Partial<DailyStatistic>;
  kzn: Partial<DailyStatistic>;
  lp: Partial<DailyStatistic>;
  mp: Partial<DailyStatistic>;
  nc: Partial<DailyStatistic>;
  nw: Partial<DailyStatistic>;
}
