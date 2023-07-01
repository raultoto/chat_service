/*
* Simple global schemas that are going to be used across all of our app.
*
* See More: https://www.fastify.io/docs/latest/Reference/Validation-and-Serialization/
*/

// Cursor Pagination: take and from values.
// - from must match the MongoDB document id pattern
export const paginationSchema = {
  $id: 'paginationSchema',
  type: 'object',
  properties: {
    take: {
      type: 'number',
      enum: [5, 10, 25],
      default: 10,
    },
    from: {
      type: 'string',
      pattern: '^[0-9a-fA-F]{24}$',
    },
  },
};


// Used to validate/match URLS that include an ':id' param
export const paramIdSchema = {
  $id: 'paramIdSchema',
  type: 'object',
  properties: {
    id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
  },
  required: ['id'],
};

export const EmailSchema = {
  $id: 'EmailSchema',
  type: 'object',
  properties: {
    value: { type: 'string', format: 'email' },
  },
};

export const PhoneNumberSchema = {
  $id: 'PhoneNumberSchema',
  type: 'object',
  properties: {
    value: { type: 'string', pattern: '^\\+[0-9]{11}$' },
  },
};
