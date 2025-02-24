"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Upload,
  X,
  Loader2,
  ImagePlus,
  FileIcon,
  Link as LinkIcon,
} from "lucide-react";
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
  FormDescription,
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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

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
  isFree: z.boolean().default(false),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  createdOn: z.string().min(1, "Creation platform is required"),
  editUrl: z.string().url("Must be a valid URL"),
});

export function UploadForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mainFile, setMainFile] = useState<{
    file: File;
    preview: string;
  } | null>(null);
  const [thumbnail, setThumbnail] = useState<{
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
      isFree: false,
      status: "draft",
      createdOn: "",
      editUrl: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      if (!mainFile || !thumbnail) {
        throw new Error("Please upload both main file and thumbnail");
      }

      // Upload main file to Cloudinary
      const mainFileData = new FormData();
      mainFileData.append("file", mainFile.file);
      mainFileData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const mainFileRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/raw/upload`,
        {
          method: "POST",
          body: mainFileData,
        }
      );

      const mainFileJson = await mainFileRes.json();

      // Upload thumbnail to Cloudinary
      const thumbnailData = new FormData();
      thumbnailData.append("file", thumbnail.file);
      thumbnailData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const thumbnailRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: thumbnailData,
        }
      );

      const thumbnailJson = await thumbnailRes.json();

      // Create asset
      const response = await fetch("/api/admin/assets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          fileUrl: mainFileJson.secure_url,
          thumbnailUrl: thumbnailJson.secure_url,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create asset");
      }

      router.push("/admin/resources");
      router.refresh();
    } catch (error) {
      console.error("Error creating asset:", error);
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* File Upload Section */}
          <div className="grid grid-cols-2 gap-8">
            {/* Main File Upload */}
            <div className="space-y-4">
              <h3 className="font-medium">Main File</h3>
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 hover:border-primary/50 transition-colors",
                  "flex flex-col items-center justify-center gap-4 cursor-pointer",
                  mainFile ? "border-primary" : "border-muted"
                )}
                onClick={() => fileInputRef.current?.click()}
              >
                {mainFile ? (
                  <>
                    <FileIcon className="w-10 h-10 text-primary" />
                    <p className="text-sm text-muted-foreground">
                      {mainFile.file.name}
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMainFile(null);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload main file
                    </p>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setMainFile({
                      file,
                      preview: URL.createObjectURL(file),
                    });
                  }
                }}
              />
            </div>

            {/* Thumbnail Upload */}
            <div className="space-y-4">
              <h3 className="font-medium">Thumbnail</h3>
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 hover:border-primary/50 transition-colors",
                  "flex flex-col items-center justify-center gap-4 cursor-pointer",
                  thumbnail ? "border-primary" : "border-muted"
                )}
                onClick={() => thumbnailInputRef.current?.click()}
              >
                {thumbnail ? (
                  <div className="relative w-full aspect-video">
                    <Image
                      src={thumbnail.preview}
                      alt="Thumbnail preview"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setThumbnail(null);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <ImagePlus className="w-10 h-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload thumbnail
                    </p>
                  </>
                )}
              </div>
              <input
                ref={thumbnailInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setThumbnail({
                      file,
                      preview: URL.createObjectURL(file),
                    });
                  }
                }}
              />
            </div>
          </div>

          <Separator />

          {/* Basic Info */}
          <div className="space-y-4">
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
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Metadata Section */}
          <div>
            <h3 className="text-lg font-medium mb-4">Metadata</h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
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
                          <SelectItem value="social_media">
                            Social Media
                          </SelectItem>
                          <SelectItem value="marketing_campaign">
                            Marketing Campaign
                          </SelectItem>
                          <SelectItem value="email">Email Template</SelectItem>
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
                          <SelectItem value="real_estate">
                            Real Estate
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter tags (comma separated)"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Add relevant tags separated by commas
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Keywords</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter keywords (comma separated)"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Add search keywords separated by commas
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categories</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter categories (comma separated)"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Add categories separated by commas
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Asset Settings */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="isFree"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <div>
                      <FormLabel>Free Resource</FormLabel>
                      <FormDescription>
                        Make this asset available for free
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="createdOn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Created On</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Canva, Photoshop" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="editUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Edit URL</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="https://..." {...field} />
                        <LinkIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., English" {...field} />
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
                    <Input placeholder="Original source if any" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={
              !mainFile || !thumbnail || !form.formState.isValid || isLoading
            }
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
