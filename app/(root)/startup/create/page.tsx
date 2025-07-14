import React from 'react'
import StartUpForm from "@/components/StartUpForm";
import { auth } from '@/auth';
import {redirect} from "next/navigation";

const Page = async () => {
    const session = await auth()

    if(!session) redirect("/")

    return (
        <>
            <section>
                <h1>Submit Your Startup</h1>
            </section>
            <StartUpForm />
        </>
    )
}
export default Page
