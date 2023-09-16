export interface ILogin {
	email: string;
	password: string;
}

export interface ISignup extends ILogin {
	name: string;
	constituency: string;
}
