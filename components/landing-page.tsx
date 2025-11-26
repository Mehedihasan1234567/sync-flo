"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Link as LinkIcon, Shield, Zap, Check, Layout, Users, BarChart3, MessageSquare, Star, Smartphone, Palette, Code } from "lucide-react"

export default function LandingPage({
  onNavigate,
}: { onNavigate?: (view: "landing" | "dashboard" | "client") => void }) {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      {/* Navbar */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-foreground">SyncFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-foreground/70 hover:text-foreground transition">
              Features
            </a>
            <a href="#" className="text-foreground/70 hover:text-foreground transition">
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex-1 px-4 sm:px-6 lg:px-8 py-20 md:py-32 overflow-hidden">
        {/* Dot Pattern Background */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-slate-950 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
             <span>✨ Now in Early Beta - Free for Everyone</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-balance text-foreground">
            Updates your clients actually read.
          </h1>
          <p className="text-lg text-foreground/60 text-balance max-w-2xl mx-auto">
            Stop sending long emails. Generate a live status link for your projects. No login required for your clients.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/login">
              <Button size="lg" className="gap-2">
                Create Your First Link (Free)
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Check className="w-4 h-4 text-green-500" /> No credit card required
            </span>
          </div>

          {/* Hero Image Mock UI */}
          <div className="mt-16 relative mx-auto max-w-5xl">
             <div className="bg-card rounded-xl border border-border shadow-2xl overflow-hidden">
                <div className="flex h-[400px] md:h-[500px]">
                  {/* Sidebar */}
                  <div className="w-16 md:w-64 border-r border-border bg-muted/10 p-4 hidden md:flex flex-col gap-4">
                    <div className="h-8 w-8 bg-primary/20 rounded-lg mb-4"></div>
                    <div className="h-4 w-3/4 bg-muted rounded"></div>
                    <div className="h-4 w-1/2 bg-muted rounded"></div>
                    <div className="h-4 w-2/3 bg-muted rounded"></div>
                  </div>
                  
                  {/* Main Content */}
                  <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="h-16 border-b border-border flex items-center px-6 gap-4">
                      <div className="h-4 w-24 bg-muted rounded"></div>
                      <div className="ml-auto h-8 w-8 rounded-full bg-muted"></div>
                    </div>
                    
                    {/* Dashboard Content */}
                    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {/* Circular Progress Card */}
                      <div className="col-span-1 bg-card rounded-lg border border-border p-6 flex flex-col items-center justify-center gap-4 shadow-sm">
                         <div className="relative h-32 w-32 flex items-center justify-center">
                            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                              <circle className="text-muted stroke-current" strokeWidth="10" cx="50" cy="50" r="40" fill="transparent"></circle>
                              <circle className="text-primary stroke-current" strokeWidth="10" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" strokeDasharray="251.2" strokeDashoffset="50.24"></circle>
                            </svg>
                            <div className="absolute flex flex-col items-center">
                              <span className="text-2xl font-bold">80%</span>
                              <span className="text-xs text-muted-foreground">Complete</span>
                            </div>
                         </div>
                         <div className="text-center">
                           <h3 className="font-medium">Website Redesign</h3>
                           <p className="text-sm text-muted-foreground">On track</p>
                         </div>
                      </div>

                      {/* Other Mock Cards */}
                      <div className="col-span-1 bg-card rounded-lg border border-border p-6 space-y-4 shadow-sm">
                        <div className="h-4 w-1/2 bg-muted rounded"></div>
                        <div className="space-y-2">
                          <div className="h-2 w-full bg-muted rounded"></div>
                          <div className="h-2 w-5/6 bg-muted rounded"></div>
                          <div className="h-2 w-4/6 bg-muted rounded"></div>
                        </div>
                      </div>
                       <div className="col-span-1 bg-card rounded-lg border border-border p-6 space-y-4 shadow-sm hidden lg:block">
                        <div className="h-4 w-1/3 bg-muted rounded"></div>
                         <div className="flex gap-2 mt-4">
                           <div className="h-8 w-8 rounded-full bg-muted"></div>
                           <div className="h-8 w-8 rounded-full bg-muted"></div>
                           <div className="h-8 w-8 rounded-full bg-muted"></div>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Who is this for Section */}
      <section className="py-10 border-y border-border bg-muted/20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-medium text-muted-foreground mb-6">Perfect for...</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
               <div className="flex items-center gap-2 text-foreground/80 font-medium">
                  <Code className="w-5 h-5" />
                  <span>Web Developers</span>
               </div>
               <div className="flex items-center gap-2 text-foreground/80 font-medium">
                  <Palette className="w-5 h-5" />
                  <span>UI/UX Designers</span>
               </div>
               <div className="flex items-center gap-2 text-foreground/80 font-medium">
                  <Smartphone className="w-5 h-5" />
                  <span>App Creators</span>
               </div>
            </div>
         </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Built for Freelancers, Loved by Clients</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: LinkIcon,
                title: "Magic Links",
                desc: "Share one link, update forever. No need to send multiple emails.",
              },
              {
                icon: Shield,
                title: "Private & Secure",
                desc: "Optional password protection for Pro users. Your data stays safe.",
              },
              {
                icon: Zap,
                title: "Instant Feedback",
                desc: "Clients can leave quick notes without signing up.",
              },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition">
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-foreground/60">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefit Highlights Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-muted/20 border-t border-border">
         <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Why your workflow needs SyncFlow.</h2>
            <div className="grid md:grid-cols-3 gap-8">
               <div className="bg-card p-8 rounded-xl border border-border shadow-sm">
                  <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-6">
                     <MessageSquare className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">No more "Just checking in"</h3>
                  <p className="text-foreground/60">Eliminate constant status update requests from clients with a proactive dashboard.</p>
               </div>
               <div className="bg-card p-8 rounded-xl border border-border shadow-sm">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-6">
                     <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Visual Progress Tracking</h3>
                  <p className="text-foreground/60">Give clients a live, visual dashboard they can check anytime, anywhere.</p>
               </div>
               <div className="bg-card p-8 rounded-xl border border-border shadow-sm">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-6">
                     <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Professional Experience</h3>
                  <p className="text-foreground/60">Impress clients with a dedicated status link, not just scattered WhatsApp texts.</p>
               </div>
            </div>
         </div>
      </section>

      {/* How it Works Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-background border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-16">How it works</h2>
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-border -z-10"></div>
            {/* Connecting Line (Mobile) */}
            <div className="md:hidden absolute top-12 bottom-12 left-1/2 w-0.5 border-l-2 border-dashed border-border -translate-x-1/2 -z-10"></div>
            
            {[
              {
                icon: Layout,
                title: "1. Create Project",
                desc: "Add a client & project name in 30s.",
              },
              {
                icon: LinkIcon,
                title: "2. Share Link",
                desc: "Send the magic link. No login needed for them.",
              },
              {
                icon: Users,
                title: "3. Keep Updated",
                desc: "Update progress with one click.",
              },
            ].map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} className="flex flex-col items-center text-center bg-background relative">
                  <div className="w-24 h-24 rounded-full bg-card border border-border flex items-center justify-center mb-6 shadow-sm relative z-10">
                    <Icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-foreground/60 max-w-xs">{step.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
           <h2 className="text-2xl font-bold text-foreground mb-6">Be the first to streamline your client updates.</h2>
           <Link href="/login">
             <Button size="lg" className="gap-2">
                Start My First Project
                <ArrowRight className="w-4 h-4" />
             </Button>
           </Link>
           <p className="mt-8 text-foreground/40 text-sm">&copy; 2025 SyncFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
