import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GraphQLClient } from 'graphql-request';
import { User } from '@/interfaces';

const initialState: User & { loading: boolean } = {
  id: 0,
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  emailVerified: false,
  loading: false,
};

// Async thunk
export const fetchCurrentUser = createAsyncThunk<User | null>(
  'user/fetchCurrentUser',
  async (_, thunkAPI) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) return null; // no token, return null

      const client = new GraphQLClient('https://project-nexus-backend-q5ai.onrender.com/graphql/', {
        headers: { authorization: `Bearer ${token}` },
      });

      const query = `
        query {
          me {
            id
            username
            email
            firstName
            lastName
            emailVerified
          }
        }
      `;

      const response = await client.request<{ me: User | null }>(query);

      return response.me ?? null;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.id = 0;
      state.username = '';
      state.email = '';
      state.firstName = '';
      state.lastName = '';
      state.emailVerified = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<User | null>) => {
        state.loading = false;

        if (!action.payload) {
          // No user returned, reset state
          state.id = 0;
          state.username = '';
          state.email = '';
          state.firstName = '';
          state.lastName = '';
          state.emailVerified = false;
          return;
        }

        // Map the user data safely
        state.id = action.payload.id;
        state.username = `${action.payload.firstName ?? ''} ${action.payload.lastName ?? ''}`.trim() || action.payload.username;
        state.email = action.payload.email;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.emailVerified = action.payload.emailVerified ?? false;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
