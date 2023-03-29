import { useContext, useState } from "react"
import { CategoryContext } from "../App"

export function CategoryList() {

  const { categories, selectedCategory, setSelectedCategory } = useContext(CategoryContext)!

  return (
    <div className="w-1/3 flex flex-col">
      <ul>
        {categories.map((cat) => (<li key={cat.id} className={['py-2 cursor-pointer ', cat.id === selectedCategory?.id || cat.id === selectedCategory ? 'font-bold text-[30px]' : 'font-normal text-[27px]'].join('')} onClick={(e) => setSelectedCategory(cat.id ? cat : null)}>{cat.label}</li>))}
      </ul>

      <button className="text-gray text-left mt-3">+ New category</button>
    </div>
  )
}