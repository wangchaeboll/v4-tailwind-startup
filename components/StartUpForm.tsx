"use client"
import React, {useActionState} from 'react'
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import MDEditor from '@uiw/react-md-editor';
import {Send} from "lucide-react";
import {formSchema} from "@/lib/validation";
import {z} from "zod";
import { toast } from "sonner"
import {useRouter} from "next/navigation";
import {createPitch} from "@/lib/action";


const StartUpForm = () => {
    const [error, setError] = React.useState<Record<string, string>>({})
    const router = useRouter()

    const [pitch, setPitch] = React.useState("")

    const handleFormSubmit = async (prevState:any, formData:FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                desc: formData.get("desc") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            }

            await formSchema.parseAsync(formValues)

            const result = await createPitch(prevState, formData, pitch)
            if( result.status === "SUCCESS") {
                toast.success("Your startup has been submitted.");
                router.push(`/startup/${result._id}`)
            }

            return result

        } catch (error) {
            if(error instanceof z.ZodError) {
                const fieldErorrs = error.flatten().fieldErrors;
                setError(error.formErrors as unknown as Record<string, string>)

                toast.error("Please fix the form errors.");
                return { ...prevState, error: "Validation failed", status: "ERROR"}
            }

            toast.error("Something went wrong. Try again.");
            return { ...prevState, error: "Something went wrong", status: "ERROR"}
        }
    }

    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "INITIAL"
    });

    return (
        <form action={formAction} >
            <div>
                <label htmlFor="title">
                    Title
                </label>
                <Input id={"title"} name={"title"} required placeholder={"Start Up Title"}/>
                {error.title && <p>{error.title}</p>}
            </div>
            <div>
                <label htmlFor="desc">
                    Description
                </label>
                <Textarea id={"desc"} name={"desc"} required placeholder={"Start Up Description"}/>
                {error.desc && <p>{error.desc}</p>}
            </div>
            <div>
                <label htmlFor="category">
                    Category
                </label>
                <Input id={"category"} name={"category"} required placeholder={"Start Up Category (Education, Tech, Health... )"}/>
                {error.category && <p>{error.category}</p>}
            </div>
            <div>
                <label htmlFor="link">
                    Image URL
                </label>
                <Input id={"link"} name={"link"} required placeholder={"Start Up Image URL"}/>
                {error.link && <p>{error.link}</p>}
            </div>
            <div data-color-mode={"light"} className={"mb-2"}>
                <label htmlFor="pitch">
                    Pitch
                </label>
                <MDEditor
                    value={pitch}
                    onChange={(value)=> setPitch(value as string)}
                    id={"pitch"}
                    preview={"edit"}
                    style={{ borderRadius: "20px", width: "80%", height: 300 ,overflow: "hidden"}}
                    textareaProps={{
                        placeholder: "Briefly describe your idea and what problem it solves"
                    }}
                    previewOptions={{
                        disallowedElements:["style"]
                    }}
                ></MDEditor>
                {error.link && <p>{error.link}</p>}
            </div>
            <Button type={"submit"} disabled={isPending}>{isPending ? "Submitting..." : "Submit Your Startup"}<Send /></Button>
        </form>
    )
}
export default StartUpForm