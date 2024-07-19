import apiClient from '@/lib/apiConfig/apiClient';

const getSlider = async (accessToken: string) => {
  return apiClient(`/api/v1/admin/slider`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};
