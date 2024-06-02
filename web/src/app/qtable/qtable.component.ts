import { Component, OnInit, TemplateRef } from '@angular/core';
import { DomainService } from '../domain.service';
import { qTableType } from '../../../../training/learning/q-table';
import { obstaclePatterns } from '../../../../training/domain/obstacles';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';



@Component({
  selector: 'app-qtable',
  templateUrl: './qtable.component.html',
  styleUrls: ['./qtable.component.scss']
})
export class QtableComponent implements OnInit {
  readonly directons = ['&uArr;', '&neArr;','&rArr;','&seArr;','&dArr;','&swArr;','&lArr;','&nwArr;'];

  modalRef?: BsModalRef;
  qTable: qTableType = [];
  qTableInput = '';

  obstaclesList: number[][][] = []

  constructor(private domainService: DomainService, private modalService: BsModalService) {
    this.obstaclesList = [...obstaclePatterns];
  }
  ngOnInit(): void {
    this.domainService.progress$.subscribe(e => {
      this.qTable = e.qTable;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.qTableInput = JSON.stringify(this.qTable);
    this.modalRef = this.modalService.show(template);
  }

  updateQTable(){
    this.domainService.updateQTable(JSON.parse(this.qTableInput));
    this.modalRef?.hide();
  }

}
