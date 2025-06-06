import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight, Clock, Users, Zap } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative py-20 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <Badge className="mb-6 bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-300 border-blue-500/30">
                🚀 AI-Powered Automation Platform
                </Badge>
    
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                    Automate Your Workflows with{" "}
                    <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        AI Intelligence
                    </span>
                </h1>
    
                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                    TaskChain is the ultimate AI workflow automation builder that transforms complex business processes into
                    simple, intelligent workflows. Build, deploy, and scale your automation in minutes, not months.
                </p>
    
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                    <Link href="/sign-up">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:cursor-pointer text-lg px-8 py-4"
                        >
                            Start Building Free
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
    
                <div className="flex items-center justify-center space-x-8 text-gray-400">
                    <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5" />
                        <span>10,000+ Users</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Zap className="h-5 w-5" />
                        <span>1M+ Workflows</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5" />
                        <span>99.9% Uptime</span>
                    </div>
                </div>
            </div>
        </section>
    )
}