import { RegisterUser } from '@/types/auth.types';
import * as ENDPOINTS from './user.endpoints';
import { useMutation, useQuery } from '@tanstack/react-query';

export const QUERY_KEYS = {
  getCart: 'getCart',
  registerUser: 'registerUser',
  loginUser: 'loginUser'
};

export const useRegisterUserMutation = () => {
  return useMutation({
    // queryKey: [QUERY_KEYS.registerUser],

    mutationFn: ENDPOINTS.registerUser,
    mutationKey: [QUERY_KEYS.registerUser]
  });
};

export const useLoginUserMutation = () => {
  return useMutation({
    mutationFn: ENDPOINTS.loginUser,
    mutationKey: [QUERY_KEYS.loginUser]
  });
};

// export const useGetMarketPlaceCart = (accessToken) => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.getProductById],
//     queryFn: () => ENDPOINTS.getMarketPlaceCart(accessToken),
//     enabled: !!accessToken
//   });
// };
