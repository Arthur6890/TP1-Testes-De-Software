export interface IPerson {
  name: string;
  birthDate: Date;
  cpf: string;
}

export interface IFilterPerson {
  name?: string;
  cpf?: string;
}
