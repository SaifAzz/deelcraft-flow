import * as React from "react";
import { 
  Server, 
  Database, 
  Shield, 
  Lock, 
  Layers,
  Cloud,
  Network,
  Globe,
  ArrowDown,
  ArrowRight,
  Building2,
  Users,
  FileText,
  Wallet,
  MessageSquare,
  BookOpen
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DiagramNodeProps {
  title: string;
  subtitle?: string;
  icon?: React.ElementType;
  color: string;
  children?: React.ReactNode;
  width?: string;
  height?: string;
  position: { x: number; y: number };
}

const DiagramNode: React.FC<DiagramNodeProps> = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  color, 
  children, 
  width = "w-64", 
  height = "auto",
  position 
}) => {
  const colorMap: Record<string, { bg: string; border: string; text: string }> = {
    blue: { bg: "bg-blue-500/10", border: "border-blue-500", text: "text-blue-500" },
    purple: { bg: "bg-purple-500/10", border: "border-purple-500", text: "text-purple-500" },
    green: { bg: "bg-green-500/10", border: "border-green-500", text: "text-green-500" },
    orange: { bg: "bg-orange-500/10", border: "border-orange-500", text: "text-orange-500" },
    pink: { bg: "bg-pink-500/10", border: "border-pink-500", text: "text-pink-500" },
    yellow: { bg: "bg-yellow-500/10", border: "border-yellow-500", text: "text-yellow-500" },
    red: { bg: "bg-red-500/10", border: "border-red-500", text: "text-red-500" },
    gray: { bg: "bg-gray-500/10", border: "border-gray-500", text: "text-gray-500" },
  };

  const colors = colorMap[color] || colorMap.blue;

  return (
    <div 
      className={`absolute ${width} ${height}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div className={`${colors.bg} border-2 ${colors.border} rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
        <div className="flex items-center gap-2 mb-2">
          {Icon && <Icon className={`w-5 h-5 ${colors.text}`} />}
          <h4 className="font-semibold text-sm">{title}</h4>
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mb-2">{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  );
};

interface ConnectionLineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color?: string;
  dashed?: boolean;
  label?: string;
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({ from, to, color = "gray", dashed = false, label }) => {
  const colorMap: Record<string, string> = {
    blue: "stroke-blue-500",
    purple: "stroke-purple-500",
    green: "stroke-green-500",
    orange: "stroke-orange-500",
    pink: "stroke-pink-500",
    yellow: "stroke-yellow-500",
    gray: "stroke-gray-400",
  };

  const strokeColor = colorMap[color] || colorMap.gray;
  
  // Calculate midpoint for label
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;

  return (
    <g>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        className={strokeColor}
        strokeWidth="2"
        strokeDasharray={dashed ? "5,5" : "0"}
        markerEnd="url(#arrowhead)"
      />
      {label && (
        <text
          x={midX}
          y={midY - 5}
          className="text-xs fill-muted-foreground font-medium"
          textAnchor="middle"
        >
          {label}
        </text>
      )}
    </g>
  );
};

const EcsFargateArchitectureDiagram: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-900 dark:to-gray-800 rounded-xl border-2 border-gray-300 dark:border-gray-700 p-8 overflow-x-auto">
      <div className="relative" style={{ width: "1400px", height: "1000px", minWidth: "1400px" }}>
        
        {/* SVG for connection lines */}
        <svg className="absolute inset-0 pointer-events-none" style={{ width: "100%", height: "100%" }}>
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" className="fill-gray-400" />
            </marker>
          </defs>

          {/* Internet to ALB */}
          <ConnectionLine from={{ x: 100, y: 80 }} to={{ x: 250, y: 80 }} color="blue" label="HTTPS" />
          
          {/* ALB to Frontend Services */}
          <ConnectionLine from={{ x: 450, y: 80 }} to={{ x: 600, y: 180 }} color="green" label="TLS Term" />
          
          {/* Frontend to Cloud Map */}
          <ConnectionLine from={{ x: 750, y: 280 }} to={{ x: 750, y: 380 }} color="purple" label="DNS Query" />
          
          {/* Cloud Map to Backend */}
          <ConnectionLine from={{ x: 850, y: 450 }} to={{ x: 1050, y: 350 }} color="purple" />
          
          {/* Backend to DynamoDB */}
          <ConnectionLine from={{ x: 1100, y: 500 }} to={{ x: 500, y: 700 }} color="orange" label="VPC Endpoint" />
          
          {/* Backend to QLDB */}
          <ConnectionLine from={{ x: 1100, y: 520 }} to={{ x: 750, y: 700 }} color="orange" />
          
          {/* Backend to S3 */}
          <ConnectionLine from={{ x: 1200, y: 500 }} to={{ x: 1000, y: 700 }} color="orange" />
        </svg>

        {/* Internet Users */}
        <DiagramNode
          title="Internet Users"
          icon={Globe}
          color="blue"
          position={{ x: 20, y: 50 }}
          width="w-48"
        >
          <Badge variant="outline" className="text-xs">External Traffic</Badge>
        </DiagramNode>

        {/* ALB + WAF (Public Subnet) */}
        <DiagramNode
          title="Application Load Balancer"
          subtitle="Public Subnets (3 AZs)"
          icon={Shield}
          color="orange"
          position={{ x: 250, y: 30 }}
          width="w-56"
        >
          <div className="space-y-1 mt-2">
            <Badge className="bg-orange-500 text-xs">ALB</Badge>
            <Badge className="bg-red-500 text-xs ml-1">WAF</Badge>
            <p className="text-xs text-muted-foreground mt-2">
              • TLS Termination (ACM)<br/>
              • WAF Rules (OWASP)<br/>
              • Rate Limiting
            </p>
          </div>
        </DiagramNode>

        {/* VPC Container Outline */}
        <div 
          className="absolute border-4 border-dashed border-blue-300 dark:border-blue-700 rounded-xl bg-blue-500/5"
          style={{ left: "550px", top: "150px", width: "800px", height: "600px" }}
        >
          <div className="absolute -top-6 left-4 bg-background px-3 py-1 rounded border-2 border-blue-300 dark:border-blue-700">
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-blue-500" />
              <span className="font-semibold text-sm">VPC (Private Subnets - 3 AZs)</span>
            </div>
          </div>
        </div>

        {/* Frontend ECS Cluster */}
        <DiagramNode
          title="Frontend ECS Cluster"
          subtitle="Private Subnets"
          icon={Server}
          color="green"
          position={{ x: 600, y: 180 }}
          width="w-80"
        >
          <div className="space-y-2 mt-3">
            <div className="flex items-center gap-2 text-xs p-2 bg-background rounded">
              <Building2 className="w-4 h-4 text-green-500" />
              <span>Client Dashboard</span>
              <Badge variant="outline" className="ml-auto text-xs">:3001</Badge>
            </div>
            <div className="flex items-center gap-2 text-xs p-2 bg-background rounded">
              <Users className="w-4 h-4 text-green-500" />
              <span>Contractor Dashboard</span>
              <Badge variant="outline" className="ml-auto text-xs">:3002</Badge>
            </div>
            <div className="flex items-center gap-2 text-xs p-2 bg-background rounded">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Admin Dashboard</span>
              <Badge variant="outline" className="ml-auto text-xs">:3003</Badge>
            </div>
          </div>
        </DiagramNode>

        {/* AWS Cloud Map */}
        <DiagramNode
          title="AWS Cloud Map"
          subtitle="Service Discovery (Private DNS)"
          icon={Layers}
          color="purple"
          position={{ x: 650, y: 400 }}
          width="w-72"
        >
          <div className="text-xs text-muted-foreground mt-2 space-y-1">
            <code className="block bg-background p-1 rounded">auth.internal.local</code>
            <code className="block bg-background p-1 rounded">payments.internal.local</code>
            <code className="block bg-background p-1 rounded">orders.internal.local</code>
          </div>
        </DiagramNode>

        {/* Backend ECS Cluster */}
        <DiagramNode
          title="Backend ECS Cluster"
          subtitle="Microservices (Private Subnets)"
          icon={Server}
          color="pink"
          position={{ x: 1050, y: 180 }}
          width="w-80"
        >
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="flex items-center gap-1 text-xs p-2 bg-background rounded">
              <Lock className="w-3 h-3 text-pink-500" />
              <span className="text-xs">Auth</span>
            </div>
            <div className="flex items-center gap-1 text-xs p-2 bg-background rounded">
              <Wallet className="w-3 h-3 text-pink-500" />
              <span className="text-xs">Payments</span>
            </div>
            <div className="flex items-center gap-1 text-xs p-2 bg-background rounded">
              <FileText className="w-3 h-3 text-pink-500" />
              <span className="text-xs">Orders</span>
            </div>
            <div className="flex items-center gap-1 text-xs p-2 bg-background rounded">
              <Database className="w-3 h-3 text-pink-500" />
              <span className="text-xs">Files</span>
            </div>
            <div className="flex items-center gap-1 text-xs p-2 bg-background rounded col-span-2">
              <MessageSquare className="w-3 h-3 text-pink-500" />
              <span className="text-xs">Notifications</span>
            </div>
          </div>
        </DiagramNode>

        {/* Data Stores Row */}
        {/* DynamoDB */}
        <DiagramNode
          title="Amazon DynamoDB"
          subtitle="Operational Data"
          icon={Database}
          color="yellow"
          position={{ x: 400, y: 700 }}
          width="w-64"
        >
          <div className="mt-2">
            <Badge variant="outline" className="text-xs mb-2">Gateway Endpoint</Badge>
            <p className="text-xs text-muted-foreground">
              • companies, contractors<br/>
              • contracts, payments<br/>
              • PITR enabled
            </p>
          </div>
        </DiagramNode>

        {/* QLDB */}
        <DiagramNode
          title="Amazon QLDB"
          subtitle="Immutable Ledger"
          icon={BookOpen}
          color="orange"
          position={{ x: 700, y: 700 }}
          width="w-64"
        >
          <div className="mt-2">
            <Badge variant="outline" className="text-xs mb-2">Interface Endpoint</Badge>
            <p className="text-xs text-muted-foreground">
              • Signature events<br/>
              • Contract activations<br/>
              • Cryptographic proof
            </p>
          </div>
        </DiagramNode>

        {/* S3 */}
        <DiagramNode
          title="Amazon S3"
          subtitle="Object Storage"
          icon={Database}
          color="blue"
          position={{ x: 1000, y: 700 }}
          width="w-64"
        >
          <div className="mt-2">
            <Badge variant="outline" className="text-xs mb-2">Gateway Endpoint</Badge>
            <p className="text-xs text-muted-foreground">
              • Contract PDFs<br/>
              • KYC documents<br/>
              • Signed URLs
            </p>
          </div>
        </DiagramNode>

        {/* Security Groups Note */}
        <div 
          className="absolute border-2 border-red-300 dark:border-red-700 rounded-lg bg-red-500/5 p-4"
          style={{ left: "20px", top: "250px", width: "280px" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-red-500" />
            <h4 className="font-semibold text-sm">Security Controls</h4>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>✓ Security Groups (least privilege)</li>
            <li>✓ No public IPs on ECS tasks</li>
            <li>✓ VPC endpoints only</li>
            <li>✓ IAM task roles</li>
            <li>✓ Encryption at rest/transit</li>
          </ul>
        </div>

        {/* Observability Note */}
        <div 
          className="absolute border-2 border-purple-300 dark:border-purple-700 rounded-lg bg-purple-500/5 p-4"
          style={{ left: "20px", top: "450px", width: "280px" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Cloud className="w-5 h-5 text-purple-500" />
            <h4 className="font-semibold text-sm">Observability</h4>
          </div>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>✓ CloudWatch Logs & Metrics</li>
            <li>✓ Container Insights</li>
            <li>✓ X-Ray Tracing</li>
            <li>✓ VPC Flow Logs</li>
          </ul>
        </div>

        {/* NAT Gateway Note */}
        <div 
          className="absolute border-2 border-green-300 dark:border-green-700 rounded-lg bg-green-500/5 p-3"
          style={{ left: "320px", top: "180px", width: "200px" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Network className="w-4 h-4 text-green-500" />
            <h4 className="font-semibold text-xs">NAT Gateway</h4>
          </div>
          <p className="text-xs text-muted-foreground">
            (Public subnet)<br/>
            Outbound traffic only
          </p>
        </div>

        {/* Legend */}
        <div 
          className="absolute border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-background p-4"
          style={{ left: "20px", top: "650px", width: "280px" }}
        >
          <h4 className="font-semibold text-sm mb-3">Legend</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-blue-500"></div>
              <span className="text-muted-foreground">External Traffic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-green-500"></div>
              <span className="text-muted-foreground">Internal Frontend</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-purple-500"></div>
              <span className="text-muted-foreground">Service Discovery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-orange-500"></div>
              <span className="text-muted-foreground">Backend to Data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 border-2 border-dashed border-blue-300"></div>
              <span className="text-muted-foreground">VPC Boundary</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EcsFargateArchitectureDiagram;




