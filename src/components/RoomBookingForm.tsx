import {initialRoomBookingFormData, RoomBookingFormData} from "@/models/bookingTypes.ts";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import React from "react";
import '@/styles/global.css'


const RoomBookingFormSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
    date: z.date(),
    startTime: z.string(),
    endTime: z.string(),
    roomId: z.number(),
    ownerId: z.number(),
    participantsId: z.array(z.object({
        id: z.number(),
        type: z.number(),
    })),
    tagsId: z.array(z.number()),
});

interface RoomBookingFormProps {
    initialValues?: RoomBookingFormData
}

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
})

const RoomBookingForm: React.FC<RoomBookingFormProps> = ({initialValues}) => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        // defaultValues: initialValues || initialRoomBookingFormData,
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(JSON.stringify(data, null, 2))
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default RoomBookingForm;
