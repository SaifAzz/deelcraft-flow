import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero border-b border-border">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Deel-like Platform Flow
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Complete end-to-end workflow for clients, contractors, and administrators
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge className="bg-client text-white px-4 py-2 text-sm">
                <Users className="w-4 h-4 mr-2" />
                Client Flow
              </Badge>
              <Badge className="bg-contractor text-white px-4 py-2 text-sm">
                <Briefcase className="w-4 h-4 mr-2" />
                Contractor Flow
              </Badge>
              <Badge className="bg-admin text-white px-4 py-2 text-sm">
                <Shield className="w-4 h-4 mr-2" />
                Admin Oversight
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Flow Diagram Section */}
      <div className="container mx-auto px-6 py-16">
        <Card className="shadow-soft overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Platform Architecture & User Flows
            </h2>
            <div className="bg-muted/30 rounded-lg p-6 overflow-x-auto">
              <div className="min-w-[800px]">
                <svg viewBox="0 0 1200 800" className="w-full h-auto">
                  {/* Client Flow */}
                  <g>
                    <rect x="50" y="50" width="200" height="60" rx="8" fill="#3b82f6" stroke="#2563eb" strokeWidth="2"/>
                    <text x="150" y="85" textAnchor="middle" fill="white" fontSize="14">Client Registration</text>
                    
                    <rect x="50" y="140" width="200" height="60" rx="8" fill="#3b82f6" stroke="#2563eb" strokeWidth="2"/>
                    <text x="150" y="175" textAnchor="middle" fill="white" fontSize="14">Client Dashboard</text>
                    
                    <rect x="50" y="230" width="200" height="60" rx="8" fill="#3b82f6" stroke="#2563eb" strokeWidth="2"/>
                    <text x="150" y="265" textAnchor="middle" fill="white" fontSize="14">Contract Creation</text>
                    
                    <rect x="50" y="320" width="200" height="60" rx="8" fill="#3b82f6" stroke="#2563eb" strokeWidth="2"/>
                    <text x="150" y="355" textAnchor="middle" fill="white" fontSize="14">Add Funds</text>
                    
                    {/* Client arrows */}
                    <path d="M 150 110 L 150 140" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowblue)" fill="none"/>
                    <path d="M 150 200 L 150 230" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowblue)" fill="none"/>
                    <path d="M 150 290 L 150 320" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowblue)" fill="none"/>
                  </g>

                  {/* Central System */}
                  <g>
                    <rect x="500" y="200" width="200" height="100" rx="8" fill="#f59e0b" stroke="#d97706" strokeWidth="3"/>
                    <text x="600" y="245" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">POC Platform</text>
                    <text x="600" y="265" textAnchor="middle" fill="white" fontSize="12">Central System</text>
                    
                    <ellipse cx="600" cy="380" rx="60" ry="40" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
                    <text x="600" y="385" textAnchor="middle" fill="white" fontSize="12">Database</text>
                  </g>

                  {/* Contractor Flow */}
                  <g>
                    <rect x="950" y="50" width="200" height="60" rx="8" fill="#14b8a6" stroke="#0d9488" strokeWidth="2"/>
                    <text x="1050" y="85" textAnchor="middle" fill="white" fontSize="14">Contractor KYC</text>
                    
                    <rect x="950" y="140" width="200" height="60" rx="8" fill="#14b8a6" stroke="#0d9488" strokeWidth="2"/>
                    <text x="1050" y="175" textAnchor="middle" fill="white" fontSize="14">Contractor Dashboard</text>
                    
                    <rect x="950" y="230" width="200" height="60" rx="8" fill="#14b8a6" stroke="#0d9488" strokeWidth="2"/>
                    <text x="1050" y="265" textAnchor="middle" fill="white" fontSize="14">Incoming Contracts</text>
                    
                    <rect x="950" y="320" width="200" height="60" rx="8" fill="#14b8a6" stroke="#0d9488" strokeWidth="2"/>
                    <text x="1050" y="355" textAnchor="middle" fill="white" fontSize="14">Receive Payments</text>
                    
                    {/* Contractor arrows */}
                    <path d="M 1050 110 L 1050 140" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowteal)" fill="none"/>
                    <path d="M 1050 200 L 1050 230" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowteal)" fill="none"/>
                    <path d="M 1050 290 L 1050 320" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowteal)" fill="none"/>
                  </g>

                  {/* Admin Flow */}
                  <g>
                    <rect x="500" y="500" width="200" height="60" rx="8" fill="#a855f7" stroke="#9333ea" strokeWidth="2"/>
                    <text x="600" y="535" textAnchor="middle" fill="white" fontSize="14">Admin Dashboard</text>
                    
                    <rect x="300" y="600" width="180" height="50" rx="8" fill="#a855f7" stroke="#9333ea" strokeWidth="2"/>
                    <text x="390" y="630" textAnchor="middle" fill="white" fontSize="12">Monitor Users</text>
                    
                    <rect x="510" y="600" width="180" height="50" rx="8" fill="#a855f7" stroke="#9333ea" strokeWidth="2"/>
                    <text x="600" y="630" textAnchor="middle" fill="white" fontSize="12">View Contracts</text>
                    
                    <rect x="720" y="600" width="180" height="50" rx="8" fill="#a855f7" stroke="#9333ea" strokeWidth="2"/>
                    <text x="810" y="630" textAnchor="middle" fill="white" fontSize="12">Payment Logs</text>
                    
                    {/* Admin arrows */}
                    <path d="M 550 560 L 400 600" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowpurple)" fill="none"/>
                    <path d="M 600 560 L 600 600" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowpurple)" fill="none"/>
                    <path d="M 650 560 L 800 600" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowpurple)" fill="none"/>
                  </g>

                  {/* Connecting arrows */}
                  <path d="M 250 350 L 500 250" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#arrowgray)" fill="none"/>
                  <path d="M 700 250 L 950 260" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#arrowgray)" fill="none"/>
                  <path d="M 600 300 L 600 420" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowgray)" fill="none"/>
                  <path d="M 600 420 L 600 500" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowpurple)" fill="none"/>

                  {/* Arrow markers */}
                  <defs>
                    <marker id="arrowblue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
                    </marker>
                    <marker id="arrowteal" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L9,3 z" fill="#14b8a6" />
                    </marker>
                    <marker id="arrowpurple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L9,3 z" fill="#a855f7" />
                    </marker>
                    <marker id="arrowgray" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </Card>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="p-6 shadow-soft hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-client/10 rounded-lg">
                <Users className="w-6 h-6 text-client" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Client Features</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Secure registration & verification</li>
              <li>• Intuitive dashboard with contract overview</li>
              <li>• Create fixed/hourly contracts with milestones</li>
              <li>• Fund management & payment simulation</li>
            </ul>
          </Card>

          <Card className="p-6 shadow-soft hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-contractor/10 rounded-lg">
                <Briefcase className="w-6 h-6 text-contractor" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Contractor Features</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>• KYC document upload & verification</li>
              <li>• Real-time contract notifications</li>
              <li>• Balance tracking & payment history</li>
              <li>• Simulated payment receipts</li>
            </ul>
          </Card>

          <Card className="p-6 shadow-soft hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-admin/10 rounded-lg">
                <Shield className="w-6 h-6 text-admin" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Admin Oversight</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Comprehensive system monitoring</li>
              <li>• User management & verification</li>
              <li>• Contract review & analytics</li>
              <li>• Payment logs & audit trails</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
