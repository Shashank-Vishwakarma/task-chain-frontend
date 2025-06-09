"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import { useMutation } from "@tanstack/react-query"
import { googleAuthAction, GoogleAuthProps } from "@/actions/auth"

const signUpFormSchema = z.object({
    name: z.string({message: "name is required"}).min(1),
    email: z.string({message: "email is required"}).email(),
    password: z.string({message: "password is required"}).min(6),
    confirm_password: z.string({message: "confirm_password is required"}).min(6),
}).superRefine(({password, confirm_password}, ctx)=>{
    if(password !== confirm_password) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match",
            path: ["confirm_password"],
        });
    }
})

export function RegisterPage() {
    const [showOtpVerification, setShowOtpVerification] = useState(false)
    const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""])

    const form = useForm<z.infer<typeof signUpFormSchema>>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirm_password: ""
        }
    })

    const { mutate: signUpWithGoogle } = useMutation({
        mutationFn: googleAuthAction,
        onSuccess: (data) => {
            console.log("data: ", data)
        },
        onError: (error) => {
            console.log("Google SignUp Error: ", error)
        }
    })

    const handleOTPInputChange = (index: number, newValue: string) => {
        setOtpInputs((prevInputs) => (
            prevInputs.map((inputValue, i)=>(
                i===index ? newValue : inputValue
            ))
        ))
    }

    const handleSignUpWithFields = async (values: z.infer<typeof signUpFormSchema>) => {
        console.log(values)
    }

    if (showOtpVerification) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1 flex flex-col justify-center items-center">
                        <div className="flex items-center space-x-2">
                            <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
                        </div>
                        <CardDescription className="text-center">
                            We've sent a 6-digit verification code to {" "}
                            <span className="text-sm font-bold">
                                {form.getValues("email") == "" ? "shashank@gmail.com" : form.getValues("email")}
                            </span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-center space-x-2">
                                {[0, 1, 2, 3, 4, 5].map((_, index) => (
                                    <Input
                                        key={index}
                                        className="w-12 h-12 text-center"
                                        type="text"
                                        value={otpInputs[index]}
                                        onChange={(e) => handleOTPInputChange(index, e.target.value)}
                                    />
                                ))}
                            </div>
                            <Button className="w-full hover:cursor-pointer">
                                Verify Email
                            </Button>
                            <div className="text-center">
                                <Button variant="link" className="text-sm hover:cursor-pointer">
                                    Resend verification code
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Create your account</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className="space-y-4" onSubmit={form.handleSubmit(handleSignUpWithFields)}>
                            <div className="space-y-2">
                                <FormField
                                    name="name"
                                    control={form.control}
                                    render={({ field })=>(
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                            <Input 
                                                placeholder="Enter your name"
                                                {...field}
                                            />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <FormField
                                    name="email"
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
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
                                                <Input
                                                    placeholder="**************"
                                                    type="password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <FormField
                                    name="confirm_password"
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="**************"
                                                    type="password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className="w-full hover:cursor-pointer">
                                {form.formState.isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {"Creating account..."}
                                    </>
                                ) : "Create account"}
                            </Button>
                        </form>
                    </Form>

                    <Separator className="my-4" />

                    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
                        <GoogleLogin
                            onSuccess={(credentialResponse: CredentialResponse) => {
                                signUpWithGoogle({credential: credentialResponse.credential, clientId: credentialResponse.clientId} as GoogleAuthProps)
                            }} 
                            onError={()=>{
                                console.log("Google Login Failed")
                            }} 
                        />
                    </GoogleOAuthProvider>
                </CardContent>
                <CardFooter>
                    <p className="text-center text-sm text-gray-600 w-full">
                        Already have an account?{" "}
                        <Link href="/sign-in" className="text-blue-600 hover:text-blue-500 hover:underline">
                            Sign In
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default RegisterPage
