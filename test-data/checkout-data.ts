export const checkoutCustomer = {
  valid: {
    firstName: 'Test',
    lastName: 'User',
    postalCode: '12345',
  },

  whitespaceOnly: {
    firstName: '   ',
    lastName: '   ',
    postalCode: '   ',
  },

  invalidPostalCode: {
    firstName: 'Test',
    lastName: 'User',
    postalCode: 'ABC@#$',
  },
} as const;

export const checkoutErrorMessages = {
  firstNameRequired: 'Error: First Name is required',
  lastNameRequired: 'Error: Last Name is required',
  postalCodeRequired: 'Error: Postal Code is required',
} as const;
