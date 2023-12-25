import { FormElement } from "@/types/FormCreator"
import { CardDescription, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { IoCloseOutline } from "react-icons/io5";
import { useFormCreator } from "@/context/FormCreatorContext";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useFormContext } from "react-hook-form";
import { getKeyByValue } from "@/utilities/getKeyByValue";
import { ElementAttributeValue } from "@/types/FormCreator";
import { useEffect, useRef } from "react";

interface Props {
    formElement: FormElement;
}

export default function ElementForm({ formElement }: Props) {
    const { setActiveElementId } = useFormCreator();
    const { attributes, id } = formElement;
    const { register } = useFormContext();
    const sidebarRef = useRef<HTMLDivElement|null>(null);

    useEffect(() => {
        const clickOutsideFn = (e: MouseEvent) => {
            const targetDataId = (e.target as HTMLElement).getAttribute("data-component-id");
            if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node) && !targetDataId) {
                setActiveElementId(null);
            }
        };
        
        document.addEventListener("mousedown", (e) => clickOutsideFn(e));
        return () => document.removeEventListener("mousedown", clickOutsideFn);
    }, [setActiveElementId]);

    return (
        <div className="py-8 h-full" ref={sidebarRef}>
            <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-6">
                <CardDescription>Element properties</CardDescription>
                <IoCloseOutline 
                    className="text-xl text-slate-400 cursor-pointer hover:text-slate-300 transition duration-200" 
                    onClick={() => setActiveElementId(null)}
                />
            </div>
            <div className="flex flex-col gap-6 overflow-y-auto px-2">
                {attributes && attributes.title && (
                    <div>
                        <CardTitle className="text-base mb-2">Title</CardTitle>
                        <Input 
                            className="w-full mb-2" 
                            {...register(`${id}.${getKeyByValue<ElementAttributeValue>(attributes, attributes.title)}`)}
                        />
                    </div>
                )}
                {attributes && attributes.label && (
                    <div>
                        <CardTitle className="text-base mb-2">Label</CardTitle>
                        <Input 
                            className="w-full mb-2" 
                            {...register(`${id}.${getKeyByValue<ElementAttributeValue>(attributes, attributes.label)}`)}
                        />
                        <CardDescription className="text-xs leading-5">
                            The label of the field.
                            <br />
                            It will be displayed above the field
                        </CardDescription>
                    </div>
                )}
                {attributes && attributes.placeholder && (
                    <div>
                        <CardTitle className="text-base mb-2">Placeholder</CardTitle>
                        <Input 
                            className="w-full mb-2" 
                            {...register(`${id}.${getKeyByValue<ElementAttributeValue>(attributes, attributes.placeholder)}`)}
                        />
                        <CardDescription className="text-xs">The placeholder of the field.</CardDescription>
                    </div>
                )}
                {attributes && attributes.helperText && (
                    <div>
                        <CardTitle className="text-base mb-2">Helper text</CardTitle>
                        <Input 
                            className="w-full mb-2" 
                            {...register(`${id}.${getKeyByValue<ElementAttributeValue>(attributes, attributes.helperText)}`)} 
                        />
                        <CardDescription className="text-xs leading-5">
                            The helper text of the field.
                            <br />
                            It will be displayed below the field.
                        </CardDescription>
                    </div>
                )}
                {attributes && Object.prototype.hasOwnProperty.call(attributes, "required") && (
                    <div className="border border-slate-800 rounded-md p-4">
                        <Label htmlFor="required">
                            <CardTitle className="text-base mb-2">Required</CardTitle>
                        </Label>
                        <div className="flex justify-between">
                            <CardDescription className="text-xs leading-5">
                                The helper text of the field.
                                <br />
                                It will be displayed below the field.
                            </CardDescription>
                            <Switch 
                                id="required" 
                                {...register(`${id}.${getKeyByValue<ElementAttributeValue>(attributes, attributes.required)}`)}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
