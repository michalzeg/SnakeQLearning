import { Component, OnInit } from '@angular/core';
import { Position } from '../../../../training/domain/position';
import { Snake } from '../../../../training/domain/snake';
import { defaultConfig } from '../../../../training/learning/config';
import { DomainService } from '../domain.service';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  size = defaultConfig.boardSize;
  board: number[][] = [];
  snake!: Snake;
  fruit!: Position;

  constructor(private domainService: DomainService) {
    this.domainService.progress$.subscribe(e=>{
      this.snake = e.snake;
      this.fruit = e.fruit;
    })
  }
  ngOnInit(): void {
    for (let i = 0; i < this.size; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.size; j++) {
        this.board[i][j] = 0;
      }
    }
  }


  getClass(top: number, left: number){
    if (!this.snake){
      return ""
    }
    const head = this.snake.head;
    if (head.equals(top, left)){
      return "snake-head";
    }
    if (this.fruit.equals(top, left)){
      return "fruit";
    }

    const isBody = this.snake.isWithinSnake(new Position(top, left));
    return isBody ? "snake-body" :"";
  }

}
