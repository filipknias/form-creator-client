import { createContext, useState, useContext, ReactNode, useMemo, Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { FormElement, NewFormElement } from "@/types/FormCreator";
import { useFormContext } from "react-hook-form";
import {nanoid} from 'nanoid';

type ActiveElementId = string|null;

interface FormCreatorProviderState {
    formElements: FormElement[];
    addFormElement: (formElement: NewFormElement) => void;
    deleteFormElement: (id: string) => void;
    moveElementUp: (id: string) => void;
    moveElementDown: (id: string) => void;
    moveElements: (id: string, replaceId: string) => void;
    elementsCount: number;
    activeElementId: ActiveElementId;
    setActiveElementId: Dispatch<SetStateAction<ActiveElementId>>;
    activeFormElement: FormElement|null;
}

interface FormCreatorProviderProps {
    children: ReactNode;
}

const initialState: FormCreatorProviderState = {
    formElements: [],
    addFormElement: () => {},
    deleteFormElement: () => {},
    moveElementUp: () => {},
    moveElementDown: () => {},
    elementsCount: 0,
    activeElementId: null,
    setActiveElementId: () => {},
    activeFormElement: null,
    moveElements: () => {}
}

const FormCreatorProviderContext = createContext<FormCreatorProviderState>(initialState);

export function FormCreatorProvider({ children }: FormCreatorProviderProps) {
    const [formElements, setFormElements] = useState<FormElement[]>([]);
    const [activeElementId, setActiveElementId] = useState<ActiveElementId>(null);
    const { setValue, unregister } = useFormContext();

    const elementsCount = formElements.length;

    const sortElementsByIndex = useCallback(() => {
        return formElements.sort((a, b) => b.indexPosition - a.indexPosition);
    }, [formElements]);

    useEffect(() => {
        // const sortedElements = sortElementsByIndex();
        // setFormElements(sortedElements);
    }, [formElements]);

    const addFormElement = (formElement: NewFormElement) => {
        const id = nanoid();
        setFormElements((elements) => [...elements, { ...formElement, id }]);
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

    const moveElements = (id: string, replaceId: string) => {
        setFormElements((prevElements) => {
            const newElements = [...prevElements];
            const oldFormElement = formElements.find((element) => element.id === id);
            const newFormElement = formElements.find((element) => element.id === replaceId);
            if (!oldFormElement || !newFormElement) return newElements;
            // const oldIndex = formElements.indexOf(oldFormElement);
            const newIndex = formElements.indexOf(newFormElement);
            newElements.splice(newIndex, 0, oldFormElement);
            return newElements
        })
    }

    const moveElementUp = (id: string) => {
        const formElement = formElements.find((element) => element.id === id);
        if (!formElement || formElement.indexPosition === elementsCount - 1) return;

        setFormElements((prevElements) => {
            return prevElements.map((element, index) => {
                if (index === formElement.indexPosition - 1) {
                    return { ...element, indexPosition: element.indexPosition - 1 };
                } else if (index === formElement.indexPosition) {
                    return { ...element, indexPosition: element.indexPosition + 1 };
                }
                return element;
            })
        });
    };

    const moveElementDown = (id: string) => {
        const formElement = formElements.find((element) => element.id === id);
        if (!formElement || formElement.indexPosition === 0) return;

        setFormElements((prevElements) => {
            return prevElements.map((element, index) => {
                if (index === formElement.indexPosition + 1) {
                    return { ...element, indexPosition: element.indexPosition - 1 };    
                } else if (index === formElement.indexPosition) {
                    return { ...element, indexPosition: element.indexPosition + 1 };
                }
                return element;
            })
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
        moveElementDown,
        moveElementUp,
        activeElementId,
        setActiveElementId,
        activeFormElement,
        moveElements
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