import { Component, EventEmitter, Input, OnInit, Output ,} from '@angular/core';
import { TreeNode } from 'primeng/api';


@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.scss']
})
export class TreeListComponent implements OnInit {

  @Input() files: TreeNode[] =[];
  @Input() cols:any[] =[];
  @Input() totalRecords: number;
  @Input() hasAction: boolean;
  @Input() loading:boolean;

 
  @Output() loadTables = new EventEmitter<any>(); 
  @Output() onTableExpand = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  loadNodes(event:any){

  }
  onNodeExpand(event:any){

  }


}


