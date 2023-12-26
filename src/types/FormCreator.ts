import { IconType } from "react-icons";

export type FormElementType = 
    "title-field" |
    "text-field" |
    "subtitle-field" |
    "paragraph-field" |
    "separator-field" |
    "spacer-field" |
    "number-field" |
    "textarea-field" |
    "date-field" |
    "select-field" |
    "checkbox-field";

export type FormElementSection = "layout" | "form";

export type ElementAttributeValue = string|boolean|number|string[];

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
    section: FormElementSection;
    attributes?: ElementAttributes;
}