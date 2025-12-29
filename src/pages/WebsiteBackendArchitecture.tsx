import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowDown,
  ArrowRight,
  Database,
  Server,
  Globe,
  Layers,
  Zap,
  Lock,
  MessageSquare,
  FileText,
  Users,
  Building2,
  CheckCircle2,
  FileSignature,
  Shield,
  Wallet,
  BookOpen,
  AlertCircle,
  Clock,
  CheckSquare,
  Network,
  Cloud,
  Activity,
  GitBranch,
  Settings,
  Code,
  Cpu,
  HardDrive,
  Mail,
  CreditCard,
  Eye,
  TrendingUp,
  ShieldCheck,
  Rss,
  Image,
  BarChart3,
  Send,
  Download
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

const WebsiteBackendArchitecture = () => {
  const navigate = useNavigate();

  const colorClasses: Record<string, { border: string; bg: string; text: string }> = {
    blue: {
      border: "border-blue-500/30",
      bg: "bg-blue-500/5",
      text: "text-blue-500"
    },
    purple: {
      border: "border-purple-500/30",
      bg: "bg-purple-500/5",
      text: "text-purple-500"
    },
    green: {
      border: "border-green-500/30",
      bg: "bg-green-500/5",
      text: "text-green-500"
    },
    orange: {
      border: "border-orange-500/30",
      bg: "bg-orange-500/5",
      text: "text-orange-500"
    },
    yellow: {
      border: "border-yellow-500/30",
      bg: "bg-yellow-500/5",
      text: "text-yellow-500"
    }
  };

  const services = [
    {
      name: "Content Service",
      port: 4001,
      color: "blue",
      icon: FileText,
      description: "Blog posts, pages, and media management",
      responsibilities: [
        "Blog post CRUD operations",
        "Page content management",
        "Media file management",
        "SEO metadata management",
        "Content versioning",
        "Publishing workflow"
      ],
      endpoints: [
        "GET /api/content/blog",
        "GET /api/content/blog/:slug",
        "GET /api/content/pages/:slug",
        "POST /api/content/blog (admin)",
        "POST /api/content/media/upload (admin)"
      ],
      dependencies: ["DynamoDB (blog-posts, pages, media)", "S3 (media storage)", "Redis (caching)"],
      tables: ["website-blog-posts", "website-pages", "website-media"]
    },
    {
      name: "Lead Service",
      port: 4002,
      color: "purple",
      icon: Users,
      description: "Contact forms, demo requests, and newsletter subscriptions",
      responsibilities: [
        "Contact form submissions",
        "Demo request handling",
        "Newsletter subscription management",
        "Email verification",
        "Lead tracking",
        "Lead export"
      ],
      endpoints: [
        "POST /api/leads/contact",
        "POST /api/leads/demo",
        "POST /api/leads/newsletter",
        "GET /api/leads/newsletter/verify/:token",
        "GET /api/leads (admin)"
      ],
      dependencies: ["DynamoDB (contacts, demo-requests, newsletter)", "SendGrid (emails)", "Redis (rate limiting)"],
      tables: ["website-contacts", "website-demo-requests", "website-newsletter-subscriptions"]
    },
    {
      name: "Analytics Service",
      port: 4003,
      color: "green",
      icon: BarChart3,
      description: "Event tracking, session management, and analytics reporting",
      responsibilities: [
        "Event tracking (page views, clicks)",
        "Session management",
        "Metrics aggregation",
        "Analytics reporting",
        "Google Analytics integration"
      ],
      endpoints: [
        "POST /api/analytics/track",
        "POST /api/analytics/pageview",
        "GET /api/analytics/stats (admin)",
        "GET /api/analytics/reports (admin)"
      ],
      dependencies: ["DynamoDB (events, sessions, metrics)", "Redis (real-time metrics)", "Google Analytics API"],
      tables: ["website-events", "website-sessions", "website-metrics"]
    }
  ];

  const infrastructureComponents = [
    {
      name: "API Gateway",
      icon: Network,
      color: "purple",
      description: "REST API Gateway for website endpoints",
      features: ["Public endpoints", "Rate limiting", "CORS configuration", "SSL certificates"]
    },
    {
      name: "Application Load Balancer",
      icon: Layers,
      color: "blue",
      description: "Internal service routing",
      features: ["Target groups per service", "Health checks", "SSL termination"]
    },
    {
      name: "DynamoDB",
      icon: Database,
      color: "green",
      description: "NoSQL database for website data",
      features: ["9 tables", "On-demand billing", "GSI for queries", "TTL for events"]
    },
    {
      name: "S3",
      icon: Cloud,
      color: "blue",
      description: "Media storage for blog images and assets",
      features: ["Versioning", "Encryption", "CloudFront integration", "Lifecycle policies"]
    },
    {
      name: "ElastiCache Redis",
      icon: HardDrive,
      color: "orange",
      description: "Content caching and rate limiting",
      features: ["Content cache (1hr TTL)", "Rate limiting counters", "Real-time metrics"]
    },
    {
      name: "CloudFront CDN",
      icon: Globe,
      color: "yellow",
      description: "CDN for static assets and media",
      features: ["Global distribution", "SSL certificates", "Caching", "DDoS protection"]
    },
    {
      name: "CloudWatch",
      icon: Activity,
      color: "orange",
      description: "Logging, metrics, and monitoring",
      features: ["Log groups", "Custom metrics", "Alarms", "Dashboards"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10">
        <div className="container mx-auto px-6 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Website Backend Architecture
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Backend services for the Mind-Links marketing website: Content Management, Lead Generation,
              and Analytics. Deployed on AWS ECS Fargate, integrated with existing infrastructure.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge variant="outline" className="text-sm">
                <Server className="w-3 h-3 mr-1" />
                3 Microservices
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Cloud className="w-3 h-3 mr-1" />
                AWS ECS Fargate
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Database className="w-3 h-3 mr-1" />
                DynamoDB
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Globe className="w-3 h-3 mr-1" />
                CloudFront CDN
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-7 w-full max-w-6xl mx-auto mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="dataflow">Data Flow</TabsTrigger>
            <TabsTrigger value="deployment">Deployment</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-8">
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6">Website Backend Overview</h2>
              <p className="text-lg text-muted-foreground mb-6">
                The Mind-Links website backend is a simplified microservices architecture with 3 independent services
                focused on content management, lead generation, and analytics. It's separate from the main platform
                backend but shares the same AWS infrastructure and deployment patterns.
              </p>

              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Key Design Decision:</strong> Website backend is separate from the main platform backend
                  to enable independent scaling, simpler data models, and faster development cycles. It shares
                  infrastructure (VPC, security groups) but has its own services and databases.
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 border-2 border-blue-500/30 bg-blue-500/5">
                  <FileText className="w-10 h-10 text-blue-500 mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Content Service</h3>
                  <p className="text-sm text-muted-foreground">
                    Blog posts, pages, and media management with SEO optimization and content versioning.
                  </p>
                </Card>

                <Card className="p-6 border-2 border-purple-500/30 bg-purple-500/5">
                  <Users className="w-10 h-10 text-purple-500 mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Lead Service</h3>
                  <p className="text-sm text-muted-foreground">
                    Contact forms, demo requests, and newsletter subscriptions with email verification and lead tracking.
                  </p>
                </Card>

                <Card className="p-6 border-2 border-green-500/30 bg-green-500/5">
                  <BarChart3 className="w-10 h-10 text-green-500 mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Analytics Service</h3>
                  <p className="text-sm text-muted-foreground">
                    Event tracking, session management, and analytics reporting with real-time metrics.
                  </p>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Architecture Principles</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { icon: CheckCircle2, title: "Simplified Architecture", desc: "3 focused services instead of 8, optimized for website needs" },
                    { icon: TrendingUp, title: "High Read Performance", desc: "Heavy caching, CDN integration, optimized for content delivery" },
                    { icon: ShieldCheck, title: "Public-Facing Security", desc: "Rate limiting, CORS, input validation, spam prevention" },
                    { icon: Zap, title: "Fast Development", desc: "Simpler data models, faster iteration, independent from main platform" },
                    { icon: Globe, title: "SEO Optimized", desc: "SEO metadata management, sitemap generation, structured data" },
                    { icon: Activity, title: "Analytics First", desc: "Comprehensive tracking, conversion funnels, lead attribution" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <item.icon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
              <h3 className="text-2xl font-bold mb-4">Service Overview</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {services.map((service, idx) => {
                  const colors = colorClasses[service.color] || colorClasses.blue;
                  return (
                    <Card key={idx} className={`p-4 border-2 ${colors.border} ${colors.bg}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <service.icon className={`w-5 h-5 ${colors.text}`} />
                        <h4 className="font-semibold">{service.name}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{service.description}</p>
                      <Badge variant="outline" className="text-xs">Port {service.port}</Badge>
                    </Card>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          {/* SERVICES TAB */}
          <TabsContent value="services" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Website Backend Services</h2>
              <p className="text-muted-foreground">3 focused services for website functionality</p>
            </div>

            {services.map((service, idx) => {
              const colors = colorClasses[service.color] || colorClasses.blue;
              return (
                <Card key={idx} className={`p-6 border-2 ${colors.border} ${colors.bg}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <service.icon className={`w-8 h-8 ${colors.text}`} />
                      <div>
                        <h3 className="text-2xl font-bold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">Port {service.port} | ECS Service: mindlinks-website-{service.name.toLowerCase().replace(' ', '-')}</p>
                      </div>
                    </div>
                    <Badge className={`${colors.text.replace('text-', 'bg-')} text-white`}>Website Service</Badge>
                  </div>

                  <p className="text-muted-foreground mb-6">{service.description}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <CheckSquare className="w-4 h-4" />
                        Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {service.responsibilities.map((resp, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Code className="w-4 h-4" />
                        Key Endpoints
                      </h4>
                      <div className="space-y-2">
                        {service.endpoints.map((endpoint, i) => (
                          <Badge key={i} variant="outline" className="text-xs font-mono block w-fit">
                            {endpoint}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Database className="w-4 h-4" />
                        DynamoDB Tables
                      </h4>
                      <div className="space-y-2">
                        {service.tables.map((table, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {table}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <GitBranch className="w-4 h-4" />
                        Dependencies
                      </h4>
                      <ul className="space-y-2">
                        {service.dependencies.map((dep, i) => (
                          <li key={i} className="text-sm text-muted-foreground">
                            • {dep}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              );
            })}
          </TabsContent>

          {/* INFRASTRUCTURE TAB */}
          <TabsContent value="infrastructure" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">AWS Infrastructure Components</h2>
              <p className="text-muted-foreground">Infrastructure stack for website backend services</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {infrastructureComponents.map((component, idx) => {
                const colors = colorClasses[component.color] || colorClasses.blue;
                return (
                  <Card key={idx} className={`p-6 border-2 ${colors.border} ${colors.bg}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <component.icon className={`w-8 h-8 ${colors.text}`} />
                      <h3 className="text-xl font-bold">{component.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{component.description}</p>
                    <div>
                      <p className="text-xs font-semibold mb-2">FEATURES</p>
                      <ul className="space-y-1">
                        {component.features.map((feature, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                            <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                );
              })}
            </div>

            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">Infrastructure Architecture</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold mb-2">Compute & Containers</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• ECS Fargate cluster: mindlinks-website-cluster</li>
                    <li>• 3 separate ECS services (Content, Lead, Analytics)</li>
                    <li>• Auto-scaling: 1-3 tasks per service</li>
                    <li>• CPU: 0.25 vCPU, Memory: 512MB per service</li>
                    <li>• ECR repositories for container images</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold mb-2">Data Storage</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• DynamoDB: 9 tables (3 per service)</li>
                    <li>• S3: 2 buckets (media, uploads)</li>
                    <li>• ElastiCache Redis: Single node for caching</li>
                    <li>• CloudFront: CDN for media delivery</li>
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold mb-2">Networking & Routing</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• API Gateway: REST API for public endpoints</li>
                    <li>• Application Load Balancer: Internal routing</li>
                    <li>• CloudFront: CDN for static assets</li>
                    <li>• Route 53: DNS management</li>
                  </ul>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold mb-2">Monitoring & Security</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• CloudWatch: Logs, metrics, alarms</li>
                    <li>• Security Groups: Minimal access rules</li>
                    <li>• WAF (optional): DDoS protection</li>
                    <li>• Rate limiting: API Gateway + Redis</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* DATABASE SCHEMA TAB */}
          <TabsContent value="database" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">DynamoDB Database Schemas</h2>
              <p className="text-muted-foreground">Complete database schema for website backend with infrastructure integration</p>
            </div>

            {/* Database Overview */}
            <Card className="p-8 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
              <h3 className="text-2xl font-bold mb-6">Database Overview</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold mb-2">Total Tables</p>
                  <p className="text-3xl font-bold text-blue-500">9</p>
                  <p className="text-sm text-muted-foreground">Across 3 services</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold mb-2">Global Secondary Indexes</p>
                  <p className="text-3xl font-bold text-green-500">15+</p>
                  <p className="text-sm text-muted-foreground">For query optimization</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-semibold mb-2">Tables with TTL</p>
                  <p className="text-3xl font-bold text-purple-500">2</p>
                  <p className="text-sm text-muted-foreground">Auto-cleanup enabled</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { service: "Content Service", tables: 3, color: "blue" },
                  { service: "Lead Service", tables: 3, color: "purple" },
                  { service: "Analytics Service", tables: 3, color: "green" },
                ].map((item, idx) => {
                  const colors = colorClasses[item.color] || colorClasses.blue;
                  return (
                    <Card key={idx} className={`p-4 border-2 ${colors.border} ${colors.bg}`}>
                      <p className="font-semibold text-sm mb-1">{item.service}</p>
                      <p className="text-2xl font-bold">{item.tables} tables</p>
                    </Card>
                  );
                })}
              </div>
            </Card>

            {/* Content Service Tables */}
            <Card className="p-8 border-2 border-blue-500/30 bg-blue-500/5">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-8 h-8 text-blue-500" />
                <h3 className="text-2xl font-bold">Content Service Tables</h3>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-lg mb-3">Table: website-blog-posts</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Keys & Indexes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Partition Key:</strong> id (String, UUID)</li>
                        <li>• <strong>GSI:</strong> slug-index (slug as partition key)</li>
                        <li>• <strong>GSI:</strong> status-index (status as partition key)</li>
                        <li>• <strong>GSI:</strong> category-index (category as partition key)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Attributes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• id (String, UUID)</li>
                        <li>• title (String)</li>
                        <li>• slug (String, unique, indexed)</li>
                        <li>• excerpt (String)</li>
                        <li>• content (String, Markdown/HTML)</li>
                        <li>• author (String)</li>
                        <li>• category (String, indexed)</li>
                        <li>• tags (List of Strings)</li>
                        <li>• featuredImage (String, S3 URL)</li>
                        <li>• status (String: draft|published|archived, indexed)</li>
                        <li>• publishedAt (String, ISO 8601)</li>
                        <li>• seoTitle (String)</li>
                        <li>• seoDescription (String)</li>
                        <li>• seoKeywords (List of Strings)</li>
                        <li>• createdAt (String)</li>
                        <li>• updatedAt (String)</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                    <pre>{`// Access Pattern: Get blog post by slug
const post = await dynamodb.query({
  TableName: 'website-blog-posts',
  IndexName: 'slug-index',
  KeyConditionExpression: 'slug = :slug',
  ExpressionAttributeValues: { ':slug': 'my-blog-post' }
});`}</pre>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-lg mb-3">Table: website-pages</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Keys & Indexes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Partition Key:</strong> id (String, UUID)</li>
                        <li>• <strong>GSI:</strong> slug-index (slug as partition key)</li>
                        <li>• <strong>GSI:</strong> status-index (status as partition key)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Attributes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• id (String, UUID)</li>
                        <li>• slug (String, unique, indexed)</li>
                        <li>• title (String)</li>
                        <li>• content (String, HTML)</li>
                        <li>• template (String: home|about|services|pricing)</li>
                        <li>• seoTitle (String)</li>
                        <li>• seoDescription (String)</li>
                        <li>• status (String: draft|published, indexed)</li>
                        <li>• createdAt (String)</li>
                        <li>• updatedAt (String)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-lg mb-3">Table: website-media</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Keys & Indexes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Partition Key:</strong> id (String, UUID)</li>
                        <li>• <strong>GSI:</strong> type-index (type as partition key)</li>
                        <li>• <strong>GSI:</strong> uploadedAt-index (uploadedAt as partition key)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Attributes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• id (String, UUID)</li>
                        <li>• filename (String)</li>
                        <li>• originalName (String)</li>
                        <li>• mimeType (String)</li>
                        <li>• size (Number, bytes)</li>
                        <li>• s3Key (String)</li>
                        <li>• s3Url (String, CloudFront URL)</li>
                        <li>• type (String: image|document|video, indexed)</li>
                        <li>• alt (String, for images)</li>
                        <li>• uploadedAt (String, indexed)</li>
                        <li>• uploadedBy (String, admin user ID)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Lead Service Tables */}
            <Card className="p-8 border-2 border-purple-500/30 bg-purple-500/5">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-purple-500" />
                <h3 className="text-2xl font-bold">Lead Service Tables</h3>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-lg mb-3">Table: website-contacts</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Keys & Indexes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Partition Key:</strong> id (String, UUID)</li>
                        <li>• <strong>GSI:</strong> email-index (email as partition key)</li>
                        <li>• <strong>GSI:</strong> status-index (status as partition key)</li>
                        <li>• <strong>GSI:</strong> createdAt-index (createdAt as partition key)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Attributes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• id (String, UUID)</li>
                        <li>• name (String)</li>
                        <li>• email (String, indexed)</li>
                        <li>• company (String, optional)</li>
                        <li>• phone (String, optional)</li>
                        <li>• message (String)</li>
                        <li>• source (String: website|landing-page|referral)</li>
                        <li>• status (String: new|contacted|qualified|converted, indexed)</li>
                        <li>• createdAt (String, indexed)</li>
                        <li>• updatedAt (String)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-lg mb-3">Table: website-demo-requests</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Keys & Indexes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Partition Key:</strong> id (String, UUID)</li>
                        <li>• <strong>GSI:</strong> email-index (email as partition key)</li>
                        <li>• <strong>GSI:</strong> status-index (status as partition key)</li>
                        <li>• <strong>GSI:</strong> preferredDate-index (preferredDate as partition key)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Attributes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• id (String, UUID)</li>
                        <li>• name (String)</li>
                        <li>• email (String, indexed)</li>
                        <li>• company (String)</li>
                        <li>• companySize (String: 1-10|11-50|51-200|201+)</li>
                        <li>• useCase (String)</li>
                        <li>• preferredDate (String, ISO 8601, indexed)</li>
                        <li>• status (String: pending|scheduled|completed|cancelled, indexed)</li>
                        <li>• notes (String, optional, admin notes)</li>
                        <li>• createdAt (String)</li>
                        <li>• updatedAt (String)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-lg mb-3">Table: website-newsletter-subscriptions</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Keys & Indexes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Partition Key:</strong> id (String, UUID)</li>
                        <li>• <strong>GSI:</strong> email-index (email as partition key, unique)</li>
                        <li>• <strong>GSI:</strong> status-index (status as partition key)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Attributes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• id (String, UUID)</li>
                        <li>• email (String, unique, indexed)</li>
                        <li>• name (String, optional)</li>
                        <li>• source (String: website|landing-page)</li>
                        <li>• status (String: pending|verified|unsubscribed, indexed)</li>
                        <li>• verificationToken (String, for email verification)</li>
                        <li>• verifiedAt (String, ISO 8601, optional)</li>
                        <li>• subscribedAt (String, ISO 8601)</li>
                        <li>• unsubscribedAt (String, ISO 8601, optional)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Analytics Service Tables */}
            <Card className="p-8 border-2 border-green-500/30 bg-green-500/5">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="w-8 h-8 text-green-500" />
                <h3 className="text-2xl font-bold">Analytics Service Tables</h3>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-lg mb-3">Table: website-events</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Keys & Indexes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Partition Key:</strong> id (String, UUID)</li>
                        <li>• <strong>GSI:</strong> sessionId-index (sessionId as partition key)</li>
                        <li>• <strong>GSI:</strong> type-index (type as partition key)</li>
                        <li>• <strong>GSI:</strong> timestamp-index (timestamp as partition key)</li>
                        <li>• <strong>TTL:</strong> expiresAt (Number, 90 days)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Attributes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• id (String, UUID)</li>
                        <li>• type (String: pageview|click|conversion|form_submit, indexed)</li>
                        <li>• sessionId (String, indexed)</li>
                        <li>• userId (String, optional, if logged in)</li>
                        <li>• page (String, URL path)</li>
                        <li>• properties (Map: custom event properties)</li>
                        <li>• timestamp (String, ISO 8601, indexed)</li>
                        <li>• expiresAt (Number, TTL, 90 days from timestamp)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-lg mb-3">Table: website-sessions</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Keys & Indexes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Partition Key:</strong> id (String, UUID)</li>
                        <li>• <strong>GSI:</strong> userId-index (userId as partition key)</li>
                        <li>• <strong>GSI:</strong> startTime-index (startTime as partition key)</li>
                        <li>• <strong>TTL:</strong> expiresAt (Number, 30 days)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Attributes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• id (String, UUID, session ID)</li>
                        <li>• userId (String, optional, indexed)</li>
                        <li>• startTime (String, ISO 8601, indexed)</li>
                        <li>• endTime (String, ISO 8601)</li>
                        <li>• duration (Number, seconds)</li>
                        <li>• pageViews (Number)</li>
                        <li>• referrer (String)</li>
                        <li>• userAgent (String)</li>
                        <li>• ipAddress (String, hashed for privacy)</li>
                        <li>• country (String)</li>
                        <li>• device (String: desktop|mobile|tablet)</li>
                        <li>• expiresAt (Number, TTL, 30 days from startTime)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-lg mb-3">Table: website-metrics</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold mb-2">Keys & Indexes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• <strong>Partition Key:</strong> id (String, UUID)</li>
                        <li>• <strong>GSI:</strong> date-index (date as partition key)</li>
                        <li>• <strong>GSI:</strong> metric-index (metric as partition key, date as sort key)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-2">Attributes</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• id (String, UUID)</li>
                        <li>• date (String, YYYY-MM-DD, indexed)</li>
                        <li>• metric (String: pageviews|unique_visitors|conversions, indexed)</li>
                        <li>• value (Number)</li>
                        <li>• dimensions (Map: page, country, device, etc.)</li>
                        <li>• createdAt (String)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Infrastructure Integration */}
            <Card className="p-8 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
              <h3 className="text-2xl font-bold mb-6">Infrastructure Integration</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Terraform Configuration Example
                  </h4>
                  <Card className="p-6 bg-slate-900">
                    <pre className="text-green-400 font-mono text-xs overflow-x-auto">
                      {`# Example: website-blog-posts table
resource "aws_dynamodb_table" "website_blog_posts" {
  name           = "mindlinks-website-blog-posts"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "slug"
    type = "S"
  }

  attribute {
    name = "status"
    type = "S"
  }

  attribute {
    name = "category"
    type = "S"
  }

  global_secondary_index {
    name     = "slug-index"
    hash_key = "slug"
  }

  global_secondary_index {
    name     = "status-index"
    hash_key = "status"
  }

  global_secondary_index {
    name     = "category-index"
    hash_key = "category"
  }

  server_side_encryption {
    enabled     = true
    kms_key_id  = aws_kms_key.dynamodb.arn
  }

  point_in_time_recovery {
    enabled = true
  }

  tags = {
    Service     = "content-service"
    Environment = var.environment
  }
}`}
                    </pre>
                  </Card>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    IAM Roles & Permissions
                  </h4>
                  <Card className="p-6">
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-semibold mb-2">Content Service IAM Role</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• DynamoDB: Read/Write on website-blog-posts, website-pages, website-media</li>
                          <li>• S3: Read/Write on website-media bucket</li>
                          <li>• ElastiCache: Read/Write on Redis (for caching)</li>
                        </ul>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-4">
                        <p className="font-semibold mb-2">Lead Service IAM Role</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• DynamoDB: Read/Write on website-contacts, website-demo-requests, website-newsletter-subscriptions</li>
                          <li>• Secrets Manager: Read SendGrid API key</li>
                          <li>• ElastiCache: Read/Write on Redis (for rate limiting)</li>
                        </ul>
                      </div>
                      <div className="border-l-4 border-green-500 pl-4">
                        <p className="font-semibold mb-2">Analytics Service IAM Role</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• DynamoDB: Read/Write on website-events, website-sessions, website-metrics</li>
                          <li>• ElastiCache: Read/Write on Redis (for real-time metrics)</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Service-to-Database Connection
                  </h4>
                  <Card className="p-6">
                    <div className="space-y-4">
                      {[
                        {
                          step: "1",
                          action: "Service starts up",
                          detail: "Reads DynamoDB table names from environment variables (AWS_APP_ENV)"
                        },
                        {
                          step: "2",
                          action: "AWS SDK initialization",
                          detail: "Uses IAM role credentials attached to ECS task (no hardcoded keys)"
                        },
                        {
                          step: "3",
                          action: "DynamoDB client creation",
                          detail: "DynamoDBDocumentClient from @aws-sdk/lib-dynamodb"
                        },
                        {
                          step: "4",
                          action: "Query/Write operations",
                          detail: "Uses DocumentClient methods: get, put, update, query, scan"
                        },
                        {
                          step: "5",
                          action: "Error handling & retries",
                          detail: "Automatic retries with exponential backoff, circuit breaker for failures"
                        },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                            {item.step}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{item.action}</p>
                            <p className="text-sm text-muted-foreground">{item.detail}</p>
                          </div>
                          {idx < 4 && <ArrowRight className="w-5 h-5 text-muted-foreground" />}
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4">Access Patterns Summary</h4>
                  <Card className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="font-semibold mb-3">Common Query Patterns</p>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>• Get blog post by slug → website-blog-posts (GSI: slug-index)</li>
                          <li>• Get published posts → website-blog-posts (GSI: status-index)</li>
                          <li>• Get posts by category → website-blog-posts (GSI: category-index)</li>
                          <li>• Get page by slug → website-pages (GSI: slug-index)</li>
                          <li>• Get contact by email → website-contacts (GSI: email-index)</li>
                          <li>• Get events by session → website-events (GSI: sessionId-index)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-3">Write Patterns</p>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>• Create operations: PutItem with generated UUID</li>
                          <li>• Update operations: UpdateItem with conditional expressions</li>
                          <li>• Batch operations: BatchWriteItem for bulk writes</li>
                          <li>• TTL cleanup: Automatic deletion via expiresAt attribute</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Cloud className="w-5 h-5" />
                    Terraform Infrastructure Setup
                  </h4>
                  <Card className="p-6">
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold mb-2">Complete Terraform Module Structure</p>
                        <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                          <pre>{`# terraform/modules/website-dynamodb/main.tf

# Content Service Tables
resource "aws_dynamodb_table" "website_blog_posts" {
  name           = "\${var.environment}-website-blog-posts"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "slug"
    type = "S"
  }

  attribute {
    name = "status"
    type = "S"
  }

  attribute {
    name = "category"
    type = "S"
  }

  global_secondary_index {
    name     = "slug-index"
    hash_key = "slug"
    projection_type = "ALL"
  }

  global_secondary_index {
    name     = "status-index"
    hash_key = "status"
    projection_type = "ALL"
  }

  global_secondary_index {
    name     = "category-index"
    hash_key = "category"
    projection_type = "ALL"
  }

  server_side_encryption {
    enabled     = true
    kms_key_id  = aws_kms_key.dynamodb.arn
  }

  point_in_time_recovery {
    enabled = true
  }

  tags = {
    Service     = "content-service"
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

# Lead Service Tables
resource "aws_dynamodb_table" "website_contacts" {
  name           = "\${var.environment}-website-contacts"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

  attribute {
    name = "email"
    type = "S"
  }

  attribute {
    name = "status"
    type = "S"
  }

  attribute {
    name = "createdAt"
    type = "S"
  }

  global_secondary_index {
    name     = "email-index"
    hash_key = "email"
    projection_type = "ALL"
  }

  global_secondary_index {
    name     = "status-index"
    hash_key = "status"
    projection_type = "ALL"
  }

  global_secondary_index {
    name     = "createdAt-index"
    hash_key = "createdAt"
    projection_type = "ALL"
  }

  server_side_encryption {
    enabled     = true
    kms_key_id  = aws_kms_key.dynamodb.arn
  }

  tags = {
    Service     = "lead-service"
    Environment = var.environment
  }
}`}</pre>
                        </div>
                      </div>

                      <div>
                        <p className="font-semibold mb-2">IAM Role for Content Service</p>
                        <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                          <pre>{`# IAM Role for Content Service
resource "aws_iam_role" "content_service_role" {
  name = "mindlinks-website-content-service-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      }
    }]
  })
}

# DynamoDB Permissions
resource "aws_iam_role_policy" "content_service_dynamodb" {
  name = "content-service-dynamodb-policy"
  role = aws_iam_role.content_service_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:Query",
        "dynamodb:Scan"
      ]
      Resource = [
        aws_dynamodb_table.website_blog_posts.arn,
        "\${aws_dynamodb_table.website_blog_posts.arn}/index/*",
        aws_dynamodb_table.website_pages.arn,
        "\${aws_dynamodb_table.website_pages.arn}/index/*",
        aws_dynamodb_table.website_media.arn,
        "\${aws_dynamodb_table.website_media.arn}/index/*"
      ]
    }]
  })
}

# S3 Permissions for Media
resource "aws_iam_role_policy" "content_service_s3" {
  name = "content-service-s3-policy"
  role = aws_iam_role.content_service_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:PutObjectAcl"
      ]
      Resource = "\${aws_s3_bucket.website_media.arn}/*"
    }]
  })
}

# ElastiCache Permissions
resource "aws_iam_role_policy" "content_service_redis" {
  name = "content-service-redis-policy"
  role = aws_iam_role.content_service_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "elasticache:DescribeCacheClusters",
        "elasticache:DescribeReplicationGroups"
      ]
      Resource = "*"
    }]
  })
}`}</pre>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4">Service Connection to DynamoDB</h4>
                  <Card className="p-6">
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold mb-2">NestJS DynamoDB Integration Example</p>
                        <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                          <pre>{`// src/config/dynamodb.config.ts
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  // Credentials automatically from IAM role (ECS task role)
});

export const dynamoClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

// src/services/blog.service.ts
import { dynamoClient } from '../config/dynamodb.config';

@Injectable()
export class BlogService {
  private readonly tableName = process.env.BLOG_POSTS_TABLE_NAME;

  async getPostBySlug(slug: string) {
    // Check Redis cache first
    const cached = await this.redis.get(\`blog:\${slug}\`);
    if (cached) return JSON.parse(cached);

    // Query DynamoDB
    const result = await dynamoClient.query({
      TableName: this.tableName,
      IndexName: 'slug-index',
      KeyConditionExpression: 'slug = :slug',
      ExpressionAttributeValues: {
        ':slug': slug
      }
    });

    if (result.Items && result.Items.length > 0) {
      const post = result.Items[0];
      // Cache for 1 hour
      await this.redis.setex(\`blog:\${slug}\`, 3600, JSON.stringify(post));
      return post;
    }

    return null;
  }

  async createPost(postData: CreatePostDto) {
    const post = {
      id: uuidv4(),
      ...postData,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await dynamoClient.put({
      TableName: this.tableName,
      Item: post
    });

    return post;
  }
}`}</pre>
                        </div>
                      </div>

                      <div>
                        <p className="font-semibold mb-2">ECS Task Definition with Environment Variables</p>
                        <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
                          <pre>{`# ECS Task Definition for Content Service
resource "aws_ecs_task_definition" "content_service" {
  family                   = "mindlinks-website-content-service"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"  # 0.25 vCPU
  memory                   = "512"   # 512 MB

  execution_role_arn = aws_iam_role.ecs_execution_role.arn
  task_role_arn      = aws_iam_role.content_service_role.arn

  container_definitions = jsonencode([{
    name  = "content-service"
    image = "\${aws_ecr_repository.content_service.repository_url}:latest"

    environment = [
      {
        name  = "AWS_REGION"
        value = var.aws_region
      },
      {
        name  = "BLOG_POSTS_TABLE_NAME"
        value = aws_dynamodb_table.website_blog_posts.name
      },
      {
        name  = "PAGES_TABLE_NAME"
        value = aws_dynamodb_table.website_pages.name
      },
      {
        name  = "MEDIA_TABLE_NAME"
        value = aws_dynamodb_table.website_media.name
      },
      {
        name  = "REDIS_HOST"
        value = aws_elasticache_cluster.redis.cache_nodes[0].address
      },
      {
        name  = "REDIS_PORT"
        value = "6379"
      },
      {
        name  = "S3_BUCKET_NAME"
        value = aws_s3_bucket.website_media.bucket
      },
      {
        name  = "SERVICE_NAME"
        value = "content-service"
      }
    ]

    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.content_service.name
        "awslogs-region"        = var.aws_region
        "awslogs-stream-prefix" = "ecs"
      }
    }

    healthCheck = {
      command     = ["CMD-SHELL", "curl -f http://localhost:4001/health || exit 1"]
      interval    = 30
      timeout     = 5
      retries     = 3
      startPeriod = 60
    }
  }])
}`}</pre>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-4">DynamoDB Best Practices</h4>
                  <Card className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="font-semibold mb-3">Design Principles</p>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>• One table per entity type (not single-table design)</li>
                          <li>• GSI for all common query patterns</li>
                          <li>• TTL for automatic data cleanup (events, sessions)</li>
                          <li>• On-demand billing for flexibility</li>
                          <li>• Point-in-time recovery enabled</li>
                          <li>• Encryption at rest with KMS</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-3">Performance Optimization</p>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          <li>• Redis caching for frequently accessed content</li>
                          <li>• Batch operations for bulk reads/writes</li>
                          <li>• Projection expressions to limit data transfer</li>
                          <li>• Consistent reads only when necessary</li>
                          <li>• Parallel queries for multiple GSIs</li>
                          <li>• Monitor CloudWatch metrics for throttling</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* FEATURES TAB */}
          <TabsContent value="features" className="space-y-8">
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6">Website Backend Features</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    Content Management
                  </h3>
                  <Card className="p-6 bg-blue-500/5 border-blue-500/30">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Blog Management</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            Rich text editor with Markdown support
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            Category and tag management
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            Featured posts and scheduling
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            SEO optimization (meta tags, Open Graph)
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            RSS feed generation
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Page Management</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            Page templates (Home, About, Services)
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            WYSIWYG editor for content
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            SEO metadata per page
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            Version history
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-500" />
                    Lead Generation
                  </h3>
                  <Card className="p-6 bg-purple-500/5 border-purple-500/30">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Contact Forms</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Name, email, company, message</li>
                          <li>• Rate limiting (prevent spam)</li>
                          <li>• Email notifications to admin</li>
                          <li>• Auto-responder to user</li>
                          <li>• Lead tracking and status</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Demo Requests</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Company information</li>
                          <li>• Use case details</li>
                          <li>• Preferred date/time</li>
                          <li>• Sales team notifications</li>
                          <li>• Demo scheduling workflow</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Newsletter</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Double opt-in verification</li>
                          <li>• Unsubscribe functionality</li>
                          <li>• GDPR compliant</li>
                          <li>• Subscription preferences</li>
                          <li>• Welcome emails</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-green-500" />
                    Analytics & Tracking
                  </h3>
                  <Card className="p-6 bg-green-500/5 border-green-500/30">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Event Tracking</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Page views and time on page</li>
                          <li>• Button clicks and interactions</li>
                          <li>• Form submissions</li>
                          <li>• Video plays and downloads</li>
                          <li>• Conversion events</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Metrics & Reporting</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Traffic metrics (views, visitors)</li>
                          <li>• Engagement metrics (bounce rate, duration)</li>
                          <li>• Conversion funnel analysis</li>
                          <li>• Popular content tracking</li>
                          <li>• Real-time dashboard</li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* DATA FLOW TAB */}
          <TabsContent value="dataflow" className="space-y-8">
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6">Data Flow Architecture</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Content Delivery Flow</h3>
                  <Card className="p-6">
                    <div className="space-y-4">
                      {[
                        {
                          step: "1",
                          action: "User requests blog post",
                          data: "GET /api/content/blog/:slug",
                          storage: "Check Redis cache first",
                          service: "Content Service"
                        },
                        {
                          step: "2",
                          action: "Cache miss - Query DynamoDB",
                          data: "Query website-blog-posts table",
                          storage: "DynamoDB: website-blog-posts",
                          service: "Content Service"
                        },
                        {
                          step: "3",
                          action: "Return blog post data",
                          data: "Blog post JSON with content",
                          storage: "Cache in Redis (1hr TTL)",
                          service: "Content Service → Website"
                        },
                        {
                          step: "4",
                          action: "Media files via CloudFront",
                          data: "Images, documents",
                          storage: "S3 → CloudFront → User",
                          service: "CloudFront CDN"
                        },
                      ].map((item, idx) => (
                        <div key={idx} className="border-l-4 border-blue-500 pl-4 py-2">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs">
                              {item.step}
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold">{item.action}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                <strong>Request:</strong> {item.data}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                <strong>Storage:</strong> {item.storage}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                <strong>Service:</strong> {item.service}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Lead Generation Flow</h3>
                  <Card className="p-6">
                    <div className="space-y-4">
                      {[
                        {
                          step: "1",
                          action: "User submits contact form",
                          data: "POST /api/leads/contact",
                          storage: "Rate limit check (Redis)",
                          service: "Lead Service"
                        },
                        {
                          step: "2",
                          action: "Validate and store lead",
                          data: "Contact form data",
                          storage: "DynamoDB: website-contacts",
                          service: "Lead Service"
                        },
                        {
                          step: "3",
                          action: "Send email notifications",
                          data: "Email to admin + auto-responder",
                          storage: "SendGrid API",
                          service: "Lead Service → SendGrid"
                        },
                        {
                          step: "4",
                          action: "Track conversion event",
                          data: "Event: form_submit",
                          storage: "DynamoDB: website-events",
                          service: "Analytics Service"
                        },
                        {
                          step: "5",
                          action: "Admin reviews lead",
                          data: "GET /api/leads (admin)",
                          storage: "DynamoDB: website-contacts",
                          service: "Lead Service → Admin Panel"
                        },
                      ].map((item, idx) => (
                        <div key={idx} className="border-l-4 border-purple-500 pl-4 py-2">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-xs">
                              {item.step}
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold">{item.action}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                <strong>Request:</strong> {item.data}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                <strong>Storage:</strong> {item.storage}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                <strong>Service:</strong> {item.service}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Newsletter Subscription Flow</h3>
                  <Card className="p-6">
                    <div className="space-y-4">
                      {[
                        {
                          step: "1",
                          action: "User subscribes to newsletter",
                          data: "POST /api/leads/newsletter {email}",
                          storage: "DynamoDB: website-newsletter-subscriptions (status: pending)",
                          service: "Lead Service"
                        },
                        {
                          step: "2",
                          action: "Send verification email",
                          data: "Email with verification token",
                          storage: "SendGrid API",
                          service: "Lead Service → SendGrid"
                        },
                        {
                          step: "3",
                          action: "User clicks verification link",
                          data: "GET /api/leads/newsletter/verify/:token",
                          storage: "Update status to verified",
                          service: "Lead Service"
                        },
                        {
                          step: "4",
                          action: "Send welcome email",
                          data: "Welcome email template",
                          storage: "SendGrid API",
                          service: "Lead Service → SendGrid"
                        },
                        {
                          step: "5",
                          action: "Track subscription event",
                          data: "Event: newsletter_subscribed",
                          storage: "DynamoDB: website-events",
                          service: "Analytics Service"
                        },
                      ].map((item, idx) => (
                        <div key={idx} className="border-l-4 border-green-500 pl-4 py-2">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-xs">
                              {item.step}
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold">{item.action}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                <strong>Request:</strong> {item.data}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                <strong>Storage:</strong> {item.storage}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                <strong>Service:</strong> {item.service}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* DEPLOYMENT TAB */}
          <TabsContent value="deployment" className="space-y-8">
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6">Deployment Architecture</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">CI/CD Pipeline</h3>
                  <Card className="p-6 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
                    <div className="space-y-4">
                      {[
                        { step: "1", action: "Developer pushes code", location: "GitHub repository" },
                        { step: "2", action: "GitHub Actions triggered", location: "CI pipeline" },
                        { step: "3", action: "Run tests (unit, integration)", location: "GitHub Actions runner" },
                        { step: "4", action: "Build Docker images", location: "Per service" },
                        { step: "5", action: "Push to ECR", location: "AWS ECR repository" },
                        { step: "6", action: "Deploy to ECS Fargate", location: "AWS ECS service" },
                        { step: "7", action: "Health check & smoke tests", location: "ECS service" },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                            {item.step}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{item.action}</p>
                            <p className="text-sm text-muted-foreground">{item.location}</p>
                          </div>
                          {idx < 6 && <ArrowRight className="w-5 h-5 text-muted-foreground" />}
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Environments</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="p-6 border-2 border-green-500/30 bg-green-500/5">
                      <h4 className="font-semibold mb-3">Development</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li>• Local DynamoDB (DynamoDB Local)</li>
                        <li>• Local Redis</li>
                        <li>• Mock SendGrid</li>
                        <li>• Hot reload enabled</li>
                        <li>• 1 task per service</li>
                      </ul>
                    </Card>

                    <Card className="p-6 border-2 border-yellow-500/30 bg-yellow-500/5">
                      <h4 className="font-semibold mb-3">Staging</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li>• AWS DynamoDB (on-demand)</li>
                        <li>• ElastiCache Redis</li>
                        <li>• SendGrid test account</li>
                        <li>• 1 task per service</li>
                        <li>• Integration tests</li>
                      </ul>
                    </Card>

                    <Card className="p-6 border-2 border-red-500/30 bg-red-500/5">
                      <h4 className="font-semibold mb-3">Production</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li>• AWS DynamoDB (on-demand)</li>
                        <li>• ElastiCache Redis</li>
                        <li>• SendGrid production</li>
                        <li>• 2 tasks per service</li>
                        <li>• Auto-scaling enabled</li>
                      </ul>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Scaling Configuration</h3>
                  <Card className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-semibold">Auto-Scaling Policies</p>
                          <p className="text-sm text-muted-foreground">
                            Each service scales independently based on CPU utilization (target: 70%),
                            memory utilization, and request count. Scales from 1-3 tasks per service.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Cpu className="w-5 h-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-semibold">Resource Allocation</p>
                          <p className="text-sm text-muted-foreground">
                            All services: 0.25 vCPU, 512MB RAM<br />
                            Optimized for high read traffic with caching
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Activity className="w-5 h-5 text-purple-500 mt-0.5" />
                        <div>
                          <p className="font-semibold">Caching Strategy</p>
                          <p className="text-sm text-muted-foreground">
                            Redis cache for blog posts and pages (1hr TTL). CloudFront CDN for
                            media files. Cache hit rate target: {'>'}80%.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WebsiteBackendArchitecture;



