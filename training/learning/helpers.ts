
import { Action, getActionFromIndex } from "../domain/actions";
import { ObstacleIndex } from "../domain/obstacles";
import { Position } from "../domain/position";
import { RelativePositionIndex } from "../domain/relative-position";
import { Snake } from "../domain/snake";
import { actions } from "./actions";
import { Config } from "./config";
import { qTableType } from "./q-table";



// Define a function that will choose a random, non-terminal starting location
export function getSnakeStartingLocation(boardSize: number): Snake {
  const result = new Snake(Position.random(boardSize));
  return result;
}

export function getFruitStartingLocation(snake: Snake, boardSize: number): Position {
  let position: Position;
  do {
    position = Position.random(boardSize);
  } while (snake.isWithinSnake(position));

  return position;
}

// Define an epsilon-greedy algorithm that will choose which action to take next (i.e., where to move next)
export function getSnakeNextAction(qValues: qTableType, relativePositionIndex: RelativePositionIndex, obstacleIndex: ObstacleIndex, iteration: number, config:Config): Action {
  let actionIndex: number;
  const rnd = Math.random();

  //epsilon is changed through learnign so that there is higher probability to use q-table instead of random action
  //const normalizedEpisilon = config.epsilon + (iteration / config.episodes)*(1 - config.epsilon);

  //random policy in only through half episodes
  const normalizedEpisilon = iteration < config.episodes / 2 ? config.epsilon : 1;


  if (rnd < normalizedEpisilon) {
    const values = qValues[relativePositionIndex][obstacleIndex];
    const max = Math.max(...values);
    actionIndex = values.indexOf(max);

  } else {
    actionIndex = Math.floor(Math.random() * actions.length); // 4 represents the number of possible actions (up, right, down, left)
  }
  const result = getActionFromIndex(actionIndex);
  return result;
}
