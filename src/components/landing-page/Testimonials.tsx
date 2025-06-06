import { useState } from "react"
import { Card, CardContent } from "../ui/card"
import { ChevronLeft, ChevronRight, Star, User } from "lucide-react"
import { Button } from "../ui/button"

const testimonials = [
    {
        name: "Sarah Chen",
        role: "Operations Director",
        company: "TechFlow Inc.",
        content:
        "TaskChain transformed our workflow automation. We've reduced manual tasks by 80% and our team can focus on strategic work.",
        rating: 5,
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        name: "Marcus Rodriguez",
        role: "CEO",
        company: "StartupLab",
        content:
        "The AI-powered automation is incredible. TaskChain helped us scale our operations without hiring additional staff.",
        rating: 5,
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        name: "Emily Watson",
        role: "Product Manager",
        company: "InnovateCorp",
        content:
        "Building complex workflows is now as simple as drag and drop. TaskChain's AI suggestions are spot-on every time.",
        rating: 5,
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        name: "David Kim",
        role: "CTO",
        company: "DataDriven Solutions",
        content:
        "We've automated our entire customer onboarding process. TaskChain pays for itself within the first month.",
        rating: 5,
        avatar: "/placeholder.svg?height=40&width=40",
    },
]

export default function TestimonialSection() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0)

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    return (
        <section id="testimonials" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Loved by Teams Worldwide</h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">See what our customers are saying about TaskChain</p>
                </div>
    
                <div className="relative max-w-4xl mx-auto">
                    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                        <CardContent className="p-8">
                            <div className="flex items-center mb-4">
                                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
            
                            <blockquote className="text-xl md:text-2xl text-gray-200 mb-6 leading-relaxed">
                                "{testimonials[currentTestimonial].content}"
                            </blockquote>
            
                            <div className="flex items-center">
                                <div>
                                    <User className="w-12 h-12 rounded-full mr-4 p-1 bg-gradient-to-r from-indigo-500 to-blue-600" />
                                </div>
                                <div>
                                    <div className="font-semibold text-white">
                                        {testimonials[currentTestimonial].name}
                                    </div>
                                    <div className="text-gray-400">
                                        {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
    
                {/* Navigation buttons */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={prevTestimonial}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
        
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={nextTestimonial}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
        
                    {/* Dots indicator */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentTestimonial(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${
                                index === currentTestimonial ? "bg-blue-500" : "bg-gray-600"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}