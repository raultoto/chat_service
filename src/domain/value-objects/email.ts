import assert from 'assert';

/* Email is a value object that represents a valid email address. */
export class Email {
  value: string;
  constructor (value: string) {
    this.value = value;
  }

  static isValidEmail (email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  static create (email: string): Email {
    assert(email !== undefined && email !== null, 'Email is required');
    if (!this.isValidEmail(email)) {
      throw new Error('Invalid email');
    }
    return new Email(email);
  }
}
