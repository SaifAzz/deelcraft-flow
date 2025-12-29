import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { 
  Server, 
  Database, 
  Cloud, 
  Key, 
  Shield, 
  CheckCircle2,
  ArrowRight,
  Code,
  Package,
  GitBranch,
  FileCode,
  Terminal,
  Play,
  Clock,
  Layers,
  Activity
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert";
import { Separator } from "@/shared/components/ui/separator";

const EcsArchitecture = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-600">
            <Server className="w-3 h-3 mr-1" />
            Container Architecture
          </Badge>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
            ECS Fargate Architecture - Complete Flow
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Production-grade containerized Auth Service with ECS Fargate + Terraform
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6 text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">5 Days</div>
              <div className="text-sm text-slate-600">Setup Time</div>
            </CardContent>
          </Card>
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6 text-center">
              <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">$34</div>
              <div className="text-sm text-slate-600">POC Cost/Month</div>
            </CardContent>
          </Card>
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6 text-center">
              <Server className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">5-10 min</div>
              <div className="text-sm text-slate-600">Deploy Time</div>
            </CardContent>
          </Card>
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6 text-center">
              <CheckCircle2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">Zero</div>
              <div className="text-sm text-slate-600">Cold Starts</div>
            </CardContent>
          </Card>
        </div>

        {/* Architecture Diagram */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>ECS Fargate Architecture Overview</CardTitle>
            <CardDescription>Always-on containerized authentication system</CardDescription>
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
                  <div className="bg-purple-100 border-2 border-purple-500 rounded-lg p-4 text-center w-80">
                    <Shield className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                    <div className="font-semibold">AWS API Gateway</div>
                    <div className="text-xs text-slate-600 mt-1">JWT Authorizer • CORS • Rate Limiting</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-slate-400 rotate-90" />
                </div>

                {/* Load Balancer */}
                <div className="flex items-center justify-center">
                  <div className="bg-indigo-100 border-2 border-indigo-500 rounded-lg p-4 text-center w-80">
                    <Layers className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
                    <div className="font-semibold">Application Load Balancer</div>
                    <div className="text-xs text-slate-600 mt-1">Health Checks • Traffic Distribution</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-slate-400 rotate-90" />
                </div>

                {/* ECS Tasks */}
                <div className="flex items-center justify-center gap-3">
                  <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center flex-1 max-w-xs">
                    <Server className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <div className="font-semibold">ECS Task 1</div>
                    <div className="text-xs text-slate-600 mt-1">Auth Service (NestJS)</div>
                    <div className="text-xs text-slate-600">0.25 vCPU • 512 MB</div>
                  </div>
                  <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center flex-1 max-w-xs opacity-50">
                    <Server className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <div className="font-semibold">ECS Task 2</div>
                    <div className="text-xs text-slate-600 mt-1">Auto-scaled</div>
                    <div className="text-xs text-slate-600">When needed</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-slate-400 rotate-90" />
                </div>

                {/* Data Layer */}
                <div className="flex items-center justify-center gap-4">
                  <div className="bg-slate-100 border-2 border-slate-500 rounded-lg p-4 text-center flex-1 max-w-xs">
                    <Database className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                    <div className="font-semibold">PostgreSQL RDS</div>
                    <div className="text-xs text-slate-600 mt-1">Users • Passwords</div>
                    <div className="text-xs text-slate-600">Refresh Tokens</div>
                  </div>
                  <div className="bg-red-100 border-2 border-red-500 rounded-lg p-4 text-center flex-1 max-w-xs">
                    <Activity className="w-6 h-6 mx-auto mb-2 text-red-600" />
                    <div className="font-semibold">Redis ElastiCache</div>
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

            <Alert className="mt-6 border-blue-500 bg-blue-50">
              <Server className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-800">Always-On Architecture</AlertTitle>
              <AlertDescription className="text-blue-700">
                Container runs 24/7 with consistent performance. No cold starts. Application Load Balancer 
                distributes traffic across tasks with health checks.
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
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>

          {/* Project Structure Tab */}
          <TabsContent value="structure" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>NestJS Project Structure</CardTitle>
                <CardDescription>Organized monolithic application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
{`auth-service/
├── src/
│   ├── auth/                  # Auth module
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts
│   │   │   └── local.strategy.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   └── dto/
│   │       ├── login.dto.ts
│   │       ├── register.dto.ts
│   │       └── refresh.dto.ts
│   │
│   ├── users/                 # Users module
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   │   └── entities/
│   │       └── user.entity.ts
│   │
│   ├── database/              # Database config
│   │   ├── database.module.ts
│   │   └── migrations/
│   │
│   ├── redis/                 # Redis config
│   │   └── redis.module.ts
│   │
│   ├── common/                # Shared code
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── interceptors/
│   │   └── pipes/
│   │
│   ├── config/                # Configuration
│   │   └── configuration.ts
│   │
│   ├── app.module.ts          # Root module
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── main.ts               # Bootstrap
│
├── test/                      # E2E tests
├── Dockerfile                 # 🐳 Container definition
├── docker-compose.yml         # Local development
├── package.json
├── tsconfig.json
└── nest-cli.json

infrastructure/                # Terraform IaC
├── terraform/
│   ├── main.tf
│   ├── ecs.tf                # ECS cluster & service
│   ├── alb.tf                # Load balancer
│   ├── rds.tf                # PostgreSQL
│   ├── redis.tf              # ElastiCache
│   ├── vpc.tf                # Networking
│   ├── security-groups.tf
│   ├── secrets.tf            # Secrets Manager
│   └── variables.tf

frontend/                      # Next.js Web App
├── app/
├── components/
└── lib/`}
                  </pre>
                </div>

                <Alert>
                  <FileCode className="h-4 w-4" />
                  <AlertTitle>Key Files</AlertTitle>
                  <AlertDescription className="text-xs">
                    <code className="bg-slate-200 px-1 rounded">Dockerfile</code> defines your container. 
                    <code className="bg-slate-200 px-1 rounded">terraform/</code> contains all infrastructure as code.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Implementation Tab */}
          <TabsContent value="implementation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>NestJS Implementation</CardTitle>
                <CardDescription>Production-ready code examples</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Auth Controller */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5 text-blue-600" />
                    Auth Controller (src/auth/auth.controller.ts)
                  </h3>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, RefreshDto } from './dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Request() req) {
    return this.authService.logout(req.user.userId);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user.userId);
  }
}`}
                    </pre>
                  </div>
                </div>

                <Separator />

                {/* Auth Service */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Auth Service (src/auth/auth.service.ts)</h3>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RedisService } from '../redis/redis.service';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens
    const accessToken = this.jwtService.sign({
      userId: user.id,
      email: user.email,
      roles: user.roles,
    });

    const refreshToken = this.generateRefreshToken();

    // Store refresh token in Redis
    const refreshKey = \`refresh:\${user.id}:\${refreshToken.jti}\`;
    await this.redisService.set(
      refreshKey,
      'valid',
      30 * 24 * 60 * 60, // 30 days
    );

    // Store metadata in PostgreSQL
    await this.usersService.createRefreshToken({
      userId: user.id,
      jti: refreshToken.jti,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    return {
      accessToken,
      refreshToken: refreshToken.token,
      expiresIn: 900,
      tokenType: 'Bearer',
    };
  }

  async register(registerDto: RegisterDto) {
    // Hash password
    const passwordHash = await bcrypt.hash(registerDto.password, 10);

    // Create user
    const user = await this.usersService.create({
      email: registerDto.email,
      passwordHash,
      roles: ['CLIENT'],
    });

    // Return tokens (same as login)
    return this.login({
      email: user.email,
      password: registerDto.password,
    });
  }

  async refresh(refreshDto: RefreshDto) {
    // Validate and rotate refresh token
    // ... implementation
  }

  private generateRefreshToken() {
    const jti = uuidv4();
    const token = Buffer.from(\`\${Date.now()}:\${jti}\`).toString('base64');
    return { token, jti };
  }
}`}
                    </pre>
                  </div>
                </div>

                <Separator />

                {/* Dockerfile */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Dockerfile (Multi-stage Build)</h3>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001
USER nestjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \\
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => { process.exit(r.statusCode === 200 ? 0 : 1); })"

