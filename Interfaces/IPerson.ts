export interface IPerson {
	name: string;
	birthDate: Date;
	cpf: string;
	age: number
}

export interface IFilterPerson {
	name?: string;
	cpf?: string;
}
