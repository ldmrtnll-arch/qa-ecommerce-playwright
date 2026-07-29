export const loginUsers = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },

  lockedOut: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },

  invalidUsername: {
    username: 'invalid_user',
    password: 'secret_sauce',
  },

  invalidPassword: {
    username: 'standard_user',
    password: 'invalid_password',
  },
} as const;

export const loginErrorMessages = {
  invalidCredentials:
    'Epic sadface: Username and password do not match any user in this service',

  usernameRequired:
    'Epic sadface: Username is required',

  passwordRequired:
    'Epic sadface: Password is required',

  lockedOut:
    'Epic sadface: Sorry, this user has been locked out.',
} as const;