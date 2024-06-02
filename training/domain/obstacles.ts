import { Snake } from "./snake";
import * as _ from 'lodash';
//represents what snake can see eg. obstacle in front, obstacle in left etc
// H - snake head
// # - obstacle
// 0 - empty cell
// All posible states snake can find itself are shown below
//   0     1   2   3   4     5     6   7   8   9     10  11  12  13    14  15
//
//   0     #   0   #   #     #     0   0   #   #     0   #   0   0     #   0
//  0H0   0H# #H# #H0 #H#   #H#   0H# #H0 #H0 0H#   #H0 0H0 0H# 0H0   0H0 #H#
//   0     #   #   #   0     #     #   #   0   0     0   0   0   #     #   0

export type ObstacleIndex = number;
export const obstaclesCount = 16;

const all = Array.from({ length: obstaclesCount }, (_, index) => index);

const topObstacle = [1, 3, 4, 5, 8, 9, 11, 14];
const rightObstacle = [1, 2, 4, 5, 6, 9, 12, 15];
const bottomObstacle = [1, 2, 3, 5, 6, 7, 13, 14];
const leftObstacle = [2, 3, 4, 5, 7, 8, 10, 15];

const topEmpty = all.filter((element) => !topObstacle.includes(element));
const rightEmpty = all.filter((element) => !rightObstacle.includes(element));
const bottomEmpty = all.filter((element) => !bottomObstacle.includes(element));
const leftEmpty = all.filter((element) => !leftObstacle.includes(element));

const obstacles = [topObstacle, rightObstacle, bottomObstacle, leftObstacle];
const empty = [topEmpty, rightEmpty, bottomEmpty, leftEmpty];

export const getObstacleIndex = (snake: Snake, boardSize: number): ObstacleIndex => {
  const results = [
    snake.hasObstacleAbove(boardSize),
    snake.hasObstacleRight(boardSize),
    snake.hasObstacleBelow(boardSize),
    snake.hasObstacleLeft(boardSize)
  ];

  const indexes = results.map((e, i) => e ? obstacles[i] : empty[i]);

  //intersect all tables to find index

  const result = _.intersection(...indexes)[0];
  return result;
}

export type ObstaclePatternType = number[][];

export const obstaclePatterns: number[][][] = [
  [
    [0, 0, 0],
    [0, 2, 0],
    [0, 0, 0]
  ],
  [
    [0, 1, 0],
    [0, 2, 1],
    [0, 1, 0]
  ],
  [
    [0, 0, 0],
    [1, 2, 1],
    [0, 1, 0]
  ],
  [
    [0, 1, 0],
    [1, 2, 0],
    [0, 1, 0]
  ],
  [
    [0, 1, 0],
    [1, 2, 1],
    [0, 0, 0]
  ],
  [
    [0, 1, 0],
    [1, 2, 1],
    [0, 1, 0]
  ],
  [
    [0, 0, 0],
    [0, 2, 1],
    [0, 1, 0]
  ],
  [
    [0, 0, 0],
    [1, 2, 0],
    [0, 1, 0]
  ],
  [
    [0, 1, 0],
    [1, 2, 0],
    [0, 0, 0]
  ],
  [
    [0, 1, 0],
    [0, 2, 1],
    [0, 0, 0]
  ],
  [
    [0, 0, 0],
    [1, 2, 0],
    [0, 0, 0]
  ],
  [
    [0, 1, 0],
    [0, 2, 0],
    [0, 0, 0]
  ],
  [
    [0, 0, 0],
    [0, 2, 1],
    [0, 0, 0]
  ],
  [
    [0, 0, 0],
    [0, 2, 0],
    [0, 1, 0]
  ],
  [
    [0, 1, 0],
    [0, 2, 0],
    [0, 1, 0]
  ],
  [
    [0, 0, 0],
    [1, 2, 1],
    [0, 0, 0]
  ],
];
