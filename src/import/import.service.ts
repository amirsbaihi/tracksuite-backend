import { Injectable } from '@nestjs/common';
import * as XLSX from "xlsx"

@Injectable()
export class ImportService {
    generateFields(buffer:Buffer){
        const workbook = XLSX.read(buffer)
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const fields = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0]
        return fields

    }
}
