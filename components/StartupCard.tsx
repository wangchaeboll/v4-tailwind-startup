import React from 'react'
import {EyeIcon} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Author, Startup} from "@/sanity/types";
import {formatDate} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";

export type StartupCardProps = Omit<Startup, "author"> & { author?: Author }

const StartupCard = ( { post } : { post: StartupCardProps} ) => {
    const {
        _createdAt,
        views,
        author,
        title,
        category,
        _id,
        image,
        desc,
    } = post;
    return (
        <li>
            <div>
                <p>
                    {formatDate(_createdAt)}
                </p>
                <div>
                    <EyeIcon/>
                    <span>{views}</span>
                </div>
            </div>
            <div>
                <div>
                    <Link href={`/user/${author?._id}`}>
                        <p>{author?.name}</p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3>{title}</h3>
                    </Link>
                </div>
                <Link href={`/user/${author?._id}`}>
                    <Image width={48} height={48} alt={"placeholder"} src={"https://placehold.co/600x400"}/>
                </Link>
            </div>
            <Link href={`/startup/${_id}`}>
                <p>
                    {desc}
                </p>
                <img src={image} alt="placeholder" />
            </Link>
            <div>
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p>{category}</p>
                </Link>
                <Button asChild>
                    <Link href={`/startup/${_id}`}>Details</Link>
                </Button>
            </div>
        </li>
    )
}

export const StartupCardSkeleton = () => (
    <>
        {[1,2,3,4,5].map((i) => (
            <div key={i}>
                <Skeleton/>
            </div>
        )) }
    </>
)
export default StartupCard
