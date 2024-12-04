"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import AppLayout from "../app-layout";

interface Project {
  id: string;
  name: string;
  isPublished: boolean;
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);

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
    setRecentProjects(projectData.slice(0, 3));
  }, []);

  return (
    <AppLayout>
      <div className="w-full p-5 space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Published Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projects.filter((p) => p.isPublished).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>
              Your most recently created projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentProjects.length > 0 ? (
              <ul className="space-y-2">
                {recentProjects.map((project) => (
                  <li
                    key={project.id}
                    className="flex items-center justify-between"
                  >
                    <Link
                      href={`/projects/${project.id}`}
                      className="hover:underline"
                    >
                      {project.name}
                    </Link>
                    <Badge
                      variant={project.isPublished ? "default" : "secondary"}
                    >
                      {project.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No projects found. Start by creating a new project.</p>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button asChild>
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
