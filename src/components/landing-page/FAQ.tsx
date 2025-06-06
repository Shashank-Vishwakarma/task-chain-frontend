import { Card, CardContent } from "../ui/card";

export default function FAQSection() {
    return (
        <div className="mt-20 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white text-center mb-8">
                Frequently Asked Questions
            </h3>
            <div className="space-y-6">
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <h4 className="text-lg font-semibold text-white mb-2">
                            Can I upgrade or downgrade my plan?
                        </h4>
                        <p className="text-gray-300">
                            Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll
                            prorate any billing differences.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}