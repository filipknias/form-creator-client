import { createContext, useState, useContext, ReactNode, useMemo, Dispatch, SetStateAction } from "react";
import { FormElement, NewFormElement, ActiveElementId } from "@/types/FormCreator";
import { useFormContext } from "react-hook-form";
import { nanoid } from 'nanoid';

interface FormCreatorProviderState {
    formElements: FormElement[];
    addFormElement: (formElement: NewFormElement, index?: number) => void;
    deleteFormElement: (id: string) => void;
    elementsCount: number;
    activeElementId: ActiveElementId;
    setActiveElementId: Dispatch<SetStateAction<ActiveElementId>>;
    activeFormElement: FormElement|null;
    moveElements: (index: number, id: string) => void;
}

interface FormCreatorProviderProps {
    children: ReactNode;
}

const initialState: FormCreatorProviderState = {
    formElements: [],
    addFormElement: () => {},
    deleteFormElement: () => {},
    elementsCount: 0,
    activeElementId: null,
    setActiveElementId: () => {},
    activeFormElement: null,
    moveElements: () => {},
}

const FormCreatorProviderContext = createContext<FormCreatorProviderState>(initialState);

export function FormCreatorProvider({ children }: FormCreatorProviderProps) {
    const [formElements, setFormElements] = useState<FormElement[]>([]);
    const [activeElementId, setActiveElementId] = useState<ActiveElementId>(null);
    const { setValue, unregister } = useFormContext();

    const elementsCount = formElements.length;

    const addFormElement = (formElement: NewFormElement, index?: number) => {
        const id = nanoid();
        setFormElements((elements) => {
            if (index === undefined) {
                return [...elements, { ...formElement, id }];
            }

            const newElements = [...elements];
            newElements.splice(index, 0, { ...formElement, id });
            return newElements.map((element, index) => ({ ...element, indexPosition: index }));
        });
        if (formElement.attributes) {
            Object.entries(formElement.attributes).forEach(([key, value]) => {
               setValue(`${id}.${key}`, value); 
            });
        }
    };

    const deleteFormElement = (id: string) => {
        setFormElements((prevElements) => {
            const newElements = prevElements.filter((element) => element.id !== id);
            return newElements.map((element, index) => ({ ...element, indexPosition: index }));
        });
        unregister(id);
    };

    const moveElements = (index: number, id: string) => {
        setFormElements((prevElements) => {
            const newElements = [...prevElements];
            const replaceElement = newElements.find((element) => element.id === id);
            if (!replaceElement) return newElements;
            const filteredElements = newElements.filter((elements) => elements.id !== id);
            filteredElements.splice(index, 0, replaceElement);
            return filteredElements.map((element, index) => ({ ...element, indexPosition: index }));
        });
    };

    const activeFormElement = useMemo<FormElement|null>(() => {
        if (activeElementId === null) return null;
        const activeElement = formElements.find((element) => element.id === activeElementId);
        if (!activeElement) return null;
        return activeElement;
    }, [activeElementId, formElements]);

    const value = { 
        formElements,
        addFormElement,
        elementsCount,
        deleteFormElement,
        activeElementId,
        setActiveElementId,
        activeFormElement,
        moveElements,
    };
    
    return (
      <FormCreatorProviderContext.Provider value={value}>
        {children}
      </FormCreatorProviderContext.Provider>
    )
}

export const useFormCreator = () => {
    return useContext(FormCreatorProviderContext);
}

// What's neeed to display ui: (key should be unique id to detect form element) ->
// { index: number, type: FormElementType, attributes: { [attribute-name (ex. label, helper-text)]: input-type (ex. text, switch, textarea) } }

// How to display form elements in FormCreatorArea: map through form elements and display custom component based on FormElementType
// How to display editable attributes in FormElementsSidebar: display attribute label (property: attribute-name - formatted), input element (property: input-type)
// How to keep track of form elements attribute values: keep useForm sync with form elements state attributes, value should be named as attribute-name and each form element should be detected by it's id