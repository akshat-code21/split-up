import { Navbar } from "@/components/Navbar"
import { Footer } from '@/components/Footer'
import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent } from "@repo/ui/components/ui/card"
import { ArrowRight, Zap, Globe, Smartphone, PieChart, CheckCircle2, Receipt, Wallet } from "lucide-react"
import { FadeIn, FadeInStagger, FadeInItem, ScaleIn } from "@repo/ui/components/ui/motion"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[120px] opacity-40 mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[10%] w-[30vw] h-[30vw] bg-blue-500/10 rounded-full blur-[100px] opacity-30 mix-blend-screen" />
      </div>

      <Navbar />

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 md:px-6 overflow-hidden">
          <div className="container mx-auto text-center relative z-10">
            <FadeIn
              direction="down"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-medium text-white uppercase tracking-wider">v2.0 is now live</span>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-gradient font-heading">
                Split bills, <br className="hidden md:block" />
                <span className="text-white">not friendships.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                The modern way to track shared expenses. Settle debts instantly with anyone, anywhere, in any currency.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="rounded-full h-12 px-8 text-base bg-white text-black hover:bg-white/90">
                Start for free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full h-12 px-8 text-base border-white/10 bg-white/5 hover:bg-white/10 text-white"
              >
                View Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </FadeIn>

            <FadeIn delay={0.5}>
              <p className="mt-6 text-sm text-muted-foreground">Mobile app coming soon to iOS and Android</p>
            </FadeIn>
          </div>

          {/* Abstract UI Preview */}
          <ScaleIn delay={0.4} className="mt-20 mx-auto max-w-5xl relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur opacity-20" />
            <div className="relative rounded-xl border border-white/10 bg-black/50 backdrop-blur-xl p-2 md:p-4 shadow-2xl">
              <div className="rounded-lg overflow-hidden bg-black aspect-[16/9] relative border border-white/5">
                {/* Mock UI Elements */}
                <div className="absolute top-0 left-0 right-0 h-12 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="grid grid-cols-12 h-full pt-12">
                  <div className="col-span-3 border-r border-white/10 bg-white/[0.02] p-4 hidden md:block">
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-8 w-full rounded bg-white/5 animate-pulse"
                          style={{ opacity: 1 - i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-9 p-6 md:p-8 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <Receipt className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2 font-heading">Trip to Tokyo</h3>
                    <p className="text-muted-foreground mb-6">Total spent: $4,250.00</p>
                    <div className="w-full max-w-md space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.02]"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/10" />
                            <div className="h-4 w-24 bg-white/10 rounded" />
                          </div>
                          <div className="h-4 w-16 bg-white/10 rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScaleIn>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 px-4 md:px-6 relative">
          <div className="container mx-auto max-w-6xl">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Everything you need to settle up</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Powerful features wrapped in a simple, intuitive interface. Designed for groups of any size.
              </p>
            </FadeIn>

            <FadeInStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FadeInItem>
                <Card className="bg-white/[0.02] border-white/10 backdrop-blur-sm hover:bg-white/[0.04] transition-colors h-full">
                  <CardContent className="p-8">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 font-heading">Instant Settle Up</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Connect your bank account or card and settle debts instantly. No more manual transfers or awkward
                      reminders.
                    </p>
                  </CardContent>
                </Card>
              </FadeInItem>

              <FadeInItem>
                <Card className="bg-white/[0.02] border-white/10 backdrop-blur-sm hover:bg-white/[0.04] transition-colors h-full">
                  <CardContent className="p-8">
                    <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6">
                      <Globe className="h-6 w-6 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 font-heading">Multi-currency</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Traveling abroad? We automatically convert 150+ currencies at the real mid-market rate.
                    </p>
                  </CardContent>
                </Card>
              </FadeInItem>

              <FadeInItem>
                <Card className="bg-white/[0.02] border-white/10 backdrop-blur-sm hover:bg-white/[0.04] transition-colors h-full">
                  <CardContent className="p-8">
                    <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-6">
                      <PieChart className="h-6 w-6 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 font-heading">Smart Insights</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Visualize your spending habits with beautiful charts. See exactly where your money goes each
                      month.
                    </p>
                  </CardContent>
                </Card>
              </FadeInItem>
            </FadeInStagger>

            <FadeInStagger delay={0.2} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <FadeInItem>
                <Card className="bg-white/[0.02] border-white/10 backdrop-blur-sm hover:bg-white/[0.04] transition-colors h-full">
                  <CardContent className="p-8 flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3 font-heading">Receipt Scanning</h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Snap a photo of any receipt. Our AI automatically extracts items, prices, and taxes.
                      </p>
                      <div className="flex gap-2">
                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white">
                          99% Accuracy
                        </div>
                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white">
                          Instant
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-48 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-lg border border-white/10 flex items-center justify-center relative overflow-hidden shrink-0">
                      <Smartphone className="h-10 w-10 text-primary absolute z-10" />
                      <div className="absolute inset-0 bg-[url('/placeholder-pattern.svg')] opacity-20" />
                    </div>
                  </CardContent>
                </Card>
              </FadeInItem>

              <FadeInItem>
                <Card className="bg-white/[0.02] border-white/10 backdrop-blur-sm hover:bg-white/[0.04] transition-colors h-full">
                  <CardContent className="p-8 flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3 font-heading">Recurring Expenses</h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Rent, utilities, subscriptions? Set them up once and we'll automatically split them every month.
                      </p>
                      <div className="flex gap-2">
                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white">
                          Automated
                        </div>
                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white">
                          Notifications
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-48 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-lg border border-white/10 flex items-center justify-center relative overflow-hidden shrink-0">
                      <Wallet className="h-10 w-10 text-blue-500 absolute z-10" />
                      <div className="absolute inset-0 bg-[url('/placeholder-pattern.svg')] opacity-20" />
                    </div>
                  </CardContent>
                </Card>
              </FadeInItem>
            </FadeInStagger>
          </div>
        </section>

        {/* Why Us / Stats */}
        <section className="py-24 border-y border-white/5 bg-white/[0.01] overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="right" className="space-y-8">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-heading">
                  Trusted by millions <br />
                  <span className="text-muted-foreground">to keep expenses fair.</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We built Split Up because money ruins relationships. We wanted to fix that. Now, we handle over $1B in
                  shared expenses every year with bank-grade security and zero hidden fees.
                </p>

                <div className="space-y-4">
                  {[
                    "No hidden transaction fees",
                    "Bank-level 256-bit encryption",
                    "Real-time synchronization across devices",
                    "Export to PDF and CSV",
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      </div>
                      <span className="text-white">{feature}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 rounded-2xl blur-2xl opacity-20" />
                <FadeInStagger className="grid grid-cols-2 gap-4 relative">
                  <div className="space-y-4 pt-8">
                    <FadeInItem>
                      <Card className="bg-secondary/50 border-white/10 backdrop-blur h-full">
                        <CardContent className="p-6 text-center">
                          <div className="text-3xl font-bold text-white mb-1">2M+</div>
                          <div className="text-sm text-muted-foreground">Active Users</div>
                        </CardContent>
                      </Card>
                    </FadeInItem>
                    <FadeInItem>
                      <Card className="bg-secondary/50 border-white/10 backdrop-blur h-full">
                        <CardContent className="p-6 text-center">
                          <div className="text-3xl font-bold text-white mb-1">150+</div>
                          <div className="text-sm text-muted-foreground">Currencies</div>
                        </CardContent>
                      </Card>
                    </FadeInItem>
                  </div>
                  <div className="space-y-4">
                    <FadeInItem>
                      <Card className="bg-secondary/50 border-white/10 backdrop-blur h-full">
                        <CardContent className="p-6 text-center">
                          <div className="text-3xl font-bold text-white mb-1">$1B+</div>
                          <div className="text-sm text-muted-foreground">Expensed Tracked</div>
                        </CardContent>
                      </Card>
                    </FadeInItem>
                    <FadeInItem>
                      <Card className="bg-secondary/50 border-white/10 backdrop-blur h-full">
                        <CardContent className="p-6 text-center">
                          <div className="text-3xl font-bold text-white mb-1">4.9</div>
                          <div className="text-sm text-muted-foreground">App Store Rating</div>
                        </CardContent>
                      </Card>
                    </FadeInItem>
                  </div>
                </FadeInStagger>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-4 md:px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>

          <div className="container mx-auto relative z-10 text-center max-w-3xl">
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white font-heading">
                Ready to settle up?
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-xl text-muted-foreground mb-10">
                Join millions of roommates, couples, and travelers who use Split Up to keep life fair.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="rounded-full h-14 px-8 text-lg bg-white text-black hover:bg-white/90 w-full sm:w-auto"
              >
                Download for Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full h-14 px-8 text-lg border-white/10 bg-transparent hover:bg-white/5 text-white w-full sm:w-auto"
              >
                Open in Browser
              </Button>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

