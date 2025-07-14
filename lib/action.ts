"use server"

import {auth} from "@/auth";
import {parseServerAction} from "@/lib/utils";
import slugify from "slugify";
import {writeClient} from "@/sanity/lib/write-client";

export const createPitch = async (state:any, form: FormData, pitch: string)=> {
    const session = await auth()
    if(!session) return parseServerAction(
        { error : "Not logged in", status: "ERROR"}
    )

    const { title , desc, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== "pitch")
    )

    const slug = slugify(title as string,{ lower: true , strict: true } )

    try {
        const startup = {
            title,
            desc,
            category,
            image: link,
            slug:{
                _type: slug,
                current: slug
            },
            author: {
                _type: "reference",
                _ref: session?.user?.id
            },
            pitch
        }

        const result =  await writeClient.create({_type: "startup", ...startup})
        return parseServerAction({ ...result, error: "", status: "SUCCESS"})
    }catch (e) {
        console.log(e)
        return parseServerAction({ error : "Not logged in", status: "ERROR"})
    }
}