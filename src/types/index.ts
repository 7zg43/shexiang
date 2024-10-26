import { User, AuthState, LoginCredentials, RegisterData } from './auth';
import { Agent, AgentStatus, CreateAgentData, UpdateAgentData } from './agent';
import { Clinic } from './clinic';
import { Device, DeviceStatus } from './device';

export type {
  User,
  AuthState,
  LoginCredentials,
  RegisterData,
  Agent,
  AgentStatus,
  CreateAgentData,
  UpdateAgentData,
  Clinic,
  Device,
  DeviceStatus,
};

// Re-export individual type modules
export * from './auth';
export * from './agent';
export * from './clinic';
export * from './device';