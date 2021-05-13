import { IForm } from "../formeditor/form";

export class Answer {
    constructor(
        public id?: number,
        public userId?: string,
        public formId?: number,
        public jsonAnswer?: string,
        public answerDate?: string) { }
}

export class FormAnswer implements IForm {
    public email: string;
    public id: number;
    public name: string;
    public jform: string;
    public description: string;
    public s_date: Date;
    public e_date: Date;
    public url: string;
    public template: boolean;
    public anonym: boolean;
    public private: boolean;
    public editing: boolean;
    public one_answer: boolean;
    public recapcha: boolean;
    public answerDate?: string
}