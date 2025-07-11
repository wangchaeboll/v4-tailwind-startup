import React from 'react'
import Form from "next/form";
import {Button} from "@/components/ui/button";
import {reset} from "next/dist/lib/picocolors";
import SearchFormReset from "@/components/SearchFormReset";
import {Search} from "lucide-react";


const SearchForm = ({ query }: {query?: string}) => {

    return (
        <Form action={"/"} scroll={false} className={"query"}>
            <input type="text" name={"query"} defaultValue={""} placeholder={"Search for..."} />
            <div>
                { query && (
                    <SearchFormReset/>
                )}
                <Button type={"submit"}>
                    <Search />
                </Button>
            </div>
        </Form>
    )
}
export default SearchForm
