import { wait } from "../utils/wait";
import { getFruitStartingLocation, getSnakeNextAction, getSnakeStartingLocation } from "./helpers";
import { qTableType } from "./q-table";
import { Progress } from "./progress";
import { getActionIndex } from "../domain/actions";
import { getObstacleIndex } from "../domain/obstacles";
import { Config } from "./config";


export const startTraining = async (qTable: qTableType, config: Config, progress: Progress): Promise<boolean> => {

  for (let episode = 0; episode < config.episodes; episode++) {
    // Get the starting location for this episode
    let snake = getSnakeStartingLocation(config.boardSize);
    let fruit = getFruitStartingLocation(snake, config.boardSize);

    await wait(config.episodeTimeout);

    // Continue taking actions (i.e., moving) until we reach a terminal state
    let done = false;
    let actionCount = 0;
    while (!done) {
      actionCount++;
      if (actionCount > config.maxActionsPerIteration) {
        done = true;
        actionCount = 0;
      }
      await wait(config.actionTimeout);
      progress({ snake, fruit, episode, qTable, actionCount });
      // Choose which action to take (i.e., where to move next)
      const currentObstacleIndex = getObstacleIndex(snake, config.boardSize);
      const currentRelativePositionIndex = snake.getRelativePositionIndex(fruit);
      const currentDistanceToFruit = snake.head.manhatanDistanceTo(fruit);

      const action = getSnakeNextAction(qTable, currentRelativePositionIndex, currentObstacleIndex, episode, config);
      const actionIndex = getActionIndex(action);
      // Perform the chosen action, and transition to the next state (i.e., move to the next location)
      const moveResult = snake.tryMove(action, config.boardSize, fruit);
      const distanceToFruit = snake.head.manhatanDistanceTo(fruit);

      let newRelativePositionIndex = snake.getRelativePositionIndex(fruit);


      const newObstacleIndex = getObstacleIndex(snake, config.boardSize);

      // Receive the reward for moving to the new state and calculate the temporal difference
      let reward: number = 0;
      if (moveResult === 'snakeDead') {
        reward = config.snakeDeadReward;
        done = true;
      } else if (moveResult === 'fruitEaten') {
        reward = config.fruitEatenReward;
        newRelativePositionIndex = currentRelativePositionIndex; //fruit eaten by snake and head is over fruit cell
        fruit = getFruitStartingLocation(snake, config.boardSize); //restart fruit position
      } else if (moveResult === 'ok' && distanceToFruit < currentDistanceToFruit) {
        reward = config.moveFruitDirectionReward;
      } else if (moveResult === 'ok' && distanceToFruit > currentDistanceToFruit) {
        reward = config.moveAgainstFruidDirectionReward;
      }

      const oldQValue: number = qTable[currentRelativePositionIndex][currentObstacleIndex][actionIndex];

      const values = qTable[newRelativePositionIndex][newObstacleIndex];
      const maxQValue: number = Math.max(...values);
      const temporalDifference: number = reward + (config.discountFactor * maxQValue) - oldQValue;

      // Update the Q-value for the previous state and action pair
      const newQValue: number = oldQValue + (config.learningRate * temporalDifference);
      qTable[currentRelativePositionIndex][currentObstacleIndex][actionIndex] = newQValue;
    }
  }

  return true;
};
