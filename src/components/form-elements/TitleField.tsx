import { Card, CardDescription, CardTitle } from "../ui/card";

interface IProps {
    title: string;
}

export default function TitleField({ title }: IProps) {
  return (
    <Card className="px-4 py-8">
        <CardDescription className="mb-1">Title field</CardDescription>
        <CardTitle className="font-normal">{title}</CardTitle>
    </Card>
  )
}
