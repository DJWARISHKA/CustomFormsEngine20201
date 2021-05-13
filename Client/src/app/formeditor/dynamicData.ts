/**
 * All possible data of dynamic components.
 */
export class DynamicData {
    constructor(data: DynamicData = null) {
        if (data === null)
            return;
        this.el_name = data.el_name;
        this.question = data.question;
        this.answer = data.answer;
        this.answers = data.answers;
        this.description = data.description;
        this.el_type = data.el_type;
        this.minmax = data.minmax;
        this.min = data.min;
        this.max = data.max;
        this.required = data.required;
        this.random = data.random;
        this.hidden = data.hidden;
        this.el_date = data.el_date;
        this.BEDate = data.BEDate;
        this.s_date = data.s_date;
        this.e_date = data.e_date;
        this.time = data.time;
    }
    index: number;
    el_name: string = "";
    question: string = "";
    answer: any;
    answers: string = "";
    description: string = "";
    el_type: string = "";
    minmax: boolean = false;
    min: number = null;
    max: number = null;
    required: boolean = false;
    random: boolean = false;
    hidden: boolean = false;
    el_date: Date = null;
    BEDate: boolean = false;
    s_date: Date = null;
    e_date: Date = null;
    time: Date = null;
}