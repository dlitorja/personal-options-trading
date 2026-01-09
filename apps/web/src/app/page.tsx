"use client";

import { useState, useEffect } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  if (session?.user) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Welcome, {session.user.name}!
        </p>
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Your Account</CardTitle>
            <CardDescription>
              Your account information and settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{session.user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">User ID</p>
                <p className="text-sm text-muted-foreground font-mono">{session.user.id}</p>
              </div>
              {session.user.emailVerified && (
                <div>
                  <p className="text-sm font-medium">Email Status</p>
                  <p className="text-sm text-green-600">Verified</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <div className="mt-6">
          <Button onClick={handleSignOut} variant="destructive">
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-4">Personal Options Trading</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Welcome to your AI-powered options trading assistant.
      </p>
      <div className="flex gap-4">
        <Link href="/sign-in">
          <Button variant="default">Sign In</Button>
        </Link>
        <Link href="/sign-up">
          <Button variant="secondary">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
}
