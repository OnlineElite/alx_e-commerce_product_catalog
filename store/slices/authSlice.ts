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

      const data  = await client.request<RegisterUserResponse>(REGISTER_MUTATION, variables);
      const result: RegisterResponse = data.registerUser;
      
      if (!result.ok) {
        return rejectWithValue(result.errors.join(', '));
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
        return rejectWithValue(result.errors.join(', '));
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
      
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
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
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
        
        
        if (action.payload.user) {
          localStorage.setItem('user', JSON.stringify(action.payload.user));
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      
      
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.isAuthenticated = true;
        state.error = null;
        
        
        localStorage.setItem('accessToken', action.payload.access);
        localStorage.setItem('refreshToken', action.payload.refresh);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
      });
  },
});

export const { clearError, logout, setTokens, setUser } = authSlice.actions;
export default authSlice.reducer;
