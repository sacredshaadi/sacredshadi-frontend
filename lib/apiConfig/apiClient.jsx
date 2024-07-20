const defaultSuccessHandler = async (response) => {
  try {
    const contentType = response.headers.get("content-type");

    let data;
    if (contentType && contentType.indexOf("application/json") !== -1) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const error = (data && data) || response.status;
      return Promise.reject(error);
    }
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const defaultErrorHandler = (error) => {
  // @TODO change to warning in dev prod
  throw error;
};

const getApiClient =
  ({ baseURL, sucessHandler, errorHandler }) =>
  (url, requestOptions) => {
    return fetch(`${baseURL}${url}`, requestOptions).then(sucessHandler).catch(errorHandler);
  };

export const apiClient = getApiClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  sucessHandler: defaultSuccessHandler,
  errorHandler: defaultErrorHandler
});

export default apiClient;
