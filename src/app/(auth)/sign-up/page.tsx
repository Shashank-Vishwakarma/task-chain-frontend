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

    const handleOTPInputChange = (index: number, newValue: string) => {
        setOtpInputs((prevInputs) => (
            prevInputs.map((inputValue, i)=>(
                i===index ? newValue : inputValue
            ))
        ))
    }

    const onSignUpFormSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Create your account</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className="space-y-4" onSubmit={form.handleSubmit(onSignUpFormSubmit)}>
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

                    <div className="mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full hover:cursor-pointer"
                        >
                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                            </svg>
                            Continue with Google
                        </Button>
                    </div>
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
