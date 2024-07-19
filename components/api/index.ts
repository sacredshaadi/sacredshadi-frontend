import * as ENDPOINTS from './user.endpoints';
import { useMutation } from '@tanstack/react-query';

export const QUERY_KEYS = {
  getCart: 'getCart',
  registerUser: 'registerUser',
  loginUser: 'loginUser'
};

export const useRegisterUserMutation = () => {
  return useMutation({
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
