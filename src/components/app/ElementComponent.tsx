import { ElementAttributes, FormElementType } from "@/types/FormCreator";
import TitleField from "@/components/form-elements/TitleField";
import TextField from "@/components/form-elements/TextField";

interface Props {
    type: FormElementType;
    attributes?: ElementAttributes;
}

const defaults = {
    title: "Title field",
    label: "Text field",
    placeholder: "Value here...",
    helperText: "Helper text",
    required: false,
};

export default function ElementComponent ({ type, attributes }: Props) {
    const getComponentProp = <T,>(name: string, type: string): T => {
        const isAttributeProp = !!(attributes && attributes[name] && typeof attributes[name] === type);
        return isAttributeProp ? (attributes[name] as T) : (defaults[name as keyof typeof defaults] as T);
    };

    switch (type) {
        case "title-field": 
            return <TitleField title={getComponentProp('title', 'string')} />;
        case "text-field": 
            return <TextField 
                        label={getComponentProp<string>('label', 'string')}
                        placeholder={getComponentProp<string>('placeholder', 'string')} 
                        helperText={getComponentProp<string>('helperText', 'string')}
                        required={getComponentProp<boolean>('required', 'boolean')}
                    />;
    }
}