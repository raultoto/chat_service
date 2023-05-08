import validator from 'validator';

/* "PhoneNumber is a value object that represents a phone number." */
export class PhoneNumber {
  value: string;
  constructor (value: string) {
    this.value = value;
  }

  static create (phoneNumer: string): PhoneNumber {
    const isValidEmail = validator.isMobilePhone(phoneNumer, ['en-US', 'es-PE', 'es-VE']);
    if (!isValidEmail) {
      throw new Error('Invalid phone number');
    }
    return new PhoneNumber(phoneNumer);
  }
}
