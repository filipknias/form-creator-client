import { Card, CardDescription, CardTitle } from "../ui/card";

interface IProps {
    text: string;
}

export default function ParagraphField({ text }: IProps) {
  return (
    <Card className="px-4 py-8">
        <CardDescription className="mb-1">Paragraph field</CardDescription>
        <CardTitle className="font-normal text-base">{text}</CardTitle>
    </Card>
  )
}
