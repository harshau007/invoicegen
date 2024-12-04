"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AppLayout from "../app-layout";

export default function CreateProjectPage() {
  const [projectName, setProjectName] = useState("");
  const [template, setTemplate] = useState("blank");
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to create the project
    // For now, we'll just simulate it
    toast({
      title: "Project created",
      description: `Project "${projectName}" has been created successfully.`,
    });
    router.push(`/projects/${projectName}`);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="project-name">Project Name</Label>
            <Input
              id="project-name"
              value={projectName}
              onChange={(e: any) => setProjectName(e.target.value)}
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
      </div>
    </AppLayout>
  );
}
