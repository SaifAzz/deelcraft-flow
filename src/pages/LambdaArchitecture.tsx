import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { 
  Zap, 
  Database, 
  Cloud, 
  Key, 
  Shield, 
  CheckCircle2,
  ArrowRight,
  Code,
  Package,
  FileCode,
  Terminal,
  Play,
  Clock,
  DollarSign,
  Activity,
  Layers,
  Workflow,
  GitBranch
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert";
import { Separator } from "@/shared/components/ui/separator";

const LambdaArchitecture = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-yellow-600">
            <Zap className="w-3 h-3 mr-1" />
            Serverless Architecture
          </Badge>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Lambda Architecture - Complete Flow
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Serverless Auth Service with AWS Lambda + API Gateway - Deploy in 1 Day
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6 text-center">
              <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-700">1 Day</div>
              <div className="text-sm text-slate-600">Setup Time</div>
            </CardContent>
          </Card>
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6 text-center">
              <DollarSign className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-700">~$0</div>
              <div className="text-sm text-slate-600">POC Cost/Month</div>
            </CardContent>
          </Card>
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6 text-center">
              <Zap className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-700">&lt;30s</div>
              <div className="text-sm text-slate-600">Deploy Time</div>
            </CardContent>
          </Card>
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6 text-center">
              <CheckCircle2 className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-700">Auto</div>
              <div className="text-sm text-slate-600">Scaling</div>
            </CardContent>
          </Card>
        </div>

        {/* Architecture Diagram */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Lambda Architecture Overview</CardTitle>
            <CardDescription>Event-driven, pay-per-request authentication system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-50 p-8 rounded-lg border-2 border-slate-200">
              <div className="space-y-6">
                {/* Web Client */}
                <div className="flex items-center justify-center">
                  <div className="bg-blue-100 border-2 border-blue-500 rounded-lg p-4 text-center w-56">
                    <Cloud className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <div className="font-semibold">Web Client</div>
                    <div className="text-xs text-slate-600 mt-1">Next.js/React</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-slate-400 rotate-90" />
                </div>

                {/* API Gateway */}
                <div className="flex items-center justify-center">
                  <div className="bg-purple-100 border-2 border-purple-500 rounded-lg p-4 text-center w-96">
                    <Shield className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                    <div className="font-semibold">AWS API Gateway (HTTP API)</div>
                    <div className="text-xs text-slate-600 mt-1">JWT Authorizer • CORS • Throttling • $1/million requests</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-slate-400 rotate-90" />
                </div>

                {/* Lambda Functions */}
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <div className="bg-yellow-100 border-2 border-yellow-500 rounded-lg p-4 text-center w-48">
                    <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                    <div className="font-semibold text-sm">λ Login</div>
                    <div className="text-xs text-slate-600 mt-1">POST /auth/login</div>
                  </div>
                  <div className="bg-yellow-100 border-2 border-yellow-500 rounded-lg p-4 text-center w-48">
                    <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                    <div className="font-semibold text-sm">λ Register</div>
                    <div className="text-xs text-slate-600 mt-1">POST /auth/register</div>
                  </div>
                  <div className="bg-yellow-100 border-2 border-yellow-500 rounded-lg p-4 text-center w-48">
                    <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                    <div className="font-semibold text-sm">λ Refresh</div>
                    <div className="text-xs text-slate-600 mt-1">POST /auth/refresh</div>
                  </div>
                  <div className="bg-yellow-100 border-2 border-yellow-500 rounded-lg p-4 text-center w-48">
                    <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                    <div className="font-semibold text-sm">λ GetProfile</div>
                    <div className="text-xs text-slate-600 mt-1">GET /auth/me</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-slate-400 rotate-90" />
                </div>

                {/* Data Layer */}
                <div className="flex items-center justify-center gap-4">
                  <div className="bg-slate-100 border-2 border-slate-500 rounded-lg p-4 text-center flex-1 max-w-xs">
                    <Database className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                    <div className="font-semibold">RDS Postgres</div>
                    <div className="text-xs text-slate-600 mt-1">Users • Passwords</div>
                    <div className="text-xs text-slate-600">Refresh Tokens</div>
                  </div>
                  <div className="bg-red-100 border-2 border-red-500 rounded-lg p-4 text-center flex-1 max-w-xs">
                    <Activity className="w-6 h-6 mx-auto mb-2 text-red-600" />
                    <div className="font-semibold">ElastiCache</div>
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

            <Alert className="mt-6 border-yellow-500 bg-yellow-50">
              <Zap className="h-4 w-4 text-yellow-600" />
              <AlertTitle className="text-yellow-800">Serverless Benefits</AlertTitle>
              <AlertDescription className="text-yellow-700">
                Lambda scales automatically from 0 to thousands of concurrent requests. You only pay for actual usage.
                Perfect for POC with unpredictable traffic patterns.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="structure" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="structure">Project Structure</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
            <TabsTrigger value="deployment">Deployment</TabsTrigger>
            <TabsTrigger value="runtime">Runtime Flow</TabsTrigger>
          </TabsList>

          {/* Project Structure Tab */}
          <TabsContent value="structure" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lambda Function Structure</CardTitle>
                <CardDescription>Organized serverless application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
{`auth-service-lambda/
├── src/
│   ├── handlers/              # Lambda handlers (1 per endpoint)
│   │   ├── login.ts          # POST /auth/login
│   │   ├── register.ts       # POST /auth/register
│   │   ├── refresh.ts        # POST /auth/refresh
│   │   ├── logout.ts         # POST /auth/logout
│   │   └── getProfile.ts     # GET /auth/me
│   │
│   ├── services/             # Business logic
│   │   ├── auth.service.ts
│   │   └── user.service.ts
│   │
│   ├── repositories/         # Data access
│   │   ├── user.repository.ts
│   │   └── token.repository.ts
│   │
│   ├── database/             # DB connection (singleton)
│   │   ├── postgres.ts
│   │   └── redis.ts
│   │
│   ├── utils/                # Shared utilities
│   │   ├── jwt.ts
│   │   ├── password.ts
│   │   ├── response.ts
│   │   └── validation.ts
│   │
│   ├── middleware/           # API Gateway authorizer
│   │   └── authorizer.ts     # Separate Lambda for JWT validation
│   │
│   ├── types/                # TypeScript types
│   │   └── index.ts
│   │
│   └── config/               # Configuration
│       └── index.ts          # Load from env/Secrets Manager
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── infrastructure/           # Terraform/SAM
│   ├── template.yaml        # SAM template (easier than Terraform for Lambda)
│   └── terraform/           # Or Terraform if preferred
│       ├── main.tf
│       ├── lambda.tf
│       ├── api-gateway.tf
│       └── database.tf
│
├── scripts/
│   ├── deploy.sh
│   └── test-local.sh        # SAM local testing
│
├── package.json
├── tsconfig.json
├── samconfig.toml           # SAM CLI config
└── .env.example

frontend/                     # Next.js Web App
├── app/
├── components/
└── lib/`}
                  </pre>
                </div>

                <Alert>
                  <FileCode className="h-4 w-4" />
                  <AlertTitle>Key Architectural Decisions</AlertTitle>
                  <AlertDescription className="text-xs">
                    • <strong>One Lambda per endpoint</strong> for optimal cold start and deployment granularity<br/>
                    • <strong>Shared layer</strong> for common code (services, utils) to reduce bundle size<br/>
                    • <strong>Separate authorizer Lambda</strong> for JWT validation (reusable across endpoints)<br/>
                    • <strong>Database connection pooling</strong> with singleton pattern (reuse across warm invocations)
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Implementation Tab */}
          <TabsContent value="implementation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lambda Function Implementation</CardTitle>
                <CardDescription>TypeScript serverless handlers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Login Handler */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5 text-yellow-600" />
                    Login Handler (src/handlers/login.ts)
                  </h3>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AuthService } from '../services/auth.service';
