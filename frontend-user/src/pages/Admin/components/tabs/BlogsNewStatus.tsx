import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";

type FormDataType = {
    title: string;
content: string;
published: boolean
image: string;
}

export default function BlogsNewStatus({ formData, setFormData }:{formData:FormDataType, setFormData: React.Dispatch<React.SetStateAction<FormDataType>>}) {
  const handleChange = (value:boolean) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      published: value,
    }));
  };

  return (
    <div className="flex flex-col">
      <p className="mb-1">Status</p>
      <Select
        value={formData.published.toString()}
        onValueChange={(value) => handleChange(value === 'true')}
      >
        <SelectTrigger className="w-[8rem] text-foreground">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="true">Published</SelectItem>
            <SelectItem value="false">Unpublished</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}


