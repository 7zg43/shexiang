import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Agent, CreateAgentData, UpdateAgentData } from '../../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface AgentState {
  agents: Agent[];
  selectedAgent: Agent | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AgentState = {
  agents: [],
  selectedAgent: null,
  isLoading: false,
  error: null,
};

export const fetchAgents = createAsyncThunk(
  'agents/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/agents`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || 'Failed to fetch agents');
      }
      return rejectWithValue('Failed to fetch agents');
    }
  }
);

export const createAgent = createAsyncThunk(
  'agents/create',
  async (data: CreateAgentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/agents`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || 'Failed to create agent');
      }
      return rejectWithValue('Failed to create agent');
    }
  }
);

export const updateAgent = createAsyncThunk(
  'agents/update',
  async ({ id, data }: { id: string; data: UpdateAgentData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/agents/${id}`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || 'Failed to update agent');
      }
      return rejectWithValue('Failed to update agent');
    }
  }
);

const agentSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    setSelectedAgent: (state, action) => {
      state.selectedAgent = action.payload;
    },
    clearSelectedAgent: (state) => {
      state.selectedAgent = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAgents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.agents = action.payload;
      })
      .addCase(fetchAgents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createAgent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAgent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.agents.push(action.payload);
      })
      .addCase(createAgent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateAgent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateAgent.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.agents.findIndex(agent => agent.id === action.payload.id);
        if (index !== -1) {
          state.agents[index] = action.payload;
        }
      })
      .addCase(updateAgent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedAgent, clearSelectedAgent, clearError } = agentSlice.actions;
export default agentSlice.reducer;