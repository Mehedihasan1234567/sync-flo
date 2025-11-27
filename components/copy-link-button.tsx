"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check, Link as LinkIcon } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface CopyLinkButtonProps {
  slug: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
  showLabel?: boolean
}

export function CopyLinkButton({ 
  slug, 
  variant = "outline", 
  className,
  size = "sm",
  showLabel = false
}: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    
    try {
      const url = `${window.location.origin}/p/${slug}`
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success("Link copied to clipboard! 📋")
      
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
      toast.error("Failed to copy link")
    }
  }

  return (
    <Button 
      variant={variant} 
      size={size} 
      className={cn("gap-2", className)}
      onClick={handleCopy}
    >
      {copied ? (
        <Check className="w-4 h-4" />
      ) : showLabel ? (
        <LinkIcon className="w-4 h-4" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
      {showLabel && (copied ? "Copied!" : "Copy Link")}
    </Button>
  )
}
