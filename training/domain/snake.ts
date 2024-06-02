import { RelativePosition, RelativePositionIndex, getRelativePositionIndex } from "./relative-position";
import { Action } from "./actions";
import { Position } from "./position";

export type MoveResult = 'ok' | 'snakeDead' | 'fruitEaten';

export class Snake {

  private body: Position[] = [];

  constructor(head: Position) {
    this.body.push(head);
  }

  public get head(): Position {
    return this.body[0]
  }

  public get length(): number {
    return this.body.length;
  }

  public getRelativePositionIndex(other: Position): RelativePositionIndex {
    const relativePosition = this.head.relativePosition(other);
    const result = getRelativePositionIndex(relativePosition);
    return result;
  }

  public tryMove(action: Action, boardSize: number, fruit: Position): MoveResult {
    const isSnakeDead = (action === 'up' && this.hasObstacleAbove(boardSize))
      || (action === 'right' && this.hasObstacleRight(boardSize))
      || (action === 'down' && this.hasObstacleBelow(boardSize))
      || (action === 'left' && this.hasObstacleLeft(boardSize));
    if (isSnakeDead) {
      return 'snakeDead';
    }

    let top = this.head.top;
    let left = this.head.left;

    switch (action) {
      case 'up':
        top = top - 1;
        break;
      case 'right':
        left = left + 1;
        break;
      case 'down':
        top = top + 1;
        break;
      case 'left':
        left = left - 1;
        break;
    }

    const newHead = new Position(top, left);

    if (fruit.equals(top, left)) {
      this.body = [newHead, ...this.body];
      return 'fruitEaten';
    }
    else {
      this.body = [newHead, ...this.body].slice(0, -1);
      return 'ok'
    }
  }

  public isWithinSnake(position: Position): boolean {
    const result = this.body.some(e => position.top === e.top && position.left === e.left);
    return result;
  }

  public hasObstacleAbove(boardSize: number): boolean {
    const hasWallAbove = this.head.top === 0;
    if (hasWallAbove) {
      return true;
    }
    const hasBodyAbove = this.body.some(e => e.left === this.head.left && e.top === this.head.top - 1);
    return hasBodyAbove;
  }

  public hasObstacleRight(boardSize: number): boolean {
    const hasWallRight = this.head.left === boardSize - 1;
    if (hasWallRight) {
      return true;
    }
    const hasBodyRight = this.body.some(e => e.left === this.head.left + 1 && e.top === this.head.top);
    return hasBodyRight;
  }

  public hasObstacleBelow(boardSize: number): boolean {
    const hasWallBelow = this.head.top === boardSize - 1;
    if (hasWallBelow) {
      return true;
    }
    const hasBodyBelow = this.body.some(e => e.left === this.head.left && e.top === this.head.top + 1);
    return hasBodyBelow;
  }

  public hasObstacleLeft(boardSize: number): boolean {
    const hasWallLeft = this.head.left === 0;
    if (hasWallLeft) {
      return true;
    }
    const hasBodyLeft = this.body.some(e => e.left === this.head.left - 1 && e.top === this.head.top);
    return hasBodyLeft;
  }
}
