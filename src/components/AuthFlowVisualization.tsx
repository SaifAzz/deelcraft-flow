import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Cloud, 
  Server, 
  Database, 
  Key, 
  Shield, 
  CheckCircle2, 
  ArrowRight,
  Lock,
  RefreshCw,
  Zap
} from "lucide-react";

type FlowStep = {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  code?: string;
  response?: string;
};

export const AuthFlowVisualization = () => {
  const [activeFlow, setActiveFlow] = useState<'login' | 'protected' | 'refresh'>('login');
  const [activeStep, setActiveStep] = useState<number>(0);

  const loginSteps: FlowStep[] = [
    {
      id: 'client-login',
      title: 'Web Client → API Gateway',
      description: 'User submits login credentials from web form',
      icon: Users,
      color: 'blue',
      code: `POST /auth/login
{
  "email": "john@example.com",
  "password": "12345678"
}`,
    },
    {
      id: 'gateway-auth',
      title: 'API Gateway → Auth Service',
      description: 'Request forwarded to Auth Service (JWT Authorizer disabled for public /auth/login endpoint)',
      icon: Cloud,
      color: 'purple',
    },
    {
      id: 'auth-db',
      title: 'Auth Service → PostgreSQL',
      description: 'Validate credentials against database (bcrypt verification)',
      icon: Database,
      color: 'slate',
    },
    {
      id: 'auth-redis',
      title: 'Auth Service → Redis',
      description: 'Store refresh token with JTI for rotation tracking',
      icon: Zap,
      color: 'red',
      code: `SETEX refresh:user_12345:jti_98271398 2592000 "valid"`,
    },
    {
      id: 'sign-jwt',
      title: 'Auth Service → Sign JWT',
      description: 'Load private key from Secrets Manager and sign access token (RS256)',
      icon: Key,
      color: 'yellow',
    },
    {
      id: 'response',
      title: 'Response → Client',
      description: 'Return access token and refresh token to client',
      icon: CheckCircle2,
      color: 'green',
      response: `{
  "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "rt_8a7d9f2e4b1c...",
  "expiresIn": 900,
  "tokenType": "Bearer"
}`,
    },
  ];

  const protectedSteps: FlowStep[] = [
    {
      id: 'protected-request',
      title: 'Web Client → API Gateway',
      description: 'Request with Bearer token in Authorization header',
      icon: Users,
      color: 'blue',
      code: `GET /auth/me
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...`,
    },
    {
      id: 'jwt-validation',
      title: 'API Gateway Validates JWT',
      description: 'Reads public key from JWKS endpoint and validates signature, expiry, issuer',
      icon: Shield,
      color: 'purple',
      code: `✓ Signature valid (RS256)
✓ Token not expired
✓ Issuer matches
✓ Audience matches`,
    },
    {
      id: 'forward-service',
      title: 'Forward to Auth Service',
      description: 'If valid, forward with decoded claims in headers',
      icon: Server,
      color: 'green',
      code: `X-User-Id: user_12345
X-User-Email: john@example.com
X-User-Roles: CLIENT`,
    },
  ];

  const refreshSteps: FlowStep[] = [
    {
      id: 'refresh-request',
      title: 'Web Client → API Gateway',
      description: 'Submit refresh token to get new access token (automatic on token expiry)',
      icon: Users,
      color: 'blue',
      code: `POST /auth/refresh
{
  "refreshToken": "rt_8a7d9f2e4b1c..."
}`,
    },
    {
      id: 'redis-fetch',
      title: 'Auth Service → Redis',
      description: 'Fetch and verify refresh token JTI',
      icon: Zap,
      color: 'red',
      code: `GET refresh:user_12345:jti_98271398`,
    },
    {
      id: 'validate-token',
      title: 'Validate Refresh Token',
      description: 'Check existence, revocation status, and expiry',
      icon: Shield,
      color: 'purple',
    },
    {
      id: 'rotate-jti',
      title: 'Rotate JTI',
      description: 'Invalidate old token and create new JTI',
      icon: RefreshCw,
      color: 'yellow',
      code: `DEL refresh:user_12345:jti_98271398
SETEX refresh:user_12345:jti_NEW_ID 2592000 "valid"`,
    },
    {
      id: 'new-tokens',
      title: 'Issue New Tokens',
      description: 'Generate new access token and refresh token',
      icon: CheckCircle2,
      color: 'green',
      response: `{
  "accessToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "rt_NEW_TOKEN_HERE...",
  "expiresIn": 900
}`,
    },
  ];

  const currentSteps = activeFlow === 'login' ? loginSteps : activeFlow === 'protected' ? protectedSteps : refreshSteps;

  const getColorClasses = (color: string) => {
    const colors: any = {
      blue: 'bg-blue-100 border-blue-500 text-blue-700',
      purple: 'bg-purple-100 border-purple-500 text-purple-700',
      slate: 'bg-slate-100 border-slate-500 text-slate-700',
      red: 'bg-red-100 border-red-500 text-red-700',
      yellow: 'bg-yellow-100 border-yellow-500 text-yellow-700',
      green: 'bg-green-100 border-green-500 text-green-700',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Flow Type Selector */}
      <div className="flex gap-2 justify-center flex-wrap">
        <Button
          variant={activeFlow === 'login' ? 'default' : 'outline'}
          onClick={() => { setActiveFlow('login'); setActiveStep(0); }}
          className="gap-2"
        >
          <Lock className="w-4 h-4" />
          Login Flow
        </Button>
        <Button
          variant={activeFlow === 'protected' ? 'default' : 'outline'}
          onClick={() => { setActiveFlow('protected'); setActiveStep(0); }}
          className="gap-2"
        >
          <Shield className="w-4 h-4" />
          Protected Route
        </Button>
        <Button
          variant={activeFlow === 'refresh' ? 'default' : 'outline'}
          onClick={() => { setActiveFlow('refresh'); setActiveStep(0); }}
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh Token
        </Button>
      </div>

      {/* Flow Visualization */}
      <div className="space-y-4">
        {currentSteps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;
          
          return (
            <div key={step.id}>
              <Card
                className={`cursor-pointer transition-all ${
                  isActive ? 'ring-2 ring-primary shadow-lg' : ''
                } ${isCompleted ? 'opacity-60' : ''}`}
                onClick={() => setActiveStep(index)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Step Number */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      isActive ? 'bg-primary text-white' : isCompleted ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className={`w-5 h-5 text-${step.color}-500`} />
                        <h3 className="font-semibold text-lg">{step.title}</h3>
                        <Badge variant="outline" className="ml-auto">
                          Step {index + 1}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-slate-600 mb-3">{step.description}</p>

                      {/* Code Block */}
                      {isActive && step.code && (
                        <div className={`mt-3 p-3 rounded border-l-4 ${getColorClasses(step.color)}`}>
                          <pre className="text-xs font-mono whitespace-pre-wrap">{step.code}</pre>
                        </div>
                      )}

                      {/* Response Block */}
                      {isActive && step.response && (
                        <div className="mt-3 p-3 rounded border-l-4 bg-green-50 border-green-500">
                          <div className="text-xs font-semibold text-green-700 mb-2">Response (200 OK)</div>
                          <pre className="text-xs font-mono whitespace-pre-wrap text-green-700">{step.response}</pre>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Arrow between steps */}
              {index < currentSteps.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowRight className="w-5 h-5 text-slate-400 rotate-90" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center pt-4">
        <Button
          variant="outline"
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
        >
          Previous Step
        </Button>
        
        <div className="text-sm text-slate-600">
          Step {activeStep + 1} of {currentSteps.length}
        </div>

        <Button
          onClick={() => setActiveStep(Math.min(currentSteps.length - 1, activeStep + 1))}
          disabled={activeStep === currentSteps.length - 1}
        >
          Next Step
        </Button>
      </div>
    </div>
  );
};

