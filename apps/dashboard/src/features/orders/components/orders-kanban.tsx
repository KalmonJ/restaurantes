"use client";

import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { useEffect, useState } from "react";
import { DroppableContainer } from "./droppable-container";
import { SortableList } from "./sortable-list";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Item } from "./item";

type ConatinerLabel = "TODO" | "IN_PROGRESS" | "DONE";

export type Container = {
  label: ConatinerLabel;
  items: string[];
};

export const OrdersKanban = () => {
  const [client, setClient] = useState(false);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [containerItems, setContainerItems] = useState<Container[]>([
    { label: "TODO", items: ["Hello", "World", "Jhon"] },
    { label: "IN_PROGRESS", items: ["Jsasdan", "Smit"] },
    { label: "DONE", items: ["Testing", "Nextjs"] },
  ]);

  const containers = containerItems.map((container) => container.label);
  const containerValues = containerItems.flatMap(
    (container) => container.items
  );

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return null;

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const activeContainerLabel = active.data.current?.containerLabel;
    const overContainerLabel = over?.data.current?.containerLabel ?? over?.id;

    const overIndex = containerItems.findIndex(
      (container) => container.label === overContainerLabel
    );
    const activeIndex = containerItems.findIndex(
      (container) => container.label === activeContainerLabel
    );

    const activeContainer = containerItems[activeIndex];
    const overContainer = containerItems[overIndex];

    console.log(active.id, over?.id);

    if (over && active && activeContainerLabel !== overContainerLabel) {
      const overItemIndex = over?.data.current?.index;
      const activeItemIndex = active.data.current?.index;

      overContainer.items.splice(overItemIndex, 0, active.id as string);
      activeContainer.items.splice(activeItemIndex, 1);
    }

    if (
      active &&
      over &&
      activeContainerLabel === overContainerLabel &&
      active.id !== over.id
    ) {
      const overItems = containerItems[activeIndex].items;
      const newIndex = overItems.indexOf(over.id as string);
      const oldIndex = overItems.indexOf(active.id as string);

      overContainer.items = arrayMove(overItems, oldIndex, newIndex);
    }

    if (
      active &&
      over &&
      containerValues.includes(active.id as string) &&
      containers.includes(over.id as (typeof containers)[number]) &&
      !overContainer.items.includes(active.id as string)
    ) {
      const activeItemIndex = active.data.current?.index;
      overContainer.items.push(active.id as string);
      activeContainer.items.splice(activeItemIndex, 1);
    }

    setContainerItems([...containerItems]);
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    setActiveId(active.id);
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-3 bg-muted p-4 rounded-lg gap-4 h-full grid-rows-1">
        {containerItems.map((container, i) => (
          <SortableContext
            key={container.label}
            strategy={verticalListSortingStrategy}
            items={container.items}
          >
            <DroppableContainer key={container.label} id={container.label}>
              <SortableList
                items={container.items}
                setContainerItems={setContainerItems}
                containerLabel={container.label}
                index={i}
              />
            </DroppableContainer>
          </SortableContext>
        ))}
        <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
      </div>
    </DndContext>
  );
};
