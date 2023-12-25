import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdPreview, MdCloudUpload } from "react-icons/md";
import { FaSave } from "react-icons/fa";

export default function FormCreatorToolbar() {
  return (
    <Card className="flex items-center justify-between py-6 px-4 rounded-none border-none flex-wrap gap-6">
        <CardTitle>Form: name</CardTitle>
        <div className="flex gap-4 flex-wrap">
            <Button variant="secondary">
                <MdPreview className="text-2xl mr-2" />
                Preview
            </Button>
            <Button variant="secondary">
                <FaSave className="text-xl mr-2" />
                Save
            </Button>
            <Button variant="secondary">
                <MdCloudUpload className="text-xl mr-2" />
                Publish
            </Button>
        </div>
    </Card>
  )
}
