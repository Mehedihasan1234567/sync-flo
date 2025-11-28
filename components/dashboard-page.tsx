import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Plus, Copy, Trash2, Edit2, Loader2, Laptop, Smartphone, Palette, FilePlus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/AuthContext"
import { addProject, getUserProjects, Project } from "@/lib/firestore"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { PROJECT_TEMPLATES, ProjectTemplateKey } from "@/lib/constants"
import { CopyLinkButton } from "@/components/copy-link-button"

export default function DashboardPage({
  onNavigate,
}: { onNavigate: (view: "landing" | "dashboard" | "client" | "project-editor") => void }) {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [isLoadingProjects, setIsLoadingProjects] = useState(true)
  const [newProject, setNewProject] = useState<{ client: string; clientEmail: string; project: string; date: Date | undefined; template: ProjectTemplateKey }>({ 
    client: "", 
    clientEmail: "",
    project: "", 
    date: undefined,
    template: 'blank'
  })
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) {
        console.log("User not loaded yet...");
        return;
      }

      try {
        setIsLoadingProjects(true)
        const userProjects = await getUserProjects(user.uid)
        setProjects(userProjects)
      } catch (error) {
        console.error("Failed to fetch projects", error)
        toast.error("Failed to load projects")
      } finally {
        setIsLoadingProjects(false)
      }
    }

    fetchProjects()
  }, [user])

  const handleCreateProject = async () => {
    if (!newProject.client || !newProject.project || !user) return
    
    try {
      setIsCreating(true)
      
      // Get milestones from template
      const templateMilestones = PROJECT_TEMPLATES[newProject.template].milestones.map((name, index) => ({
        id: Date.now() + index,
        name,
        completed: false
      }))

      await addProject({
        ...newProject,
        timeline: templateMilestones
      }, user.uid, user.email)
      
      toast.success("Project created successfully")
      
      // Refresh projects
      const userProjects = await getUserProjects(user.uid)
      setProjects(userProjects)
      
      setNewProject({ client: "", clientEmail: "", project: "", date: undefined, template: 'blank' })
      setIsCreateModalOpen(false)
    } catch (error) {
      console.error("Failed to create project", error)
      toast.error("Failed to create project")
    } finally {
      setIsCreating(false)
    }
  }

  const getTemplateIcon = (key: ProjectTemplateKey) => {
    switch (key) {
      case 'web-dev': return <Laptop className="w-4 h-4" />;
      case 'app-dev': return <Smartphone className="w-4 h-4" />;
      case 'design': return <Palette className="w-4 h-4" />;
      default: return <FilePlus className="w-4 h-4" />;
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => onNavigate("landing")}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Welcome back, {user?.displayName?.split(" ")[0] || "User"}!</h1>
              <p className="text-sm text-foreground/60">Manage your active projects</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => logout()}>
              Logout
            </Button>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
               {user?.photoURL ? (
                <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
              ) : (
                <span className="text-primary font-semibold">{user?.displayName?.[0] || "U"}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Row */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Active Projects", value: projects.length.toString() },
            { label: "Completed This Month", value: "0" }, // Placeholder
            { label: "Pending Payments", value: "$0" }, // Placeholder
          ].map((stat, i) => (
            <Card key={i} className="p-6 bg-card border-border hover:border-primary/30 transition">
              <p className="text-foreground/60 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Your Projects</h2>
            <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </div>

          {isLoadingProjects ? (
             <div className="flex justify-center py-12">
               <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border rounded-lg">
              <h3 className="text-lg font-medium text-foreground mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-4">Create your first project to get started.</p>
              <Button onClick={() => setIsCreateModalOpen(true)}>Create Project</Button>
            </div>
          ) : (
            <div className="grid gap-4">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="p-6 bg-card border-border hover:border-primary/50 transition group cursor-pointer"
                  onClick={() => router.push(`/dashboard/project/${project.id}`)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-foreground/60">{project.client}</p>
                      <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Edit logic here
                        }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <CopyLinkButton slug={project.slug} variant="ghost" size="sm" />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Implement delete functionality later
                          toast.info("Delete functionality coming soon")
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/70">Progress</span>
                      <span className="font-medium text-foreground">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-foreground/50 mt-3">
                      Created {project.createdAt?.toDate().toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Create Project Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="client">Client Name</Label>
              <Input
                id="client"
                placeholder="e.g. Acme Corp"
                value={newProject.client}
                onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="clientEmail">Client Email (Optional)</Label>
              <Input
                id="clientEmail"
                placeholder="client@example.com"
                value={newProject.clientEmail}
                onChange={(e) => setNewProject({ ...newProject, clientEmail: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project">Project Name</Label>
              <Input
                id="project"
                placeholder="e.g. Website Redesign"
                value={newProject.project}
                onChange={(e) => setNewProject({ ...newProject, project: e.target.value })}
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Project Type</Label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(PROJECT_TEMPLATES) as ProjectTemplateKey[]).map((key) => (
                  <div 
                    key={key}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-md border cursor-pointer transition-all hover:bg-muted/50",
                      newProject.template === key ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-input"
                    )}
                    onClick={() => setNewProject({ ...newProject, template: key })}
                  >
                    <div className={cn(
                      "p-2 rounded-full", 
                      newProject.template === key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}>
                      {getTemplateIcon(key)}
                    </div>
                    <span className="text-sm font-medium">{PROJECT_TEMPLATES[key].label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Deadline (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newProject.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newProject.date ? format(newProject.date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newProject.date}
                    onSelect={(date) => setNewProject({ ...newProject, date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)} disabled={isCreating}>Cancel</Button>
            <Button onClick={handleCreateProject} disabled={isCreating}>
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Project"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
