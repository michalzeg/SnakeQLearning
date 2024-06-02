import { RelativePosition } from "./relative-position";

export class Position {
  readonly top: number;
  readonly left: number;

  static random(max: number): Position {
    const row = Math.floor(Math.random() * max);
    const col = Math.floor(Math.random() * max);
    return new Position(row, col);
  }

  constructor(top: number, left: number) {
    this.top = top;
    this.left = left;
  }

  isOutsideBoard(boardSize: number): boolean {
    const result = this.top < 0
      || this.top > boardSize - 1
      || this.left < 0
      || this.left > boardSize - 1
    return result;
  }

  move(dt: number, dl: number): Position {
    return new Position(this.top + dt, this.left + dl);
  }

  equalsOther(other: Position): boolean {
    return this.equals(other.top, other.left);
  }

  equals(top: number, left: number): boolean {
    return this.left === left && this.top === top;
  }

  manhatanDistanceTo(other: Position): number {
    const dt = Math.abs(this.top - other.top);
    const dl = Math.abs(this.left - other.left);

    return dt + dl;
  }

  relativePosition(other: Position): RelativePosition {
    if (this.equalsOther(other)) {
      return 'overlapping'
    }
    else if (other.left === this.left && other.top > this.top) {
      return 'bottom'
    }
    else if (other.left === this.left && other.top < this.top) {
      return 'top'
    }
    else if (other.top === this.top && other.left > this.left) {
      return 'right'
    }
    else if (other.top == this.top && other.left < this.left) {
      return 'left'
    }
    else if (other.top < this.top && other.left < this.left) {
      return 'top-left'
    }
    else if (other.top < this.top && other.left > this.left) {
      return 'top-right'
    }
    else if (other.top > this.top && other.left < this.left) {
      return 'bottom-left'
    }
    else {
      return 'bottom-right'
    }
  }

}
