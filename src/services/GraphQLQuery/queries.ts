import {USER_TO_RETURN} from './commonParams';
import {gql} from '@apollo/client';

export const QUERIES = {
  GET_USER: gql`
    query Query($authToken: String!) {
      getMe(authToken: $authToken) {
        ${USER_TO_RETURN}
      }
    }
  `,
};
