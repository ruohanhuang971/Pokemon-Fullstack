import { type ReactNode } from 'react';
import { useDraggable, type UniqueIdentifier } from '@dnd-kit/core';

type DragDropProps = {
    children: ReactNode;
    id: UniqueIdentifier;
};

const SearchOptions = ({ children, id }: DragDropProps) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id: id,
        });
    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        touchAction: 'none',
        opacity: isDragging ? 0.8 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <div>{children}</div>
        </div>
    );
};

export default SearchOptions;
