"use client";

import { CreateProjectDialog } from "@/components/create-project-dialog";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Project {
  id: string;
  name: string;
  isPublished: boolean;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const projectKeys = Object.keys(localStorage).filter((key) =>
      key.includes("_name")
    );
    const projectData = projectKeys.map((key) => {
      const id = key.split("_")[1];
      const name = localStorage.getItem(`project_${id}_name`) || "";
      const isPublished = JSON.parse(
        localStorage.getItem(`project_${id}_published`) || "false"
      );
      return { id, name, isPublished };
    });
    setProjects(projectData);
  }, []);

  return (
    <div className="flex flex-col h-full w-screen px-4 py-6">
      {/* Header Section */}
      <div className="flex items-center justify-between w-full mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <CreateProjectDialog />
      </div>

      {/* Projects List */}
      {projects.length > 0 ? (
        <ul className="flex-1 w-full space-y-4 overflow-auto">
          {projects.map((project) => (
            <li
              key={project.id}
              className="flex items-center justify-between border rounded-md p-5 hover:bg-accent hover:shadow-md transition-all duration-200"
            >
              <Link href={`/projects/${project.id}`} className="flex-1">
                <span className="block text-lg font-semibold">
                  {project.name}
                </span>
              </Link>
              <Badge
                variant={project.isPublished ? "default" : "secondary"}
                className="ml-4"
              >
                {project.isPublished ? "Published" : "Draft"}
              </Badge>
            </li>
          ))}
        </ul>
      ) : (
        <p className="flex-1 flex items-center justify-center">
          No projects found. Start by creating a new project.
        </p>
      )}
    </div>
  );
}
