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
import { useQuery } from "convex/react";
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

const languagesSet: [string, ...string[]] = [
  "ar",
  "bg",
  "bn",
  "zh",
  "hr",
  "cs",
  "da",
  "nl",
  "en",
  "et",
  "fi",
  "fr",
  "de",
  "el",
  "iw",
  "hi",
  "hu",
  "id",
  "it",
  "ja",
  "ko",
  "lv",
  "lt",
  "no",
  "pl",
  "pt",
  "ro",
  "ru",
  " sr",
  "sk",
  "sl",
  "es",
  "sw",
  "sv",
  "th",
  "tr",
  "uk",
  "vi",
];
export function AccountForm() {
  const settings = useQuery(api.settings.viewer);
  const accountFormSchema = z.object({
    responseType: z.enum(["chat", "single-message"]).default(settings?.responseType ?? "single-message"),
    keepChat: z
      .number()
      .max(Date.now() + 30 * 86400000)
      .min(Date.now() + 86400000)
      .default(settings?.keepChat ?? Date.now()),
    attachments: z.object({
      audio: z.boolean().default(settings?.attachments.audio ?? false),
      images: z.boolean().default(settings?.attachments.images ?? false),
    }),
    model: z
      .enum(["gemini-1.5-pro", "gemini-1.5-flash", "gemini-1.0-pro", "text-embedding-004", "aqa"])
      .default(settings?.model ?? "gemini-1.0-pro"),
    languages: z.enum(languagesSet).default(settings?.languages ?? "en"),
    theme: z.enum(["light", "dark"]).default(settings?.theme ?? "light"),
  });

  type AccountFormValues = z.infer<typeof accountFormSchema>;

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      attachments: {
        audio: false,
        images: false,
      },
    },
  });

  function onSubmit(data: AccountFormValues) {
    console.log(data);
    console.log({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

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
                <Select onValueChange={(value) => field.onChange(form.setValue("responseType", value))}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="response type" />
                  </SelectTrigger>
                  <SelectContent>
                    {["chat", "single-message"].map((response, idx) => (
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
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date: Date) => field.onChange(date.getTime())}
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
            <FormItem>
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
                <Select onValueChange={(value) => field.onChange(form.setValue("model", value))}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="model type" />
                  </SelectTrigger>
                  <SelectContent>
                    {["gemini-1.5-pro", "gemini-1.5-flash", "gemini-1.0-pro", "text-embedding-004", "aqa"].map(
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
                <Select value={field.value} onValueChange={(value) => field.onChange(form.setValue("theme", value))}>
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
