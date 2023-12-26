import ElementComponent from "@/components/app/ElementComponent";
import { Card } from "@/components/ui/card";
import { FormElementType } from "@/types/FormCreator";

const mockFormElements = [
    {
        id: 'test-id-1',
        type: 'title-field',
        attributes: {
            title: 'New test form',
        }
    },
    {
        id: 'test-id-2',
        type: 'text-field',
        attributes: {
            label: 'New label form',
            placeholder: 'New placeholder form',
            helperText: 'New helper text form',
            required: true,
        }
    },
];

export default function FormPreview() {
  return (
    <div className="bg-slate-800 h-full p-4">
        <Card className="h-full p-4 overflow-y-auto max-w-md mx-auto">
            <div className="flex flex-col gap-4">
                {mockFormElements.map((formElement) => (
                    <ElementComponent 
                        key={formElement.id}
                        type={formElement.type as FormElementType}
                        attributes={{
                            label: formElement.attributes.label ? formElement.attributes.label : '',
                            title: formElement.attributes.title ? formElement.attributes.title : '',
                            placeholder: formElement.attributes.placeholder ? formElement.attributes.placeholder : '',
                            helperText: formElement.attributes.helperText ? formElement.attributes.helperText : '',
                            required: formElement.attributes.required ? formElement.attributes.required : '',
                        }}
                    />
                ))}
            </div>
        </Card>
    </div>
  )
}
