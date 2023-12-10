import { ReactNode } from "react";
import { useFormCreator } from "@/context/FormCreatorContext";
import { FaTrash } from "react-icons/fa6";

interface Props {
    children: ReactNode;
    id: string;
}

export default function ElementComponentOverlay({ children, id }: Props) {
    const { deleteFormElement,  setActiveElementId } = useFormCreator();

    return (
        <div 
            className="relative group cursor-pointer"
            onClick={() => setActiveElementId(id)}
        >
            <div className="absolute inset-0 bg-black bg-opacity-70 hidden group-hover:flex items-center gap-4 justify-end">
                <button 
                    className="bg-red-500 flex items-center justify-center w-16 h-full text-xl hover:bg-red-600 transition duration-200 rounded-r-md"
                    onClick={() => deleteFormElement(id)}
                >
                    <FaTrash />
                </button>
            </div>
            {children}
        </div>
    )
}