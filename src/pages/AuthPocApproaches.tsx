import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Server, 
  DollarSign, 
  Clock, 
  Code, 
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  Package,
  Database,
  Cloud,
  Cpu,
  HardDrive,
  Gauge,
  Timer,
  Workflow,
  GitBranch,
  Award,
  Target
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const AuthPocApproaches = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="outline">
            <Target className="w-3 h-3 mr-1" />
            POC Decision Guide
          </Badge>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Auth Service POC Approaches
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Lambda vs ECS Fargate: Which deployment strategy gets you to MVP fastest?
          </p>
        </div>

        {/* Quick Recommendation */}
        <Alert className="mb-8 border-green-500 bg-green-50">
          <Award className="h-5 w-5 text-green-600" />
          <AlertTitle className="text-green-800 text-lg">Quick Recommendation</AlertTitle>
          <AlertDescription className="text-green-700 mt-2">
            <strong>For POC/MVP: Choose Lambda</strong> - Deploy in 1 day, $0 cost, zero infrastructure management. 
            Migrate to ECS later only if traffic demands it.
          </AlertDescription>
        </Alert>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Lambda Card */}
          <Card className="border-2 border-green-500 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-8 h-8 text-green-600" />
                  <CardTitle className="text-2xl">AWS Lambda</CardTitle>
                </div>
                <Badge className="bg-green-600 text-white">Recommended</Badge>
              </div>
              <CardDescription className="text-green-700 font-medium">
                Serverless Functions - Pay per execution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-semibold">Deploy in 1 Day</div>
                    <div className="text-sm text-slate-600">Setup in hours, not days</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-semibold">$0 for POC</div>
                    <div className="text-sm text-slate-600">Free tier covers development</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-semibold">Auto-Scaling</div>
                    <div className="text-sm text-slate-600">Instant, automatic, no config</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <div className="font-semibold">Cold Starts</div>
                    <div className="text-sm text-slate-600">100-500ms first request</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ECS Card */}
          <Card className="border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-sky-50">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Server className="w-8 h-8 text-blue-600" />
                  <CardTitle className="text-2xl">ECS Fargate</CardTitle>
                </div>
                <Badge variant="outline">For Scale</Badge>
              </div>
              <CardDescription className="text-blue-700 font-medium">
                Containerized Apps - Always-on compute
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-semibold">No Cold Starts</div>
                    <div className="text-sm text-slate-600">Consistent performance</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-semibold">Full Control</div>
                    <div className="text-sm text-slate-600">Traditional app architecture</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <div className="font-semibold">5 Days Setup</div>
                    <div className="text-sm text-slate-600">Complex infrastructure</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <div className="font-semibold">$30-50/month POC</div>
                    <div className="text-sm text-slate-600">Always-on costs</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="comparison" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="comparison">Quick Compare</TabsTrigger>
            <TabsTrigger value="lambda">Lambda Deep Dive</TabsTrigger>
            <TabsTrigger value="ecs">ECS Deep Dive</TabsTrigger>
            <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
            <TabsTrigger value="decision">Decision Guide</TabsTrigger>
          </TabsList>

          {/* Quick Comparison Tab */}
          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Side-by-Side Comparison</CardTitle>
                <CardDescription>All key factors for your POC decision</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Setup Time */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-slate-600" />
                        <span className="font-semibold">Setup Time</span>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Lambda</span>
                          <Badge variant="outline" className="bg-green-100 text-green-700">6 hours</Badge>
                        </div>
                        <Progress value={20} className="h-2 bg-green-100" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">ECS Fargate</span>
                          <Badge variant="outline" className="bg-blue-100 text-blue-700">5 days</Badge>
                        </div>
                        <Progress value={100} className="h-2 bg-blue-100" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Cost */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-slate-600" />
                        <span className="font-semibold">POC Cost (Monthly)</span>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-3xl font-bold text-green-700">$0</div>
                        <div className="text-sm text-green-600">Lambda (Free Tier)</div>
                        <div className="text-xs text-slate-600 mt-1">1M requests included</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="text-3xl font-bold text-blue-700">$34</div>
                        <div className="text-sm text-blue-600">ECS Fargate</div>
                        <div className="text-xs text-slate-600 mt-1">Always-on compute</div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Deploy Speed */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-slate-600" />
                        <span className="font-semibold">Deployment Speed</span>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Lambda</span>
                          <Badge className="bg-green-600">30 seconds</Badge>
                        </div>
                        <div className="text-xs text-slate-600">Instant updates</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">ECS Fargate</span>
                          <Badge className="bg-blue-600">5 minutes</Badge>
                        </div>
                        <div className="text-xs text-slate-600">Container rebuild + deploy</div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Performance */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Gauge className="w-5 h-5 text-slate-600" />
                        <span className="font-semibold">Performance</span>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="font-medium text-sm">Lambda</div>
                        <div className="text-xs text-slate-600">Cold start: 100-500ms</div>
                        <div className="text-xs text-slate-600">Warm: 5-50ms</div>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-700">Variable</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="font-medium text-sm">ECS Fargate</div>
                        <div className="text-xs text-slate-600">Always: 5-50ms</div>
                        <div className="text-xs text-slate-600">No cold starts</div>
                        <Badge variant="outline" className="bg-green-100 text-green-700">Consistent</Badge>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Complexity */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Code className="w-5 h-5 text-slate-600" />
                        <span className="font-semibold">Complexity</span>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Serverless Framework</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Auto infrastructure</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Simple config file</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-600" />
                          <span className="text-sm">Docker + Terraform</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-600" />
                          <span className="text-sm">Manual networking</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-600" />
                          <span className="text-sm">Complex config</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Winner Summary */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <Award className="w-12 h-12 text-green-600 mx-auto" />
                  <h3 className="text-2xl font-bold text-green-800">Winner for POC: Lambda</h3>
                  <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">5x</div>
                      <div className="text-sm text-slate-600">Faster Setup</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">$0</div>
                      <div className="text-sm text-slate-600">POC Cost</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">10x</div>
                      <div className="text-sm text-slate-600">Simpler</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lambda Deep Dive Tab */}
          <TabsContent value="lambda" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-green-600" />
                  AWS Lambda - Under the Hood
                </CardTitle>
                <CardDescription>How serverless functions actually work</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* How Lambda Works */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">How Lambda Works</h3>
                  <div className="bg-slate-50 p-6 rounded-lg space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center text-green-700 font-bold flex-shrink-0">
                          1
                        </div>
                        <div>
                          <div className="font-semibold">Request Arrives</div>
                          <div className="text-sm text-slate-600">API Gateway receives POST /auth/login</div>
                        </div>
                      </div>
                      
                      <div className="ml-4 border-l-2 border-slate-300 h-8"></div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center text-green-700 font-bold flex-shrink-0">
                          2
                        </div>
                        <div>
                          <div className="font-semibold">Lambda Invocation</div>
                          <div className="text-sm text-slate-600">API Gateway triggers the login Lambda function</div>
                        </div>
                      </div>
                      
                      <div className="ml-4 border-l-2 border-slate-300 h-8"></div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center text-orange-700 font-bold flex-shrink-0">
                          3
                        </div>
                        <div>
                          <div className="font-semibold">Cold Start (First Time)</div>
                          <div className="text-sm text-slate-600">AWS spins up new execution environment (100-500ms)</div>
                          <div className="text-xs text-orange-600 mt-1">• Download code from S3</div>
                          <div className="text-xs text-orange-600">• Initialize runtime (Node.js)</div>
                          <div className="text-xs text-orange-600">• Run init code (DB connections)</div>
                        </div>
                      </div>
                      
                      <div className="ml-4 border-l-2 border-slate-300 h-8"></div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center text-green-700 font-bold flex-shrink-0">
                          4
                        </div>
                        <div>
                          <div className="font-semibold">Execute Function</div>
                          <div className="text-sm text-slate-600">Your code runs (5-50ms)</div>
                          <div className="text-xs text-slate-600 mt-1">• Validate credentials</div>
                          <div className="text-xs text-slate-600">• Generate JWT</div>
                          <div className="text-xs text-slate-600">• Return response</div>
                        </div>
                      </div>
                      
                      <div className="ml-4 border-l-2 border-slate-300 h-8"></div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-700 font-bold flex-shrink-0">
                          5
                        </div>
                        <div>
                          <div className="font-semibold">Environment Stays Warm</div>
                          <div className="text-sm text-slate-600">Container reused for next 15 minutes (5-50ms each)</div>
                          <div className="text-xs text-green-600 mt-1">Next requests: No cold start! ✅</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Code Example */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Lambda Function Example</h3>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`// handler.ts - Login Lambda Function
import { APIGatewayProxyHandler } from 'aws-lambda';
import { connectDB } from './db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ⭐ Global variables (reused across invocations)
let dbConnection: any = null;

export const login: APIGatewayProxyHandler = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body || '{}');
    
    // 🔄 Reuse connection if already established
    if (!dbConnection) {
      console.log('🆕 Creating new DB connection');
      dbConnection = await connectDB();
    } else {
      console.log('♻️  Reusing existing DB connection');
    }
    
    // Query user from database
    const result = await dbConnection.query(
      'SELECT * FROM users WHERE email = $1', 
      [email]
    );
    
    if (!result.rows[0]) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid credentials' })
      };
    }
    
    // Verify password
    const valid = await bcrypt.compare(
      password, 
      result.rows[0].password_hash
    );
    
    if (!valid) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid credentials' })
      };
    }
    
    // Generate JWT
    const accessToken = jwt.sign(
      { userId: result.rows[0].id, email },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );
    
    // ✅ Success response
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ accessToken })
    };
    
  } catch (error) {
    console.error('❌ Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};`}
                    </pre>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <Alert>
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertTitle>Performance Tip</AlertTitle>
                      <AlertDescription className="text-xs">
                        Global variables (like <code className="bg-slate-200 px-1 rounded">dbConnection</code>) persist between invocations in the same container, avoiding reconnection overhead!
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>

                <Separator />

                {/* Serverless.yml Config */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Serverless Framework Configuration</h3>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`# serverless.yml
service: auth-service

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  environment:
    DATABASE_URL: \${env:DATABASE_URL}
    JWT_SECRET: \${env:JWT_SECRET}
    REDIS_URL: \${env:REDIS_URL}

functions:
  # Login endpoint
  login:
    handler: handler.login
    events:
      - httpApi:
          path: /auth/login
          method: post
    # 512MB memory, 10 second timeout
    memorySize: 512
    timeout: 10
  
  # Register endpoint
  register:
    handler: handler.register
    events:
      - httpApi:
          path: /auth/register
          method: post
    memorySize: 512
    timeout: 10
  
  # Refresh token endpoint
  refresh:
    handler: handler.refresh
    events:
      - httpApi:
          path: /auth/refresh
          method: post
    memorySize: 256
    timeout: 5

# 🚀 Deploy with: serverless deploy (30 seconds!)`}
                    </pre>
                  </div>
                </div>

                <Separator />

                {/* Pros and Cons */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        Advantages
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="text-green-600 mt-0.5">✓</div>
                          <span><strong>Zero infrastructure</strong> - AWS manages everything</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="text-green-600 mt-0.5">✓</div>
                          <span><strong>Auto-scaling</strong> - 0 to 1000 concurrent instantly</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="text-green-600 mt-0.5">✓</div>
                          <span><strong>Pay per use</strong> - No idle costs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="text-green-600 mt-0.5">✓</div>
                          <span><strong>Fast deploys</strong> - 30 seconds</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="text-green-600 mt-0.5">✓</div>
                          <span><strong>Built-in monitoring</strong> - CloudWatch logs</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 bg-orange-50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-orange-600" />
                        Limitations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="text-orange-600 mt-0.5">!</div>
                          <span><strong>Cold starts</strong> - 100-500ms on first request</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="text-orange-600 mt-0.5">!</div>
                          <span><strong>15 min timeout</strong> - Max execution time</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="text-orange-600 mt-0.5">!</div>
                          <span><strong>Stateless</strong> - No persistent connections</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="text-orange-600 mt-0.5">!</div>
                          <span><strong>Vendor lock-in</strong> - AWS-specific</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="text-orange-600 mt-0.5">!</div>
                          <span><strong>Local testing</strong> - Harder to replicate</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ECS Deep Dive Tab */}
          <TabsContent value="ecs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-6 h-6 text-blue-600" />
                  ECS Fargate - Under the Hood
                </CardTitle>
                <CardDescription>How containerized services work</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* How ECS Works */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">How ECS Fargate Works</h3>
                  <div className="bg-slate-50 p-6 rounded-lg space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-700 font-bold flex-shrink-0">
                          1
                        </div>
                        <div>
                          <div className="font-semibold">Container Always Running</div>
                          <div className="text-sm text-slate-600">ECS task continuously runs your NestJS app</div>
                          <div className="text-xs text-blue-600 mt-1">• No startup delay</div>
                          <div className="text-xs text-blue-600">• Database connections established</div>
                          <div className="text-xs text-blue-600">• Memory pre-allocated</div>
                        </div>
                      </div>
                      
                      <div className="ml-4 border-l-2 border-slate-300 h-8"></div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-700 font-bold flex-shrink-0">
                          2
                        </div>
                        <div>
                          <div className="font-semibold">Request Arrives</div>
                          <div className="text-sm text-slate-600">Load Balancer receives request</div>
                        </div>
                      </div>
                      
                      <div className="ml-4 border-l-2 border-slate-300 h-8"></div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-700 font-bold flex-shrink-0">
                          3
                        </div>
                        <div>
                          <div className="font-semibold">Route to Container</div>
                          <div className="text-sm text-slate-600">ALB forwards to healthy ECS task</div>
                        </div>
                      </div>
                      
                      <div className="ml-4 border-l-2 border-slate-300 h-8"></div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center text-green-700 font-bold flex-shrink-0">
                          4
                        </div>
                        <div>
                          <div className="font-semibold">Instant Response</div>
                          <div className="text-sm text-slate-600">App processes request (5-50ms)</div>
                          <div className="text-xs text-green-600 mt-1">No cold start! ✅</div>
                        </div>
                      </div>
                      
                      <div className="ml-4 border-l-2 border-slate-300 h-8"></div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center text-purple-700 font-bold flex-shrink-0">
                          5
                        </div>
                        <div>
                          <div className="font-semibold">Auto-Scaling (Optional)</div>
                            <div className="text-sm text-slate-600">ECS spins up more tasks if CPU &gt; 70%</div>
                          <div className="text-xs text-slate-600 mt-1">Takes 2-3 minutes to scale</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Code Example */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">NestJS Controller Example</h3>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`// auth.controller.ts - NestJS Controller
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('refresh')
  async refresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refresh(refreshDto);
  }
}

