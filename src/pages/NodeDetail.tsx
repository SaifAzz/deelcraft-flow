import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Code, Zap, Lightbulb, Settings, Database, Globe, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getNodeById } from "@/data/flowNodes";
import { cn } from "@/lib/utils";

const colorClasses = {
  client: "bg-client text-white border-client",
  contractor: "bg-contractor text-white border-contractor",
  admin: "bg-admin text-white border-admin",
  frontend: "bg-secondary text-white border-secondary",
  backend: "bg-backend-service text-white border-backend-service",
  database: "bg-database text-white border-database",
};

const iconMap = {
  client: "👤",
  contractor: "💼",
  admin: "🛡️",
  frontend: "🎨",
  backend: "⚙️",
  database: "💾",
};

const NodeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const node = id ? getNodeById(id) : undefined;

  if (!node) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <h2 className="text-2xl font-bold mb-4">Node Not Found</h2>
          <p className="text-muted-foreground mb-6">The requested node could not be found.</p>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className={cn("border-b", colorClasses[node.category].split(" ")[0] + "/10")}>
        <div className="container mx-auto px-6 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Flow Diagram
          </Button>
          
          <div className="flex items-start gap-4">
            <div className={cn(
              "w-16 h-16 rounded-lg flex items-center justify-center text-3xl",
              colorClasses[node.category]
            )}>
              {iconMap[node.category]}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-foreground">{node.title}</h1>
                <Badge className={cn("px-3 py-1", colorClasses[node.category])}>
                  {node.category.charAt(0).toUpperCase() + node.category.slice(1)}
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground">
                {node.realWorld}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Real World Scenario */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-semibold">Real World Scenario</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">{node.realWorld}</p>
            </Card>

            {/* Example */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-accent" />
                <h2 className="text-2xl font-semibold">Example</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed italic">{node.example}</p>
            </Card>

            {/* Technical Implementation */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-5 h-5 text-secondary" />
                <h2 className="text-2xl font-semibold">Technical Implementation</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Under the Hood</h3>
                  <p className="text-muted-foreground leading-relaxed">{node.underHood}</p>
                </div>
                
                {node.technicalDetails && (
                  <div className="space-y-4 pt-4 border-t">
                    {node.technicalDetails.frontend && (
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Frontend Stack</h3>
                        <div className="flex flex-wrap gap-2">
                          {node.technicalDetails.frontend.map((tech, idx) => (
                            <Badge key={idx} variant="outline">{tech}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {node.technicalDetails.backend && (
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Backend Stack</h3>
                        <div className="flex flex-wrap gap-2">
                          {node.technicalDetails.backend.map((tech, idx) => (
                            <Badge key={idx} variant="outline">{tech}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {node.technicalDetails.integrations && (
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Integrations</h3>
                        <div className="flex flex-wrap gap-2">
                          {node.technicalDetails.integrations.map((tech, idx) => (
                            <Badge key={idx} variant="outline">{tech}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {node.technicalDetails.database && (
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Database</h3>
                        <div className="flex flex-wrap gap-2">
                          {node.technicalDetails.database.map((tech, idx) => (
                            <Badge key={idx} variant="outline">{tech}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>

            {/* Workflow */}
            {node.workflow && node.workflow.length > 0 && (
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-backend-service" />
                  <h2 className="text-2xl font-semibold">Workflow</h2>
                </div>
                <div className="space-y-3">
                  {node.workflow.map((step) => (
                    <div key={step.step} className="flex gap-4">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0",
                        colorClasses[node.category]
                      )}>
                        {step.step}
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Modular Advantage */}
            {node.modularAdvantage && (
              <Card className="p-6 bg-gradient-to-br from-backend-service/10 to-primary/10 border-2 border-backend-service/30">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="w-5 h-5 text-backend-service" />
                  <h2 className="text-xl font-semibold">Modular Advantage</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {node.modularAdvantage}
                </p>
              </Card>
            )}

            {/* POC Information */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">POC Details</h2>
              </div>
              <div className="space-y-3">
                {node.pocFocus && (
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-1">Focus</p>
                    <p className="text-sm text-muted-foreground">{node.pocFocus}</p>
                  </div>
                )}
                {node.pocTools && (
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-1">Tools</p>
                    <p className="text-sm text-muted-foreground">{node.pocTools}</p>
                  </div>
                )}
                {node.pocStack && (
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-1">Stack</p>
                    <p className="text-sm text-muted-foreground">{node.pocStack}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Category</span>
                  <Badge variant="outline">{node.category}</Badge>
                </div>
                {node.workflow && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Workflow Steps</span>
                    <span className="text-sm font-semibold">{node.workflow.length}</span>
                  </div>
                )}
                {node.technicalDetails && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Tech Components</span>
                    <span className="text-sm font-semibold">
                      {Object.values(node.technicalDetails).flat().length}
                    </span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeDetail;

