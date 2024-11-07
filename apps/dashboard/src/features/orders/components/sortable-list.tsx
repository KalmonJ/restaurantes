"use client";

import { Dispatch, SetStateAction } from "react";
import { SortableItem } from "./sortable-item";
import { Container } from "./orders-kanban";

type SortableListProps = {
  items: string[];
  setContainerItems: Dispatch<SetStateAction<Container[]>>;
  index: number;
  containerLabel: string;
};

export const SortableList = (props: SortableListProps) => {
  return (
    <>
      {props.items.map?.((item, index) => (
        <SortableItem
          index={index}
          containerLabel={props.containerLabel}
          id={item}
          item={item}
          key={item}
        />
      ))}
    </>
  );
};
