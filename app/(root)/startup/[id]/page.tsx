import React, {Suspense} from 'react'
import {STARTUPS_BY_ID_QUERY} from "@/sanity/lib/queries";
import {client} from "@/sanity/lib/client";
import {notFound} from "next/navigation";
import {formatDate} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton"
import View from "@/components/View";

const md = markdownit();

export const experimental_ppr = true

const Page = async ({ params }: { params: Promise<{ id: string }>}) => {
    const id = (await params).id

    const post = await client.fetch(STARTUPS_BY_ID_QUERY, { id })

    if (!post) notFound();

    const parseContent = md.render(post?.pitch || "");

    return (
        <>
            <section className={"border-2 border-black"}>
                <p>{formatDate(post?._createdAt)}</p>
                <h1>{post.title}</h1>
                <p>{post.desc}</p>
            </section>
            <section>
                <img src={post.image} alt="thumbnail" />
                <div>
                    <div>
                        <Link href={`/user/${post.author?._id}`}>
                            <Image src={post.author.image} alt="avatar" width={64} height={64}/>
                            <div>
                                <p>{post.author.name}</p>
                                <p>@{post.author.username}</p>
                            </div>
                        </Link>
                        <p>{post.category}</p>
                    </div>
                    <h3>
                        Pitch Details
                    </h3>
                    {parseContent ? (
                        <article dangerouslySetInnerHTML={{ __html: parseContent }}/>
                    ): (
                        <p>No details provided</p>
                    )}
                </div>
                <hr/>
                <Suspense fallback={<Skeleton/>}>
                    <View id={id}/>
                </Suspense>
            </section>
        </>
    )
}
export default Page
