


export interface User {
  id: number|string
  userid: string
  status: string
}

export interface UserToken {
  access_token: string
  token_type: string
  userid: string
}

export interface UserResponse<T> {
  response: Response
  data: T
}

export interface LogTypes {
  access_token: string;
  // refresh_token: string;
  userid: string;
  state: boolean | null | 'fail';
  is_login: boolean
}