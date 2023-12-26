import { Card, CardHeader, CardContent, CardDescription } from "../ui/card";
import { useFormCreator } from "@/context/FormCreatorContext";
import ElementForm from "@/components/app/ElementForm";
import FormElementTile from "@/components/app/FormElementTile";
import { formElements } from "@/data/formElements";

export default function FormElementsSidebar() {
    const { activeFormElement } = useFormCreator();
    const layoutSectionElements = formElements.filter(({ section }) => section === "layout");
    const formSectionElements = formElements.filter(({ section }) => section === "form");

    return (
        <Card className="h-full rounded-none border-none p-2">
            <CardContent className="h-full">
                {activeFormElement ? (
                    <ElementForm formElement={activeFormElement} />
                ) : (
                    <>
                        <CardHeader className="px-0 mb-4 text-lg">Drag and drop elements</CardHeader>
                        <CardDescription className="mb-4 text-base">Layout elements</CardDescription>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {layoutSectionElements.map((element) => (
                                <FormElementTile key={element.type} formElement={element} />
                            ))}
                        </div>
                        <CardDescription className="mb-4 text-base">Form elements</CardDescription>
                        <div className="grid grid-cols-2 gap-4">
                            {formSectionElements.map((element) => (
                                <FormElementTile key={element.type} formElement={element} />
                            ))}
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    )
}
