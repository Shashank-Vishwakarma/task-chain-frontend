import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
    Zap,
    Bot,
    Workflow,
} from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
    {
        name: "AI-Powered Builder",
        description: "Let AI suggest optimal workflows and automatically optimize your processes for maximum efficiency.",
        icon: Bot,
        color: "from-blue-500 to-purple-600"
    },
    {
        name: "Drag & Drop Interface",
        description: "Build complex workflows visually with our intuitive drag-and-drop interface. No coding required.",
        icon: Workflow,
        color: "from-green-500 to-teal-600"
    },
    {
        name: "Lightning Fast",
        description: "Execute workflows in milliseconds with our optimized infrastructure and intelligent caching.",
        icon: Zap,
        color: "from-orange-500 to-red-600"
    }
]

export default function FeaturesSection() {
    return (
        <section id="features" className="py-20 bg-gradient-to-r from-gray-900/50 to-black/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Powerful Features for Modern Teams</h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Everything you need to automate, optimize, and scale your business processes
                    </p>
                </div>
    
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <Card key={idx} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                            <CardContent className="p-6">
                                <div className={cn("w-12 h-12 bg-gradient-to-r rounded-lg flex items-center justify-center mb-4", feature.color)}>
                                    {
                                        <feature.icon className="h-6 w-6 text-white"/>
                                    }
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {feature.name}
                                </h3>
                                <p className="text-gray-300">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}