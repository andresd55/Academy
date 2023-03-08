import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  exportPdf(columns, body, tittle) {
    var img = new Image()
    img.src = '../../../assets/images/Logo.png'
    
    const doc = new jsPDF('p','pt');
    doc.addImage(img, 'JPEG', 20, 0, 100, 100);
      autoTable(doc, {
        startY: 90,
        columns: columns,
        body: body,
        didDrawPage: (dataArg) => { 
          doc.text(tittle, doc.internal.pageSize.width / 2, 50, null, 'center');
        // doc.text(tittle, dataArg.settings.margin.left, 30);
        }
      }); 
      doc.save(tittle + '.pdf');
  }
}
