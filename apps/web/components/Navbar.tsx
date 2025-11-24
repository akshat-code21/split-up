"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Split, Menu, X } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter();
    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/60 backdrop-blur-xl py-1">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight font-heading">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                            <Split className="h-5 w-5" />
                        </div>
                        <span className="text-white">split up</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-white">
                            Log in
                        </Link>
                        <Button className="px-3 py-2 cursor-pointer bg-white text-black hover:bg-white/90 rounded-md font-medium shadow-none" onClick={() => {
                            router.push("/signup")
                        }}>
                            Get Started
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-white/10 p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
                    <Link
                        href="/login"
                        className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        Log in
                    </Link>
                    <Button className="w-full bg-white text-black hover:bg-white/90 rounded-full font-medium shadow-none">
                        Get Started
                    </Button>
                </div>
            )}
        </nav>
    )
}
