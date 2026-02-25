export interface TodoRequest {
	title: string;
	description: string;
}

export interface TodoResponse {
	id: string;
	title: string;
	description: string;
}

export interface PaginatedTodosResponse {
	todos: TodoResponse[];
	total: number;
	page: number;
	limit: number;
}
