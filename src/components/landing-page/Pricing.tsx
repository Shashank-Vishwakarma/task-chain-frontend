import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Plan {
    plan: string
    price: string
    title: string
    features: string[]
}

const plans: Plan[] = [
    {
        plan: "Starter",
        price: "Free",
        title: "Perfect for getting started",
        features: [
            "100 Credits",
            "Basic Nodes Only",
            "Low Processing Priority"
        ]
    },
    {
        plan: "Pro",
        price: "$10",
        title: "For growing businesses",
        features: [
            "1000 Credits",
            "Roll-Over Of Unused Credits",
            "Premium AI features",
            "Basic + Standard Nodes",
            "Medium Processing Priority",
            "Advanced analytics"
        ]
    },
    {
        plan: "Business",
        price: "$25",
        title: "For scaling teams",
        features: [
            "3000 Credits",
            "Roll-Over Of Unused Credits",
            "Premium AI features",
            "All Nodes",
            "High Processing Priority",
            "Advanced analytics",
            "24/7 Support"
        ]
    }
]

export default function PricingSection() {
    return (
        <section id="pricing" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Choose the perfect plan for your automation needs. Start free and scale as you grow.
                    </p>
                </div>
    
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, i)=>(
                        <Card key={i} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm relative">
                            {plan.plan === "Pro" && (
                                    <div className="absolute -top-4 left-1/3 transform -translate-x-1/2">
                                        <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1">
                                            Most Popular
                                        </Badge>
                                    </div>
                                )
                            }
                            <CardContent className="p-8">
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-white mb-2">{plan.plan}</h3>
                                    <div className="mb-4">
                                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                                        {(plan.plan !== "Starter") && <span className="text-gray-300 ml-2">/month</span>}
                                    </div>
                                    <p className="text-gray-300">{plan.title}</p>
                                </div>
                
                                <div className="space-y-4 mb-8">
                                    {plan.features.map((feature, idx)=>(
                                        <div key={idx} className="flex items-center">
                                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="text-gray-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}