# Start application
CMD ["node", "dist/main"]`}
                    </pre>
                  </div>
                </div>

                <Alert className="border-blue-500 bg-blue-50">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-800">Production Best Practices</AlertTitle>
                  <AlertDescription className="text-blue-700 text-xs">
                    • Multi-stage build reduces image size<br/>
                    • Non-root user for security<br/>
                    • Health checks for ECS<br/>
                    • Production-only dependencies
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Infrastructure Tab */}
          <TabsContent value="infrastructure" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Terraform Infrastructure</CardTitle>
                <CardDescription>Complete IaC setup</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* ECS Configuration */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">ECS Cluster & Service (terraform/ecs.tf)</h3>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "auth-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

# Task Definition
resource "aws_ecs_task_definition" "auth" {
  family                   = "auth-service"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"   # 0.25 vCPU
  memory                   = "512"   # 512 MB
  execution_role_arn       = aws_iam_role.ecs_execution_role.arn
  task_role_arn           = aws_iam_role.ecs_task_role.arn

  container_definitions = jsonencode([
    {
      name  = "auth-service"
      image = "\${aws_ecr_repository.auth.repository_url}:latest"

      portMappings = [{
        containerPort = 3000
        protocol      = "tcp"
      }]

      environment = [
        {
          name  = "NODE_ENV"
          value = "production"
        },
        {
          name  = "PORT"
          value = "3000"
        }
      ]

      secrets = [
        {
          name      = "DATABASE_URL"
          valueFrom = aws_secretsmanager_secret.database_url.arn
        },
        {
          name      = "REDIS_URL"
          valueFrom = aws_secretsmanager_secret.redis_url.arn
        },
        {
          name      = "JWT_SECRET"
          valueFrom = aws_secretsmanager_secret.jwt_secret.arn
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

      healthCheck = {
        command     = ["CMD-SHELL", "curl -f http://localhost:3000/health || exit 1"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 60
      }
    }
  ])
}

# ECS Service
resource "aws_ecs_service" "auth" {
  name            = "auth-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.auth.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = aws_subnet.private[*].id
    security_groups  = [aws_security_group.ecs_tasks.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.auth.arn
    container_name   = "auth-service"
    container_port   = 3000
  }

  depends_on = [aws_lb_listener.auth]
}`}
                    </pre>
                  </div>
                </div>

                <Separator />

                {/* Load Balancer */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Application Load Balancer (terraform/alb.tf)</h3>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`# Application Load Balancer
resource "aws_lb" "auth" {
  name               = "auth-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets           = aws_subnet.public[*].id

  enable_deletion_protection = false
}

# Target Group
resource "aws_lb_target_group" "auth" {
  name        = "auth-tg"
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"

  health_check {
    enabled             = true
    healthy_threshold   = 2
    interval            = 30
    matcher            = "200"
    path               = "/health"
    port               = "traffic-port"
    protocol           = "HTTP"
    timeout            = 5
    unhealthy_threshold = 3
  }
}

# Listener
resource "aws_lb_listener" "auth" {
  load_balancer_arn = aws_lb.auth.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.auth.arn
  }
}`}
                    </pre>
                  </div>
                </div>

                <Alert className="mt-4">
                  <Layers className="h-4 w-4" />
                  <AlertTitle>Complete Infrastructure</AlertTitle>
                  <AlertDescription className="text-xs">
                    Terraform also creates: VPC, Subnets, Security Groups, RDS, ElastiCache, 
                    Secrets Manager, IAM Roles, CloudWatch Log Groups, and ECR Repository.
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
                  <Play className="w-6 h-6 text-blue-600" />
                  Deployment Process
                </CardTitle>
                <CardDescription>Step-by-step deployment guide</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Setup Steps */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Initial Setup</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-700 font-bold flex-shrink-0">
                        1
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Build Docker Image</div>
                        <div className="bg-slate-900 text-slate-100 p-3 rounded mt-2">
                          <code className="text-xs">
                            docker build -t auth-service:latest .<br/>
                            docker tag auth-service:latest $&#123;ECR_URL&#125;/auth-service:latest
                          </code>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-700 font-bold flex-shrink-0">
                        2
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Push to ECR</div>
                        <div className="bg-slate-900 text-slate-100 p-3 rounded mt-2">
                          <code className="text-xs">
                            aws ecr get-login-password | docker login --username AWS --password-stdin $&#123;ECR_URL&#125;<br/>
                            docker push $&#123;ECR_URL&#125;/auth-service:latest
                          </code>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-700 font-bold flex-shrink-0">
                        3
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Deploy Infrastructure</div>
                        <div className="bg-slate-900 text-slate-100 p-3 rounded mt-2">
                          <code className="text-xs">
                            cd infrastructure/terraform<br/>
                            terraform init<br/>
                            terraform plan<br/>
                            terraform apply -auto-approve
                          </code>
                        </div>
                        <div className="text-xs text-slate-600 mt-2">⏱️ Takes 10-15 minutes</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-700 font-bold flex-shrink-0">
                        4
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Update ECS Service</div>
                        <div className="bg-slate-900 text-slate-100 p-3 rounded mt-2">
                          <code className="text-xs">
                            aws ecs update-service \\<br/>
                            &nbsp;&nbsp;--cluster auth-cluster \\<br/>
                            &nbsp;&nbsp;--service auth-service \\<br/>
                            &nbsp;&nbsp;--force-new-deployment
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* CI/CD Pipeline */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">GitHub Actions CI/CD</h3>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-xs">
{`# .github/workflows/deploy.yml
name: Deploy ECS Service

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1
      
      - name: Build, tag, and push image
        env:
          ECR_REGISTRY: \${{ steps.login-ecr.outputs.registry }}
          ECR_REPOSITORY: auth-service
          IMAGE_TAG: \${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
      
      - name: Deploy to ECS
        run: |
          aws ecs update-service \\
            --cluster auth-cluster \\
            --service auth-service \\
            --force-new-deployment`}
                    </pre>
                  </div>
                </div>

                <Alert className="border-blue-500 bg-blue-50">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-800">Deployment Complete!</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    Your service is now running at the Load Balancer DNS name from Terraform outputs.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monitoring & Observability</CardTitle>
                <CardDescription>CloudWatch Logs, Metrics, and Alarms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">CloudWatch Logs</h3>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-xs">
{`# View logs
aws logs tail /ecs/auth-service --follow

# View specific time range
aws logs tail /ecs/auth-service --since 1h

# Filter logs
aws logs filter-log-events \\
  --log-group-name /ecs/auth-service \\
  --filter-pattern "ERROR"`}
                    </pre>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="border-blue-200 bg-blue-50">
                      <CardContent className="pt-4">
                        <div className="font-semibold mb-2">ECS Metrics</div>
                        <div className="text-xs text-slate-600">
                          • CPU Utilization<br/>
                          • Memory Utilization<br/>
                          • Task Count<br/>
                          • Health Check Status
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-green-200 bg-green-50">
                      <CardContent className="pt-4">
                        <div className="font-semibold mb-2">Application Metrics</div>
                        <div className="text-xs text-slate-600">
                          • Request Count<br/>
                          • Response Time<br/>
                          • Error Rate<br/>
                          • Status Codes
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-200 bg-purple-50">
                      <CardContent className="pt-4">
                        <div className="font-semibold mb-2">ALB Metrics</div>
                        <div className="text-xs text-slate-600">
                          • Target Response Time<br/>
                          • Healthy/Unhealthy Hosts<br/>
                          • Request Count<br/>
                          • HTTP Status Codes
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-orange-200 bg-orange-50">
                      <CardContent className="pt-4">
                        <div className="font-semibold mb-2">Database Metrics</div>
                        <div className="text-xs text-slate-600">
                          • Connection Count<br/>
                          • Query Duration<br/>
                          • CPU/Memory Usage<br/>
                          • Read/Write IOPS
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Alert className="border-blue-500 bg-blue-50">
                  <Activity className="h-4 w-4 text-blue-600" />
                  <AlertTitle className="text-blue-800">Container Insights</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    CloudWatch Container Insights provides detailed metrics for your ECS tasks, 
                    including per-container resource utilization and performance data.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer CTA */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-sky-50 border-2 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-blue-800">Production-Grade Infrastructure</h3>
              <p className="text-blue-700 max-w-2xl mx-auto">
                Your ECS architecture provides consistent performance with no cold starts. 
                Perfect for production workloads that demand reliability.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Terminal className="w-5 h-5 mr-2" />
                  Copy Terraform Setup
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/auth-poc-approaches">Compare with Lambda</a>
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

export default EcsArchitecture;

