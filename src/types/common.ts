export interface Todo { 
	id: number,
	title: string,
	created: string,
	isDone: boolean,
}

export interface TodoInfo { 
	all: number,
	completed: number,
	inWork: number,
}

export interface TodoRequest { 
	title?: string,
 	isDone?: boolean, 
}

export type ActivTodosStatus = "all" | "inWork" | "completed"