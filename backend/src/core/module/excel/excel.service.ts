import { Injectable } from "@nestjs/common";
import * as XLSX from "xlsx";

@Injectable()
export class ExcelService {
  read<T>(filePath: string) {
    const workbook = XLSX.readFile(filePath, { type: "array", cellDates: true, dateNF: "mm/dd/yyyy" });
    const sheetNames = workbook.SheetNames;
    const sheet = workbook.Sheets[sheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);
    return data as T[];
  }
}