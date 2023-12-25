import { Card, CardHeader, CardContent } from "../ui/card";
import { useFormCreator } from "@/context/FormCreatorContext";
import ElementForm from "@/components/app/ElementForm";
import FormElementTile from "@/components/app/FormElementTile";
import { formElements } from "@/data/formElements";

export default function FormElementsSidebar() {
    const { activeFormElement } = useFormCreator();

    return (
        <Card className="h-full rounded-none border-none">
            <CardContent className="h-full">
                {activeFormElement ? (
                    <ElementForm formElement={activeFormElement} />
                ) : (
                    <>
                        <CardHeader className="px-0">Drag and drop elements</CardHeader>
                        <div className="flex flex-wrap gap-4">
                            {formElements.map((element) => (
                                <FormElementTile key={element.type} formElement={element} />
                            ))}
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    )
}
