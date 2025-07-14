import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import {client} from "@/sanity/lib/client";
import {AUTHOR_BY_GITHUB_ID} from "@/sanity/lib/queries";
import {writeClient} from "@/sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub],
    callbacks: {
        // async signIn(params){
        //     console.log(params)
        //     return true;
        // },
        async signIn({ user, profile }) {
            let existingUser = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GITHUB_ID, {id: profile?.id});

            if (!existingUser) {
                await writeClient.create({
                    _type: "author",
                    id: profile?.id,
                    name: user?.name,
                    username: profile?.login,
                    email: user?.email,
                    image: user?.image,
                    bio: profile?.bio || "",
                });
            }

            return true;
        },
        async jwt({ token, profile, account }) {
            if (account && profile) {
                const user = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GITHUB_ID, { id: profile.id });

                if (user) {
                    token.id = user?._id;
                } else {
                    token.id = null;
                }
                // token.id = user._id
            }

            return token;
        },
        async session({ session, token }) {
            Object.assign(session.user, {id: token.id})
            return session
        },

    },
})