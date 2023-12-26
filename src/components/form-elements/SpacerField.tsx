import { Card, CardDescription } from "../ui/card";
import { MdVerticalAlignCenter } from "react-icons/md";

interface IProps {
    height: number;
}

export default function SpacerField({ height }: IProps) {
  return (
    <Card className="px-4 py-8">
        <CardDescription className="text-center mb-4">Spacer field: {height}px</CardDescription>
        <MdVerticalAlignCenter className="mx-auto text-3xl" />
    </Card>
  )
}
