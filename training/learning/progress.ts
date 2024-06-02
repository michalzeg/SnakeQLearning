
import { Position } from "../domain/position";
import { Snake } from "../domain/snake";
import { qTableType } from "./q-table";

export interface ProgressArg{
  fruit: Position;
  snake: Snake;
  episode: number;
  qTable: qTableType;
  actionCount: number;
}

export type Progress = (arg: ProgressArg) => void;

