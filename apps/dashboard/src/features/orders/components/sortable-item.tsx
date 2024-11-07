"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties } from "react";

type SortableItemProps = {
  id: string;
  item: string;
  containerLabel: string;
  index: number;
};

export const SortableItem = ({
  id,
  item,
  containerLabel,
  index,
}: SortableItemProps) => {
  const {
    attributes,
    transition,
    transform,
    listeners,
    isDragging,
    setNodeRef,
  } = useSortable({
    id,
    data: {
      name: item,
      containerLabel,
      index,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? "0.5" : "1",
  } satisfies CSSProperties;

  return (
    <li
      className="shadow-xl bg-white p-4 rounded-sm"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {item}
    </li>
  );
};
