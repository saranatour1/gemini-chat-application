import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { useMutation } from "convex/react";
import { Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import { SearchUsers } from "../search/SearchUsers";
import { toast } from "../ui/use-toast";
import { Id } from "../../../convex/_generated/dataModel";

export const AddChannels = () => {
  const [open, setOpen] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [userId, setUserId]=useState<Id<"users">>()
  const data = useMutation(api.chats.createChat);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const nameOfChannel = form.get("name");
    const nameOfUsers = form.get("users");
    if (!nameOfChannel) {
      return toast({ variant: "destructive", title: "please add a channel name" });
    }
    if (!nameOfUsers) {
      return toast({ variant: "destructive", title: "you can only have 1 channel with yourself in it" });
    }
    if (nameOfChannel?.toString().length && nameOfUsers?.toString().length && userId) {
      const newChannel = await data({ name: nameOfChannel as unknown as string, users:userId });
      if (newChannel?._id) {
        setOpen(false);
        setSearchField('');
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="ml-auto p-2">
        <Plus className="hover:rotate-45 transition-transform" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>create a new channel</DialogTitle>
          <form className="w-full h-full flex flex-col items-start justify-center gap-y-2" onSubmit={handleSubmit}>
            <Label className="flex flex-col items-start justify-center gap-y-2">
              <span>Channel Name</span>
              <Input name="name" />
            </Label>
            <Label className="flex flex-col items-start justify-center gap-y-2">
              <span>find users</span>
              <Input placeholder="search name here.." name="users" value={searchField} onChange={(e)=> setSearchField(e.currentTarget.value)} />
            </Label>
            <SearchUsers searchField={searchField} setUserId={setUserId}/>
            <Button type="submit">confirm</Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
