"use client";

import { ListWithCards } from "@/types/types";
import { toast } from "sonner";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { updateCardOrder } from "@/actions/update-card-order";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

function reaorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  const { execute: executeUpdateListsOrder } = useAction(updateListOrder, {
    onSuccess: (data) => {
      toast.success(`Lists reordered!`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const { execute: executeUpdateCardsOrder } = useAction(updateCardOrder, {
    onSuccess: (data) => {
      toast.success(`Cards reordered!`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { source, destination, type } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list") {
      const items = reaorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index }),
      );

      setOrderedData(items);
      executeUpdateListsOrder({ items, boardId });
    }
    // user moves a card
    if (type === "card") {
      let newOrder = [...orderedData];

      const sourceList = newOrder.find(
        (list) => list.id === source.droppableId,
      );
      const destList = newOrder.find(
        (list) => list.id === destination.droppableId,
      );

      if (!sourceList || !destList) {
        return;
      }
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      if (!destList.cards) {
        destList.cards = [];
      }
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reaorder(
          sourceList.cards,
          source.index,
          destination.index,
        );
        reorderedCards.forEach((card, index) => {
          card.order = index;
        });
        sourceList.cards = reorderedCards;
        setOrderedData(newOrder);
        executeUpdateCardsOrder({ boardId: boardId, items: reorderedCards });
      } else {
        const [movedCard] = sourceList.cards.splice(source.index, 1);
        movedCard.listId = destination.droppableId;
        destList.cards.splice(destination.index, 0, movedCard);
        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });
        destList.cards.forEach((card, index) => {
          card.order = index;
        });
        setOrderedData(newOrder);
        executeUpdateCardsOrder({ boardId: boardId, items: destList.cards });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            className="flex gap-x-3 h-full"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {orderedData.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />;
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
