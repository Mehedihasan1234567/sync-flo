"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Send, CheckCircle2, Loader2, ExternalLink } from "lucide-react"
import { getProjectBySlug, addFeedback, Project } from "@/lib/firestore"
import { sendFeedbackEmail } from "@/app/actions/email"
import { toast } from "sonner"

export default function ClientViewPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  
  const [feedback, setFeedback] = useState("")
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [sendingFeedback, setSendingFeedback] = useState(false)

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return
      
      try {
        setLoading(true)
        const data = await getProjectBySlug(slug)
        if (data) {
          setProject(data)
        } else {
          toast.error("Project not found")
        }
      } catch (error) {
        console.error("Error fetching project:", error)
        toast.error("Failed to load project")
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [slug])

  const handleSendFeedback = async () => {
    if (!feedback.trim() || !project) return

    try {
      setSendingFeedback(true)
      await addFeedback(project.id, feedback)
      
      if (project.ownerEmail) {
        const result = await sendFeedbackEmail(
          project.ownerEmail,
          project.client,
          feedback,
          project.title
        )
        if (!result.success) {
          console.error("Failed to send email notification:", result.error)
        }
      }

      toast.success("Feedback sent & Developer notified!")
      setFeedback("")
    } catch (error) {
      console.error("Error sending feedback:", error)
      toast.error("Failed to send message")
    } finally {
      setSendingFeedback(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Project Not Found</h1>
        <p className="text-muted-foreground">The project you are looking for does not exist or has been removed.</p>
        <Button onClick={() => router.push("/")}>Go Home</Button>
      </div>
    )
  }

  const progress = project.progress || 0
  const steps = project.timeline || []

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Project Status for {project.client}</h1>
              <p className="text-xs text-foreground/60">{project.title}</p>
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
        {project.currentFocus && (
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/30 p-6 mb-8 backdrop-blur-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-foreground/60 mb-1">Current Focus</p>
                <h3 className="text-lg font-semibold text-foreground">{project.currentFocus}</h3>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                <span className="text-xs font-medium text-accent">Live</span>
              </div>
            </div>
            
            {project.liveLink && (
              <div className="mt-6 pt-6 border-t border-primary/10">
                <Button 
                  variant="outline" 
                  className="w-full gap-2 bg-background/50 hover:bg-background/80"
                  onClick={() => window.open(project.liveLink, '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live Site
                </Button>
              </div>
            )}
          </Card>
        )}

        {/* Timeline */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6">Project Timeline</h2>
          <div className="space-y-4">
            {steps.length === 0 ? (
               <p className="text-muted-foreground text-center py-4">No milestones yet.</p>
            ) : (
              steps.map((step, i) => {
                // Determine if active (first incomplete step)
                const isActive = !step.completed && steps.slice(0, i).every(s => s.completed);
                
                return (
                  <div key={step.id || i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                          step.completed
                            ? "bg-accent text-accent-foreground"
                            : isActive
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
                        className={`font-medium ${step.completed ? "text-accent" : isActive ? "text-primary" : "text-foreground/60"}`}
                      >
                        {step.name}
                      </p>
                      {isActive && <p className="text-xs text-foreground/50 mt-1">Currently in progress</p>}
                    </div>
                  </div>
                )
              })
            )}
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
              <Button 
                onClick={handleSendFeedback} 
                className="gap-2"
                disabled={!feedback.trim() || sendingFeedback}
              >
                {sendingFeedback ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
