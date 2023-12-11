import { useFormCreator } from "@/context/FormCreatorContext";
import { Card } from "../ui/card";
import ElementComponent from "@/components/app/ElementComponent";
import ElementComponentOverlay from "@/components/app/ElementComponentOverlay";
import { useDroppable } from "@dnd-kit/core";
import { Types } from "@/types/DndTypes";

export default function FormCreatorArea() {
    const { formElements } = useFormCreator();
    const { setNodeRef, active } = useDroppable({
        id: Types.CREATOR_AREA,
    });

    return (
        <Card className="h-full p-4 overflow-y-auto relative" ref={setNodeRef}>
            {active && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10">
                    <h1 className="text-slate-200 text-4xl">Drop element here</h1>
                </div>
            )}
            <div className="flex flex-col gap-4">
                {formElements.map(({ id, type }) => (
                    <ElementComponentOverlay id={id} key={id}>
                        <ElementComponent type={type} />
                    </ElementComponentOverlay>
                ))}
            </div>
        </Card>
    )
}
