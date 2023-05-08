import { User } from '../../domain/entities/user';
import { Email } from '../../domain/value-objects/email';
import { PhoneNumber } from '../../domain/value-objects/phone_number';

export class UserMapper {
  static fromEntity (user: User) {
    return {
      id: user.id,
      firstName: user.props.firstName,
      lastName: user.props.lastName,
      profilePhoto: user.props.profilePhoto,
      email: user.props.email.value,
      phoneNumber: user.props.phoneNumber.value,
      nacionality: user.props.nacionality,
      address: user.props.address,
      dateOfBirth: user.props.dateOfBirth,
      createdAt: user.props.createdAt,
      updatedAt: user.props.updatedAt
    };
  }

  static toEntity (json: any): User {
    return new User({
      firstName: json.firstName,
      lastName: json.lastName,
      profilePhoto: json.profilePhoto,
      email: Email.create(json.email),
      phoneNumber: PhoneNumber.create(json.phoneNumber),
      nacionality: json.nacionality,
      address: json.address,
      dateOfBirth: json.dateOfBirth,
      createdAt: json.createdAt,
      id: json.id
    });
  }

  static updateEntity (json: any, user: User): User {
    return new User({
      firstName: json.firstName ?? user.props.firstName,
      lastName: json.lastName ?? user.props.lastName,
      profilePhoto: json.profilePhoto ?? user.props.profilePhoto,
      email: Email.create(json.email ?? user.props.email.value),
      phoneNumber: PhoneNumber.create(json.phoneNumber ?? user.props.phoneNumber.value),
      nacionality: json.nacionality ?? user.props.nacionality,
      address: json.address ?? user.props.address,
      dateOfBirth: json.dateOfBirth ?? user.props.dateOfBirth,
      createdAt: json.createdAt ?? user.props.createdAt,
      id: json.id ?? user.id
    });
  }
}
