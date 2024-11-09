'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Github, Mail } from "lucide-react"

export default function SignUp() {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend for passwordless authentication
    console.log('Signing up with email:', email)
    // Redirect the user to the dashboard or another page
    router.push('/dashboard')
  }

  const handleGithubSignUp = () => {
    // Implement GitHub OAuth flow
    console.log('Signing up with GitHub')
    // Redirect the user to the GitHub OAuth flow
    window.location.href = '/api/auth/github'
  }

  const handleGoogleSignUp = () => {
    // Implement Google OAuth flow
    console.log('Signing up with Google')
    // Redirect the user to the Google OAuth flow
    window.location.href = '/api/auth/google'
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign up</CardTitle>
          <CardDescription>Choose your preferred sign up method</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button variant="outline" className="w-full" onClick={handleGithubSignUp}>
              <Github className="mr-2 h-4 w-4" />
              Sign up with GitHub
            </Button>
            <Button variant="outline" className="w-full" onClick={handleGoogleSignUp}>
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Sign up with Google
            </Button>
          </div>
          <Separator />
          <form onSubmit={handleEmailSignUp}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full mt-4">
              <Mail className="mr-2 h-4 w-4" />
              Sign up with Email
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center text-gray-600 mt-2">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
