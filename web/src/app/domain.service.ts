import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { actionsCount } from '../../../training/domain/actions';
import { obstaclesCount } from '../../../training/domain/obstacles';
import { relativePositionCount } from '../../../training/domain/relative-position';
import { ProgressArg } from '../../../training/learning/progress';
import { createQTable, qTableType } from '../../../training/learning/q-table';
import { startTraining } from '../../../training/learning/training';
import { defaultConfig } from '../../../training/learning/config';
import { test } from '../../../training/learning/testing';
import { CancelRequested } from '../../../training/learning/types';
import { Position } from '../../../training/domain/position';
import { Snake } from '../../../training/domain/snake';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  private progressSub = new Subject<ProgressArg>();
  public progress$ = this.progressSub.asObservable();

  private trainingFinishedSub = new Subject<boolean>();
  public trainingFinished$ = this.trainingFinishedSub.asObservable();

  private qTable!: qTableType;

  constructor() {
    this.qTable = createQTable(relativePositionCount, obstaclesCount, actionsCount);
  }

  public async train(): Promise<void>{
    this.trainingFinishedSub.next(false);
    await startTraining(this.qTable, defaultConfig, arg=>this.progressSub.next(arg));
    this.trainingFinishedSub.next(true);
  }

  public async test(cancel: CancelRequested): Promise<void> {
    await test(this.qTable, defaultConfig, arg=>this.progressSub.next(arg), cancel)
  }

  public resetQTable(): void {
    this.qTable = createQTable(relativePositionCount, obstaclesCount, actionsCount);
  }

  public updateQTable(qtable: qTableType): void{
    this.qTable = qtable;
    this.trainingFinishedSub.next(true);
    this.progressSub.next({
      qTable: this.qTable,
      actionCount: 0,
      episode:0,
      fruit: new Position(-1,-1),
      snake: new Snake(new Position(-1,-1))
    });
  }
}
