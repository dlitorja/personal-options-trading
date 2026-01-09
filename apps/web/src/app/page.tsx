"use client";

import { useState, useEffect } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  if (session?.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="space-y-1">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground">
                    Welcome back, <span className="font-semibold text-foreground">{session.user.name}</span>!
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  <Button 
                    onClick={handleSignOut} 
                    variant="destructive" 
                    size="lg"
                    className="shadow-md hover:shadow-lg transition-shadow"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-2 shadow-md hover:shadow-lg transition-all duration-200 bg-card/95 backdrop-blur-sm">
                <CardHeader className="pb-4 px-6 pt-6">
                  <CardDescription className="text-xs font-semibold uppercase tracking-wider">Account Status</CardDescription>
                  <CardTitle className="text-2xl font-bold mt-2">
                    {session.user.emailVerified ? (
                      <span className="text-green-600 dark:text-green-400">Active</span>
                    ) : (
                      <span className="text-yellow-600 dark:text-yellow-400">Pending</span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${session.user.emailVerified ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></div>
                    <p className="text-sm text-muted-foreground">
                      {session.user.emailVerified ? 'Email verified' : 'Email verification pending'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 shadow-md hover:shadow-lg transition-all duration-200 bg-card/95 backdrop-blur-sm">
                <CardHeader className="pb-4 px-6 pt-6">
                  <CardDescription className="text-xs font-semibold uppercase tracking-wider">Member Since</CardDescription>
                  <CardTitle className="text-2xl font-bold mt-2">
                    {session.user.createdAt ? new Date(session.user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <p className="text-sm text-muted-foreground">Your account details</p>
                </CardContent>
              </Card>

              <Card className="border-2 shadow-md hover:shadow-lg transition-all duration-200 bg-card/95 backdrop-blur-sm">
                <CardHeader className="pb-4 px-6 pt-6">
                  <CardDescription className="text-xs font-semibold uppercase tracking-wider">Account Type</CardDescription>
                  <CardTitle className="text-2xl font-bold mt-2">Standard</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <p className="text-sm text-muted-foreground">Full access enabled</p>
                </CardContent>
              </Card>
            </div>

            {/* Account Information Card */}
            <Card className="border-2 shadow-lg bg-card/95 backdrop-blur-sm">
              <CardHeader className="pb-6 px-6 pt-6">
                <CardTitle className="text-2xl font-bold">Account Information</CardTitle>
                <CardDescription className="text-base mt-2">
                  Manage your account settings and view your profile details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-6 pb-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-3 p-5 rounded-lg bg-muted/30 border border-border/50">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email Address</p>
                    <p className="text-base font-medium break-all mt-1">{session.user.email}</p>
                  </div>
                  <div className="space-y-3 p-5 rounded-lg bg-muted/30 border border-border/50">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">User ID</p>
                    <p className="text-sm text-muted-foreground font-mono break-all mt-1">{session.user.id}</p>
                  </div>
                  {session.user.emailVerified && (
                    <div className="space-y-3 p-5 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/50">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email Status</p>
                      <div className="inline-flex items-center gap-2 mt-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm"></div>
                        <p className="text-base font-semibold text-green-700 dark:text-green-400">Verified</p>
                      </div>
                    </div>
                  )}
                  {session.user.name && (
                    <div className="space-y-3 p-5 rounded-lg bg-muted/30 border border-border/50">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Display Name</p>
                      <p className="text-base font-medium mt-1">{session.user.name}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-2 shadow-md bg-card/95 backdrop-blur-sm">
              <CardHeader className="px-6 pt-6 pb-4">
                <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
                <CardDescription className="mt-1">
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Button variant="outline" className="h-auto py-5 px-5 flex flex-col items-start gap-2 border-2 hover:border-primary/50 transition-colors" disabled>
                    <span className="font-semibold">View Portfolio</span>
                    <span className="text-xs text-muted-foreground">Coming soon</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-5 px-5 flex flex-col items-start gap-2 border-2 hover:border-primary/50 transition-colors" disabled>
                    <span className="font-semibold">Trade Options</span>
                    <span className="text-xs text-muted-foreground">Coming soon</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-5 px-5 flex flex-col items-start gap-2 border-2 hover:border-primary/50 transition-colors" disabled>
                    <span className="font-semibold">Analytics</span>
                    <span className="text-xs text-muted-foreground">Coming soon</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
          <ThemeToggle />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Personal Options Trading
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                AI-powered options trading assistant that helps you make smarter decisions
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button size="lg" className="text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-shadow" asChild>
                <Link href="/sign-up">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto border-2" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">AI-Powered Analysis</CardTitle>
              <CardDescription className="text-base">
                Get intelligent insights and recommendations for your options trading strategies
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">Real-Time Data</CardTitle>
              <CardDescription className="text-base">
                Access up-to-date market data and make informed decisions quickly
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">Risk Management</CardTitle>
              <CardDescription className="text-base">
                Track and manage your positions with advanced risk analysis tools
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
