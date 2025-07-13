import React from 'react'
import Ping from "@/components/Ping";
import {VIEWS_BY_ID_QUERY} from "@/sanity/lib/queries";
import {client} from "@/sanity/lib/client";
import {writeClient} from "@/sanity/lib/write-client";
import { after } from "next/server";

const View = async ( { id }: {id: string }) => {

    const { views: view } = await client.config({useCdn:false}).fetch(VIEWS_BY_ID_QUERY, {id})
    after( async () => {
        await writeClient.patch(id).set({views: view + 1}).commit()
    })

    return (
        <div>
            <div>
                <Ping/>
            </div>
            <p>
                <span>{view} views</span>
            </p>
        </div>
    )
}
export default View
