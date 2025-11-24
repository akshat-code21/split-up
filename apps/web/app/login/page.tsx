import Link from "next/link"
import { ArrowLeft, Split } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { GoogleAuthButton } from "@/components/GoogleAuthButton"
import { ScaleIn } from "@repo/ui/motion"

export default function LoginPage() {
    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a0a] selection:bg-primary/20">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-purple-900/10 blur-[100px]" />
                <div className="absolute -right-[10%] -bottom-[10%] h-[500px] w-[500px] rounded-full bg-blue-900/10 blur-[100px]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            </div>

            {/* Back Button */}
            <Button
                variant="ghost"
                asChild
                className="absolute left-4 top-4 z-20 text-muted-foreground hover:bg-transparent hover:text-foreground md:left-8 md:top-8"
            >
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to home
                </Link>
            </Button>

            <div className="z-10 w-full max-w-md px-4">
                <ScaleIn>
                    <div className="mb-8 flex justify-center">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                                <Split className="h-5 w-5" />
                            </div>
                            <span className="font-heading text-xl font-bold">split up</span>
                        </div>
                    </div>

                    <Card className="border-border/50 bg-background/60 shadow-xl shadow-black/20 backdrop-blur-xl">
                        <CardHeader className="space-y-1 text-center">
                            <h1 className="font-heading text-2xl font-bold tracking-tight">Welcome Back</h1>
                            <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
                        </CardHeader>
                        <CardContent className="grid gap-4 px-4">
                            <GoogleAuthButton text="Sign in with Google" />
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-border/50" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background/60 px-2 text-muted-foreground backdrop-blur-xl">Or continue with</span>
                                </div>
                            </div>
                            {/* Fallback for other methods if added later, visually balanced */}
                            <div className="text-center text-sm text-muted-foreground">
                                <span className="opacity-50">Currently only Google Sign-In is supported</span>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4 border-t border-border/50 pt-6">
                            <div className="text-center text-sm text-muted-foreground">
                                Don&apos;t have an account?{" "}
                                <Link href="/signup" className="font-medium text-primary hover:text-primary/80 hover:underline">
                                    Sign up
                                </Link>
                            </div>
                            <p className="px-8 text-center text-xs text-muted-foreground/60">
                                By clicking continue, you agree to our{" "}
                                <Link href="/terms" className="underline hover:text-primary">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="underline hover:text-primary">
                                    Privacy Policy
                                </Link>
                                .
                            </p>
                        </CardFooter>
                    </Card>
                </ScaleIn>
            </div>
        </div>
    )
}
