"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { 
  ArrowLeft, 
  Save, 
  Link as LinkIcon, 
  Trash2, 
  Plus, 
  CheckCircle2, 
  Circle,
  ListTodo,
  MessageSquare,
  Check
} from "lucide-react"
import { CopyLinkButton } from "@/components/copy-link-button"
import { toast } from "sonner"
import { db } from "@/lib/firebase"
import { doc, onSnapshot, updateDoc, collection, query, orderBy, Timestamp } from "firebase/firestore"
import { sendClientUpdateEmail } from "@/app/actions/email"

interface Milestone {
  id: number
  name: string
  completed: boolean
}

interface ProjectData {
  name: string
  clientName: string
  clientEmail?: string
  progress: number
  currentFocus: string
  liveLink: string
  timeline: Milestone[]
  slug: string
  status: string
}

interface Feedback {
  id: string
  message: string
  createdAt: Timestamp
  read: boolean
  sender: string
}

export default function ProjectEditorPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [loading, setLoading] = useState(true)
  const [project, setProject] = useState<ProjectData | null>(null)
  
  // Local state for form inputs to allow editing before saving
  const [progress, setProgress] = useState(0)
  const [currentFocus, setCurrentFocus] = useState("")
  const [liveLink, setLiveLink] = useState("")
  const [status, setStatus] = useState("Active")
  
  const [newMilestone, setNewMilestone] = useState("")
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])

  // Fetch Project Data
  useEffect(() => {
    if (!id) return

    const unsub = onSnapshot(doc(db, "projects", id), (doc) => {
      if (doc.exists()) {
        const data = doc.data() as ProjectData
        setProject(data)
        if (loading) {
            setProgress(data.progress || 0)
            setCurrentFocus(data.currentFocus || "")
            setLiveLink(data.liveLink || "")
            setStatus(data.status || "Active")
        }
        setLoading(false)
      } else {
        toast.error("Project not found")
        setLoading(false)
      }
    }, (error) => {
        console.error("Error fetching project:", error)
        toast.error("Error loading project")
        setLoading(false)
    })

    return () => unsub()
  }, [id, loading])

  // Fetch Feedbacks
  useEffect(() => {
    if (!id) return

    const q = query(collection(db, `projects/${id}/feedbacks`), orderBy("createdAt", "desc"))
    const unsub = onSnapshot(q, (snapshot) => {
      const feedbackData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Feedback[]
      setFeedbacks(feedbackData)
    }, (error) => {
      console.error("Error fetching feedbacks:", error)
    })

    return () => unsub()
  }, [id])

  const handleSaveUpdate = async () => {
    if (!project) return
    try {
      await updateDoc(doc(db, "projects", id), {
        progress,
        currentFocus,
        liveLink,
        status
      })
      
      // Send Client Update Email if clientEmail exists
      if (project.clientEmail) {
        await sendClientUpdateEmail(
          project.clientEmail,
          project.clientName,
          project.name,
          progress,
          currentFocus,
          project.slug
        );
        toast.success("Update saved & Client notified via email! 📧")
      } else {
        toast.success("Update saved!")
      }
    } catch (error) {
      console.error("Error saving update:", error)
      toast.error("Failed to save update")
    }
  }

  // Optimistic UI for Milestones
  const toggleMilestone = async (milestoneId: number) => {
    if (!project) return

    const updatedTimeline = project.timeline.map(m => 
      m.id === milestoneId ? { ...m, completed: !m.completed } : m
    )

    // Optimistically update state
    setProject({ ...project, timeline: updatedTimeline })

    try {
      await updateDoc(doc(db, "projects", id), {
        timeline: updatedTimeline
      })
    } catch (error) {
        console.error("Error updating milestone:", error)
        toast.error("Failed to update milestone")
    }
  }

  const deleteMilestone = async (milestoneId: number) => {
    if (!project) return
    
    const updatedTimeline = project.timeline.filter(m => m.id !== milestoneId)
    setProject({ ...project, timeline: updatedTimeline })

    try {
        await updateDoc(doc(db, "projects", id), {
            timeline: updatedTimeline
        })
    } catch (error) {
        console.error("Error deleting milestone:", error)
        toast.error("Failed to delete milestone")
    }
  }

  const addMilestone = async () => {
    if (!newMilestone.trim() || !project) return

    const newM = { id: Date.now(), name: newMilestone, completed: false }
    const updatedTimeline = [...(project.timeline || []), newM]
    
    setProject({ ...project, timeline: updatedTimeline })
    setNewMilestone("")

    try {
        await updateDoc(doc(db, "projects", id), {
            timeline: updatedTimeline
        })
    } catch (error) {
        console.error("Error adding milestone:", error)
        toast.error("Failed to add milestone")
    }
  }

  const addDefaultTemplate = async () => {
      if (!project) return
      const defaultMilestones = [
          { id: Date.now(), name: "Planning", completed: false },
          { id: Date.now() + 1, name: "Development", completed: false },
          { id: Date.now() + 2, name: "Delivery", completed: false },
      ]
      
      setProject({ ...project, timeline: defaultMilestones })
      
      try {
          await updateDoc(doc(db, "projects", id), {
              timeline: defaultMilestones
          })
      } catch (error) {
          console.error("Error adding template:", error)
          toast.error("Failed to add template")
      }
  }

  const markAsRead = async (feedbackId: string) => {
    try {
      await updateDoc(doc(db, `projects/${id}/feedbacks`, feedbackId), {
        read: true
      })
    } catch (error) {
      console.error("Error marking feedback as read:", error)
      toast.error("Failed to update feedback status")
    }
  }

  if (loading) {
      return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!project) {
      return <div className="flex items-center justify-center min-h-screen">Project not found</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">{project.name || "Untitled Project"}</h1>
              <p className="text-sm text-foreground/60">{project.clientName || "Unknown Client"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <CopyLinkButton slug={project.slug} showLabel />
             <Button variant="outline" size="sm" onClick={() => router.push(`/p/${project.slug}`)}>
                View Client Page
             </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Status Control Center */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 bg-card border-border sticky top-24 space-y-8">
              {/* Project Progress */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-foreground">Overall Progress</label>
                  <span className="text-2xl font-bold text-primary">{progress}%</span>
                </div>
                <Slider
                  value={[progress]}
                  onValueChange={(vals) => setProgress(vals[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Current Focus */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">What are you working on right now?</label>
                <div className="space-y-2">
                  <Textarea
                    value={currentFocus}
                    onChange={(e) => setCurrentFocus(e.target.value)}
                    className="min-h-[100px] resize-none"
                    placeholder="e.g. Working on the homepage hero section..."
                  />
                  <Button onClick={handleSaveUpdate} size="sm" className="w-full gap-2">
                    <Save className="w-4 h-4" />
                    Save Update
                  </Button>
                </div>
              </div>

              {/* Live Preview Link */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Live Demo / Resource Link</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={liveLink}
                    onChange={(e) => setLiveLink(e.target.value)}
                    className="pl-9"
                    placeholder="https://..."
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  If added, a "View Live" button will appear on the client page.
                </p>
              </div>

              {/* Project Settings */}
              <div className="space-y-3 pt-4 border-t border-border">
                 <label className="text-sm font-medium text-foreground">Project Status</label>
                 <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                 >
                    <option>Active</option>
                    <option>On Hold</option>
                    <option>Completed</option>
                 </select>
              </div>
            </Card>

            {/* Recent Feedback Section */}
            <Card className="p-6 bg-card border-border space-y-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-foreground">Recent Feedback</h3>
              </div>
              
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {feedbacks.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No feedback yet.</p>
                ) : (
                  feedbacks.map((item) => (
                    <div 
                      key={item.id} 
                      className={`p-3 rounded-lg border text-sm space-y-2 transition-colors ${
                        !item.read ? "bg-primary/5 border-primary/20" : "bg-muted/30 border-border"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <p className={`text-foreground ${!item.read ? "font-medium" : ""}`}>
                          {item.message}
                        </p>
                        {!item.read && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6 shrink-0 text-muted-foreground hover:text-primary"
                            onClick={() => markAsRead(item.id)}
                            title="Mark as read"
                          >
                            <Check className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>{item.sender === 'client' ? 'Client' : 'You'}</span>
                        <span>{item.createdAt?.toDate().toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Right Column: Timeline & Milestone Manager */}
          <div className="lg:col-span-2 space-y-6">
             <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Project Timeline</h2>
             </div>

             <Card className="bg-card border-border overflow-hidden min-h-[300px]">
                {(!project.timeline || project.timeline.length === 0) ? (
                    // Empty State
                    <div className="flex flex-col items-center justify-center h-full py-12 text-center space-y-4">
                        <div className="p-4 rounded-full bg-muted/30">
                            <ListTodo className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-lg font-medium text-foreground">No milestones yet</h3>
                            <p className="text-sm text-muted-foreground">Start planning your project steps.</p>
                        </div>
                        <Button onClick={addDefaultTemplate} variant="outline">
                            Add Default Template
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="divide-y divide-border">
                           {project.timeline.map((milestone, index) => {
                              // Determine if this is the "Current Stage" (first unchecked item)
                              const isCurrentStage = !milestone.completed && project.timeline.slice(0, index).every(m => m.completed);
                              
                              return (
                                <div 
                                   key={milestone.id} 
                                   className={`p-4 flex items-center gap-4 group transition-colors ${isCurrentStage ? 'bg-primary/5' : 'hover:bg-muted/50'}`}
                                >
                                   <button onClick={() => toggleMilestone(milestone.id)} className="flex-shrink-0">
                                      {milestone.completed ? (
                                         <CheckCircle2 className="w-6 h-6 text-green-500" />
                                      ) : (
                                         <Circle className={`w-6 h-6 ${isCurrentStage ? 'text-primary' : 'text-muted-foreground'}`} />
                                      )}
                                   </button>
                                   
                                   <div className="flex-1">
                                      <span 
                                         className={`w-full block text-sm md:text-base ${milestone.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}
                                      >
                                        {milestone.name}
                                      </span>
                                   </div>

                                   <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                                      onClick={() => deleteMilestone(milestone.id)}
                                   >
                                      <Trash2 className="w-4 h-4" />
                                   </Button>
                                </div>
                              )
                           })}
                        </div>
                        
                        {/* Add Step Action */}
                        <div className="p-4 bg-muted/30 border-t border-border">
                           <div className="flex items-center gap-2 p-1.5 bg-background border border-input rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-0 transition-all">
                              <div className="p-2 text-muted-foreground">
                                <Plus className="w-4 h-4" />
                              </div>
                              <input 
                                 type="text" 
                                 placeholder="Add new milestone..." 
                                 className="flex-1 bg-transparent border-none focus:outline-none text-sm placeholder:text-muted-foreground"
                                 value={newMilestone}
                                 onChange={(e) => setNewMilestone(e.target.value)}
                                 onKeyDown={(e) => e.key === 'Enter' && addMilestone()}
                              />
                              <Button 
                                size="sm" 
                                onClick={addMilestone} 
                                disabled={!newMilestone.trim()}
                                className="h-8 px-4 transition-all"
                              >
                                 Add
                              </Button>
                           </div>
                        </div>
                    </>
                )}
             </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
