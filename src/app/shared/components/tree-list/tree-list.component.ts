import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { TreeNode } from 'primeng/api';
// import { TreeTableModule } from 'primeng/treetable';


@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.scss']
})
export class TreeListComponent implements OnInit {

  @Input() locations: TreeNode[];
  @Input() cols:any[] =[];
  @Input() loading: boolean;
  // @Input() totalRecords: number;
  // @Input() hasAction: boolean;
  // @Input() loading:boolean;


  @Output() loadTable = new EventEmitter<any>(); 
  @Output() nodeExpand = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  loadNodes($event: any){
    this.loadTable.emit($event);
  }
  onNodeExpand($event: any){
    this.loading = true;
    this.nodeExpand.emit($event);
    this.loading = false;

  }

  // files: TreeNode[] = [
  //   {
  //     data: {
  //       name: "Region",
  //       size: "75kb",
  //       type: "Folder"
  //     },
  //     children: [
  //       {
  //         data: {
  //           name: "Zone",
  //           size: "55kb",
  //           type: "Folder"
  //         },
  //         children: [
  //           {
  //             data: {
  //               name: "Woreda",
  //               size: "30kb",
  //               type: "Document"
  //             },
  //             children: [
  //               {
  //                 data: {
  //                   name: "Hub"
  //                 },
  //                 children: [
  //                   {
  //                     data: {
  //                       name: "Warehouse"
  //                     }
  //                   }
  //                 ]
  //               }
  //             ]
  //           },
  //           {
  //             data: {
  //               name: "Resume.doc",
  //               size: "25kb",
  //               type: "Resume"
  //             }
  //           }
  //         ]
  //       },
  //       {
  //         data: {
  //           name: "Home",
  //           size: "20kb",
  //           type: "Folder"
  //         },
  //         children: [
  //           {
  //             data: {
  //               name: "Invoices",
  //               size: "20kb",
  //               type: "Text"
  //             }
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     data: {
  //       name: "Pictures",
  //       size: "150kb",
  //       type: "Folder"
  //     },
  //     children: [
  //       {
  //         data: {
  //           name: "barcelona.jpg",
  //           size: "90kb",
  //           type: "Picture"
  //         }
  //       },
  //       {
  //         data: {
  //           name: "primeui.png",
  //           size: "30kb",
  //           type: "Picture"
  //         }
  //       },
  //       {
  //         data: {
  //           name: "optimus.jpg",
  //           size: "30kb",
  //           type: "Picture"
  //         }
  //       }
  //     ]
  //   }
  // ]


  // loadNodes(event: any) {
  //     this.loading = true;

  //     //in a production application, make a remote request to load data using state metadata from event
  //     //event.first = First row offset
  //     //event.rows = Number of rows per page
  //     //event.sortField = Field name to sort with
  //     //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
  //     //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

  //     //imitate db connection over a network
  //     setTimeout(() => {
  //         this.loading = false;
  //         this.files = [];

  //         for(let i = 0; i < event.rows; i++) {
  //             let node = {
  //                 data: {  
  //                     name: 'Item ' + (event.first + i),
  //                     size: Math.floor(Math.random() * 1000) + 1 + 'kb',
  //                     type: 'Type ' + (event.first + i)
  //                 },
  //                 leaf: false
  //             };

  //             this.files.push(node);
  //         }
  //     }, 1000);
  // }

  // onNodeExpand(event: any) {
  //     this.loading = true;

  //     setTimeout(() => {
  //         this.loading = false;
  //         const node = event.node;

  //         node.children = [
  //             {
  //                 data: {  
  //                     name: node.data.name + ' - 0',
  //                     size: Math.floor(Math.random() * 1000) + 1 + 'kb',
  //                     type: 'File'
  //                 },
  //             },
  //             {
  //                 data: {  
  //                     name: node.data.name + ' - 1',
  //                     size: Math.floor(Math.random() * 1000) + 1 + 'kb',
  //                     type: 'File'
  //                 }
  //             }
  //         ];

  //         this.files = [...this.files];
  //     }, 250);

  // }


}


