"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { getCurrentUser } from "@/lib/api/auth"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
})

const securityFormSchema = z
  .object({
    currentPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
    newPassword: z.string()
      .min(6, { message: "Password must be at least 6 characters." })
      .refine((val) => /[0-9]/.test(val), "Password must contain at least one number")
      .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), "Password must contain at least one special character"),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  const router = useRouter()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser()
        setUser(data)
      } catch (error) {
        console.error('Error fetching user:', error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load user data",
        })
      }
    }

    fetchUser()
  }, [])

  const profileForm = useForm({
    resolver: zodResolver(profileFormSchema),
    values: {
      name: user?.user_metadata?.name || "",
      email: user?.email || "",
    }
  })

  const securityForm = useForm({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  async function onSecuritySubmit(data) {
    setIsLoading(true)
    try {
      // First verify current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email,
        password: data.currentPassword,
      })

      if (signInError) {
        throw new Error("Current password is incorrect")
      }

      // If current password is correct, update to new password
      const { error: updateError } = await supabase.auth.updateUser({
        password: data.newPassword,
      })

      if (updateError) {
        throw updateError
      }

      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
        variant: "success",
      })

      securityForm.reset()
      router.push("/auth/login")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Password Change Failed",
        description: error.message || "An error occurred while changing your password",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>View your profile information.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form className="space-y-4">
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Change your password.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...securityForm}>
                <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-4">
                  <FormField
                    control={securityForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={securityForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={securityForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="bg-[#1976d2] hover:bg-[#115293]">
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                        <span>Changing Password...</span>
                      </div>
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <div className="text-sm text-muted-foreground">
                <p>Password requirements:</p>
                <ul className="list-disc pl-4">
                  <li>At least 6 characters long</li>
                  <li>Include at least one number</li>
                  <li>Include at least one special character</li>
                </ul>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}