import { type ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';

// Droppable component
type DragDropProps = {
    children: ReactNode;
    id: string;
};

const TeamSlots = ({ children, id }: DragDropProps) => {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return <div ref={setNodeRef}>{children}</div>;
};

export default TeamSlots;
