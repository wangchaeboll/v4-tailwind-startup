import React from 'react'
import Ping from "@/components/Ping";
import {VIEWS_BY_ID_QUERY} from "@/sanity/lib/queries";
import {client} from "@/sanity/lib/client";

const View = async ( { id }: {id: string }) => {

    const { views: view} = await client.config({useCdn:false}).fetch(VIEWS_BY_ID_QUERY, {id})
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
