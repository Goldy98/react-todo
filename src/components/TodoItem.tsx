import { useContext, useMemo } from "react";
import { CategoryContext, TodosContext } from "../App";
import CheckMark from "../icons/Check";
import CategoryChip from "./CategoryChip";

export type Todo = {
	id: number;
	categoryId: number;
	label: string;
	completed: boolean;
};

type Props = {
	todo: Todo;
};

function CheckBox({
	isChecked,
	onCheck,
}: { isChecked: boolean; onCheck: () => void }) {
	return (
		<button
			className="w-[30px] h-[30px] border-red border-solid border-2 rounded-xl flex justify-center items-center"
			onClick={() => onCheck()}
		>
			{isChecked && <CheckMark />}
		</button>
	);
}

export default function TodoItem({ todo }: Props) {
	const { categories } = useContext(CategoryContext);
	const { markTodoAsCompleted } = useContext(TodosContext);

	const todoCategory = useMemo(() => {
		return categories.find((el) => el.id === todo.categoryId);
	}, [categories, todo.categoryId]);

	return (
		<li
			className={`flex items-center font-semibold my-2 ${
				todo.completed ? "text-red" : ""
			}`}
		>
			<CheckBox
				isChecked={todo.completed}
				onCheck={() => markTodoAsCompleted(todo.id)}
			/>
			<span className="px-2 text-[25px]">{todo.label}</span>
			{todoCategory && <CategoryChip category={todoCategory} />}
		</li>
	);
}
