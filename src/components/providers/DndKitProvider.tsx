import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { ReactNode } from 'react';
import { useFormCreator } from '@/context/FormCreatorContext';
import { NewFormElement } from '@/types/FormCreator';

interface Props {
    children: ReactNode;
}

export default function DndKitProvider({ children }: Props) {
    const { addFormElement } = useFormCreator();

    const onDragEnd = (event: DragEndEvent) => {
        const element = event.active.data.current as NewFormElement;
        if (event.over && event.over.id === "creator-area") {
            addFormElement(element);
        }
    }

    return (
        <DndContext onDragEnd={onDragEnd}>
            {children}
        </DndContext>
    )
}
