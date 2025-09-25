import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginCredentials, RegisterCredentials, User, LoginResponse, RegisterResponse, RegisterUserResponse, LoginUserResponse } from '@/interfaces';
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('https://project-nexus-backend-q5ai.onrender.com/graphql/');

const REGISTER_MUTATION = `
  mutation RegisterUser($username: String!, $email: String!, $password: String!, $passwordConfirm: String!, $acceptTerms: Boolean!) {
    registerUser(
      username: $username
      email: $email
      password: $password
      passwordConfirm: $passwordConfirm
      acceptTerms: $acceptTerms
    ) {
      ok
      errors
      user {
        id
        email
        username
        firstName
        lastName
        emailVerified
      }
    }
  }
`;

const LOGIN_MUTATION = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      access
      refresh
      errors
      user {
        id
        email
        username
        firstName
        lastName
        emailVerified
      }
    }
  }
`;

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  accessToken: null,
  refreshToken: null,
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const variables = {
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
        passwordConfirm: credentials.passwordConfirm,
        acceptTerms: credentials.acceptTerms,
      };

      const data = await client.request<RegisterUserResponse>(REGISTER_MUTATION, variables);
      const result: RegisterResponse = data.registerUser;
      
      if (!result.ok) {
        return rejectWithValue(result.errors?.join(', ') || 'Registration failed');
      }
      
      return result;
    } catch (error: unknown) {
      return rejectWithValue(
        (error as Error)?.message || 'Registration failed'
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const variables = {
        email: credentials.email,
        password: credentials.password,
      };

      const data = await client.request<LoginUserResponse>(LOGIN_MUTATION, variables);
      const result: LoginResponse = data.login;
      
      if (!result.ok) {
        return rejectWithValue(result.errors?.join(', ') || 'Login failed');
      }
      
      return result;
    } catch (error: unknown) {
      return rejectWithValue(
        (error as Error)?.message || 'Login failed'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      }
    },
    
    setTokens: (state, action: PayloadAction<{ access: string; refresh: string }>) => {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.isAuthenticated = true;
    },
    
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    // New action to check authentication status on app load
    checkAuth: (state) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('accessToken');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
          try {
            state.accessToken = token;
            state.user = JSON.parse(storedUser);
            state.isAuthenticated = true;
          } catch (error) {
            // Clear invalid stored data
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
          }
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = true;
        state.error = null;
        
        // Store user data in localStorage
        if (action.payload.user) {
          localStorage.setItem('user', JSON.stringify(action.payload.user));
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
      })
      
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.user = action.payload.user || null;
        state.isAuthenticated = true;
        state.error = null;
        
        // Store tokens and user data in localStorage
        localStorage.setItem('accessToken', action.payload.access);
        localStorage.setItem('refreshToken', action.payload.refresh || '');
        if (action.payload.user) {
          localStorage.setItem('user', JSON.stringify(action.payload.user));
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
      });
  },
});

export const { clearError, logout, setTokens, setUser, checkAuth } = authSlice.actions;
export default authSlice.reducer;
