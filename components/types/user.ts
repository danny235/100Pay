export interface UserData {
  avatar: string;
  isEmailVerified: boolean | null;
  hasSetPin: boolean | null;
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  username: string;
  createdAt?: string;
}

export interface UpdateUserData extends UserData {
  otp?: string;
  code?: string;
}
