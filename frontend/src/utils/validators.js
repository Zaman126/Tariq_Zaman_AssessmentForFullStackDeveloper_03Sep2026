const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateProfile({ email, firstName, lastName }) {
  const errors = {};
  if (!firstName?.trim()) errors.firstName = 'First name is required';
  if (!lastName?.trim()) errors.lastName = 'Last name is required';
  if (!email?.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address';
  }
  return errors;
}

export function validateAddress({ line1, city, state, postalCode, country }) {
  const errors = {};
  if (!line1?.trim()) errors.line1 = 'Address line 1 is required';
  if (!city?.trim()) errors.city = 'City is required';
  if (!state?.trim()) errors.state = 'State / region is required';
  if (!postalCode?.trim()) errors.postalCode = 'Postal code is required';
  if (!country?.trim()) errors.country = 'Country is required';
  return errors;
}
