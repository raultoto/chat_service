import { Entity } from '../../shared/core/entity';
import { Email } from '../value-objects/email';
import { PhoneNumber } from '../value-objects/phone_number';
import assert from 'assert';
import { DateTime } from 'luxon';

interface UserProps {
  id: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  email: Email;
  phoneNumber: PhoneNumber;
  nacionality: string;
  address: string;
  dateOfBirth: string;
  createdAt?: string;
  updatedAt?: string;
}
/* The User class extends the Entity class and has a constructor that takes in a UserProps object and
an optional id string. */
export class User extends Entity<UserProps> {
  constructor (props: UserProps) {
    props.createdAt = props.createdAt ?? DateTime.now().toISO();
    props.updatedAt = DateTime.now().toISO();
    assert(props.firstName !== undefined || props.firstName !== null, 'FirstName is required');
    super(props, props.id);
  }
}
