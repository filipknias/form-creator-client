import { SidebarFormElement } from "@/types/FormCreator";
import { useFormCreator } from "@/context/FormCreatorContext";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface Props {
    formElement: SidebarFormElement;
}

export default function FormElementTile({ formElement }: Props) {
    const { iconElement: IconElement, label, type, attributes } = formElement;
    const { elementsCount } = useFormCreator();
    const { 
        setNodeRef, 
        attributes: draggableAttributes, 
        listeners, 
        transform, 
        isDragging,
    } = useDraggable({
        id: formElement.type,
        data: { type, attributes, indexPosition: elementsCount },
    });

    return (
        <div
            ref={setNodeRef}
            style={{ transform: CSS.Translate.toString(transform) }}
            {...draggableAttributes}
            {...listeners}
        >
            <div 
                className={`rounded-md border border-slate-800 p-4 h-24 w-24 hover:border-slate-400 transition duration-200 ${isDragging ? "cursor-grab" : "cursor-grabbing"}`}
            >
                <div className="flex justify-center mb-2 text-3xl"><IconElement /></div>
                <p className="text-white text-sm font-medium text-center">{label}</p>
            </div>
        </div>
    )
}