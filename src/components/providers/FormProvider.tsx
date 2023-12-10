import { ReactNode } from "react"
import { FormProvider, useForm } from "react-hook-form";

interface Props {
    children: ReactNode;
}

export default function FormContextProvider({ children }: Props) {
    const methods = useForm();
    return (
        <FormProvider {...methods}>
            {children}
        </FormProvider>
    )
}
