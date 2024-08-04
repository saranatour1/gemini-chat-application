/* eslint-disable react-hooks/exhaustive-deps */
"use client";;
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { accountFormSchema, languagesSet, Model, models, Response, responses } from "./constants";
import { useEffect } from "react";
import { Doc, Id } from "../../../../convex/_generated/dataModel";

export function AccountForm() {
  const createSettings = useMutation(api.settings.createUserSettings)
  const updateSettings = useMutation(api.settings.update)
  const settings = useQuery(api.settings.viewer);
  const formSchema = accountFormSchema(settings as Doc<"settings">)

  type AccountFormValues = z.infer<typeof formSchema>;

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // model:settings?.model ?? "gemini-1.0-pro",
      languages: settings?.languages ?? "en",
      theme: settings?.theme ?? "light",
      attachments:{
        audio: settings?.attachments.audio ?? false,
        images:settings?.attachments.images ?? false,
      },
      keepChat: settings?.keepChat ?? (Date.now()+ 604800), // 1 week 
      // responseType: settings?.responseType ?? "single-message",
    },
  });

  function onSubmit(data: AccountFormValues) {
    // console.log(data)
    updateSettings({settingsId:settings?._id as Id<"settings">, body: data as Partial<Doc<"settings">>})
  }

  useEffect(() => {

    if(settings === null){
      createSettings()
    }
  }, [settings]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="responseType"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Response Type</FormLabel>
              <FormControl>
                <Select onValueChange={(value:Response) => form.setValue("responseType",value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="response type" />
                  </SelectTrigger>
                  <SelectContent>
                    {responses.map((response, idx) => (
                      <SelectItem key={idx} value={response}>
                        {response}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>This is the response type that will be used in the dashboard.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="keepChat"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Keep Chat Until</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value):undefined}
                      onSelect={(date: Date|undefined) => field.onChange((date as Date).getTime())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormDescription>This is the date until the chat will be kept.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="attachments"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start justify-start gap-y-2">
              <FormLabel>Attachments</FormLabel>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Attachments</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Add attachments</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={field.value?.audio ?? false}
                      onCheckedChange={(checked) => field.onChange({ ...field.value, audio: checked })}
                    >
                      Audio
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={field.value?.images ?? false}
                      onCheckedChange={(checked) => field.onChange({ ...field.value, images: checked })}
                    >
                      Images
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
              <FormDescription>Adding attachments</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Model</FormLabel>
              <FormControl>
                <Select onValueChange={(value:Model) => form.setValue('model',value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="model type" />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map(
                      (response, idx) => (
                        <SelectItem key={idx} value={response}>
                          {response}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>This is the model type that will be used in the dashboard.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="languages"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>languages</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(form.setValue("languages", value))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="languages" />
                  </SelectTrigger>
                  <SelectContent>
                    {languagesSet.map((response, idx) => (
                      <SelectItem key={idx} value={response}>
                        {response}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>This is the languages that will be used in the dashboard.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>theme</FormLabel>
              <FormControl>
                <Select value={field.value} 
                onValueChange={(value:"light"|"dark") => field.onChange(form.setValue("theme", value))}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {["dark", "light"].map((response, idx) => (
                      <SelectItem key={idx} value={response}>
                        {response}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>This is the theme that will be used in the dashboard.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update account</Button>
      </form>
    </Form>
  );
}
