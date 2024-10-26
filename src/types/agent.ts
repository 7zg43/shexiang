export type AgentStatus = 'active' | 'inactive' | 'pending';

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  region: string;
  status: AgentStatus;
  clinicsCount: number;
  devicesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAgentData {
  name: string;
  email: string;
  phone: string;
  company: string;
  region: string;
  password: string;
}

export interface UpdateAgentData extends Partial<Omit<CreateAgentData, 'password'>> {
  status?: AgentStatus;
}