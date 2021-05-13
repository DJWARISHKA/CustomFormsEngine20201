import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { IForm } from "../formeditor/form.js"
import { ToFileService } from "./toFile.service.js"

@Injectable({
    providedIn: 'root'
})
export class ToFile {
    constructor(private toastr: ToastrService, private service: ToFileService) { }
    workbook: Workbook;
    fileName: string;
    private Start(janswer: string[]) {
        this.fileName = janswer[0];
        this.workbook = new Workbook();
        let d = new Date();
        let date = d.getFullYear().toString() + "." + (d.getMonth() + 1).toString() + "." + d.getDate().toString();
        let worksheet = this.workbook.addWorksheet(date);
        let anonym = false;
        if (janswer[1] == "Anonym")
            anonym = true;
        let header = [];
        header.push("Names");
        let elements = [
            "text",
            "longtext",
            "number",
            "checkbox",
            "radiobox",
            "combobox",
            "date",
            "time",
            "endpage"
        ];
        let components = new Map(JSON.parse(janswer[2]));
        for (var [key, value] of components) //Add questions
        {
            let map = new Map(JSON.parse(value.toString()));
            for (var [key, value] of map) {
                if (elements.indexOf(key.toString()) >= 0) {
                    header.push(value.toString());
                }
            }
        }
        let answer = [];
        if (true)//Оставить ветку true после изменений
            for (var i = 0; i < header.length; i++)
                answer.push("Пропущен");
        worksheet.addRow(header); //Add questions
        for (let i = 3; i < janswer.length; i++) {
            if (false) {//Оставить ветку false после изменений
                if (!anonym)
                    answer.push(janswer[i++]); //Name
            }
            else {
                if (!anonym)
                    answer[0] = janswer[i++];
                    if (janswer[i] == null) {
                        continue;
                    }
            }
            let json = JSON.parse(janswer[i]);
            for (var ind in json.answers.answers) {
                let a = json.answers.answers[ind];
                
                if (false)//Оставить ветку false после изменений
                    answer.push(a.answer); //answer
                else {
                    answer[header.indexOf(a.title)] = a.answer;
                }
            }
            worksheet.addRow(answer);
            answer = [];
            if (true)//Оставить ветку true после изменений
                for (var j = 0; j < header.length; j++)
                    answer.push("Пропущен");
        }
    }

    public saveXlsx(form: IForm): void {
        this.service.get(form).subscribe(res => {
            let janswer = res;
            this.Start(janswer);
            this.workbook.xlsx.writeBuffer().then((data) => {
                let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                fs.saveAs(blob, this.fileName + '.xlsx');
            });
        },
            err => {
                this.toastr.error("Ошибка получения данных");
                console.error(err);
                return;
            }
        );
    }
    public saveCsv(form: IForm): void {
        this.service.get(form).subscribe(res => {
            let janswer = res;
            this.Start(janswer);
            this.workbook.csv.writeBuffer().then((data) => {
                let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                fs.saveAs(blob, this.fileName + '.csv');
            });
        },
            err => {
                this.toastr.error("Ошибка получения данных");
                console.error(err);
                return;
            }
        );
    }
}