import { wait } from "../utils/wait";
import { getFruitStartingLocation, getSnakeStartingLocation } from "./helpers";
import { qTableType } from "./q-table";
import { Progress } from "./progress";
import { getActionFromIndex } from "../domain/actions";
import { getObstacleIndex } from "../domain/obstacles";
import { Config } from "./config";
import { CancelRequested } from "./types";


export const test = async (qTable: qTableType, config: Config, progress: Progress, cancel: CancelRequested): Promise<void> => {
  let snake = getSnakeStartingLocation(config.boardSize);
  let fruit = getFruitStartingLocation(snake, config.boardSize);

  let done = false;
  while (!done && !cancel()) {
    await wait(config.actionTimeout);
    progress({ snake, fruit, episode: 1, qTable, actionCount: 0 });
    // Choose which action to take (i.e., where to move next)
    const currentObstacleIndex = getObstacleIndex(snake, config.boardSize);
    const currentRelativePositionIndex = snake.getRelativePositionIndex(fruit);

    const values = qTable[currentRelativePositionIndex][currentObstacleIndex];
    const max = Math.max(...values);
    const actionIndex = values.indexOf(max);
    const action = getActionFromIndex(actionIndex);

    // Perform the chosen action, and transition to the next state (i.e., move to the next location)
    const moveResult = snake.tryMove(action, config.boardSize, fruit);
    if (moveResult === 'snakeDead') {
      done = true;
    } else if (moveResult === 'fruitEaten') {
      fruit = getFruitStartingLocation(snake, config.boardSize); //restart fruit position
    }
  }

};
