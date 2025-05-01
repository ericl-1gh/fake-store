import {gql} from '@apollo/client';
import {USER_TO_RETURN} from './commonParams';

export const MUTATIONS = {
  CREATE_TRANSACTION: gql`
    mutation CreateTransaction(
      $childId: String!
      $amount: Float!
      $description: String!
      $date: String!
      $image: String
      $repeatOn: String
    ) {
      createTransaction(
        childId: $childId
        amount: $amount
        description: $description
        date: $date
        image: $image
        repeatOn: $repeatOn
      ) {
        ${USER_TO_RETURN}
      }
    }
  `,
};
