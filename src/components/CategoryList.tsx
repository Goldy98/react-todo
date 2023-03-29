import { useContext } from "react";
import { CategoryContext } from "../App";

export function CategoryList() {
	const { categories, selectedCategory, setSelectedCategory } =
		useContext(CategoryContext);

	return (
		<div className="w-1/3 flex flex-col">
			<ul>
				{categories.map((cat) => {
					const isSelected =
						cat.id === selectedCategory?.id || cat.id === undefined;
					return (
						<li
							key={cat.id}
							className={`py-2 cursor-pointer ${
								isSelected ? "font-bold text-[30px]" : "font-normal text-[27px]"
							}`}
							onClick={() => setSelectedCategory(cat.id ? cat : undefined)}
						>
							{cat.label}
						</li>
					);
				})}
			</ul>

			<button className="text-gray text-left mt-3">+ New category</button>
		</div>
	);
}
