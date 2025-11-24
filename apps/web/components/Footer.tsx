import Link from "next/link"
import { Split, Twitter, Diamond as Discord } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-black pt-16 md:pt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                <Split className="h-5 w-5" />
              </div>
              <span className="font-heading text-xl font-bold text-white">split up</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Split Up is your modern expense companion, connecting friends and groups to settle debts seamlessly in a
              snap.
            </p>
            <div className="flex gap-3">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
              >
                <Discord className="h-4 w-4" />
                <span className="sr-only">Discord</span>
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:pl-12">
            <div>
              <h3 className="mb-4 font-heading text-base font-semibold text-white">Company</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-heading text-base font-semibold text-white">Social</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Discord
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-heading text-base font-semibold text-white">Resources</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section with Large Text */}
        <div className="relative mt-20 flex flex-col items-center justify-end pb-10">
          <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-[18vw] md:text-[240px] lg:text-[320px] font-bold leading-none text-white/10 select-none">
            Split Up
          </div>
          <p className="relative z-10 text-sm text-muted-foreground text-center">
            @{new Date().getFullYear()} splitup.io - all rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
