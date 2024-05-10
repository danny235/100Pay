import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {formatDateString} from '../../utils';
import {GetApp} from '../../apis/getuserdata';
import {getUserData} from '../../apis/auth/loginuser';

export const fetchUserApps = createAsyncThunk(
  'user/fetchUseApps',
  async (token: string) => {
    const response = await GetApp(token);
    return response;
  },
);

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (token: string) => {
    const response = await getUserData(token);
    return response;
  },
);

type AccountBalanceType = 'naira' | 'pay-token';

interface User {
  avatar: string;
  isEmailVerified: boolean;
  hasSetPin: boolean;
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  username: string;
  createdAt: string;
  invitedBy: string;
  __v: number;
}

type UserAppType = {
  address: string;
  admins: any[]; // Assuming this can be an array of any type
  app_name: string;
  business_name: string;
  call_back: string;
  city: string;
  country: string;
  createdAt: string; // You might want to use Date type here if you parse the string into a Date object
  currency: string;
  description: string;
  fiat_balance: number;
  gateways: {
    name: string;
    id: string;
    publicKey: string;
    secretKey: string;
    // Add more properties as needed
  }[];
  keys: {
    pub_keys: {
      value: string;
    }[];

    sk_keys: {
      value: string;
    }[];
  };
  kycVerified: boolean;
  phone: string;
  postal: string;
  referralCode: string;
  status: string;
  suported_coins: any[]; // Assuming this can be an array of any type
  support_email: string;
  tokenBalance: number;
  user_id: string;
  verification_token: string;
  web_hook: string;
  website_address: string;
  __v: number;
  _id: string;
};

interface UserState {
  accountBalance: number;
  token: string;
  isLoggedIn: boolean;
  userOnboarded: boolean;
  accountBalanceType: AccountBalanceType;
  userProfile: User | null; // You might want to define a proper type for userProfile
  userProfileError: string;
  userProfileLoading: string;
  showAccountBalance: boolean;
  userApps: UserAppType[] | null;
  userAppsLoading: string;
  userAppsError: string | undefined;
  activeUserApp: UserAppType | null;
}

const initialState: UserState = {
  accountBalance: 1000,
  token: '',
  isLoggedIn: false,
  userOnboarded: false,
  accountBalanceType: 'naira',
  userProfile: null,
  userProfileLoading: 'idle',
  userProfileError: '',
  userApps: null,
  activeUserApp: null,
  userAppsLoading: 'idle',
  userAppsError: '',
  showAccountBalance: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    toggleIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    updateUserProfile: (state, action: PayloadAction<any>) => {
      state.userProfile = action.payload;
    },
    updateUserOnboarded: state => {
      state.userOnboarded = true;
    },
    logOut: state => {
      state.token = '';
      state.userProfile = null
      state.userApps = null
      state.activeUserApp = null
    },
    updateAccountBalanceType: (state, action) => {
      state.accountBalanceType = action.payload;
    },
    updateShowAccountBalance: state => {
      state.showAccountBalance = !state.showAccountBalance;
    },
    updateAccountBalance: (state, action) => {
      state.accountBalance = action.payload;
    },

    updateActiveApps: (state, action) => {
      state.activeUserApp = action.payload;
    },
  },

  extraReducers: builder => {
    /*----- Get user app ---------*/
    builder.addCase(fetchUserApps.pending, (state, action) => {
      state.userAppsLoading = 'loading';
    });

    builder.addCase(fetchUserApps.fulfilled, (state, action) => {
      state.userAppsLoading = 'success';
      state.userApps = action.payload;
      if (state.activeUserApp !== null && state.activeUserApp !== undefined)
        return;
      state.activeUserApp = action.payload[0];
      // console.log(action.payload[0]);
    });

    builder.addCase(fetchUserApps.rejected, (state, action) => {
      state.userAppsLoading = 'rejected';
      state.userAppsError = action.error.message;
    });

    /*-----------*/

    /*----- Get user data ---------*/
    builder.addCase(fetchUserData.pending, (state, action) => {
      state.userProfileLoading = 'loading';
    });

    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userProfileLoading = 'success';
      state.userProfile = action.payload;

      // console.log(action.payload[0]);
    });

    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.userProfileLoading = 'rejected';
      // state.userProfileError = action.error.message
    });

    /*-----------*/
  },
});

export const {
  addToken,
  toggleIsLoggedIn,
  updateUserOnboarded,
  logOut,
  updateAccountBalanceType,
  updateShowAccountBalance,
  updateAccountBalance,
  updateActiveApps
} = userSlice.actions;

export default userSlice.reducer;
