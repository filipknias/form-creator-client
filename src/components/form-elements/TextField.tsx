import { Card, CardDescription, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

interface IProps {
    label: string;
    placeholder: string;
    helperText: string;
}

export default function TextField({ label, placeholder, helperText }: IProps) {
  return (
    <Card className="px-4 py-8">
        <CardTitle className="font-normal text-base mb-1">{label}</CardTitle>
        <Input className="w-full mb-1" placeholder={placeholder} />
        <CardDescription className="text-sm">{helperText}</CardDescription>
    </Card>
  )
}
