import { Card, CardDescription, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

interface IProps {
    label: string;
    placeholder: string;
    helperText: string;
    required: boolean;
}

export default function NumberField({ label, placeholder, helperText, required }: IProps) {
  return (
    <Card className="px-4 py-8">
        <CardTitle className="font-normal text-base mb-1">{label}</CardTitle>
        <Input type="number" className="w-full mb-1" placeholder={placeholder} required={required} />
        <CardDescription className="text-sm">{helperText}</CardDescription>
    </Card>
  )
}
