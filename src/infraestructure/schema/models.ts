/*
* Some global schemas, representing our stuff from the Database.
* These will be used mostly when serializing data in our responses.
*
* See More: https://www.fastify.io/docs/latest/Reference/Validation-and-Serialization/
*/

export const personSchema = {
  $id: 'personSchema',
  type: 'object',
  properties: {
    id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { $ref: 'EmailSchema' },
    phoneNumber: { $ref: 'PhoneNumberSchema' },
    personType: { type: 'string', enum: ['NATURAL', 'FOREIGN', 'LEGAL', 'NATURAL_WITH_RUC'] },
    documentType: { type: 'string', enum: ['DNI', 'PASSPORT', 'INMIGRATION_CARD', 'REFUGEE_CARD', 'IDENTIFICATION_CARD', 'TEMPORARY_RESIDENCE_CARD'] },
    documentNumber: { type: 'string' },
    ruc: { type: 'string', nullable: true },
    socialReason: { type: 'string', nullable: true },
    registryEntry: { type: 'string', nullable: true },
  },
};

// User
export const userSchema = {
  $id: 'userSchema',
  type: 'object',
  properties: {
    id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
    username: { type: 'string' },
    password: { type: 'string', minLength: 8 },
    lastLogin: { type: 'string', nullable: true },
    isActive: { type: 'boolean', default: true },
    isStaff: { type: 'boolean', default: false },
    isSuperuser: { type: 'boolean', default: false },
    person: { $ref: 'personSchema' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
  },
};

export const chatSchema = {
  $id: 'chatSchema',
  type: 'object',
  properties: {
    id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
    name: { type: 'string' },
    description: { type: 'string' },
    messages: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
          message: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          user: { $ref: 'userSchema' },
        },
      },
    },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
  },
};
