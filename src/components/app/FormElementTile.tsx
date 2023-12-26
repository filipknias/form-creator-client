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

    const styles = {
        transform: CSS.Translate.toString(transform),
        zIndex: '50'
    };

    return (
        <div
            ref={setNodeRef}
            style={styles}
            {...draggableAttributes}
            {...listeners}
        >
            <div 
                className={`rounded-md border border-slate-800 bg-slate-950 p-4 h-32 w-32 flex flex-col gap-2 items-center justify-center hover:border-slate-400 transition duration-200 ${isDragging ? "cursor-grab" : "cursor-grabbing"}`}
            >
                <div className="flex justify-center mb-2 text-3xl"><IconElement /></div>
                <p className="text-white text-sm font-medium text-center">{label}</p>
            </div>
        </div>
    )
}