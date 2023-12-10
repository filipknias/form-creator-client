import { SidebarFormElement } from "@/types/FormCreator";
import { LuHeading1 } from "react-icons/lu";
import { MdOutlineTitle } from "react-icons/md";

export const formElements: SidebarFormElement[] = [
    {
        label: 'Title field',
        iconElement: LuHeading1,
        type: 'title-field',
        attributes: {
            title: 'Title field',
        }
    },
    {
        label: 'Text field',
        iconElement: MdOutlineTitle,
        type: 'text-field',
        attributes: {
            label: 'Text field',
            placeholder: 'Value here...',
            helperText: 'Helper text',
            required: false,
        },
    },
];