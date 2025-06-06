import { Menu, Workflow, X } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"

export default function NavigationBar({
    isMenuOpen, 
    setIsMenuOpen
    }: {
    isMenuOpen: boolean, 
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
        return (
        <nav className="relative z-50 bg-black/20 backdrop-blur-md border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Workflow className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">TaskChain</span>
                    </div>
        
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/sign-in">
                            <Button variant="ghost" className="text-gray-300 hover:cursor-pointer">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:cursor-pointer">
                                Get Started
                            </Button>
                        </Link>
                    </div>
        
                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
        
                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-800">
                        <div className="flex flex-col space-y-4">
                            <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
                                Features
                            </Link>
                            <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                                Pricing
                            </Link>
                            <Link href="#testimonials" className="text-gray-300 hover:text-white transition-colors">
                                Testimonials
                            </Link>
                            <Link href="/sign-in">
                                <Button variant="ghost" className="text-gray-300 hover:text-white w-full justify-start">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/sign-up">
                                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 w-full">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}