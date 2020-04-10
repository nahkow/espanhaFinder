import { Component, OnInit, ViewChild } from '@angular/core';
import * as Papa from 'papaparse';
import { GridOptions, ColDef } from 'ag-grid-community';
import { setTheme } from 'ngx-bootstrap/utils';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild("template") template;
  modalRef: BsModalRef;
  title = 'EspanhaFinder';
  dataList: any[];
  espanha;
  outro: Array<any>;
  rowData = []
  gridOptions: GridOptions = {
    defaultColDef: {
      filter: 'text',
      resizable: true,
    },
    onRowDoubleClicked: (params)=>{
      this.currentRow = params.node;
      this.search = params.data.nome.substring(5)
      this.modalRef = this.modalService.show(this.template);
    }
  } 
  search: string = "";
  rowData2 =[];
  currentRow: any;
  constructor(private modalService: BsModalService){
    setTheme('bs4');
  }
  parse(files: File[], fileName) {
    if (files[0]) {
      console.log(files[0]);
      Papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          console.log(result);
          this[fileName] = result.data;
          console.log(fileName, " log: ", this[fileName])
        }
      });

    }
  }

  compare() {
    
    console.log(this.outro)
    console.log(this.espanha)
    if (!this.outro || !this.espanha) return;
    let obj = this.outro.map(e => {
      console.log(e.nome.substring(5))
      let v = e;
      v = {...e, ...this.espanha.find((element) => element['TITULAR'].toLowerCase() === e.nome.substring(5).toLowerCase()) }
      return v;
    });
    this.rowData = obj
    var allColumnIds = [];
    this.gridOptions.columnApi.getAllColumns().forEach(function(column) {
      allColumnIds.push(column['colId']);
    });
    this.gridOptions.columnApi.autoSizeColumns(allColumnIds);
  
  }

  columnDefs: ColDef[] = [
    { headerName: "nome", field: "nome" },
    { headerName: "status_1", field: "status_1" },
    { headerName: "status_2", field: "status_2",editable: true },
    { headerName: "AREA", field: "AREA" },
    { headerName: "Condominio", field: "Condominio" },
    { headerName: "Bloco", field: "Bloco" },
    { headerName: "Apto", field: "Apto" },
    { headerName: "TITULAR", field: "TITULAR" },
    { headerName: "CPF", field: "CPF" },
    { headerName: "CONJUGE", field: "CONJUGE" },
    { headerName: "CPF_CONGUJE", field: "CPF_CONGUJE" },
    { headerName: "RENUNCIA", field: "RENUNCIA" },
    { headerName: "PENDENCIAS_REPROVADOS_CAIXA", field: "PENDENCIAS_REPROVADOS_CAIXA" },
    { headerName: "STATUS_CEF", field: "STATUS_CEF" },
    { headerName: "PENDENCIA", field: "PENDENCIA" },
    { headerName: "OBSERVACOES", field: "OBSERVACOES" },
    { headerName: "PENDENCIA", field: "PENDENCIA" },
    { headerName: "SITUACAO_DATA", field: "SITUACAO_DATA" }


  ];
  gridOptions2: GridOptions = {
    rowData:[],
    columnDefs:[
      { headerName: "TITULAR", field: "TITULAR" },
      { headerName: "CONJUGE", field: "CONJUGE" },
      { headerName: "CPF", field: "CPF" },
    ],
    defaultColDef: {
      filter: 'text',
      resizable: true,
    },
    onRowDoubleClicked: params=> {
      this.currentRow.data = {...this.currentRow.data, ...params.data}
      this.gridOptions.api.updateRowData({
        update: [this.currentRow]
      })
      this.modalRef.hide();
    }
  }
  

  getAllAvailable(){
    console.log(this.search)
    this.rowData2 = this.espanha.filter( element => element['TITULAR'].toLowerCase().includes(this.search.toLowerCase()))
    console.log(this.rowData2)
  }
}












