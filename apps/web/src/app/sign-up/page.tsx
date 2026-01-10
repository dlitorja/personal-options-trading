"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { authClient } from "@/lib/auth-client";
import { signUpSchema } from "@/lib/auth-schemas";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validators: {
      onBlur: signUpSchema
    },
    onSubmit: async ({ value }) => {
      setError("");
      setIsLoading(true);
      try {
        await authClient.signUp.email({
          email: value.email,
          password: value.password,
          name: value.name,
          callbackURL: "/",
        });
      } catch (err) {
        setError("Failed to create account");
      } finally {
        setIsLoading(false);
      }
    }
  });

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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            {error && (
              <div className="bg-destructive/10 border-2 border-destructive/20 text-destructive px-4 py-3 rounded-lg" role="alert" aria-live="assertive">
                {error}
              </div>
            )}
            <form.Field
              name="name"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="text-base font-medium">Full name</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`h-11 ${
                      field.state.meta.isTouched && field.state.meta.errors.length ? "border-destructive" : ""
                    }`}
                  />
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <div className="text-destructive text-sm font-medium">
                      {field.state.meta.errors.map((err) => err?.message).join(', ')}
                    </div>
                  )}
                </div>
              )}
            />
            <form.Field
              name="email"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="text-base font-medium">Email</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`h-11 ${
                      field.state.meta.isTouched && field.state.meta.errors.length ? "border-destructive" : ""
                    }`}
                  />
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <div className="text-destructive text-sm font-medium">
                      {field.state.meta.errors.map((err) => err?.message).join(', ')}
                    </div>
                  )}
                </div>
              )}
            />
            <form.Field
              name="password"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="text-base font-medium">Password</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    autoComplete="new-password"
                    placeholder="Password (min 8 characters)"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`h-11 ${
                      field.state.meta.isTouched && field.state.meta.errors.length > 0 ? "border-destructive" : ""
                    }`}
                  />
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <div className="text-destructive text-sm font-medium">
                      {field.state.meta.errors.map((err) => err?.message).join(', ')}
                    </div>
                  )}
                </div>
              )}
            />
            <form.Field
              name="confirmPassword"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="text-base font-medium">Confirm password</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    autoComplete="new-password"
                    placeholder="Confirm your password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`h-11 ${
                      field.state.meta.isTouched && field.state.meta.errors.length ? "border-destructive" : ""
                    }`}
                  />
                  {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
                    <div className="text-destructive text-sm font-medium">
                      {field.state.meta.errors.map((err) => err?.message).join(', ')}
                    </div>
                  )}
                </div>
              )}
            />
            <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Sign up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
