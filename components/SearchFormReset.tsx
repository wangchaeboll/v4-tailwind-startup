"use client"
import React from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import { X } from "lucide-react"

const SearchFormReset = () => {

    const reset = (): void => {
        const form = document.querySelector(".query") as HTMLFormElement
        if(form) form.reset()
    }

    return (
        <Button type={"reset"} onClick={reset}>
            <Link href={"/public"}>
                <X />
            </Link>
        </Button>
    )
}
export default SearchFormReset
