"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: "/",
    });

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-primary/5 to-background relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-md border-2 shadow-2xl relative z-10">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">Create your account</CardTitle>
          <CardDescription className="text-base">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSignUp}>
            {error && (
              <div className="bg-destructive/10 border-2 border-destructive/20 text-destructive px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-medium">Full name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-medium">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Password (min 8 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-base font-medium">Confirm password</Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-11"
              />
            </div>
            <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Sign up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
