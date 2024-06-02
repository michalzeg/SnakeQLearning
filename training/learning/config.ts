export interface Config {
  boardSize: number;
  epsilon: number;
  discountFactor: number;
  learningRate: number;
  fruitEatenReward: number;
  snakeDeadReward: number;
  moveFruitDirectionReward: number;
  moveAgainstFruidDirectionReward: number;
  episodes: number;
  episodeTimeout: number;
  actionTimeout: number;
  maxActionsPerIteration: number;
}

export const defaultConfig: Config = {
  boardSize: 30,
  epsilon: 0.90,
  discountFactor: 0.9,
  learningRate: 0.9,
  fruitEatenReward: 100,
  snakeDeadReward: -500,
  moveFruitDirectionReward: 1.1,
  moveAgainstFruidDirectionReward: -0.9,
  episodes: 1000,
  episodeTimeout: 1,
  actionTimeout: 1,
  maxActionsPerIteration: 5000
};
