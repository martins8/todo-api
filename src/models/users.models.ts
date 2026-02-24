export interface RegisterUser {
	email: string;
	password: string;
	name: string;
}

export interface LoginUser {
	email: string;
	password: string;
}

export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
}

export interface UserResponse {
	id: string;
	name: string;
	email: string;
}