import { validateLoginRequest } from '../utils/validation';
import { successResponse, errorResponse } from '../utils/response';

// Initialize service (reused across warm invocations)
const authService = new AuthService();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // Parse and validate request
    const body = JSON.parse(event.body || '{}');
    const validation = validateLoginRequest(body);
    
    if (!validation.success) {
      return errorResponse(400, 'Invalid request', validation.errors);
    }

    const { email, password } = body;

    // Call auth service
    const result = await authService.login(email, password);

    return successResponse(200, {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      expiresIn: 900,
      tokenType: 'Bearer',
    });
  } catch (error) {
    console.error('Login error:', error);
    
    if (error.message === 'Invalid credentials') {
      return errorResponse(401, 'Invalid credentials');
    }
    
    return errorResponse(500, 'Internal server error');
  }
};`}
                    </pre>
                  </div>
                </div>

                <Separator />

                {/* Auth Service */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Auth Service (src/services/auth.service.ts)</h3>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`import { UserRepository } from '../repositories/user.repository';
import { TokenRepository } from '../repositories/token.repository';
import { hashPassword, comparePassword } from '../utils/password';
import { signJWT, generateRefreshToken } from '../utils/jwt';

export class AuthService {
  private userRepo = new UserRepository();
  private tokenRepo = new TokenRepository();

