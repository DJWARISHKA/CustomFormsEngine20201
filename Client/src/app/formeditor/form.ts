export interface IForm {
  id: number;
  name: string;
  jform: string;
  description: string;
  s_date: Date;
  e_date: Date;
  url: string;
  template: boolean;
  anonym: boolean;
  private: boolean;
  editing: boolean;
  one_answer: boolean;
  recapcha: boolean;
}
