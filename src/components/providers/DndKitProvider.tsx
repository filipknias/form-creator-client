import { DndContext } from '@dnd-kit/core';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export default function DndKitProvider({ children }: Props) {
    return (
        <DndContext>
            {children}
        </DndContext>
    )
}
