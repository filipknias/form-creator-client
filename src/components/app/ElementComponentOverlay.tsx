import { ReactNode } from "react";
import { useFormCreator } from "@/context/FormCreatorContext";
import { FaTrash } from "react-icons/fa6";
import { DragEndEvent, useDndMonitor, useDroppable, useDndContext } from "@dnd-kit/core";
import { NewFormElement } from "@/types/FormCreator";
import { Types } from "@/types/DndTypes";

interface Props {
    children: ReactNode;
    id: string;
}

export default function ElementComponentOverlay({ children, id }: Props) {
    const { formElements, deleteFormElement, setActiveElementId, addFormElement, moveElements } = useFormCreator();
    const topDroppableHalf = useDroppable({
        id: `${id}-top-half`,
    });
    const bottomDroppableHalf = useDroppable({
        id: `${id}-bottom-half`,
    });
    const dndContext = useDndContext();

    useDndMonitor({
        onDragEnd: (event: DragEndEvent) => {
            const droppableElementId = event.over?.id;
            const topHalfId = `${id}-top-half`;
            const bottomHalfId = `${id}-bottom-half`;
            const activeElementId = event.active.id as string;
            const draggingElement = formElements.find((element) => element.id === activeElementId);
            const overlayElement = formElements.find((element) => element.id === id);

            switch (droppableElementId) {
                case Types.CREATOR_AREA: {
                    if (!draggingElement || !overlayElement) return;
                    const newElement = event.active.data.current as NewFormElement;
                    if (topDroppableHalf.isOver) {
                        addFormElement(newElement, overlayElement.indexPosition);
                    } else if (bottomDroppableHalf.isOver) {
                        addFormElement(newElement, overlayElement.indexPosition + 1);
                    } else {
                        moveElements(formElements.length, draggingElement.id);
                    }
                    break;
                }
                case topHalfId: {
                    if (!overlayElement) return;
                    if (draggingElement && draggingElement.indexPosition !== overlayElement.indexPosition - 1) {
                        moveElements(overlayElement.indexPosition, activeElementId);
                    } else if (!draggingElement) {
                        const newElement = event.active.data.current as NewFormElement;
                        addFormElement(newElement, overlayElement.indexPosition);
                    }
                    break;
                }
                case bottomHalfId: {
                    if (!overlayElement) return;
                    if (draggingElement && draggingElement.indexPosition !== overlayElement.indexPosition + 1) {
                        moveElements(overlayElement.indexPosition, activeElementId);
                    } else if (!draggingElement) {
                        const newElement = event.active.data.current as NewFormElement;
                        addFormElement(newElement, overlayElement.indexPosition + 1);
                    }
                    break;
                }
            }
            setActiveElementId(null);
        },
    });

    return (
        <div className="relative group cursor-pointer" onClick={() => setActiveElementId(id)}>
            <div className="absolute top-0 h-1/2 w-full rounded-xl" ref={topDroppableHalf.setNodeRef}>
                {topDroppableHalf.isOver && dndContext.active?.id !== id && (
                    <div className="h-2 bg-white rounded-t-xl"></div>
                )}
            </div>
            <div className="absolute bottom-0 h-1/2 w-full rounded-xl flex flex-col justify-end" ref={bottomDroppableHalf.setNodeRef}>
                {bottomDroppableHalf.isOver && dndContext.active?.id !== id && (
                    <div className="h-2 bg-white rounded-b-xl"></div>
                )}
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-70 hidden group-hover:flex items-center gap-4 justify-end z-50" data-component-id={id}>
                <button 
                    className="bg-red-500 flex items-center justify-center w-16 h-full text-xl hover:bg-red-600 transition duration-200 rounded-r-md"
                    onClick={() => deleteFormElement(id)}
                >
                    <FaTrash />
                </button>
            </div>
            {children}
        </div>
    )
}