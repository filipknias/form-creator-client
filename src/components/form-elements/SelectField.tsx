import { Card, CardDescription, CardTitle } from "../ui/card";
import { Select, SelectTrigger, SelectValue } from "../ui/select";

interface IProps {
    label: string;
    placeholder: string;
    helperText: string;
}

export default function SelectField({ label, placeholder, helperText }: IProps) {
  return (
    <Card className="px-4 py-8">
        <CardTitle className="font-normal text-base mb-1">{label}</CardTitle>
        <Select>
            <SelectTrigger className="mb-1">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
        </Select>
        <CardDescription className="text-sm">{helperText}</CardDescription>
    </Card>
  )
}
