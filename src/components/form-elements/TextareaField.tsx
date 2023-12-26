import { Card, CardDescription, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";

interface IProps {
    label: string;
    placeholder: string;
    helperText: string;
    rows: number;
    required: boolean;
}

export default function TextareaField({ label, placeholder, helperText, required, rows }: IProps) {
  return (
    <Card className="px-4 py-8">
        <CardTitle className="font-normal text-base mb-1">{label}</CardTitle>
        <Textarea className="w-full mb-1" placeholder={placeholder} required={required} rows={rows} />
        <CardDescription className="text-sm">{helperText}</CardDescription>
    </Card>
  )
}
