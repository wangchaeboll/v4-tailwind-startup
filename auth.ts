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
            let existingUser = await client.fetch(AUTHOR_BY_GITHUB_ID, {id: profile?.id});

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

            return true; // don't modify account
        },
        async jwt({ token, profile, account }) {
            // Only run this on first login (account && profile exist)
            if (account && profile) {
                const user = await client.fetch(AUTHOR_BY_GITHUB_ID, { id: profile.id });

                if (user) {
                    token.id = user._id;
                } else {
                    token.id = null;
                }
            }

            return token;
        },
        async session({ session, token }) {
            Object.assign(session.user, {id: token.id})
            return session
        },

    },
})