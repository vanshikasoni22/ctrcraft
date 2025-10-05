"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2Icon, ImageIcon, CreditCardIcon, CalendarIcon, SparklesIcon } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";

type UserData = {
  name: string;
  email: string;
  credits: number;
  thumbnails: {
    id: string;
    prompt: string;
    imageUrl: string;
    createdAt: string;
  }[];
};

export default function DashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSessionAndFetchData = async () => {
      try {
        // Check session
        const sessionRes = await fetch("/api/session");
        const sessionData = await sessionRes.json();

        if (!sessionData?.user?.id) {
          router.push("/auth/signin");
          return;
        }

        // Fetch user data with thumbnails
        const userRes = await fetch(`/api/user/${sessionData.user.id}`);
        if (!userRes.ok) throw new Error("Failed to fetch user data");
        
        const data = await userRes.json();
        setUserData(data);
      } catch (err) {
        console.error("Error:", err);
        router.push("/auth/signin");
      } finally {
        setIsLoading(false);
      }
    };

    checkSessionAndFetchData();
  }, [router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#f5f5dc] flex items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-4">
          <Loader2Icon className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-slate-600 font-poppins">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen w-full bg-[#f5f5dc] flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-slate-600 font-poppins mb-4">Failed to load dashboard</p>
          <Button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-700">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const totalCreditsUsed = userData.thumbnails.length * 10;

  return (
    <div className="min-h-screen w-full bg-[#f5f5dc] pt-20">
      {/* Background Gradient Animation */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-800 mb-2 font-poppins">
            Welcome, {userData.name}! 👋
          </h1>
          <p className="text-slate-600 text-lg font-poppins">
            Here's your AI thumbnail generation activity
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Credits Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-700 font-poppins">
                  Available Credits
                </CardTitle>
                <CreditCardIcon className="h-5 w-5 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 font-poppins">
                  {userData.credits}
                </div>
                <p className="text-xs text-slate-500 mt-1 font-poppins">
                  Each generation uses 10 credits
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Total Generations Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-700 font-poppins">
                  Total Generations
                </CardTitle>
                <ImageIcon className="h-5 w-5 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 font-poppins">
                  {userData.thumbnails.length}
                </div>
                <p className="text-xs text-slate-500 mt-1 font-poppins">
                  All-time thumbnail count
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Credits Used Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-700 font-poppins">
                  Credits Used
                </CardTitle>
                <SparklesIcon className="h-5 w-5 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 font-poppins">
                  {totalCreditsUsed}
                </div>
                <p className="text-xs text-slate-500 mt-1 font-poppins">
                  Total credits spent
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Generation History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-800 flex items-center gap-2 font-poppins">
                <CalendarIcon className="h-5 w-5" />
                Generation History
              </CardTitle>
              <CardDescription className="text-slate-600 font-poppins">
                Your recent AI thumbnail generations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {userData.thumbnails.length === 0 ? (
                <div className="text-center py-12">
                  <ImageIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 text-lg mb-2 font-poppins">
                    No thumbnails yet
                  </p>
                  <p className="text-slate-500 text-sm mb-4 font-poppins">
                    Create your first AI-generated thumbnail to see it here
                  </p>
                  <Button 
                    onClick={() => router.push("/create")}
                    className="bg-blue-600 hover:bg-blue-700 font-poppins"
                  >
                    <SparklesIcon className="h-4 w-4 mr-2" />
                    Create Thumbnail
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userData.thumbnails.map((thumbnail, index) => (
                    <motion.div
                      key={thumbnail.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="group relative rounded-xl overflow-hidden bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300"
                    >
                      {/* Thumbnail Image */}
                      <div className="aspect-video relative overflow-hidden bg-slate-100">
                        <Image
                          src={thumbnail.imageUrl}
                          alt={thumbnail.prompt}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Thumbnail Info */}
                      <div className="p-4">
                        <p className="text-slate-800 font-medium text-sm line-clamp-2 mb-2 font-poppins">
                          {thumbnail.prompt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-slate-500 font-poppins">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            {formatDate(thumbnail.createdAt)}
                          </span>
                          <span className="flex items-center gap-1 text-blue-600 font-medium">
                            <CreditCardIcon className="h-3 w-3" />
                            10 credits
                          </span>
                        </div>
                      </div>

                      {/* Hover Actions */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          size="sm"
                          className="bg-white/90 hover:bg-white text-slate-800 shadow-lg font-poppins"
                        >
                          Download
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 flex justify-center"
        >
          <Button
            size="lg"
            onClick={() => router.push("/create")}
            className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 font-poppins"
          >
            <SparklesIcon className="h-5 w-5 mr-2" />
            Create New Thumbnail
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
