export class Answers {
    Id: number;
    UserId: string;
    FormUrl: number;
    AnswerDate: Date;
    jAnswer: string;
}

export class Answer {
    constructor(index: number, answer: any) {
        this.index = index;
        this.answer = answer;
    }
    index: number;
    answer: any;
}