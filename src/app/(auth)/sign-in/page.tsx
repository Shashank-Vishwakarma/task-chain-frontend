"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import { useMutation } from "@tanstack/react-query"
import { googleAuthAction, GoogleAuthProps } from "@/actions/auth"

const loginFormSchema = z.object({
    email: z.string({message: "email is required"}).email(),
    password: z.string({message: "password is required"}).min(6),
})

export function LoginPage() {
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const { mutate } = useMutation({
        mutationFn: googleAuthAction,
        onSuccess: (data) => {
            console.log("data: ", data)
        },
        onError: (error) => {
            console.log("Google Login Error: ", error)
        }
    })

    const handleLoginWithEmailAndPassword = async (values: z.infer<typeof loginFormSchema>) => {
        console.log(values)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Sign in to your account</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className="space-y-4" onSubmit={form.handleSubmit(handleLoginWithEmailAndPassword)}>
                            <div className="space-y-2">
                                <FormField
                                    name="email"
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your email" {...field} type="email" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <FormField
                                    name="password"
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="************" {...field} type="password" />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex items-center justify-end">
                                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500 hover:underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <Button type="submit" className="w-full hover:cursor-pointer">
                                {form.formState.isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {"Signing in..."}
                                    </>
                                ) : "Sign In"}
                            </Button>
                        </form>
                    </Form>

                    <Separator className="my-4" />

                    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
                        <GoogleLogin
                            onSuccess={(credentialResponse: CredentialResponse) => {
                                mutate({credential: credentialResponse.credential, clientId: credentialResponse.clientId} as GoogleAuthProps)
                            }} 
                            onError={()=>{
                                console.log("Google Login Failed")
                            }} 
                        />
                    </GoogleOAuthProvider>
                </CardContent>
                <CardFooter>
                    <p className="text-center text-sm text-gray-600 w-full">
                        {"Don't have an account? "}
                        <Link href="/sign-up" className="text-blue-600 hover:text-blue-500 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default LoginPage
