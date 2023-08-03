export interface AuthData {
  token: string,
  expiry: string
}

export interface AuthError {
  non_field_errors: string[]
}