"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon } from "lucide-react";

type Session = {
  user: {
    id: string;
    name: string;
    email: string;
  };
};

type HistoryItem = {
  id: string;
  base64: string;
};

export default function CreatePage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // check session client-side
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/session");
        const data = await res.json();

        if (!data) {
          router.push("/auth/signup");
        } else {
          setSession(data);
        }
      } catch (err) {
        console.error("Error fetching session:", err);
        router.push("/auth/signup");
      }
    };

    checkSession();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (preview) URL.revokeObjectURL(preview);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setGeneratedImage(null);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setGeneratedImage(data.generatedImage);
        setHistory((prev) => [
          ...prev,
          { id: crypto.randomUUID(), base64: data.generatedImage },
        ]);
      }
    } catch (err: any) {
      setError("Something went wrong while generating image.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Rome wasn't built in a day...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 flex-1 flex flex-col max-w-7xl mx-auto w-full">
        <h1 className="text-4xl font-bold mb-6">
          Welcome, {session.user.name}!
        </h1>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Upload & Prompt */}
          <Card>
            <CardHeader>
              <CardTitle>Image Upload</CardTitle>
            </CardHeader>
            <CardContent>
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mb-4 rounded-xl max-h-64 object-cover"
                />
              )}
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                />
                <Textarea name="prompt" className="mt-2" />
                <Button
                  type="submit"
                  className="mt-4 w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Generating..." : "Generate"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Generated Image */}
          <Card>
            <CardHeader>
              <CardTitle>AI Generated Image</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <div className="p-4 border rounded-xl flex-1 flex items-center justify-center">
                {generatedImage ? (
                  <div>
                    <img
                      src={generatedImage}
                      alt="Generated"
                      className="mb-4 rounded-xl max-h-64 object-cover"
                    />
                    <a
                      href={generatedImage}
                      download={`generated-image-${Date.now()}.png`}
                      className={buttonVariants({ variant: "outline" })}
                    >
                      Download
                    </a>
                  </div>
                ) : isSubmitting ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  <div>No image generated yet</div>
                )}
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-6 p-4 border rounded-xl grid grid-cols-2 md:grid-cols-5 gap-4">
            {history.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <img
                    src={item.base64}
                    alt="Generated history"
                    className="rounded-xl"
                  />
                </CardHeader>
                <CardContent>
                  <a
                    href={item.base64}
                    download={`generated-image-${Date.now()}.png`}
                    className={buttonVariants({ variant: "outline" })}
                  >
                    Download
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
