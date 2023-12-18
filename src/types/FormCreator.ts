import { IconType } from "react-icons";

export type FormElementType = 
    "title-field" |
    "text-field";
    
export type ElementAttributeValue = string|boolean;

export type ElementAttributes = Record<string, ElementAttributeValue>;

export type NewFormElement = Omit<FormElement, "id">;

export type ActiveElementId = string|null;

export type FormElement = {
    id: string;
    indexPosition: number;
    type: FormElementType;
    attributes?: ElementAttributes;
}

export type SidebarFormElement = {
    label: string;
    iconElement: IconType;
    type: FormElementType;
    attributes?: ElementAttributes;
}