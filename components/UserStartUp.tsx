import React from 'react'
import {STARTUPS_BY_AUTHOR_QUERY, STARTUPS_QUERY} from "@/sanity/lib/queries";
import {client} from "@/sanity/lib/client";
import StartupCard, { StartupCardProps } from "@/components/StartupCard";

const UserStartUp = async  ( {id}: { id: string}) => {
    const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id } )

    return (
        <>
            {startups.length > 0 ? startups.map((startup: StartupCardProps) => (
                <StartupCard key={startup._id} post={startup}/>
            )):
             <p>No Post Yet</p>
            }
        </>
    )
}
export default UserStartUp
