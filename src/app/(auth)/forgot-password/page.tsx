"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const forgotPasswordFormSchema = z.object({
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

function ForgotPasswordPage() {
    const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
        resolver: zodResolver(forgotPasswordFormSchema),
        defaultValues: {
            email: "",
            password: "",
            confirm_password: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof forgotPasswordFormSchema>) => {
        console.log(values)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <div className="flex items-center space-x-2">
                        <Link href="/sign-in">
                            <Button variant="ghost" size="sm" className="p-0 h-auto">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <CardTitle className="text-2xl font-bold">Reset your password</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                                                    type="email"
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
                                            <FormLabel>New Password</FormLabel>
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
                                            <FormLabel>Confirm New Password</FormLabel>
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
                                {form.formState.isSubmitting ? "Resetting Password..." : "Reset Password"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    <p className="text-center text-sm text-gray-600 w-full">
                        Remember your password?{" "}
                        <Link href="/sign-in" className="text-blue-600 hover:text-blue-500 hover:underline">
                            Sign In
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ForgotPasswordPage
