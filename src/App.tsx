import { createContext, useState } from "react";
import "./App.css";
import AddNewTaskForm from "./components/AddNewTask";
import { Category } from "./components/CategoryChip";
import { CategoryList } from "./components/CategoryList";
import Modal from "./components/Modal/Modal";
import { Todo } from "./components/TodoItem";
import TodoList from "./components/TodoList";

const categories: Category[] = [
	{
		id: 0,
		label: "All",
		colorCode: "",
	},
	{
		id: 1,
		label: "Favourites",
		colorCode: "#F2994A",
	},
	{
		id: 2,
		label: "Groceries",
		colorCode: "#27AE60",
	},
	{
		id: 3,
		label: "Study",
		colorCode: "#9B51E0",
	},
	{
		id: 4,
		label: "Sports",
		colorCode: "#2F80ED",
	},
];

type CategoryContextType = {
	categories: Category[];
	selectedCategory?: Category;
	setSelectedCategory: (cat?: Category) => void;
};

type CreateTodoPayload = Omit<Todo, "id">;

type TodosContextType = {
	allTodos: Todo[];
	addTodo: (todo: CreateTodoPayload) => void;
	markTodoAsCompleted: (todoId: number) => void;
};

const defaultCategoryContext = {} as CategoryContextType;
const defaultTodoContextValue = {} as TodosContextType;

export const CategoryContext = createContext<CategoryContextType>(
	defaultCategoryContext,
);
export const TodosContext = createContext<TodosContextType>(
	defaultTodoContextValue,
);

export default function App() {
	const [selectedCategory, setSelectedCategory] = useState<Category>();
	const [isAddModalOpen, toggleAddModal] = useState(false);

	const [allTodos, updateTodos] = useState<Todo[]>([]);

	const addTodo = (todo: CreateTodoPayload) => {
		allTodos.push({ ...todo, id: allTodos.length });
		updateTodos([...allTodos]);
		toggleAddModal(!isAddModalOpen);
	};

	const markTodoAsCompleted = (todoId: number) => {
		// le state est imitable
		// const theTodoIndex = allTodos.findIndex((el) => el.id === todoId);

		// if (theTodoIndex === -1) return;
		// je suis etonné que ça te laisse faire ça
		// allTodos[theTodoIndex].completed = !allTodos[theTodoIndex].completed;

		// updateTodos([...allTodos]);

		// Je propose ça
		const todos = [...allTodos];
		const todo = todos.find((item) => item.id === todoId);
		if (!todo) throw new Error(`can't find todo ${todoId}`);
		todo.completed = !todo.completed;
		updateTodos(todos);
	};

	return (
		<TodosContext.Provider value={{ allTodos, addTodo, markTodoAsCompleted }}>
			<CategoryContext.Provider
				value={{ categories, selectedCategory, setSelectedCategory }}
			>
				<div className="flex justify-center items-center p-28">
					<div className='flex w-2/3'>
						<CategoryList />

						<TodoList
							onAddNewTaskRequest={() => {
								toggleAddModal(true);
							}}
						/>
					</div>
				</div>

				<Modal
					show={isAddModalOpen}
					title='Add new task'
					onClose={() => toggleAddModal(!isAddModalOpen)}
				>
					<AddNewTaskForm />
				</Modal>
			</CategoryContext.Provider>
		</TodosContext.Provider>
	);
}
