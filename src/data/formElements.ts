import { SidebarFormElement } from "@/types/FormCreator";
import { LuHeading1, LuHeading2 } from "react-icons/lu";
import { MdOutlineTitle, MdVerticalAlignCenter, MdTextSnippet } from "react-icons/md";
import { BsTextParagraph, Bs123, BsCalendarDateFill } from "react-icons/bs";
import { RxDividerHorizontal } from "react-icons/rx";
import { GoSingleSelect } from "react-icons/go";
import { IoIosCheckbox } from "react-icons/io";

export const formElements: SidebarFormElement[] = [
    {
        label: 'Title field',
        iconElement: LuHeading1,
        type: 'title-field',
        section: 'layout',
        attributes: {
            title: 'Title field',
        }
    },
    {
        label: 'Subtitle field',
        iconElement: LuHeading2,
        type: 'subtitle-field',
        section: 'layout',
        attributes: {
            subtitle: 'Subtitle field',
        }
    },
    {
        label: 'Paragraph field',
        iconElement: BsTextParagraph,
        type: 'paragraph-field',
        section: 'layout',
        attributes: {
            text: 'Text here',
        }
    },
    {
        label: 'Separator field',
        iconElement: RxDividerHorizontal,
        type: 'separator-field',
        section: 'layout',
    },
    {
        label: 'Spacer field',
        iconElement: MdVerticalAlignCenter,
        type: 'spacer-field',
        section: 'layout',
        attributes: {
            height: 20,
        }
    },
    {
        label: 'Text field',
        iconElement: MdOutlineTitle,
        type: 'text-field',
        section: 'form',
        attributes: {
            label: 'Text field',
            placeholder: 'Value here...',
            helperText: 'Helper text',
            required: false,
        },
    },
    {
        label: 'Number field',
        iconElement: Bs123,
        type: 'number-field',
        section: 'form',
        attributes: {
            label: 'Number field',
            placeholder: '0',
            helperText: 'Helper text',
            required: false,
        },
    },
    {
        label: 'Textarea field',
        iconElement: MdTextSnippet,
        type: 'textarea-field',
        section: 'form',
        attributes: {
            label: 'Text area',
            placeholder: 'Value here...',
            helperText: 'Helper text',
            rows: 3,
            required: false,
        },
    },
    {
        label: 'Date field',
        iconElement: BsCalendarDateFill,
        type: 'date-field',
        section: 'form',
        attributes: {
            label: 'Date field',
            helperText: 'Helper text',
            required: false,
        },
    },
    {
        label: 'Select field',
        iconElement: GoSingleSelect,
        type: 'select-field',
        section: 'form',
        attributes: {
            label: 'Select field',
            placeholder: 'Value here...',
            helperText: 'Helper text',
            options: [],
            required: false,
        },
    },
    {
        label: 'Checkbox field',
        iconElement: IoIosCheckbox,
        type: 'checkbox-field',
        section: 'form',
        attributes: {
            label: 'Checkbox field',
            helperText: 'Helper text',
            required: false,
        },
    },
];