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
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";

interface Props {
    formElement: FormElement;
}

export default function ElementForm({ formElement }: Props) {
    const { setActiveElementId } = useFormCreator();
    const { attributes, id } = formElement;
    const { register, setValue, getValues } = useFormContext();
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

    const addSelectOption = () => {
        const prevOptions: string[] = getValues(`${id}.options`);
        const defaultValue = "New option";
        setValue(`${id}.options`, [...prevOptions, defaultValue]);
    };

    const deleteSelectOption = (index: number) => {
        const prevOptions: string[] = getValues(`${id}.options`);
        const newOptions = prevOptions.filter((_, optionIdx) => optionIdx !== index);
        setValue(`${id}.options`, newOptions);
    };

    const updateSelectValue = (value: string, index: number) => {
        const prevOptions: string[] = getValues(`${id}.options`);
        const newOptions = prevOptions.map((option, optionIdx) => optionIdx === index ? value : option);
        setValue(`${id}.options`, newOptions);
    };

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
                {attributes && attributes.text && (
                    <div>
                        <CardTitle className="text-base mb-2">Text</CardTitle>
                        <Textarea 
                            className="w-full mb-2" 
                            {...register(`${id}.${getKeyByValue<ElementAttributeValue>(attributes, attributes.text)}`)} 
                        />
                    </div>
                )}
                {attributes && attributes.height && (
                    <div>
                        <CardTitle className="text-base mb-2">Height (px)</CardTitle>
                        <Input 
                            type="number"
                            className="w-full mb-2"
                            {...register(`${id}.${getKeyByValue<ElementAttributeValue>(attributes, attributes.height)}`, { valueAsNumber: true })}
                        />
                    </div>
                )}
                {attributes && attributes.rows && (
                    <div>
                        <CardTitle className="text-base mb-2">Rows</CardTitle>
                        <Input 
                            type="number"
                            className="w-full mb-2"
                            {...register(`${id}.${getKeyByValue<ElementAttributeValue>(attributes, attributes.rows)}`, { valueAsNumber: true })}
                        />
                    </div>
                )}
                {attributes && attributes.options && (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <CardTitle className="text-base mb-2">Options</CardTitle>
                            <Button variant="outline" onClick={addSelectOption}>
                                <FaPlus className="mr-2" />
                                Add
                            </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                            {getValues(`${id}.options`).map((optionValue: string, index: number) => (
                                <div className="flex items-center gap-4" key={index}>
                                    <Input 
                                        value={optionValue} 
                                        onChange={(e) => updateSelectValue(e.target.value, index)} 
                                    />
                                    <IoCloseOutline className="text-3xl cursor-pointer" onClick={() => deleteSelectOption(index)} />
                                </div>
                            ))}
                        </div>
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
