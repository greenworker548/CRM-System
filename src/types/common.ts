export interface Todo { 
	id: number,
	title: string,
	created: string,
	isDone: boolean,
}

export interface ValueOfTodosStatus { 
	all: number,
	completed: number,
	inWork: number,
}

export type ActivTodosStatus = "all" | "inWork" | "completed"