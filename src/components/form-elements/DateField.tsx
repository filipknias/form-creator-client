import { Card, CardDescription, CardTitle } from "../ui/card";
import { Calendar as CalendarIcon } from "lucide-react"

interface IProps {
    label: string;
    helperText: string;
}

export default function DateField({ label, helperText }: IProps) {
  return (
    <Card className="px-4 py-8">
        <CardTitle className="font-normal text-base mb-1">{label}</CardTitle>
        <Card className="flex items-center gap-1 p-2 mb-1">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span className="text-sm">Pick a date</span>
        </Card>
        <CardDescription className="text-sm">{helperText}</CardDescription>
    </Card>
  )
}
