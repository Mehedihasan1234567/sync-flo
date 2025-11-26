"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  ArrowLeft, 
  Save, 
  Link as LinkIcon, 
  Trash2, 
  Plus, 
  CheckCircle2, 
  Circle 
} from "lucide-react"
import { toast } from "sonner"

export default function ProjectEditor({
  onNavigate,
}: { onNavigate: (view: "landing" | "dashboard" | "client" | "project-editor") => void }) {
  const [progress, setProgress] = useState(65)
  const [currentFocus, setCurrentFocus] = useState("Implementing the new authentication flow.")
  const [liveLink, setLiveLink] = useState("")
  const [milestones, setMilestones] = useState([
    { id: 1, name: "Project Setup & Repo", completed: true },
    { id: 2, name: "Database Schema Design", completed: true },
    { id: 3, name: "Authentication API", completed: false },
    { id: 4, name: "Frontend Dashboard", completed: false },
    { id: 5, name: "Deployment", completed: false },
  ])
  const [newMilestone, setNewMilestone] = useState("")

  const handleSaveFocus = () => {
    toast.success("Update saved!")
  }

  const toggleMilestone = (id: number) => {
    setMilestones(milestones.map(m => 
      m.id === id ? { ...m, completed: !m.completed } : m
    ))
  }

  const deleteMilestone = (id: number) => {
    setMilestones(milestones.filter(m => m.id !== id))
  }

  const addMilestone = () => {
    if (!newMilestone.trim()) return
    setMilestones([
      ...milestones,
      { id: Date.now(), name: newMilestone, completed: false }
    ])
    setNewMilestone("")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => onNavigate("dashboard")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Website Redesign</h1>
              <p className="text-sm text-foreground/60">Acme Corp</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <Button variant="outline" size="sm" onClick={() => onNavigate("client")}>
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
                  <Button onClick={handleSaveFocus} size="sm" className="w-full gap-2">
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
                 <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option>Active</option>
                    <option>On Hold</option>
                    <option>Completed</option>
                 </select>
              </div>
            </Card>
          </div>

          {/* Right Column: Timeline & Milestone Manager */}
          <div className="lg:col-span-2 space-y-6">
             <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Project Timeline</h2>
             </div>

             <Card className="bg-card border-border overflow-hidden">
                <div className="divide-y divide-border">
                   {milestones.map((milestone, index) => {
                      // Determine if this is the "Current Stage" (first unchecked item)
                      const isCurrentStage = !milestone.completed && milestones.slice(0, index).every(m => m.completed);
                      
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
                              <input 
                                 type="text" 
                                 value={milestone.name}
                                 onChange={(e) => setMilestones(milestones.map(m => m.id === milestone.id ? { ...m, name: e.target.value } : m))}
                                 className={`w-full bg-transparent border-none focus:outline-none text-sm md:text-base ${milestone.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}
                              />
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
                   <div className="flex items-center gap-3">
                      <Plus className="w-5 h-5 text-muted-foreground" />
                      <input 
                         type="text" 
                         placeholder="Add new milestone..." 
                         className="flex-1 bg-transparent border-none focus:outline-none text-sm"
                         value={newMilestone}
                         onChange={(e) => setNewMilestone(e.target.value)}
                         onKeyDown={(e) => e.key === 'Enter' && addMilestone()}
                      />
                      <Button size="sm" variant="ghost" onClick={addMilestone} disabled={!newMilestone.trim()}>
                         Add
                      </Button>
                   </div>
                </div>
             </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