  async login(email: string, password: string) {
    // Find user
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // Generate tokens
    const accessToken = await signJWT({
      userId: user.id,
      email: user.email,
      roles: user.roles,
    });

    const { token: refreshToken, jti } = generateRefreshToken();

    // Store refresh token in Redis + PostgreSQL
    await this.tokenRepo.storeRefreshToken({
      userId: user.id,
      jti,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async register(email: string, password: string, name: string) {
    // Check if user exists
    const existing = await this.userRepo.findByEmail(email);
    if (existing) {
      throw new Error('User already exists');
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const user = await this.userRepo.create({
      email,
      passwordHash,
      name,
      roles: ['CLIENT'],
    });

    // Return tokens (same as login)
    return this.login(email, password);
  }

  async refresh(refreshToken: string) {
    // Validate and rotate refresh token
    const isValid = await this.tokenRepo.validateRefreshToken(refreshToken);
    if (!isValid) {
      throw new Error('Invalid refresh token');
    }

    // Get user from token
    const tokenData = await this.tokenRepo.getRefreshTokenData(refreshToken);
    const user = await this.userRepo.findById(tokenData.userId);

    // Invalidate old token
    await this.tokenRepo.invalidateRefreshToken(refreshToken);

    // Issue new tokens
    return this.login(user.email, user.passwordHash); // Special internal login
  }
}`}
                    </pre>
                  </div>
                </div>

                <Separator />

                {/* Database Connection */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Database Connection (src/database/postgres.ts)</h3>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`import { Pool } from 'pg';
import { getSecret } from '../utils/secrets';

// Singleton pattern - reuse connection across warm invocations
let pool: Pool | null = null;

export async function getDbPool(): Promise<Pool> {
  if (pool) {
    return pool;
  }

  // Get credentials from Secrets Manager
  const dbSecret = await getSecret('auth-service/database');
  const dbUrl = dbSecret.DATABASE_URL;

  pool = new Pool({
    connectionString: dbUrl,
    max: 2, // Keep low for Lambda (unlike ECS)
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  return pool;
}

// Utility to execute queries
export async function query(text: string, params?: any[]) {
  const client = await getDbPool();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}`}
                    </pre>
                  </div>
                </div>

                <Separator />

                {/* JWT Authorizer */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">JWT Authorizer (src/middleware/authorizer.ts)</h3>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`import { APIGatewayAuthorizerResult, APIGatewayTokenAuthorizerEvent } from 'aws-lambda';
import { verifyJWT } from '../utils/jwt';

export const handler = async (
  event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  const token = event.authorizationToken.replace('Bearer ', '');

  try {
    // Verify JWT (checks signature + expiry)
    const decoded = await verifyJWT(token);

    // Return policy allowing access
    return {
      principalId: decoded.userId,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: event.methodArn,
          },
        ],
      },
      context: {
        userId: decoded.userId,
        email: decoded.email,
        roles: JSON.stringify(decoded.roles),
      },
    };
  } catch (error) {
    console.error('Authorization error:', error);
    throw new Error('Unauthorized');
  }
};`}
                    </pre>
                  </div>
                </div>

                <Alert className="border-yellow-500 bg-yellow-50">
                  <CheckCircle2 className="h-4 w-4 text-yellow-600" />
                  <AlertTitle className="text-yellow-800">Lambda Best Practices</AlertTitle>
                  <AlertDescription className="text-yellow-700 text-xs">
                    • <strong>Singleton connections</strong>: Reuse DB/Redis connections across warm invocations<br/>
                    • <strong>Small bundles</strong>: Keep Lambda package size under 10MB for faster cold starts<br/>
                    • <strong>Separate layers</strong>: Extract common code to Lambda Layers<br/>
                    • <strong>Error handling</strong>: Always return proper HTTP status codes
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Infrastructure Tab */}
          <TabsContent value="infrastructure" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AWS SAM Template</CardTitle>
                <CardDescription>Infrastructure as Code for Lambda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">SAM Template (template.yaml)</h3>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-xs">
{`AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: Auth Service Lambda

Globals:
  Function:
    Runtime: nodejs18.x
    Timeout: 10
    MemorySize: 512
    Environment:
      Variables:
        NODE_ENV: production

Resources:
  # API Gateway HTTP API
  AuthApi:
    Type: AWS::Serverless::HttpApi
    Properties:
      StageName: prod
      CorsConfiguration:
        AllowOrigins:
          - '*'
        AllowMethods:
          - GET
          - POST
        AllowHeaders:
          - '*'

  # JWT Authorizer Lambda
  JwtAuthorizer:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: dist/
      Handler: middleware/authorizer.handler
      Policies:
        - AWSSecretsManagerGetSecretValuePolicy:
            SecretArn: !Ref JwtSecretArn

  # Login Lambda
  LoginFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: dist/
      Handler: handlers/login.handler
      Events:
        LoginApi:
          Type: HttpApi
          Properties:
            ApiId: !Ref AuthApi
            Path: /auth/login
            Method: POST
      Policies:
        - AWSSecretsManagerGetSecretValuePolicy:
            SecretArn: !Ref DatabaseSecretArn
        - Statement:
            - Effect: Allow
              Action:
                - elasticache:*
              Resource: !GetAtt RedisCluster.Arn
      VpcConfig:
        SubnetIds:
          - !Ref PrivateSubnet1
          - !Ref PrivateSubnet2
        SecurityGroupIds:
          - !Ref LambdaSecurityGroup

  # Register Lambda
  RegisterFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: dist/
      Handler: handlers/register.handler
      Events:
        RegisterApi:
          Type: HttpApi
          Properties:
            ApiId: !Ref AuthApi
            Path: /auth/register
            Method: POST
      Policies:
        - AWSSecretsManagerGetSecretValuePolicy:
            SecretArn: !Ref DatabaseSecretArn
      VpcConfig:
        SubnetIds:
          - !Ref PrivateSubnet1
          - !Ref PrivateSubnet2
        SecurityGroupIds:
          - !Ref LambdaSecurityGroup

  # Refresh Lambda
  RefreshFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: dist/
      Handler: handlers/refresh.handler
      Events:
        RefreshApi:
          Type: HttpApi
          Properties:
            ApiId: !Ref AuthApi
            Path: /auth/refresh
            Method: POST
      Policies:
        - AWSSecretsManagerGetSecretValuePolicy:
            SecretArn: !Ref DatabaseSecretArn
      VpcConfig:
        SubnetIds:
          - !Ref PrivateSubnet1
          - !Ref PrivateSubnet2
        SecurityGroupIds:
          - !Ref LambdaSecurityGroup

  # Get Profile Lambda (Protected)
  GetProfileFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: dist/
      Handler: handlers/getProfile.handler
      Events:
        GetProfileApi:
          Type: HttpApi
          Properties:
            ApiId: !Ref AuthApi
            Path: /auth/me
            Method: GET
            Auth:
              Authorizer: JwtAuthorizer
      VpcConfig:
        SubnetIds:
          - !Ref PrivateSubnet1
          - !Ref PrivateSubnet2
        SecurityGroupIds:
          - !Ref LambdaSecurityGroup

  # RDS PostgreSQL
  AuthDatabase:
    Type: AWS::RDS::DBInstance
    Properties:
      Engine: postgres
      EngineVersion: '15.4'
      DBInstanceClass: db.t3.micro
      AllocatedStorage: 20
      MasterUsername: !Sub '{{resolve:secretsmanager:\${DatabaseSecret}:SecretString:username}}'
      MasterUserPassword: !Sub '{{resolve:secretsmanager:\${DatabaseSecret}:SecretString:password}}'
      VPCSecurityGroups:
        - !Ref DatabaseSecurityGroup
      DBSubnetGroupName: !Ref DBSubnetGroup

  # ElastiCache Redis
  RedisCluster:
    Type: AWS::ElastiCache::CacheCluster
    Properties:
      Engine: redis
      CacheNodeType: cache.t3.micro
      NumCacheNodes: 1
      VpcSecurityGroupIds:
        - !Ref RedisSecurityGroup
      CacheSubnetGroupName: !Ref RedisSubnetGroup

Outputs:
  ApiUrl:
    Description: API Gateway endpoint URL
    Value: !Sub 'https://\${AuthApi}.execute-api.\${AWS::Region}.amazonaws.com/prod'`}
                    </pre>
                  </div>
                </div>

                <Alert className="mt-4">
                  <Package className="h-4 w-4" />
                  <AlertTitle>Complete Infrastructure</AlertTitle>
                  <AlertDescription className="text-xs">
                    SAM also creates: VPC, Subnets, Security Groups, IAM Roles, CloudWatch Log Groups, 
                    and Secrets Manager resources. Everything needed for a production-ready Lambda architecture.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deployment Tab */}
          <TabsContent value="deployment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-6 h-6 text-yellow-600" />
                  Deployment Process
                </CardTitle>
                <CardDescription>Deploy in minutes with AWS SAM</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Setup Steps */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Start Deployment</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-yellow-100 rounded-full w-8 h-8 flex items-center justify-center text-yellow-700 font-bold flex-shrink-0">
                        1
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Install AWS SAM CLI</div>
                        <div className="bg-slate-900 text-slate-100 p-3 rounded mt-2">
                          <code className="text-xs">
                            # macOS<br/>
                            brew install aws-sam-cli<br/>
                            <br/>
                            # Or download from AWS docs
                          </code>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-yellow-100 rounded-full w-8 h-8 flex items-center justify-center text-yellow-700 font-bold flex-shrink-0">
                        2
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Build TypeScript Project</div>
                        <div className="bg-slate-900 text-slate-100 p-3 rounded mt-2">
                          <code className="text-xs">
                            npm install<br/>
                            npm run build  # Compiles to dist/
                          </code>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-yellow-100 rounded-full w-8 h-8 flex items-center justify-center text-yellow-700 font-bold flex-shrink-0">
                        3
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Deploy with SAM (First Time)</div>
                        <div className="bg-slate-900 text-slate-100 p-3 rounded mt-2">
                          <code className="text-xs">
                            sam build<br/>
                            sam deploy --guided
                          </code>
                        </div>
                        <div className="text-xs text-slate-600 mt-2">
                          ⏱️ Takes 5-10 minutes • Creates all AWS resources automatically
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-yellow-100 rounded-full w-8 h-8 flex items-center justify-center text-yellow-700 font-bold flex-shrink-0">
                        4
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Subsequent Deploys</div>
                        <div className="bg-slate-900 text-slate-100 p-3 rounded mt-2">
                          <code className="text-xs">
                            npm run build<br/>
                            sam build<br/>
                            sam deploy  # No --guided needed
                          </code>
                        </div>
                        <div className="text-xs text-slate-600 mt-2">⚡ Takes 20-30 seconds</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-yellow-100 rounded-full w-8 h-8 flex items-center justify-center text-yellow-700 font-bold flex-shrink-0">
                        5
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Test Your API</div>
                        <div className="bg-slate-900 text-slate-100 p-3 rounded mt-2">
                          <code className="text-xs">
                            # Get API URL from outputs<br/>
                            sam list stack-outputs<br/>
                            <br/>
                            # Test login<br/>
                            curl -X POST https://YOUR-API.execute-api.us-east-1.amazonaws.com/prod/auth/login \\<br/>
                            &nbsp;&nbsp;-H "Content-Type: application/json" \\<br/>
                            &nbsp;&nbsp;-d '&#123;"email": "test@example.com", "password": "password123"&#125;'
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Local Testing */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Local Testing with SAM</h3>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-xs">
{`# Start local API Gateway + Lambda
sam local start-api

# Your API is now running on http://localhost:3000

# Test locally
curl -X POST http://localhost:3000/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email": "test@example.com", "password": "password123"}'

# Invoke a specific function
sam local invoke LoginFunction -e events/login.json`}
                    </pre>
                  </div>
                </div>

                <Separator />

                {/* CI/CD Pipeline */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">GitHub Actions CI/CD</h3>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-xs">
{`# .github/workflows/deploy-lambda.yml
name: Deploy Lambda Auth Service

on:
  push:
    branches: [main]

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
      
      - name: Build TypeScript
        run: npm run build
      
      - name: Setup AWS SAM
        uses: aws-actions/setup-sam@v2
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      
      - name: SAM Build
        run: sam build
      
      - name: SAM Deploy
        run: sam deploy --no-confirm-changeset --no-fail-on-empty-changeset`}
                    </pre>
                  </div>
                </div>

                <Alert className="border-yellow-500 bg-yellow-50">
                  <CheckCircle2 className="h-4 w-4 text-yellow-600" />
                  <AlertTitle className="text-yellow-800">Deployment Complete!</AlertTitle>
                  <AlertDescription className="text-yellow-700">
                    Your serverless API is live! SAM outputs the API Gateway URL. 
                    Add it to your frontend's environment variables.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Runtime Flow Tab */}
          <TabsContent value="runtime" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lambda Runtime Flow</CardTitle>
                <CardDescription>How requests are processed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Login Flow Step-by-Step</h3>
                  <div className="space-y-4">
                    <Card className="border-l-4 border-l-blue-500">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-700 font-bold flex-shrink-0 text-sm">
                            1
                          </div>
                          <div>
                            <div className="font-semibold">Client Request</div>
                            <div className="text-sm text-slate-600 mt-1">
                              Web client sends POST to <code className="bg-slate-200 px-1 rounded text-xs">https://api.execute-api.../auth/login</code>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-purple-500">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center text-purple-700 font-bold flex-shrink-0 text-sm">
                            2
                          </div>
                          <div>
                            <div className="font-semibold">API Gateway</div>
                            <div className="text-sm text-slate-600 mt-1">
                              • Validates CORS headers<br/>
                              • Checks rate limiting (throttling)<br/>
                              • Routes to Login Lambda
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-yellow-500">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-yellow-100 rounded-full w-8 h-8 flex items-center justify-center text-yellow-700 font-bold flex-shrink-0 text-sm">
                            3
                          </div>
                          <div>
                            <div className="font-semibold">Lambda Invocation</div>
                            <div className="text-sm text-slate-600 mt-1">
                              • <strong>Cold start</strong> (first request): 800ms-2s (load code + init connections)<br/>
                              • <strong>Warm start</strong> (subsequent): 5-50ms<br/>
                              • Lambda reuses DB connection from previous invocation
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-slate-500">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-slate-100 rounded-full w-8 h-8 flex items-center justify-center text-slate-700 font-bold flex-shrink-0 text-sm">
                            4
                          </div>
                          <div>
                            <div className="font-semibold">Database Query</div>
                            <div className="text-sm text-slate-600 mt-1">
                              • Query PostgreSQL for user<br/>
                              • Verify password hash<br/>
                              • Query time: ~10-50ms
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-red-500">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-red-100 rounded-full w-8 h-8 flex items-center justify-center text-red-700 font-bold flex-shrink-0 text-sm">
                            5
                          </div>
                          <div>
                            <div className="font-semibold">Token Generation</div>
                            <div className="text-sm text-slate-600 mt-1">
                              • Sign JWT with RS256 (from Secrets Manager)<br/>
                              • Generate refresh token JTI<br/>
                              • Store in Redis + PostgreSQL
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-green-500">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-green-100 rounded-full w-8 h-8 flex items-center justify-center text-green-700 font-bold flex-shrink-0 text-sm">
                            6
                          </div>
                          <div>
                            <div className="font-semibold">Response</div>
                            <div className="text-sm text-slate-600 mt-1">
                              Lambda returns JSON → API Gateway → Client<br/>
                              <code className="bg-slate-200 px-1 rounded text-xs mt-1 block">
                                &#123; "accessToken": "...", "refreshToken": "...", "expiresIn": 900 &#125;
                              </code>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Protected Endpoint Flow (GET /auth/me)</h3>
                  <div className="space-y-4">
                    <Card className="border-l-4 border-l-blue-500">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-700 font-bold flex-shrink-0 text-sm">
                            1
                          </div>
                          <div>
                            <div className="font-semibold">Client Request with JWT</div>
                            <div className="text-sm text-slate-600 mt-1">
                              <code className="bg-slate-200 px-1 rounded text-xs">Authorization: Bearer &lt;accessToken&gt;</code>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-purple-500">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-100 rounded-full w-8 h-8 flex items-center justify-center text-purple-700 font-bold flex-shrink-0 text-sm">
                            2
                          </div>
                          <div>
                            <div className="font-semibold">API Gateway Calls Authorizer Lambda</div>
                            <div className="text-sm text-slate-600 mt-1">
                              • Separate Lambda validates JWT<br/>
                              • Checks signature with public key from Secrets Manager<br/>
                              • Checks expiry<br/>
                              • Returns IAM policy (Allow/Deny)
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-yellow-500">
                      <CardContent className="pt-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-yellow-100 rounded-full w-8 h-8 flex items-center justify-center text-yellow-700 font-bold flex-shrink-0 text-sm">
                            3
                          </div>
                          <div>
                            <div className="font-semibold">GetProfile Lambda Executes</div>
                            <div className="text-sm text-slate-600 mt-1">
                              • Receives userId from authorizer context<br/>
                              • Queries database for user profile<br/>
                              • Returns user data
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Alert className="border-yellow-500 bg-yellow-50">
                  <Workflow className="h-4 w-4 text-yellow-600" />
                  <AlertTitle className="text-yellow-800">Authorizer Caching</AlertTitle>
                  <AlertDescription className="text-yellow-700">
                    API Gateway caches authorizer results for 5 minutes (configurable). 
                    This means the authorizer Lambda is only invoked once per unique token per 5 minutes, 
                    dramatically reducing latency and cost.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer CTA */}
        <Card className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-yellow-800">Deploy Your POC in 1 Day</h3>
              <p className="text-yellow-700 max-w-2xl mx-auto">
                Lambda is the fastest path to validating your Auth Service. Start with near-zero cost, 
                scale effortlessly, and migrate to ECS only if needed.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700">
                  <Terminal className="w-5 h-5 mr-2" />
                  Copy SAM Template
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/auth-poc-approaches">Compare with ECS</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/">Back to Home</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LambdaArchitecture;
