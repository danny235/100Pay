import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { formatDateString } from "../../utils";
import { GetApp } from "../../apis/getuserdata";
import { getUserData } from "../../apis/auth/loginuser";

export const fetchUserApps = createAsyncThunk(
  "user/fetchUseApps",
  async (token: string) => {
    const response = await GetApp(token);
    return response;
  }
);

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (token: string) => {
    const response = await getUserData(token);
    return response;
  }
);

type AccountBalanceType = "naira" | "pay-token" | "";

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
  verificationLevel: number;
  __v: number;
}
type AccountT = {
  address: string | null;
};

type BalanceT = {
  available: string;
  locked: string;
};

type UserWalletT = {
  name: string;
  status: string;
  symbol: string;
  decimals: string;
  logo: string;
  account: AccountT;
  balance: BalanceT;
  walletType: string;
  id: string;
};

export type VBAT = {
  bank: {
    id: number;
    name: string;
    slug: string;
  };
  bvnVerified: boolean;
  assigned: boolean;
  _id: string;
  appId: string;
  userId: string;
  __v: number;
  accountName: string;
  accountNumber: string;
  accountType: string;
  active: boolean;
  bankAccountId: number;
  currency: string;
  customerCode: string;
  customerId: string;
};

export type UserAppType = {
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
    description: string;
    enabled: boolean;
    id: string;
    logo: string;
    name: string;
    publicKey: string;
    secretKey: string;
    // Add more properties as needed
  }[];
  instantPayout: boolean;
  instantPayoutAccountId: string;
  keys: {
    pub_keys: {
      value: string;
      domain: string;
      label: string;
      status: string;
      key_type: string;
      services: {
        name: string;
        permission: {
          active: boolean;
          name: "read";
        }[];
      }[];
    }[];

    sk_keys: {
      value: string;
      domain: string;
      label: string;
      status: string;
      key_type: string;
      services: {
        name: string;
        permission: {
          active: boolean;
          name: "read";
        }[];
      }[];
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
  showCamera: boolean;
  isFaceDetectionSet: boolean;
  userWallet: UserWalletT;
  vbas: VBAT[];
}

const initialState: UserState = {
  accountBalance: 0,
  token: "",
  isLoggedIn: false,
  userOnboarded: false,
  accountBalanceType: "",
  userProfile: null,
  userProfileLoading: "idle",
  userProfileError: "",
  userApps: null,
  activeUserApp: null,
  userAppsLoading: "idle",
  userAppsError: "",
  showAccountBalance: true,
  showCamera: false,
  isFaceDetectionSet: false,
  userWallet: null,
  vbas: null,
};

export const userSlice = createSlice({
  name: "user",
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
    updateUserOnboarded: (state) => {
      state.userOnboarded = true;
    },
    updateIsFaceDetectionSet: (state) => {
      state.isFaceDetectionSet = true;
    },
    updateVBAS: (state, action) => {
      state.vbas = action.payload;
    },
    logOut: (state) => {
      state.token = "";
      state.userProfile = null;
      state.userApps = null;
      state.activeUserApp = null;
      state.isLoggedIn = false;
      state.showCamera = false;
      state.vbas = null;
    },
    updateAccountBalanceType: (state, action) => {
      state.accountBalanceType = action.payload;
    },
    updateShowAccountBalance: (state) => {
      state.showAccountBalance = !state.showAccountBalance;
    },
    updateAccountBalance: (state, action) => {
      state.accountBalance = action.payload;
    },

    updateActiveApps: (state, action) => {
      state.activeUserApp = action.payload;
    },
    toggleShowCamera: (state, action) => {
      state.showCamera = action.payload;
    },
  },

  extraReducers: (builder) => {
    /*----- Get user app ---------*/
    builder.addCase(fetchUserApps.pending, (state, action) => {
      state.userAppsLoading = "loading";
    });

    builder.addCase(fetchUserApps.fulfilled, (state, action) => {
      state.userAppsLoading = "success";
      state.userApps = action.payload;
      if (state.activeUserApp) {
        state.activeUserApp = action.payload?.find(
          (app: UserAppType) => app._id === state.activeUserApp?._id
        );
      } else {
        state.activeUserApp = action.payload[0];
      }
      // console.log(action.payload[0]);
    });

    builder.addCase(fetchUserApps.rejected, (state, action) => {
      state.userAppsLoading = "rejected";
      state.userAppsError = action.error.message;
    });

    /*-----------*/

    /*----- Get user data ---------*/
    builder.addCase(fetchUserData.pending, (state, action) => {
      state.userProfileLoading = "loading";
    });

    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userProfileLoading = "success";
      state.userProfile = action.payload;

      // console.log(action.payload[0]);
    });

    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.userProfileLoading = "rejected";
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
  updateActiveApps,
  toggleShowCamera,
  updateIsFaceDetectionSet,
  updateVBAS,
} = userSlice.actions;

export default userSlice.reducer;
