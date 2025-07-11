import React from 'react'
import Link from "next/link";
import Image from "next/image";
import {auth, signIn, signOut} from "@/auth";
import {Button} from "@/components/ui/button";

const Navbar = async () => {
    const session = await auth();
    return (
        <div>
            <nav>
                <Link href={"/public"}>
                    <Image src={"/logo.png"} alt={"Logo"} width={144} height={30}/>
                </Link>
                <div >
                    {session && session?.user ? (
                        <>
                            <Link href={"/startup/create"}>
                                <Button variant={"ghost"} className={"cursor-pointer"}>Create</Button>
                            </Link>
                            <form action={async () => { "use server" ; await signOut({ redirectTo:"/" })}}>
                                <Button className={"cursor-pointer"}>
                                    <span>Log Out</span>
                                </Button>
                            </form>
                            <Link href={`/user/${session?.user?.id}`}>
                                <div className="flex">
                                    <Image src={session?.user?.image ?? `https://placehold.co/45x45`} width={45} height={45} alt={"profile"} />
                                    {/*<span>{session?.user?.name}</span>*/}
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