// auth.service.ts - Business Logic
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    
    // Find user
    const user = await this.userRepo.findOne({ 
      where: { email } 
    });
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // Verify password
    const valid = await bcrypt.compare(password, user.passwordHash);
    
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    // Generate JWT
    const accessToken = this.jwtService.sign({
      userId: user.id,
      email: user.email,
    });
    
    return { accessToken };
  }
}`}
                    </pre>
                  </div>
                </div>

                <Separator />

                {/* Dockerfile */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Dockerfile</h3>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production image
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3000

# Health check for ECS
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD node healthcheck.js || exit 1

CMD ["node", "dist/main.js"]`}
                    </pre>
                  </div>
                </div>

                <Separator />

                {/* Terraform Config */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Terraform ECS Configuration</h3>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`# ecs.tf
resource "aws_ecs_cluster" "main" {
  name = "auth-cluster"
}

resource "aws_ecs_task_definition" "auth" {
  family                   = "auth-service"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"  # 0.25 vCPU
  memory                   = "512"  # 512 MB
  
  container_definitions = jsonencode([{
    name  = "auth-service"
    image = "\${aws_ecr_repository.auth.repository_url}:latest"
    
    portMappings = [{
      containerPort = 3000
      protocol      = "tcp"
    }]
    
    environment = [
      { name = "NODE_ENV", value = "production" },
      { name = "PORT", value = "3000" }
    ]
    
    secrets = [
      {
        name      = "DATABASE_URL"
        valueFrom = aws_secretsmanager_secret.db_url.arn
      },
      {
        name      = "JWT_SECRET"
        valueFrom = aws_secretsmanager_secret.jwt.arn
      }
    ]
    
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = "/ecs/auth-service"
        "awslogs-region"        = "us-east-1"
        "awslogs-stream-prefix" = "ecs"
      }
    }
  }])
}

resource "aws_ecs_service" "auth" {
  name            = "auth-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.auth.arn
  desired_count   = 1  # Always 1 running for POC
  launch_type     = "FARGATE"
  
  network_configuration {
    subnets          = aws_subnet.private[*].id
    security_groups  = [aws_security_group.auth.id]
    assign_public_ip = false
  }
  
  load_balancer {
    target_group_arn = aws_lb_target_group.auth.arn
    container_name   = "auth-service"
    container_port   = 3000
  }
}

# 🚀 Deploy with: terraform apply (10-15 minutes)`}
                    </pre>
                  </div>
                </div>

                <Separator />

                {/* Pros and Cons */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="border-blue-200 bg-blue-50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                        Advantages
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="text-blue-600 mt-0.5">✓</div>
                          <span><strong>No cold starts</strong> - Consistent performance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="text-blue-600 mt-0.5">✓</div>
                          <span><strong>Full control</strong> - Traditional app structure</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="text-blue-600 mt-0.5">✓</div>
                          <span><strong>Stateful possible</strong> - WebSockets, long connections</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="text-blue-600 mt-0.5">✓</div>
                          <span><strong>Docker portable</strong> - Run anywhere</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="text-blue-600 mt-0.5">✓</div>
                          <span><strong>Local dev easy</strong> - docker-compose</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 bg-red-50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-red-600" />
                        Disadvantages
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <div className="text-red-600 mt-0.5">✗</div>
                          <span><strong>Always-on costs</strong> - $30-50/month minimum</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="text-red-600 mt-0.5">✗</div>
                          <span><strong>Complex setup</strong> - VPC, networking, LB</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="text-red-600 mt-0.5">✗</div>
                          <span><strong>Slow deploys</strong> - 5-10 minutes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="text-red-600 mt-0.5">✗</div>
                          <span><strong>Manual scaling</strong> - Configure policies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="text-red-600 mt-0.5">✗</div>
                          <span><strong>More to manage</strong> - Containers, networking</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cost Analysis Tab */}
          <TabsContent value="costs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  Detailed Cost Analysis
                </CardTitle>
                <CardDescription>Real numbers for POC and production</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* POC Phase */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">POC Phase (100 users, 10K requests/month)</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Lambda Cost */}
                    <Card className="border-green-200 bg-green-50">
                      <CardHeader>
                        <CardTitle className="text-lg">Lambda + API Gateway</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Lambda Requests</span>
                          <span className="font-mono text-sm">10,000</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Compute (GB-seconds)</span>
                          <span className="font-mono text-sm">5,000</span>
                        </div>
                        <div className="flex justify-between items-center text-green-600">
                          <span className="text-sm font-semibold">Free Tier</span>
                          <span className="font-mono">1M requests</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Total</span>
                          <span className="text-2xl font-bold text-green-700">$0</span>
                        </div>
                        <div className="text-xs text-green-600">
                          ✓ Completely covered by AWS Free Tier
                        </div>
                      </CardContent>
                    </Card>

                    {/* ECS Cost */}
                    <Card className="border-blue-200 bg-blue-50">
                      <CardHeader>
                        <CardTitle className="text-lg">ECS Fargate</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">0.25 vCPU × 730 hours</span>
                          <span className="font-mono text-sm">$29.54</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">0.5 GB RAM × 730 hours</span>
                          <span className="font-mono text-sm">$1.62</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Data Transfer</span>
                          <span className="font-mono text-sm">$1.00</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">CloudWatch Logs</span>
                          <span className="font-mono text-sm">$2.00</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Total</span>
                          <span className="text-2xl font-bold text-blue-700">$34</span>
                        </div>
                        <div className="text-xs text-blue-600">
                          Always-on compute costs
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-4 bg-green-100 border border-green-300 rounded-lg p-4">
                    <div className="font-semibold text-green-800 mb-2">💰 POC Savings: $34/month with Lambda</div>
                    <div className="text-sm text-green-700">Over 12-week POC: Save $102</div>
                  </div>
                </div>

                <Separator />

                {/* Production Phase */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Production (10K MAU, 1M requests/month)</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Lambda Cost */}
                    <Card className="border-green-200 bg-green-50">
                      <CardHeader>
                        <CardTitle className="text-lg">Lambda + API Gateway</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Lambda (1M requests)</span>
                          <span className="font-mono text-sm">$20.00</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">API Gateway (1M)</span>
                          <span className="font-mono text-sm">$3.50</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Data Transfer</span>
                          <span className="font-mono text-sm">$5.00</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Total</span>
                          <span className="text-2xl font-bold text-green-700">$28.50</span>
                        </div>
                        <div className="text-xs text-green-600">
                          Cost per user: $0.0028/month
                        </div>
                      </CardContent>
                    </Card>

                    {/* ECS Cost */}
                    <Card className="border-blue-200 bg-blue-50">
                      <CardHeader>
                        <CardTitle className="text-lg">ECS Fargate (3 tasks avg)</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">3 × vCPU (0.25 each)</span>
                          <span className="font-mono text-sm">$88.62</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">3 × RAM (0.5 GB each)</span>
                          <span className="font-mono text-sm">$4.86</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Load Balancer</span>
                          <span className="font-mono text-sm">$16.00</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Data Transfer</span>
                          <span className="font-mono text-sm">$5.00</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">CloudWatch</span>
                          <span className="font-mono text-sm">$5.00</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Total</span>
                          <span className="text-2xl font-bold text-blue-700">$119.48</span>
                        </div>
                        <div className="text-xs text-blue-600">
                          Cost per user: $0.0119/month
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-4 bg-green-100 border border-green-300 rounded-lg p-4">
                    <div className="font-semibold text-green-800 mb-2">💰 Production Savings: $91/month with Lambda</div>
                    <div className="text-sm text-green-700">Annual savings: $1,092</div>
                  </div>
                </div>

                <Separator />

                {/* Cost Comparison Chart */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Cost Growth Comparison</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">100 users</span>
                        <div className="flex gap-4">
                          <Badge className="bg-green-600">Lambda: $0</Badge>
                          <Badge className="bg-blue-600">ECS: $34</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Progress value={0} className="h-3" />
                        <Progress value={20} className="h-3 bg-blue-100" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">1,000 users</span>
                        <div className="flex gap-4">
                          <Badge className="bg-green-600">Lambda: $5</Badge>
                          <Badge className="bg-blue-600">ECS: $50</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Progress value={10} className="h-3" />
                        <Progress value={40} className="h-3 bg-blue-100" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">10,000 users</span>
                        <div className="flex gap-4">
                          <Badge className="bg-green-600">Lambda: $29</Badge>
                          <Badge className="bg-blue-600">ECS: $119</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Progress value={30} className="h-3" />
                        <Progress value={100} className="h-3 bg-blue-100" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">100,000 users</span>
                        <div className="flex gap-4">
                          <Badge className="bg-green-600">Lambda: $285</Badge>
                          <Badge className="bg-blue-600">ECS: $400</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Progress value={70} className="h-3" />
                        <Progress value={100} className="h-3 bg-blue-100" />
                      </div>
                    </div>
                  </div>

                  <Alert className="mt-4">
                    <TrendingUp className="h-4 w-4" />
                    <AlertTitle>Cost Crossover Point</AlertTitle>
                    <AlertDescription className="text-xs">
                      Lambda becomes more expensive than ECS around 100K+ highly active users. 
                      But you'll have revenue by then to cover either option! 🎉
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Decision Guide Tab */}
          <TabsContent value="decision" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-6 h-6 text-purple-600" />
                  Decision Framework
                </CardTitle>
                <CardDescription>Choose the right approach for your needs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Choose Lambda If */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-green-700">✅ Choose Lambda If:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="border-green-200 bg-green-50">
                      <CardContent className="pt-6">
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                                <div className="font-semibold">You want to launch POC in &lt; 1 day</div>
                              <div className="text-xs text-slate-600">Speed to market is critical</div>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                              <div className="font-semibold">Budget is tight ($0 for POC)</div>
                              <div className="text-xs text-slate-600">No money for always-on compute</div>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                              <div className="font-semibold">Traffic is unpredictable or low</div>
                              <div className="text-xs text-slate-600">Pay only for actual usage</div>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                              <div className="font-semibold">Want zero infrastructure management</div>
                              <div className="text-xs text-slate-600">Focus on code, not servers</div>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                              <div className="font-semibold">Cold starts (100-500ms) are acceptable</div>
                              <div className="text-xs text-slate-600">Auth doesn't need instant response</div>
                            </div>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-green-200 bg-green-50">
                      <CardContent className="pt-6">
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                              <div className="font-semibold">Team comfortable with serverless</div>
                              <div className="text-xs text-slate-600">Or willing to learn (it's easy!)</div>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                                <div className="font-semibold">Requests complete in &lt; 15 minutes</div>
                              <div className="text-xs text-slate-600">Lambda timeout limit</div>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                              <div className="font-semibold">Stateless architecture is fine</div>
                              <div className="text-xs text-slate-600">Auth is naturally stateless</div>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                              <div className="font-semibold">Want automatic scaling</div>
                              <div className="text-xs text-slate-600">0 to 1000 concurrent instantly</div>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                              <div className="font-semibold">Validating business model first</div>
                              <div className="text-xs text-slate-600">Can optimize architecture later</div>
                            </div>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator />

                {/* Choose ECS If */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">⚙️ Choose ECS Fargate If:</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="border-blue-200 bg-blue-50">
                      <CardContent className="pt-6">
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <Server className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                              <div className="font-semibold">Need consistent low latency</div>
                              <div className="text-xs text-slate-600">No cold starts acceptable</div>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <Server className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                                <div className="font-semibold">Have long-running processes (&gt;15 min)</div>
                              <div className="text-xs text-slate-600">Lambda has timeout limits</div>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <Server className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                              <div className="font-semibold">Need WebSocket support</div>
                              <div className="text-xs text-slate-600">Persistent connections</div>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <Server className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                              <div className="font-semibold">Want to avoid vendor lock-in</div>
                              <div className="text-xs text-slate-600">Docker runs anywhere</div>
                            </div>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-blue-200 bg-blue-50">
                      <CardContent className="pt-6">
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <Server className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                              <div className="font-semibold">Team prefers traditional architecture</div>
                              <div className="text-xs text-slate-600">Familiar with containers</div>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <Server className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                              <div className="font-semibold">Building for production from day 1</div>
                              <div className="text-xs text-slate-600">No POC validation needed</div>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <Server className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                              <div className="font-semibold">Budget allows $30-50/month for POC</div>
                              <div className="text-xs text-slate-600">Always-on costs acceptable</div>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <Server className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                              <div className="font-semibold">Need full environment control</div>
                              <div className="text-xs text-slate-600">Custom configurations</div>
                            </div>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator />

                {/* Migration Path */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">🔄 Migration Path (Lambda → ECS)</h3>
                  <div className="space-y-4">
                    <Alert>
                      <Workflow className="h-4 w-4" />
                      <AlertTitle>Good News: You Can Migrate Later!</AlertTitle>
                      <AlertDescription>
                        Start with Lambda to validate quickly, then migrate to ECS only if traffic demands it.
                      </AlertDescription>
                    </Alert>

                    <div className="bg-slate-50 p-6 rounded-lg space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-green-100 rounded-lg px-4 py-2 text-center min-w-32">
                          <div className="font-bold text-green-700">Month 1-3</div>
                          <div className="text-xs text-green-600">POC Phase</div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-400" />
                        <div className="flex-1">
                          <div className="font-semibold">Lambda POC</div>
                          <div className="text-sm text-slate-600">Cost: $0-5/month</div>
                          <div className="text-xs text-green-600">✓ Validate business model</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 rounded-lg px-4 py-2 text-center min-w-32">
                          <div className="font-bold text-blue-700">Month 4-6</div>
                          <div className="text-xs text-blue-600">Growth Phase</div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-400" />
                        <div className="flex-1">
                          <div className="font-semibold">Optimize Lambda</div>
                          <div className="text-sm text-slate-600">Cost: $20-40/month</div>
                          <div className="text-xs text-slate-600">• Add caching</div>
                          <div className="text-xs text-slate-600">• Provisioned concurrency for warm starts</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="bg-purple-100 rounded-lg px-4 py-2 text-center min-w-32">
                          <div className="font-bold text-purple-700">Month 6+</div>
                          <div className="text-xs text-purple-600">Scale Phase</div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-400" />
                        <div className="flex-1">
                          <div className="font-semibold">Evaluate Migration</div>
                          <div className="text-sm text-slate-600">Migrate to ECS only if:</div>
                            <div className="text-xs text-slate-600">• Traffic &gt; 1M requests/month</div>
                            <div className="text-xs text-slate-600">• Cold starts become issue</div>
                            <div className="text-xs text-slate-600">• Lambda costs &gt; $50/month</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Final Recommendation */}
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <h3 className="text-2xl font-bold text-green-800">Final Recommendation</h3>
                      <p className="text-lg text-green-700 max-w-2xl mx-auto">
                        <strong>Start with Lambda.</strong> Deploy your POC in 1 day for $0. 
                        Validate your business model. Migrate to ECS later only if traffic demands it.
                      </p>
                      <div className="flex gap-4 justify-center pt-4">
                        <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
                          <a href="/lambda-architecture">
                            <Zap className="w-5 h-5 mr-2" />
                            View Lambda Architecture
                          </a>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                          <a href="/ecs-architecture">
                            <Server className="w-5 h-5 mr-2" />
                            View ECS Architecture
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <Card className="mt-12 bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-slate-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold">Need More Details?</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Check out our comprehensive documentation and guides for implementing either approach.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button variant="outline" asChild>
                  <a href="/">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Back to Home
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/lambda-architecture">
                    <Zap className="w-4 h-4 mr-2" />
                    Lambda Architecture
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/ecs-architecture">
                    <Server className="w-4 h-4 mr-2" />
                    ECS Architecture
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/product-brief">
                    Product Brief
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPocApproaches;

