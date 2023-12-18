import { ReactNode } from "react";
import { useFormCreator } from "@/context/FormCreatorContext";
import { FaTrash } from "react-icons/fa6";
import { DragEndEvent, useDndMonitor, useDroppable, useDndContext } from "@dnd-kit/core";
import { NewFormElement } from "@/types/FormCreator";

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
            if (event.over?.id !== `${id}-top-half` && event.over?.id !== `${id}-bottom-half`) return;

            const activeElementId = event.active.id as string;
            const isElementInState = formElements.find((element) => element.id === activeElementId);
            const overElement = formElements.find((element) => element.id === id);
            if (isElementInState && overElement) {
                return moveElements(overElement.indexPosition, activeElementId);
            }
            
            const overlayElement = formElements.find((element) => element.id === id);
            const newElement = event.active.data.current as NewFormElement;
            if (!overlayElement) return;
            if (newElement.indexPosition === overlayElement.indexPosition - 1) return;
            if (topDroppableHalf.isOver) {
                addFormElement(newElement, overlayElement.indexPosition);
            } else if (bottomDroppableHalf.isOver) {
                addFormElement(newElement, overlayElement.indexPosition + 1);
            }
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
            <div className="absolute inset-0 bg-black bg-opacity-70 hidden group-hover:flex items-center gap-4 justify-end">
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