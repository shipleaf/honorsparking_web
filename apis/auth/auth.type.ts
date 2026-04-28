export interface SignupStateAPI {
  platform: string;
  name: string;
  mobile: string;
  birthyear: string;
  birthday: string;
  carNumber: string;
  accountId: string;
  accountPassword: string;
  email: string;
}

export interface LoginState {
  username: string;
  password: string;
}