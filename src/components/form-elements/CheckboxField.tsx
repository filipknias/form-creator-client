import { Card, CardDescription, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";

interface IProps {
    label: string;
    helperText: string;
}

export default function CheckboxField({ label, helperText }: IProps) {
  return (
    <Card className="flex gap-3 px-4 py-8">
        <Checkbox className="mt-1" />
        <div>
            <CardTitle className="font-normal text-base mb-1">{label}</CardTitle>
            <CardDescription className="text-sm">{helperText}</CardDescription>
        </div>
    </Card>
  )
}
