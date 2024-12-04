"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { htmlLanguage } from "@codemirror/lang-html";
import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { InvoiceDataForm } from "@/components/invoice-data-form";
import { useParams } from "next/navigation";

const CodeMirror = dynamic(
  () => import("@uiw/react-codemirror").then((mod) => mod.default),
  { ssr: false }
);

const languages = ["curl", "javascript", "python", "go"];

interface InvoiceData {
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  dueDate: string;
  items: { description: string; amount: number }[];
}

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { id } = useParams();
  const [projectName, setProjectName] = useState("");
  const [html, setHtml] = useState("<h1>Invoice</h1>");
  const [activeTab, setActiveTab] = useState("editor");
  const [isPublished, setIsPublished] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedName = localStorage.getItem(`project_${id}_name`);
    const savedHtml = localStorage.getItem(`project_${id}_html`);
    const savedPublishState = localStorage.getItem(`project_${id}_published`);
    console.log(id);
    if (savedName) setProjectName(savedName);
    if (savedHtml) setHtml(savedHtml);
    if (savedPublishState) setIsPublished(JSON.parse(savedPublishState));
  }, []);

  const handleHtmlChange = (value: string) => {
    setHtml(value);
    localStorage.setItem(`project_${id}_html`, value);
  };

  const handlePublishToggle = (newState: boolean) => {
    setIsPublished(newState);
    localStorage.setItem(`project_${id}_published`, JSON.stringify(newState));
    toast({
      title: newState ? "Project Published" : "Project Unpublished",
      description: newState
        ? "Your project is now live and the API is accessible."
        : "Your project is no longer public and the API is inaccessible.",
    });
    setShowPublishDialog(false);
  };

  const getCodeSnippet = (language: string) => {
    const endpoint = `/api/projects/${id}/invoice`;
    switch (language) {
      case "curl":
        return `curl -X POST ${endpoint} -H "Content-Type: application/json" -d '{"html": ${JSON.stringify(
          html
        )}}'`;
      case "javascript":
        return `fetch('${endpoint}', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ html: ${JSON.stringify(html)} })
}).then(response => response.json())`;
      case "python":
        return `import requests

response = requests.post('${endpoint}', json={'html': ${JSON.stringify(html)}})
print(response.json())`;
      case "go":
        return `package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

func main() {
	url := "${endpoint}"
	values := map[string]string{"html": ${JSON.stringify(html)}}
	jsonData, _ := json.Marshal(values)

	resp, _ := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
	defer resp.Body.Close()

	fmt.Println("Response Status:", resp.Status)
}`;
      default:
        return "";
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "Copied to clipboard",
          description: "The code snippet has been copied to your clipboard.",
        });
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const generateInvoiceHtml = (data: InvoiceData) => {
    const itemsHtml = data.items
      .map(
        (item) => `
      <tr>
        <td>${item.description}</td>
        <td>$${item.amount.toFixed(2)}</td>
      </tr>
    `
      )
      .join("");

    const total = data.items.reduce((sum, item) => sum + item.amount, 0);

    const newHtml = `
      <h1>Invoice</h1>
      <p><strong>Invoice Number:</strong> ${data.invoiceNumber}</p>
      <p><strong>Customer:</strong> ${data.customerName}</p>
      <p><strong>Email:</strong> ${data.customerEmail}</p>
      <p><strong>Due Date:</strong> ${data.dueDate}</p>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td><strong>Total</strong></td>
            <td><strong>$${total.toFixed(2)}</strong></td>
          </tr>
        </tfoot>
      </table>
    `;

    setHtml(newHtml);
    localStorage.setItem(`project_${id}_html`, newHtml);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Project: {projectName}</h1>
        <div className="flex items-center space-x-2">
          <AlertDialog
            open={showPublishDialog}
            onOpenChange={setShowPublishDialog}
          >
            <AlertDialogTrigger asChild>
              <div className="flex items-center space-x-2">
                <Switch
                  id="publish-mode"
                  checked={isPublished}
                  onCheckedChange={() => setShowPublishDialog(true)}
                />
                <Label htmlFor="publish-mode">
                  {isPublished ? "Published" : "Draft"}
                </Label>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {isPublished ? "Unpublish Project?" : "Publish Project?"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {isPublished
                    ? "This will make your project private and disable the API endpoint."
                    : "This will make your project public and enable the API endpoint."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handlePublishToggle(!isPublished)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        <div className="flex flex-col space-y-4">
          <Tabs defaultValue="editor" className="flex-1 flex flex-col">
            <TabsList>
              <TabsTrigger value="editor">HTML Editor</TabsTrigger>
              <TabsTrigger value="form">Invoice Form</TabsTrigger>
            </TabsList>
            <TabsContent value="editor" className="flex-1">
              <div className="h-full border rounded-lg overflow-hidden">
                <CodeMirror
                  value={html}
                  maxHeight="20%"
                  onChange={handleHtmlChange}
                  theme={tokyoNightStorm}
                  extensions={[htmlLanguage]}
                  basicSetup={{
                    lineNumbers: true,
                    highlightActiveLineGutter: true,
                    highlightSpecialChars: true,
                    history: true,
                    foldGutter: true,
                    drawSelection: true,
                    dropCursor: true,
                    allowMultipleSelections: true,
                    indentOnInput: true,
                    syntaxHighlighting: true,
                    bracketMatching: true,
                    closeBrackets: true,
                    autocompletion: true,
                    rectangularSelection: true,
                    crosshairCursor: true,
                    highlightActiveLine: true,
                    highlightSelectionMatches: true,
                    closeBracketsKeymap: true,
                    defaultKeymap: true,
                    searchKeymap: true,
                    historyKeymap: true,
                    foldKeymap: true,
                    completionKeymap: true,
                    lintKeymap: true,
                  }}
                />
              </div>
            </TabsContent>
            <TabsContent value="form" className="flex-1">
              <div className="h-full border rounded-lg overflow-auto p-4">
                <InvoiceDataForm onSubmit={generateInvoiceHtml} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="border rounded-lg p-4 overflow-auto">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          {isPublished && (
            <div className="border rounded-lg p-4">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  {languages.map((lang) => (
                    <TabsTrigger key={lang} value={lang} defaultValue="curl">
                      {lang.toUpperCase()}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {languages.map((lang) => (
                  <TabsContent key={lang} value={lang}>
                    <div className="relative">
                      <pre className="p-4 bg-muted rounded-md overflow-x-auto">
                        <code>{getCodeSnippet(lang)}</code>
                      </pre>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(getCodeSnippet(lang))}
                      >
                        Copy
                      </Button>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
