import apiClient from '@/lib/apiConfig/apiClient';
import { citiesUrls } from '@/lib/apiConfig/urls';

export const createCity = (payload: any) => {
  return apiClient(citiesUrls.createCityUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
};

export const getAllCities = () => {
  return apiClient(citiesUrls.getAllCities, {
    method: 'GET'
  });
};

export const updateCity = (payload: any) => {
  return apiClient(citiesUrls.updateCity, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
};

export const removeCity = (id: string) => {
  return apiClient(`${citiesUrls.removeCity}/${id}`, {
    method: 'DELETE'
  });
};
