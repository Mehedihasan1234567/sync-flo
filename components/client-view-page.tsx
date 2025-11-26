"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react"

export default function ClientViewPage({
  onNavigate,
}: { onNavigate: (view: "landing" | "dashboard" | "client") => void }) {
  const [feedback, setFeedback] = useState("")
  const progress = 65
  const steps = [
    { name: "Concept", completed: true },
    { name: "Design", completed: true },
    { name: "Development", completed: false, active: true },
    { name: "Testing", completed: false },
    { name: "Launch", completed: false },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => onNavigate("dashboard")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Project Status for Acme Corp</h1>
              <p className="text-xs text-foreground/60">Website Redesign</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">SF</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Circle */}
        <div className="flex justify-center mb-12">
          <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border-8 border-muted">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/5 to-accent/5"></div>
            <div className="text-center relative z-10">
              <div className="text-5xl font-bold text-primary">{progress}%</div>
              <p className="text-foreground/60 text-sm mt-2">Complete</p>
            </div>
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="92"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-muted"
              />
              <circle
                cx="100"
                cy="100"
                r="92"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeDasharray={`${(progress / 100) * 577} 577`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-primary)" />
                  <stop offset="100%" stopColor="var(--color-accent)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Current Status Card */}
        <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/30 p-6 mb-8 backdrop-blur-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-foreground/60 mb-1">Current Focus</p>
              <h3 className="text-lg font-semibold text-foreground">Integrating Payment Gateway API</h3>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              <span className="text-xs font-medium text-accent">Live</span>
            </div>
          </div>
        </Card>

        {/* Timeline */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6">Project Timeline</h2>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      step.completed
                        ? "bg-accent text-accent-foreground"
                        : step.active
                          ? "bg-primary text-primary-foreground ring-4 ring-primary/20 animate-pulse"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.completed ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-1 h-12 mt-2 ${step.completed ? "bg-accent" : "bg-muted"}`}></div>
                  )}
                </div>
                <div className="pt-2 pb-8">
                  <p
                    className={`font-medium ${step.completed ? "text-accent" : step.active ? "text-primary" : "text-foreground/60"}`}
                  >
                    {step.name}
                  </p>
                  {step.active && <p className="text-xs text-foreground/50 mt-1">Currently in progress</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Widget */}
        <Card className="bg-card border-border p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Send Quick Feedback</h3>
          <div className="space-y-3">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Send a quick note to the developer..."
              className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              rows={4}
            />
            <div className="flex justify-end">
              <Button onClick={() => setFeedback("")} className="gap-2">
                <Send className="w-4 h-4" />
                Send
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
