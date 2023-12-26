import { Card, CardDescription, CardTitle } from "../ui/card";

interface IProps {
    subtitle: string;
}

export default function SubtitleField({ subtitle }: IProps) {
  return (
    <Card className="px-4 py-8">
        <CardDescription className="mb-1">Subtitle field</CardDescription>
        <CardTitle className="font-normal text-lg">{subtitle}</CardTitle>
    </Card>
  )
}
