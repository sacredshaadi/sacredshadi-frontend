import * as ENDPOINTS from './endpoints';
import { useQuery } from '@tanstack/react-query';

export const QUERY_KEYS = {
  getCart: 'getCart'
};

// export const useGetMarketPlaceCart = (accessToken) => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.getProductById],
//     queryFn: () => ENDPOINTS.getMarketPlaceCart(accessToken),
//     enabled: !!accessToken
//   });
// };
