import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GraphQLClient } from 'graphql-request';
import { User, UserState } from '@/interfaces';

const initialState: UserState = {
  id: 0,
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  emailVerified: false,
  loading: false,
};

export const fetchCurrentUser = createAsyncThunk<User | null>(
  'user/fetchCurrentUser',
  async (_, thunkAPI) => {
    try {
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('accessToken')
          : null;

      if (!token) return null;

      const client = new GraphQLClient(
        'https://project-nexus-backend-q5ai.onrender.com/graphql/',
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

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
      // Clear tokens if request fails (token might be invalid)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.id = 0;
      state.username = '';
      state.email = '';
      state.firstName = '';
      state.lastName = '';
      state.emailVerified = false;
      state.loading = false;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.emailVerified = action.payload.emailVerified ?? false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCurrentUser.fulfilled,
        (state, action: PayloadAction<User | null>) => {
          state.loading = false;

          if (!action.payload) {
            state.id = 0;
            state.username = '';
            state.email = '';
            state.firstName = '';
            state.lastName = '';
            state.emailVerified = false;
            return;
          }

          // Use username directly, fallback to firstName + lastName if username is empty
          state.id = action.payload.id;
          state.username = action.payload.username || 
            `${action.payload.firstName || ''} ${action.payload.lastName || ''}`.trim();
          state.email = action.payload.email;
          state.firstName = action.payload.firstName;
          state.lastName = action.payload.lastName;
          state.emailVerified = action.payload.emailVerified ?? false;
        }
      )
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        // Clear user data on error
        state.id = 0;
        state.username = '';
        state.email = '';
        state.firstName = '';
        state.lastName = '';
        state.emailVerified = false;
      });
  },
});

export const { clearUser, setUser } = userSlice.actions;
export default userSlice.reducer;
