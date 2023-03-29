import { useContext, useEffect, useMemo, useState } from "react";
import { CategoryContext, TodosContext } from "../App";
import EmptyIcon from "../icons/Empty";
import TodoItem from "./TodoItem";
import "./TodoList.css";

export default function TodoList(props: { onAddNewTaskRequest: () => void }) {
	const { selectedCategory } = useContext(CategoryContext);
	const { allTodos } = useContext(TodosContext);

	const todosToShow = useMemo(() => {
		if (selectedCategory)
			return allTodos.filter((el) => el.categoryId === selectedCategory.id);

		return allTodos;
	}, [selectedCategory, allTodos]);

	const [showEmptyState, setShowEmptyState] = useState(true);

	useEffect(() => {
		setShowEmptyState(allTodos.length === 0);
	}, [allTodos.length]);

	return (
		<div className="w-full flex flex-col">
			<div>
				<div className="flex justify-between">
					<h1 className="font-bold text-[50px]">All Tasks</h1>
					<button
						className="bg-blue h-[58px] px-7 rounded-xl addButton text-white"
						onClick={() => props.onAddNewTaskRequest()}
					>
						+ Add new task
					</button>
				</div>

				<ul>
					{todosToShow.map((todo) => (
						<TodoItem key={todo.id} todo={todo} />
					))}
				</ul>
			</div>

			{showEmptyState && (
				<div className="flex flex-col justify-center items-center">
					<EmptyIcon />
					<h1 className="text-2xl pt-3">You haven't added a task todo</h1>
				</div>
			)}
		</div>
	);
}
