import {defineField, defineType} from "sanity";
import {UserIcon} from "@sanity/icons";

export const startup = defineType({
    name: "startup",
    title: "Startup",
    type: "document",
    fields:[
        defineField({
            name: "slug",
            type: "slug",
            options:{
                source: 'title'
            }
        }),
        defineField({
            name: "title",
            type: "string",
        }),
        defineField({
            name: "author",
            type: "reference",
            to: { type: "author" }
        }),
        defineField({
            name: "views",
            type: "number",
        }),
        defineField({
            name: "desc",
            type: "text",
        }),
        defineField({
            name: "category",
            type: "string",
            validation: (Rule) => Rule.min(1).max(28).required().error("Please enter a category")
        }),
        defineField({
            name: "image",
            type: "url",
            validation: (Rule) => Rule.required().error("Please upload an image")
        }),
        defineField({
            name: "pitch",
            type: "markdown",
        })
    ],


})