import { DndContext, useSensor, MouseSensor, useSensors } from '@dnd-kit/core';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export default function DndKitProvider({ children }: Props) {
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
          distance: 10,
        },
    });
    
    const sensors = useSensors(mouseSensor);

    return (
        <DndContext sensors={sensors}>
            {children}
        </DndContext>
    )
}
