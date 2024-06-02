import { Config } from '../training/learning/config';
import { qTableType } from '../training/learning/q-table';

export interface Buffer {
  id: string;
  startTime: Date;
  endTime: Date;
  config?: Config;
  qTable?: qTableType;
  iteration: number;
  maxLength: number;
}

export const emptyBuffer = (id: string): Buffer => ({id, iteration: 0, maxLength: 0, startTime: new Date(), endTime: new Date() });
