"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, X, Loader2, ImagePlus, FileIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["social_media", "marketing_campaign", "email", "other"]),
  subcategory: z.enum([
    "local_highlight",
    "persona_builder",
    "real_estate",
    "other",
  ]),
  tags: z.string().transform((str) =>
    str
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  ),
  keywords: z.string().transform((str) =>
    str
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  ),
  categories: z.string().transform((str) =>
    str
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  ),
  language: z.string().min(1, "Language is required"),
  source: z.string().optional(),
});

export function UploadForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{
    file: File;
    preview: string;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "social_media",
      subcategory: "real_estate",
      tags: [],
      keywords: [],
      categories: [],
      language: "English",
      source: "",
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    // Create preview URL
    const preview = URL.createObjectURL(file);
    setUploadedFile({ file, preview });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    const preview = URL.createObjectURL(file);
    setUploadedFile({ file, preview });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (!uploadedFile) return;

      // First, upload the file to Cloudinary
      const formData = new FormData();
      formData.append("file", uploadedFile.file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadResponse.json();
      if (!uploadResponse.ok)
        throw new Error(uploadData.message || "Upload failed");

      // Then create the asset with the Cloudinary URL
      const response = await fetch("/api/admin/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          fileUrl: uploadData.secure_url,
          metadata: {
            type: values.type,
            subcategory: values.subcategory,
            tags: values.tags,
            keywords: values.keywords,
            categories: values.categories,
            language: values.language,
            source: values.source,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create asset");
      }

      router.push("/admin/resources");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create asset. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };



      // file size in mb
      const fileSizeinMB = (fileSize: number) => {
        return (fileSize / 1024 / 1024).toFixed(2);
      };

  return (
    <div className="max-w-3xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* File Upload */}
          <div className="space-y-2">
            <FormLabel>File</FormLabel>
            <div
              className="w-full"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*,application/pdf"
                className="hidden"
                onChange={handleFileSelect}
              />

              {uploadedFile ? (
                <div className="relative w-full h-full max-w-96 aspect-video mb-4">
                  {uploadedFile.file.type.startsWith("image/") ? (
                    <Image
                      src={uploadedFile.preview}
                      alt="Preview"
                      fill
                      className="object-contain rounded-lg border"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center border rounded-lg py-12">
                      <FileIcon className="w-16 h-16 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground truncate max-w-[200px] ">
                        {uploadedFile.file.name}
                        <br />
                        {uploadedFile.file.type}
                        <br />
                        {fileSizeinMB(uploadedFile.file.size)} MB
                      </p>
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 rounded-full flex items-center justify-center"
                    onClick={() => {
                      setUploadedFile(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-32 flex flex-col gap-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-8 h-8" />
                  <span>Click to upload or drag and drop</span>
                  <span className="text-xs text-muted-foreground">
                    Supports images, videos, and PDFs up to 10MB
                  </span>
                </Button>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter asset title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter asset description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="social_media">Social Media</SelectItem>
                      <SelectItem value="marketing_campaign">
                        Marketing Campaign
                      </SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subcategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcategory</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="local_highlight">
                        Local Highlight
                      </SelectItem>
                      <SelectItem value="persona_builder">
                        Persona Builder
                      </SelectItem>
                      <SelectItem value="real_estate">Real Estate</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Tags and Keywords */}
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (comma-separated)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="real estate, marketing, social media"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keywords (comma-separated)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="property, home, real estate"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories (comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="marketing, templates" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={!uploadedFile || !form.formState.isValid || isLoading}
            className="w-full"
          >
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Create Asset
          </Button>
        </form>
      </Form>
    </div>
  );
}
