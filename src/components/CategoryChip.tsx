import { useState } from "react";

export type Category = {
  id: number | null;
  label: string;
  colorCode: string
}


function CategoryChip({ category }: { category: Category }) {
  return (<span className="text-white rounded-full px-[20.5px] py-[8.5px]" style={{ backgroundColor: category.colorCode }}>
    {category.label}
  </span>)
}

type Props = { category: Category; isSelected: boolean, onClick: () => void }
export function SelectableCategoryChip(props: Props) {

  const [isHovering, setIsHovering] = useState(false);

  return (<span className="text-white rounded-full px-[20.5px] py-[8.5px] cursor-pointer" style={{ backgroundColor: props.isSelected || isHovering ? props.category.colorCode : "#80808063" }} onMouseEnter={(e) => setIsHovering(true)}
    onMouseLeave={(e) => setIsHovering(false)} onClick={(e) => props.onClick()}>
    {props.category.label}
  </span>)
}

export default CategoryChip;