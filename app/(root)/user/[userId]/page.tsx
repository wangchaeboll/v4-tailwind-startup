import React from 'react'
import {auth} from "@/auth";
import {client} from "@/sanity/lib/client";
import {AUTHOR_BY_ID} from "@/sanity/lib/queries";
import {notFound} from "next/navigation";
import Image from "next/image";

export const experimental_ppr = true

const Page = async ({params}:{params: Promise<{userId: string}>}) => {
    const id = (await params).userId
    const session = await auth()
    console.log(id)
    const user = await client.fetch(AUTHOR_BY_ID, { id })

    if(!user) return notFound();

    return (
        <>
            <section>
                <div>
                    <div>
                        <h3>{user?.name}</h3>
                    </div>
                    <Image src={user?.image} alt={user?.name} width={220} height={220}/>
                    <p>@{user?.username}</p>
                    <p>{user?.bio}</p>
                </div>
                <div>
                    <p>{session?.user?.id === id ? "Your" : "All"} Startups</p>
                    <ul>

                    </ul>
                </div>
            </section>
        </>
    )
}
export default Page
