// Updated OnboardingPage.tsx redesigned to match Deel style
// Notes:
// - Updated colors to softer blue gradients
// - Added gradient shadows
// - Replaced MindLinksLogo with a temporary "M" icon box (you can swap with your real logo component)
// - Adjusted layout spacing to mimic Deel’s UI visual hierarchy

import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Building2,
    Users,
    Clock,
    CreditCard,
    Check,
    HelpCircle,
    ChevronDown,
    ChevronUp,
    Rocket,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface OnboardingTask {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    status: "done" | "not-started" | "in-progress";
    route?: string;
}

export const OnboardingPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedTask, setSelectedTask] = useState<string | null>(null);
    const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    // Check actual completion status from localStorage
    const companyOnboardingDone = localStorage.getItem("company_profile_onboarding_completed") === "true";
    const entityCreated = localStorage.getItem("entity_creation_completed") === "true";
    const entityVerified = localStorage.getItem("entity_verification_status") === "completed";

    // Listen for storage changes to update the page dynamically
    React.useEffect(() => {
        const handleStorageChange = () => {
            setRefreshKey(prev => prev + 1);
        };
        window.addEventListener('storage', handleStorageChange);
        // Also check on mount and when navigating back
        const interval = setInterval(() => {
            setRefreshKey(prev => prev + 1);
        }, 500);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    // Determine which task to select by default (first incomplete task)
    React.useEffect(() => {
        if (!companyOnboardingDone) {
            setSelectedTask("organization");
        } else if (!entityCreated) {
            setSelectedTask("entity");
        } else if (!entityVerified) {
            setSelectedTask("verification");
        } else {
            setSelectedTask("workers");
        }
    }, [companyOnboardingDone, entityCreated, entityVerified, refreshKey]);

    const tasks: OnboardingTask[] = [
        {
            id: "account",
            title: "Create your account",
            description: "Set up your MindLinks account",
            icon: Users,
            status: "done",
        },
        {
            id: "organization",
            title: "Tell us about your organization",
            description: "Complete your company profile",
            icon: Building2,
            status: companyOnboardingDone ? "done" : "not-started",
            route: "/company-profile-onboarding",
        },
        {
            id: "entity",
            title: "Tell us about your entity",
            description: "Set up your legal entity information",
            icon: Building2,
            status: entityCreated ? "done" : companyOnboardingDone ? "in-progress" : "not-started",
            route: "/entity-creation",
        },
        {
            id: "verification",
            title: "Verify your entity",
            description: "Complete entity verification",
            icon: Building2,
            status: entityVerified ? "done" : entityCreated ? "in-progress" : "not-started",
            route: "/entity-verification",
        },
        {
            id: "workers",
            title: "Add your workers",
            description: "Invite contractors to your team",
            icon: Users,
            status: "not-started",
            route: "/client-dashboard?page=contractors",
        },
        {
            id: "timeoff",
            title: "Select a time off policy",
            description: "Configure time off settings",
            icon: Clock,
            status: "not-started",
            route: "/client-dashboard?page=settings&tab=timeoff",
        },
        {
            id: "payment",
            title: "Add payment method",
            description: "Set up your payment preferences",
            icon: CreditCard,
            status: "not-started",
            route: "/client-dashboard?page=settings&tab=payment",
        },
    ];

    const completed = tasks.filter((t) => t.status === "done").length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;
    const progressPercentage = (completed / tasks.length) * 100;
    const organizationProgress = companyOnboardingDone && entityCreated ? 2 : companyOnboardingDone ? 1 : 0;

    const selectedTaskData = tasks.find((t) => t.id === selectedTask);
    const toggleFaq = (id: string) => setExpandedFaq(expandedFaq === id ? null : id);

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-[#F7F9FF] to-white p-6">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-[#A8C4FF] to-[#4A6CF7] text-white shadow-md">
                        <Rocket className="h-6 w-6" />
                    </div>
                    <h1 className="text-3xl font-semibold text-[#1A1F36]">Continue onboarding</h1>
                </div>
                <p className="text-sm text-gray-500 mb-6">
                    Get your account up and running to enjoy all our tools and features.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Progress Card */}
                    <Card className="bg-white border shadow-sm rounded-xl">
                        <CardContent className="p-6">
                            <h2 className="text-base font-semibold text-[#4A6CF7] mb-4">
                                Onboarding progress
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Overall progress</span>
                                    <span className="font-semibold text-gray-900">{Math.round(progressPercentage)}%</span>
                                </div>

                                <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progressPercentage}%` }}
                                        transition={{ duration: 1 }}
                                        className="h-full bg-gradient-to-r from-[#A8C4FF] to-[#4A6CF7] rounded-full shadow-[0_0_10px_rgba(74,108,247,0.5)]"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Organization Quick Tile */}
                    <Card className="bg-white border shadow-sm rounded-xl">
                        <CardContent className="p-6">
                            <h2 className="text-base font-semibold text-[#4A6CF7] mb-4">Organization</h2>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "p-2 rounded-lg text-white shadow-md",
                                        organizationProgress === 2 ? "bg-gradient-to-br from-emerald-500 to-emerald-600" : "bg-gradient-to-br from-[#A8C4FF] to-[#4A6CF7]"
                                    )}>
                                        {organizationProgress === 2 ? (
                                            <Check className="h-4 w-4" />
                                        ) : (
                                            <Clock className="h-4 w-4" />
                                        )}
                                    </div>
                                    <span className="text-sm font-medium text-gray-800">Set up basics</span>
                                </div>
                                <span className="text-sm text-gray-500">{organizationProgress}/2</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-8">
                    <Card className="bg-white rounded-xl border shadow-sm overflow-hidden">
                        <CardContent className="p-0">
                            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x">
                                {/* Left: Steps */}
                                <div className="p-6">
                                    <h2 className="text-base font-semibold text-[#4A6CF7] mb-2">Next steps</h2>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Complete the tasks below to unlock all features.
                                    </p>

                                    <div className="space-y-2">
                                        {tasks.map((task) => {
                                            const Icon = task.icon;
                                            const isSelected = selectedTask === task.id;
                                            const isDone = task.status === "done";
                                            const isInProgress = task.status === "in-progress";

                                            return (
                                                <div
                                                    key={task.id}
                                                    onClick={() => !isDone && setSelectedTask(task.id)}
                                                    className={cn(
                                                        "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                                                        isSelected
                                                            ? "bg-gradient-to-r from-[#EFF3FF] to-white border-[#4A6CF7]/40 shadow-md"
                                                            : "bg-white border-gray-200 hover:bg-gray-50"
                                                    )}
                                                >
                                                    <div
                                                        className={cn(
                                                            "p-2 rounded-full text-white shadow-md",
                                                            isDone
                                                                ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
                                                                : isInProgress
                                                                    ? "bg-gradient-to-br from-amber-500 to-amber-600"
                                                                    : "bg-gradient-to-br from-[#A8C4FF] to-[#4A6CF7]"
                                                        )}
                                                    >
                                                        {isDone ? (
                                                            <Check className="h-4 w-4" />
                                                        ) : (
                                                            <Icon className="h-4 w-4" />
                                                        )}
                                                    </div>

                                                    <div className="flex-1">
                                                        <span className="text-sm font-medium text-gray-800">{task.title}</span>
                                                    </div>

                                                    {isDone ? (
                                                        <div className="flex items-center gap-1.5">
                                                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                                            <span className="text-[10px] font-semibold text-emerald-600">DONE</span>
                                                        </div>
                                                    ) : isInProgress ? (
                                                        <div className="flex items-center gap-1.5">
                                                            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                                                            <span className="text-[10px] font-semibold text-amber-600">IN PROGRESS</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-1.5">
                                                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                                            <span className="text-[10px] font-semibold text-gray-500">NOT STARTED</span>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* FAQ */}
                                    <div className="mt-8 pt-6 border-t">
                                        <h3 className="text-sm font-semibold text-[#4A6CF7] flex items-center gap-2 mb-2">
                                            <HelpCircle className="h-4 w-4 text-[#4A6CF7]" /> FAQs
                                        </h3>

                                        {[
                                            {
                                                id: "1",
                                                q: "How long does onboarding take?",
                                                a: "Usually 10–15 minutes. You may complete it at your own pace.",
                                            },
                                            {
                                                id: "2",
                                                q: "What information do I need?",
                                                a: "Company name, address, tax details, and entity information.",
                                            },
                                        ].map((faq) => (
                                            <div key={faq.id} className="border rounded-lg mb-2">
                                                <button
                                                    onClick={() => toggleFaq(faq.id)}
                                                    className="w-full flex items-center justify-between p-3 text-left"
                                                >
                                                    <span className="text-sm font-medium text-gray-800">{faq.q}</span>
                                                    {expandedFaq === faq.id ? (
                                                        <ChevronUp className="h-4 w-4 text-gray-500" />
                                                    ) : (
                                                        <ChevronDown className="h-4 w-4 text-gray-500" />
                                                    )}
                                                </button>
                                                {expandedFaq === faq.id && (
                                                    <div className="p-3 pt-0 text-sm text-gray-600">{faq.a}</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right: Task Details */}
                                {selectedTaskData ? (
                                    <div className="p-6">
                                        <div className="flex items-center justify-center mb-6">
                                            <img
                                                src="/placeholder.svg"
                                                alt="Onboarding illustration"
                                                className="w-full h-auto max-w-xs rounded-lg"
                                            />
                                        </div>

                                        <h3 className="text-xl font-bold text-[#1A1F36] mb-2">
                                            {selectedTaskData.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-6">
                                            {selectedTaskData.description}
                                        </p>

                                        <Button
                                            onClick={() => {
                                                if (selectedTaskData.route) {
                                                    if (selectedTaskData.route.includes("?page=")) {
                                                        // Extract page and tab from route
                                                        const urlParts = selectedTaskData.route.split("?")[1];
                                                        const params = new URLSearchParams(urlParts);
                                                        const page = params.get("page");
                                                        const tab = params.get("tab");
                                                        navigate("/client-dashboard", {
                                                            state: {
                                                                activePage: page,
                                                                activeTab: tab
                                                            }
                                                        });
                                                    } else {
                                                        navigate(selectedTaskData.route);
                                                    }
                                                }
                                            }}
                                            className="w-full bg-black text-white shadow-md rounded-lg hover:bg-gray-800"
                                        >
                                            Start
                                        </Button>
                                    </div>
                                ) : null}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
