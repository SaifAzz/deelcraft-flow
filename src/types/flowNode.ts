export type FlowNodeCategory = 
  | "frontend" 
  | "client" 
  | "contractor" 
  | "admin" 
  | "backend" 
  | "database";

export interface FlowNodeData {
  id: string;
  title: string;
  category: FlowNodeCategory;
  realWorld: string;
  underHood: string;
  example: string;
  modularAdvantage?: string;
  pocTools?: string;
  pocStack?: string;
  pocFocus?: string;
  technicalDetails?: {
    frontend?: string[];
    backend?: string[];
    integrations?: string[];
    database?: string[];
  };
  workflow?: {
    step: number;
    description: string;
  }[];
  relatedNodes?: string[];
}