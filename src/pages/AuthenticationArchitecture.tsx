import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { 
  Shield, 
  Database, 
  Server, 
  Key, 
  RefreshCw, 
  Lock, 
  Zap,
  GitBranch,
  Cloud,
  Code,
  CheckCircle2,
  AlertCircle,
  Clock,
  Users
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert";
import { Separator } from "@/shared/components/ui/separator";
import { AuthFlowVisualization } from "@/shared/components/AuthFlowVisualization";

const AuthenticationArchitecture = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="outline">
            <Shield className="w-3 h-3 mr-1" />
            POC Architecture
          </Badge>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Authentication Service Architecture
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            AWS + Terraform + API Gateway - Complete Flow Documentation
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="border-t-4 border-t-blue-500">
            <CardHeader>
              <Users className="w-8 h-8 text-blue-500 mb-2" />
              <CardTitle>Web Client</CardTitle>
              <CardDescription>Next.js + React + TypeScript</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-t-4 border-t-green-500">
            <CardHeader>
              <Server className="w-8 h-8 text-green-500 mb-2" />
              <CardTitle>Auth Service</CardTitle>
              <CardDescription>NestJS on ECS Fargate</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-t-4 border-t-purple-500">
            <CardHeader>
              <Shield className="w-8 h-8 text-purple-500 mb-2" />
              <CardTitle>Security</CardTitle>
              <CardDescription>RS256 JWT + Token Rotation</CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-t-4 border-t-orange-500">
            <CardHeader>
              <GitBranch className="w-8 h-8 text-orange-500 mb-2" />
              <CardTitle>CI/CD</CardTitle>
              <CardDescription>GitHub Actions + Terraform</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
            <TabsTrigger value="flows">Runtime Flows</TabsTrigger>
            <TabsTrigger value="tokens">Token Architecture</TabsTrigger>
            <TabsTrigger value="cicd">CI/CD Pipeline</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Architecture Overview</CardTitle>
                <CardDescription>
                  Complete Authentication Service in AWS-based microservices environment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Architecture Diagram */}
                  <div className="bg-slate-50 p-8 rounded-lg border-2 border-slate-200">
                    <div className="space-y-4">
                      {/* Client Layer */}
                      <div className="flex items-center justify-center">
                        <div className="bg-blue-100 border-2 border-blue-500 rounded-lg p-4 text-center w-48">
                          <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                          <div className="font-semibold">Web Client</div>
                          <div className="text-xs text-slate-600 mt-1">React/Next.js</div>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <div className="border-l-2 border-slate-300 h-8"></div>
                      </div>

                      {/* API Gateway Layer */}
                      <div className="flex items-center justify-center">
                        <div className="bg-purple-100 border-2 border-purple-500 rounded-lg p-4 text-center w-80">
                          <Shield className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                          <div className="font-semibold">AWS API Gateway</div>
                          <div className="text-xs text-slate-600 mt-1">JWT Validation • Rate Limiting • Routing</div>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <div className="border-l-2 border-slate-300 h-8"></div>
                      </div>

                      {/* Auth Service Layer */}
                      <div className="flex items-center justify-center">
                        <div className="bg-green-100 border-2 border-green-500 rounded-lg p-6 text-center w-80">
                          <Server className="w-8 h-8 mx-auto mb-2 text-green-600" />
                          <div className="font-semibold text-lg">Auth Service</div>
                          <div className="text-xs text-slate-600 mt-1">ECS Fargate</div>
                          <div className="text-xs text-slate-600 mt-2">Login • Register • Refresh • Logout</div>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <div className="border-l-2 border-slate-300 h-8"></div>
                      </div>

                      {/* Data Layer */}
                      <div className="flex items-center justify-center gap-4">
                        <div className="bg-slate-100 border-2 border-slate-500 rounded-lg p-4 text-center flex-1 max-w-xs">
                          <Database className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                          <div className="font-semibold">PostgreSQL (RDS)</div>
                          <div className="text-xs text-slate-600 mt-1">Users • Passwords</div>
                          <div className="text-xs text-slate-600">Refresh Tokens</div>
                        </div>
                        <div className="bg-red-100 border-2 border-red-500 rounded-lg p-4 text-center flex-1 max-w-xs">
                          <Zap className="w-6 h-6 mx-auto mb-2 text-red-600" />
                          <div className="font-semibold">Redis</div>
                          <div className="text-xs text-slate-600 mt-1">Token Cache</div>
                          <div className="text-xs text-slate-600">Rate Limiting</div>
                        </div>
                        <div className="bg-yellow-100 border-2 border-yellow-500 rounded-lg p-4 text-center flex-1 max-w-xs">
                          <Key className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                          <div className="font-semibold">Secrets Manager</div>
                          <div className="text-xs text-slate-600 mt-1">JWT Keys</div>
                          <div className="text-xs text-slate-600">DB Credentials</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>Project Structure</AlertTitle>
                    <AlertDescription>
                      <pre className="mt-2 bg-slate-100 p-4 rounded text-xs overflow-x-auto">
{`root/
 ├── frontend/                 (Next.js Web App)
 │    ├── pages/
 │    ├── components/
 │    └── lib/
 ├── backend/
 │    └── auth-service/        (NestJS API)
 │         ├── src/
 │         │    ├── auth/
 │         │    ├── users/
 │         │    └── main.ts
 │         └── Dockerfile
 ├── infra/
 │    └── terraform/           (Infrastructure as Code)
 │         ├── api-gateway.tf
 │         ├── ecs.tf
 │         ├── rds.tf
 │         ├── redis.tf
 │         └── secrets.tf
 └── .github/
      └── workflows/            (CI/CD Pipelines)
           └── deploy.yml`}
                      </pre>
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Infrastructure Tab */}
          <TabsContent value="infrastructure" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* ECS Fargate */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Server className="w-5 h-5 text-blue-500" />
                    <CardTitle>ECS Fargate</CardTitle>
                  </div>
                  <CardDescription>Serverless container orchestration</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Runs Auth Service container</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>CPU/memory configurable (256 CPU, 512 MB)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Auto-scaling capability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Behind Application Load Balancer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Pulls images from ECR</span>
                    </li>
                  </ul>

                  <div className="mt-4 bg-slate-50 p-3 rounded">
                    <div className="text-xs font-mono">
                      <div className="text-slate-500">// Terraform Example</div>
                      <div className="text-blue-600">resource "aws_ecs_task_definition" "auth"</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* PostgreSQL RDS */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-slate-500" />
                    <CardTitle>PostgreSQL (RDS)</CardTitle>
                  </div>
                  <CardDescription>Primary relational database</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="font-semibold text-sm mb-2">Stores:</div>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>User accounts</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Password hashes (bcrypt)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>User metadata</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Refresh token metadata</span>
                        </li>
                      </ul>
                    </div>

                    <Separator />

                    <div className="bg-slate-50 p-3 rounded text-xs">
                      <div className="font-semibold mb-1">Schema Example:</div>
                      <code className="text-slate-700">
                        users (id, email, password_hash, role, created_at)
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Redis */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-red-500" />
                    <CardTitle>Redis (ElastiCache)</CardTitle>
                  </div>
                  <CardDescription>In-memory data store</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="font-semibold text-sm mb-2">Used for:</div>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center gap-2">
                          <RefreshCw className="w-3 h-3 text-red-500" />
                          <span>Refresh token rotation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Lock className="w-3 h-3 text-red-500" />
                          <span>JTI Blacklist</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-red-500" />
                          <span>Session invalidation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Shield className="w-3 h-3 text-red-500" />
                          <span>Rate limiting</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-red-50 p-3 rounded text-xs">
                      <div className="font-semibold mb-1">Example Entry:</div>
                      <code className="text-red-700">
                        refresh:user_12345:jti_98271398 → valid (30d TTL)
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Secrets Manager */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Key className="w-5 h-5 text-yellow-500" />
                    <CardTitle>Secrets Manager</CardTitle>
                  </div>
                  <CardDescription>Secure credential storage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="font-semibold text-sm mb-2">Stores:</div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Key className="w-4 h-4 text-yellow-500 mt-0.5" />
                          <div>
                            <div className="font-medium">JWT Private Key (RS256)</div>
                            <div className="text-xs text-slate-500">Signs access tokens</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Key className="w-4 h-4 text-yellow-500 mt-0.5" />
                          <div>
                            <div className="font-medium">JWT Public Key</div>
                            <div className="text-xs text-slate-500">For API Gateway validation</div>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <Database className="w-4 h-4 text-yellow-500 mt-0.5" />
                          <span>Database password</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Zap className="w-4 h-4 text-yellow-500 mt-0.5" />
                          <span>Redis credentials</span>
                        </li>
                      </ul>
                    </div>

                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        Keys rotated every 90 days for security
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>

              {/* API Gateway */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Cloud className="w-5 h-5 text-purple-500" />
                    <CardTitle>AWS API Gateway</CardTitle>
                  </div>
                  <CardDescription>Central API management and routing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="font-semibold text-sm mb-3">Responsibilities:</div>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-purple-500" />
                          <span>JWT validation via JWKS endpoint</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <GitBranch className="w-4 h-4 text-purple-500" />
                          <span>Route traffic to microservices</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-purple-500" />
                          <span>Rate limiting (100 req/s, 200 burst)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Server className="w-4 h-4 text-purple-500" />
                          <span>CORS configuration</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 p-4 rounded">
                      <div className="font-semibold text-sm mb-2">JWT Authorizer Config:</div>
                      <pre className="text-xs overflow-x-auto">
{`{
  "type": "JWT",
  "issuer": "auth.yourcompany.com",
  "audience": "your-api",
  "jwks_uri": "/auth/.well-known/jwks.json",
  "cache_ttl": 300
}`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Runtime Flows Tab */}
          <TabsContent value="flows" className="space-y-6">
            {/* Interactive Flow Visualization */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-500" />
                  Interactive Flow Visualization
                </CardTitle>
                <CardDescription>Click on any step to see detailed code examples</CardDescription>
              </CardHeader>
              <CardContent>
                <AuthFlowVisualization />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Authentication Runtime Flows</CardTitle>
                <CardDescription>Step-by-step flow examples with payloads</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="login">Login Flow</TabsTrigger>
                    <TabsTrigger value="protected">Protected Route</TabsTrigger>
                    <TabsTrigger value="refresh">Refresh Token</TabsTrigger>
                  </TabsList>

                  {/* Login Flow */}
                  <TabsContent value="login" className="space-y-4">
                    <div className="space-y-4">
                      {/* Step 1 */}
                      <div className="border-l-4 border-blue-500 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Step 1</Badge>
                          <span className="font-semibold">Client → API Gateway</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded text-sm">
                          <div className="font-mono text-xs mb-2 text-slate-600">POST /auth/login</div>
                          <pre className="text-xs overflow-x-auto">
{`{
  "email": "john@example.com",
  "password": "12345678"
}`}
                          </pre>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="border-l-4 border-purple-500 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Step 2</Badge>
                          <span className="font-semibold">API Gateway → Auth Service</span>
                        </div>
                        <p className="text-sm text-slate-600">
                          For /auth/login, JWT Authorizer is disabled. Request forwarded directly to Auth Service.
                        </p>
                      </div>

                      {/* Step 3 */}
                      <div className="border-l-4 border-slate-500 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Step 3</Badge>
                          <span className="font-semibold">Auth Service → RDS</span>
                        </div>
                        <p className="text-sm text-slate-600">
                          Validate user credentials against database (bcrypt password verification)
                        </p>
                      </div>

                      {/* Step 4 */}
                      <div className="border-l-4 border-red-500 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Step 4</Badge>
                          <span className="font-semibold">Auth Service → Redis</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">
                          Store refresh token with JTI (JWT ID) for rotation tracking
                        </p>
                        <div className="bg-red-50 p-3 rounded text-xs font-mono">
                          SETEX refresh:user_12345:jti_98271398 2592000 "valid"
                        </div>
                      </div>

                      {/* Step 5 */}
                      <div className="border-l-4 border-yellow-500 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Step 5</Badge>
                          <span className="font-semibold">Auth Service → Signs JWT</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">
                          Load private key from Secrets Manager and sign access token
                        </p>
                      </div>

                      {/* Step 6 */}
                      <div className="border-l-4 border-green-500 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Step 6</Badge>
                          <span className="font-semibold">Auth Service → Client</span>
                        </div>
                        <div className="bg-green-50 p-3 rounded text-sm">
                          <div className="font-mono text-xs mb-2 text-green-700">200 OK</div>
                          <pre className="text-xs overflow-x-auto">
{`{
  "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "rt_8a7d9f2e4b1c...",
  "expiresIn": 900,
  "tokenType": "Bearer"
}`}
                          </pre>
                        </div>
                      </div>

                      <Alert>
                        <Clock className="h-4 w-4" />
                        <AlertTitle>Token Expiry</AlertTitle>
                        <AlertDescription>
                          Access token expires in 15 minutes (900 seconds). Refresh token valid for 7-30 days.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </TabsContent>

                  {/* Protected Route Flow */}
                  <TabsContent value="protected" className="space-y-4">
                    <div className="space-y-4">
                      {/* Request */}
                      <div className="border-l-4 border-blue-500 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Request</Badge>
                          <span className="font-semibold">Client → API Gateway</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded text-sm">
                          <pre className="text-xs overflow-x-auto">
{`GET /user/profile
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...`}
                          </pre>
                        </div>
                      </div>

                      {/* Validation */}
                      <div className="border-l-4 border-purple-500 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Validation</Badge>
                          <span className="font-semibold">API Gateway JWT Authorizer</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>Reads public key from JWKS endpoint</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>Validates JWT signature (RS256)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>Checks token expiry (exp claim)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>Verifies issuer and audience</span>
                          </div>
                        </div>
                      </div>

                      {/* Success Path */}
                      <div className="border-l-4 border-green-500 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">If Valid</Badge>
                          <span className="font-semibold">Forward to Auth Service</span>
                        </div>
                        <p className="text-sm text-slate-600">
                          Request forwarded to Auth Service with decoded JWT claims in headers
                        </p>
                        <div className="bg-green-50 p-3 rounded text-xs mt-2">
                          <div className="font-mono">X-User-Id: user_12345</div>
                          <div className="font-mono">X-User-Email: john@example.com</div>
                          <div className="font-mono">X-User-Roles: CLIENT</div>
                        </div>
                      </div>

                      {/* Failure Path */}
                      <div className="border-l-4 border-red-500 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">If Invalid</Badge>
                          <span className="font-semibold">401 Unauthorized</span>
                        </div>
                        <div className="bg-red-50 p-3 rounded text-sm">
                          <pre className="text-xs">
{`{
  "message": "Unauthorized",
  "error": "Invalid or expired token"
}`}
                          </pre>
                        </div>
                      </div>

                      <Alert className="border-blue-500">
                        <Shield className="h-4 w-4" />
                        <AlertTitle>No Backend Call Needed</AlertTitle>
                        <AlertDescription>
                          API Gateway validates tokens without calling Auth Service, improving performance
                        </AlertDescription>
                      </Alert>
                    </div>
                  </TabsContent>

                  {/* Refresh Token Flow */}
                  <TabsContent value="refresh" className="space-y-4">
                    <div className="space-y-4">
                      {/* Request */}
                      <div className="border-l-4 border-blue-500 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Step 1</Badge>
                          <span className="font-semibold">Client → API Gateway</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded text-sm">
                          <div className="font-mono text-xs mb-2 text-slate-600">POST /auth/refresh</div>
                          <pre className="text-xs overflow-x-auto">
{`{
  "refreshToken": "rt_8a7d9f2e4b1c..."
}`}
                          </pre>
                        </div>
                      </div>

                      {/* Fetch from Redis */}
                      <div className="border-l-4 border-red-500 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Step 2</Badge>
                          <span className="font-semibold">Auth Service → Redis</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">
                          Fetch refresh token JTI from Redis and verify validity
                        </p>
                        <div className="bg-red-50 p-3 rounded text-xs font-mono">
                          GET refresh:user_12345:jti_98271398
                        </div>
                      </div>

                      {/* Validate */}
                      <div className="border-l-4 border-purple-500 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Step 3</Badge>
                          <span className="font-semibold">Validate Token</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>Check if token exists in Redis</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>Verify token hasn't been revoked</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>Check expiry time</span>
                          </div>
                        </div>
                      </div>

                      {/* Rotate */}
                      <div className="border-l-4 border-yellow-500 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Step 4</Badge>
                          <span className="font-semibold">Rotate JTI</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">
                          Invalidate old token and generate new JTI
                        </p>
                        <div className="bg-yellow-50 p-3 rounded text-xs font-mono space-y-1">
                          <div className="text-red-600">DEL refresh:user_12345:jti_98271398</div>
                          <div className="text-green-600">SETEX refresh:user_12345:jti_NEW_ID 2592000 "valid"</div>
                        </div>
                      </div>

                      {/* Issue New Tokens */}
                      <div className="border-l-4 border-green-500 pl-4 py-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Step 5</Badge>
                          <span className="font-semibold">Issue New Tokens</span>
                        </div>
                        <div className="bg-green-50 p-3 rounded text-sm">
                          <div className="font-mono text-xs mb-2 text-green-700">200 OK</div>
                          <pre className="text-xs overflow-x-auto">
{`{
  "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "rt_NEW_TOKEN_HERE...",
  "expiresIn": 900
}`}
                          </pre>
                        </div>
                      </div>

                      <Alert className="border-orange-500">
                        <RefreshCw className="h-4 w-4" />
                        <AlertTitle>Token Rotation Security</AlertTitle>
                        <AlertDescription>
                          Old refresh token is immediately invalidated. If old token is reused, both tokens are revoked (potential attack detected).
                        </AlertDescription>
                      </Alert>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Token Architecture Tab */}
          <TabsContent value="tokens" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Access Token */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Key className="w-5 h-5 text-blue-500" />
                    <CardTitle>JWT Access Token</CardTitle>
                  </div>
                  <CardDescription>Short-lived authentication token</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="font-semibold text-sm mb-2">Characteristics:</div>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">RS256</Badge>
                        <span>Asymmetric signing algorithm</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        <span>Expires in 15 minutes</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Shield className="w-3 h-3" />
                        <span>Stateless validation</span>
                      </li>
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <div className="font-semibold text-sm mb-2">Payload Example:</div>
                    <div className="bg-blue-50 p-3 rounded">
                      <pre className="text-xs overflow-x-auto">
{`{
  "sub": "user_12345",
  "email": "john@example.com",
  "roles": ["CLIENT"],
  "permissions": [
    "contract:create",
    "payment:initiate"
  ],
  "iat": 1731333100,
  "exp": 1731334000,
  "iss": "auth.yourcompany.com",
  "aud": "deelcraft-api"
}`}
                      </pre>
                    </div>
                  </div>

                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertTitle>Security Note</AlertTitle>
                    <AlertDescription className="text-xs">
                      Never store sensitive data (passwords, SSNs) in JWT. Payload is base64-encoded, not encrypted.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Refresh Token */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-green-500" />
                    <CardTitle>Refresh Token</CardTitle>
                  </div>
                  <CardDescription>Long-lived rotation token</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="font-semibold text-sm mb-2">Characteristics:</div>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">Opaque</Badge>
                        <span>Random string (not JWT)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        <span>Expires in 7-30 days</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <RefreshCw className="w-3 h-3" />
                        <span>Rotated on every use</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Database className="w-3 h-3" />
                        <span>Stored in Redis + PostgreSQL</span>
                      </li>
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <div className="font-semibold text-sm mb-2">Redis Storage:</div>
                    <div className="bg-red-50 p-3 rounded">
                      <div className="text-xs font-mono space-y-1">
                        <div className="text-slate-600">// Key format</div>
                        <div>refresh:&#123;userId&#125;:&#123;jti&#125;</div>
                        <div className="text-slate-600 mt-2">// Example</div>
                        <div className="text-red-600">
                          refresh:user_12345:jti_98271398 → "valid"
                        </div>
                        <div className="text-slate-600">TTL: 2592000 seconds (30 days)</div>
                      </div>
                    </div>
                  </div>

                  <Alert className="border-orange-500">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Rotation Security</AlertTitle>
                    <AlertDescription className="text-xs">
                      Old token invalidated immediately. Detects token theft if old token is reused.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Token Lifecycle */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Token Lifecycle & Rotation Flow</CardTitle>
                  <CardDescription>How tokens are created, used, and invalidated</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-50 p-6 rounded-lg">
                    <div className="space-y-4">
                      {/* Login */}
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          1
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">Login (t=0)</div>
                          <div className="text-sm text-slate-600">User logs in with credentials</div>
                          <div className="text-xs font-mono bg-white p-2 mt-1 rounded">
                            ✓ Access Token (expires: t+15m) + Refresh Token (expires: t+30d)
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <div className="border-l-2 border-slate-300 h-8"></div>
                      </div>

                      {/* Use Access Token */}
                      <div className="flex items-center gap-4">
                        <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          2
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">Use Access Token (t+1m to t+15m)</div>
                          <div className="text-sm text-slate-600">Make API calls with access token</div>
                          <div className="text-xs font-mono bg-white p-2 mt-1 rounded">
                            Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <div className="border-l-2 border-slate-300 h-8"></div>
                      </div>

                      {/* Access Token Expires */}
                      <div className="flex items-center gap-4">
                        <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          3
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">Access Token Expires (t+15m)</div>
                          <div className="text-sm text-slate-600">API returns 401 Unauthorized</div>
                          <div className="text-xs font-mono bg-white p-2 mt-1 rounded text-red-600">
                            ✗ Token expired, client must refresh
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <div className="border-l-2 border-slate-300 h-8"></div>
                      </div>

                      {/* Refresh */}
                      <div className="flex items-center gap-4">
                        <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          4
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">Refresh Token (t+16m)</div>
                          <div className="text-sm text-slate-600">Client sends refresh token to get new access token</div>
                          <div className="text-xs font-mono bg-white p-2 mt-1 rounded">
                            ✓ New Access Token (expires: t+31m) + New Refresh Token (expires: t+30d+16m)
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <div className="border-l-2 border-slate-300 h-8"></div>
                      </div>

                      {/* Continue */}
                      <div className="flex items-center gap-4">
                        <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          5
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">Continue Using New Access Token</div>
                          <div className="text-sm text-slate-600">Cycle repeats every 15 minutes</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Alert className="mt-4">
                    <RefreshCw className="h-4 w-4" />
                    <AlertTitle>Automatic Refresh</AlertTitle>
                    <AlertDescription>
                      Frontend automatically refreshes access token 1 minute before expiry to ensure uninterrupted service
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* CI/CD Pipeline Tab */}
          <TabsContent value="cicd" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>CI/CD Pipeline (GitHub Actions)</CardTitle>
                <CardDescription>Automated build, test, and deployment workflow</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Pipeline Stages */}
                  <div className="bg-slate-50 p-6 rounded-lg space-y-4">
                    {/* Stage 1 */}
                    <div className="border-l-4 border-blue-500 pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge>Stage 1</Badge>
                        <span className="font-semibold">Build & Test</span>
                      </div>
                      <div className="bg-white p-3 rounded text-sm space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <code className="text-xs">nx build auth-service</code>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <code className="text-xs">nx test auth-service</code>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <code className="text-xs">nx lint auth-service</code>
                        </div>
                      </div>
                    </div>

                    {/* Stage 2 */}
                    <div className="border-l-4 border-purple-500 pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge>Stage 2</Badge>
                        <span className="font-semibold">Build Docker Image</span>
                      </div>
                      <div className="bg-white p-3 rounded text-sm">
                        <code className="text-xs">
                          docker build -t auth-service:latest -f apps/auth-service/Dockerfile .
                        </code>
                      </div>
                    </div>

                    {/* Stage 3 */}
                    <div className="border-l-4 border-green-500 pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge>Stage 3</Badge>
                        <span className="font-semibold">Push to AWS ECR</span>
                      </div>
                      <div className="bg-white p-3 rounded text-sm space-y-1">
                        <div className="text-xs font-mono">
                          aws ecr get-login-password --region us-east-1 | docker login --username AWS
                        </div>
                        <div className="text-xs font-mono">
                          docker tag auth-service:latest $&#123;ECR_REPO_URL&#125;/auth-service:latest
                        </div>
                        <div className="text-xs font-mono">
                          docker push $&#123;ECR_REPO_URL&#125;/auth-service:latest
                        </div>
                      </div>
                    </div>

                    {/* Stage 4 */}
                    <div className="border-l-4 border-orange-500 pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge>Stage 4</Badge>
                        <span className="font-semibold">Apply Terraform</span>
                      </div>
                      <div className="bg-white p-3 rounded text-sm space-y-2">
                        <div className="text-xs font-mono">cd infra/terraform</div>
                        <div className="text-xs font-mono">terraform init</div>
                        <div className="text-xs font-mono">terraform plan</div>
                        <div className="text-xs font-mono">terraform apply -auto-approve</div>
                      </div>
                      <div className="mt-2 text-xs text-slate-600">
                        Updates: ECS task definition, API Gateway, Secrets, Security groups, Redis/RDS networking
                      </div>
                    </div>

                    {/* Stage 5 */}
                    <div className="border-l-4 border-teal-500 pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge>Stage 5</Badge>
                        <span className="font-semibold">Deploy & Verify</span>
                      </div>
                      <div className="bg-white p-3 rounded text-sm space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-xs">ECS service updates with new task definition</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-xs">Health check passes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-xs">Smoke tests run</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* GitHub Actions Workflow */}
                  <div>
                    <div className="font-semibold mb-3">Example GitHub Actions Workflow:</div>
                    <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-xs">
{`name: Deploy Auth Service

on:
  push:
    branches: [main]
    paths:
      - 'apps/auth-service/**'
      - 'libs/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build & Test
        run: |
          npx nx build auth-service
          npx nx test auth-service
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      
      - name: Login to Amazon ECR
        run: |
          aws ecr get-login-password | docker login --username AWS \\
            --password-stdin \${{ secrets.ECR_REPO_URL }}
      
      - name: Build & Push Docker Image
        run: |
          docker build -t auth-service:latest .
          docker tag auth-service:latest \${{ secrets.ECR_REPO_URL }}/auth-service:latest
          docker push \${{ secrets.ECR_REPO_URL }}/auth-service:latest
      
      - name: Deploy with Terraform
        run: |
          cd infra/terraform
          terraform init
          terraform apply -auto-approve`}
                      </pre>
                    </div>
                  </div>

                  <Alert>
                    <GitBranch className="h-4 w-4" />
                    <AlertTitle>GitOps Workflow</AlertTitle>
                    <AlertDescription>
                      Every push to main branch automatically triggers build, test, and deployment. Rollback is as simple as reverting the commit.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer CTA */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 mt-12">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">Ready to Implement?</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                This authentication architecture is production-ready and focused. A single Auth Service handles all authentication needs for your web application.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button asChild>
                  <a href="/">Back to Home</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/product-brief">View Product Brief</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthenticationArchitecture;

