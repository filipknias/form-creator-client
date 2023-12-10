import { FormElementType } from "@/types/FormCreator";
import TitleField from "@/components/form-elements/TitleField";
import TextField from "@/components/form-elements/TextField";

interface Props {
    type: FormElementType;
}

export default function ElementComponent ({ type }: Props) {
    switch (type) {
        case "title-field": return <TitleField title="Title field" />;
        case "text-field": return <TextField label="Text field" placeholder="Value here..." helperText="Helper text" />;
    }
}