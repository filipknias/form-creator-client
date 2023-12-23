import { useFormCreator } from "@/context/FormCreatorContext";
import { Card } from "../ui/card";
import ElementComponent from "@/components/app/ElementComponent";
import ElementComponentOverlay from "@/components/app/ElementComponentOverlay";
import { useDndMonitor, useDroppable, DragEndEvent } from "@dnd-kit/core";
import { Types } from "@/types/DndTypes";
import { NewFormElement } from "@/types/FormCreator";
import ElementDraggableWrapper from "@/components/app/ElementDraggableWrapper";

export default function FormCreatorArea() {
    const { formElements, addFormElement } = useFormCreator();
    const { setNodeRef, isOver } = useDroppable({
        id: Types.CREATOR_AREA,
    });

    useDndMonitor({
        onDragEnd: (event: DragEndEvent) => {
            if (!isOver) return;
            const element = event.active.data.current as NewFormElement;
            const isElementInState = formElements.find((element) => element.id === event.active.id);
            if (!isElementInState) {
                addFormElement(element);
            }
        },
    });

    return (
        <Card className="h-full p-4 overflow-y-auto overflow-x-hidden" ref={setNodeRef}>
            <div className="flex flex-col gap-4">
                {formElements.map((formElement) => (
                    <div key={formElement.id}>
                        <p>{formElement.indexPosition}</p>
                        <ElementDraggableWrapper formElement={formElement}>
                            <ElementComponentOverlay id={formElement.id}>
                                <ElementComponent type={formElement.type} />
                            </ElementComponentOverlay>
                        </ElementDraggableWrapper>
                    </div>
                ))}
                {isOver && (
                    <div className="rounded-xl bg-slate-800 w-full h-36"></div>
                )}
            </div>
        </Card>
    )
}
