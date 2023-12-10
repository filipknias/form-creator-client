import { useFormCreator } from "@/context/FormCreatorContext";
import { Card } from "../ui/card";
import ElementComponent from "@/components/app/ElementComponent";
import ElementComponentOverlay from "@/components/app/ElementComponentOverlay";
import { useDroppable } from "@dnd-kit/core";
import { Types } from "@/types/DndTypes";

export default function FormCreatorArea() {
    const { formElements } = useFormCreator();
    const { setNodeRef } = useDroppable({
        id: Types.CREATOR_AREA,
    });

    return (
        <Card className="h-full p-4 overflow-y-auto" ref={setNodeRef}>
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
