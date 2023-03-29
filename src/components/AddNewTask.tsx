import { ChangeEvent, useCallback, useContext, useState } from "react";
import { CategoryContext, TodosContext } from "../App";
import { Category, SelectableCategoryChip } from "./CategoryChip";

export default function AddNewTaskForm() {
	const { categories } = useContext(CategoryContext);

	const { addTodo } = useContext(TodosContext);

	const categoriesToUse = categories.filter((el) => el.id);

	const [label, setLabel] = useState<string>();
	const [selectedCategory, setSelectedCategory] = useState<Category>();

	const canSubmit = useCallback(
		() => !!(label && selectedCategory),
		[label, selectedCategory],
	);

	const handleLabelChange = (event: ChangeEvent<HTMLInputElement>) => {
		setLabel(event.target.value);
	};

	const addNewTask = () => {
		if (!selectedCategory || !label) return;
		addTodo({
			categoryId: selectedCategory.id,
			completed: false,
			label: label,
		});
	};

	return (
		<div className="flex flex-col ">
			<div className="pb-3">
				<label htmlFor="taskLabel">
					Label
					<input
						type="text"
						name="taskLabel"
						className="border-solid border-2 rounded-md border-gray w-full p-1"
						onChange={handleLabelChange}
					/>
				</label>
			</div>
			<div>
				<label htmlFor="taskCategory">Category</label>

				<div className="flex flex-wrap gap-1 pb-3">
					{categoriesToUse.map((cat) => (
						<SelectableCategoryChip
							category={cat}
							key={cat.id}
							isSelected={selectedCategory?.id === cat.id}
							onClick={() => setSelectedCategory(cat)}
						/>
					))}
				</div>

				<div>
					<button
						className={`h-[58px] px-7 rounded-xl text-white font-bold ${
							canSubmit() ? "bg-blue" : "bg-gray"
						}`}
						onClick={addNewTask}
					>
						SAVE
					</button>
				</div>
			</div>
		</div>
	);
}
