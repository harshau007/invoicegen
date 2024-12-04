"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function CreateProjectDialog() {
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [template, setTemplate] = useState("blank");
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projectId = uuidv4();
    // Store project data
    localStorage.setItem(`project_${projectId}_name`, projectName);
    localStorage.setItem(`project_${projectId}_html`, "<h1>New Invoice</h1>");
    localStorage.setItem(`project_${projectId}_published`, "false");

    toast({
      title: "Project created",
      description: `Project "${projectName}" has been created successfully.`,
    });
    setOpen(false);
    router.push(`/projects/${projectId}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus className="h-4 w-4" />
          <span className="sr-only">Create new project</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Create a new invoice project from scratch or using a template.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="project-name">Project Name</Label>
            <Input
              id="project-name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Select Template</Label>
            <RadioGroup value={template} onValueChange={setTemplate}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="blank" id="blank" />
                <Label htmlFor="blank">Blank Project</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="invoice" id="invoice" />
                <Label htmlFor="invoice">Invoice Template</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit">Create Project</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
