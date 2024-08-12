"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";

interface CardItemProps {
  data: Card;
  index: number;
  key: string;
}

export const CardItem = ({ data, index, key }: CardItemProps) => {
  return (
    <Draggable draggableId={data.id} index={index} key={key}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          role="button"
          className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};
