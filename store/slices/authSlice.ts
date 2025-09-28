import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginCredentials, RegisterCredentials, User, LoginResponse, RegisterResponse } from '@/interfaces';

const API_BASE_URL = 'https://project-nexus-backend-q5ai.onrender.com/api/v1';

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
      // Transform the credentials to match your REST API format
      const requestBody = {
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
        password_confirm: credentials.passwordConfirm,
        first_name: credentials.firstName || '',
        last_name: credentials.lastName || '',
        phone_number: credentials.phoneNumber || '',
        address_line_1: credentials.addressLine1 || '',
        address_line_2: credentials.addressLine2 || '',
        city: credentials.city || '',
        state: credentials.state || '',
        postal_code: credentials.postalCode || '',
        country: credentials.country || '',
        accept_terms: credentials.acceptTerms,
      };

      const response = await fetch(`${API_BASE_URL}/accounts/register/`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.detail || data.errors || 'Registration failed');
      }
      // Adjust this based on your actual API response structure
      return {
        ok: true,
        user: data.user || {
          id: data.id,
          email: data.email,
          username: data.username,
          firstName: data.first_name,
          lastName: data.last_name,
          emailVerified: data.email_verified || false,
        }
      };
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
      const requestBody = {
        email: credentials.email,
        password: credentials.password,
      };

      const response = await fetch(`${API_BASE_URL}/accounts/login/`, {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.detail || data.errors || 'Login failed');
      }

      // Adjust this based on your actual API response structure
      return {
        ok: true,
        access: data.access_token || data.access,
        refresh: data.refresh_token || data.refresh,
        user: data.user || {
          id: data.id,
          email: data.email,
          username: data.username,
          firstName: data.first_name,
          lastName: data.last_name,
          emailVerified: data.email_verified || false,
        }
      };
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
