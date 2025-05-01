export const USER_TO_RETURN = `
      id
      email
      name
      password
      isPremium
      premiumExpiration
      createdAt
      updatedAt
      children {
        id
        name
        startingAmount
        interestRate
        interestInterval
        createdAt
        updatedAt
        parentId
        avatar
      }
      authToken
      pinCode
      emailConfirmed
      confirmationToken
      currency
`;
