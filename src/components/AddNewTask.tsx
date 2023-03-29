import { useContext, useEffect, useState } from "react";
import { CategoryContext, TodosContext } from "../App";
import CategoryChip, { Category, SelectableCategoryChip } from "./CategoryChip";

function AddNewTaskForm() {
  const { categories } = useContext(CategoryContext)!;

  const { addTodo } = useContext(TodosContext)!;

  const categoriesToUse = categories.filter((el) => el.id);

  const [label, setLabel] = useState<string | null>(null);
  const [formIsValid, setFormValidity] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    setFormValidity(!["", null].includes(label) && selectedCategory !== null);
  }, [selectedCategory, label])

  const handleLabelChange = (event: any) => {
    setLabel(event.target.value);
  };

  const addNewTask = () => {
    addTodo({
      categoryId: selectedCategory!.id!,
      completed: false,
      label: label!
    })
  }

  return (
    <div className="flex flex-col ">
      <div className="pb-3">
        <label htmlFor="taskLabel">
          Label
          <input type="text" name="taskLabel" className="border-solid border-2 rounded-md border-gray w-full p-1" onChange={handleLabelChange} />
        </label>
      </div>
      <div>
        <label htmlFor="taskCategory">
          Category
        </label>

        <div className="flex flex-wrap gap-1 pb-3">
          {categoriesToUse.map((cat) => <SelectableCategoryChip category={cat} key={cat.id} isSelected={selectedCategory?.id === cat.id} onClick={() => setSelectedCategory(cat)} />)}
        </div>

        <div>
          <button className={["h-[58px] px-7 rounded-xl text-white font-bold ", formIsValid ? 'bg-blue' : 'bg-gray'].join("")} onClick={(e) => addNewTask()}>SAVE</button>
        </div>

      </div>
    </div>
  )
}

export default AddNewTaskForm;