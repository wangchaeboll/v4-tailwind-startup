import React from 'react'
import Link from "next/link";
import Image from "next/image";
import {auth, signIn, signOut} from "@/auth";
import {Button} from "@/components/ui/button";
import {BadgePlus, LogOut} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const Navbar = async () => {
    const session = await auth();
    // console.log(session)
    return (
        <div>
            <nav className={"border-2 border-blue-500 mb-2"}>
                <Link href={"/"}>
                    <Image src={"/logo.png"} alt={"Logo"} width={144} height={30}/>
                </Link>
                <div >
                    {session && session?.user ? (
                        <>
                            <Link href={"/startup/create"}>
                                <Button variant={"ghost"} className={"cursor-pointer max-sm:hidden"}>Create</Button>
                                <BadgePlus className={"size-6 sm:hidden"}/>
                            </Link>
                            <form action={async () => { "use server" ; await signOut({ redirectTo:"/" })}}>
                                <Button className={"cursor-pointer max-sm:hidden"}>
                                    <span>Log Out</span>
                                </Button>
                                <LogOut className={"size-6 sm:hidden"} />
                            </form>
                            <Link href={`/user/${session?.user?.id}`}>
                                <div className="flex">
                                    {/*<Image src={session?.user?.image ?? `https://placehold.co/45x45`} width={45} height={45} alt={"profile"} />*/}
                                    {/*<span>{session?.user?.name}</span>*/}
                                    <Avatar className={"size-10"}>
                                        <AvatarImage src={session?.user?.image || `https://placehold.co/45x45`} alt={session?.user?.name || "avatar"}/>
                                        <AvatarFallback>Av</AvatarFallback>
                                    </Avatar>
                                </div>
                            </Link>
                        </>
                    ):(
                        <form action={async () => {"use server"; await  signIn("github")}}>
                            <Button type={"submit"} className={"cursor-pointer"}>
                                <span>Log In</span>
                            </Button>
                        </form>
                    )}
                </div>
            </nav>
        </div>
    )
}
export default Navbar
