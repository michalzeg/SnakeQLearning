import { Component, OnInit } from '@angular/core';
import { DomainService } from '../domain.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {
  isTrainingFinished = false;

  cancelRequested = false;
  testing = false;

  constructor(private domainService: DomainService) { }

  ngOnInit(): void {
    this.domainService.trainingFinished$.subscribe(e => {
      this.isTrainingFinished = e;
    });
  }

  public async test(): Promise<void> {
    this.testing = true;
    await this.domainService.test(()=>this.cancelRequested);
    this.cancelRequested = false;
    this.testing = false;
  }

  public stop(): void {
    this.cancelRequested = true;
  }
}
