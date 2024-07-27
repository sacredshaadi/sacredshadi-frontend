export const authEdnpoints = {
  registerUser: "/api/v1/user/register",
  loginUser: "/api/v1/user/login",
  registerVendor: "/api/v1/vendor/register",
  loginVendor: "/api/v1/vendor/login",
  registerAdmin: "",
  loginSuperAdmin: "/api/v1/admin/login"
} as const;

export const citiesEndpoints = {
  createCity: "/api/v1/city/create",
  getAllCities: "/api/v1/city/all",
  updateCity: "/api/v1/city/update",
  removeCity: "/api/v1/city/remove"
} as const;

export const userEndpoints = {
  userProfile: "/api/v1/user/profile",
  removeUser: "/api/v1/user/remove"
} as const;

export const sliderEndpoints = {
  createCarousel: "/api/v1/sliders/add",
  getAllCarousels: "/api/v1/sliders",
  updateCarousel: "/api/v1/sliders/update",
  removeCarousel: "/api/v1/sliders/remove"
} as const;

export const vendorTypeEndpoints = {
  createVendorType: "/api/v1/vendor-type/add",
  getAllVendorTypes: "/api/v1/vendor-type/all",
  updateVendorType: "/api/v1/vendor-type/update",
  removeVendorType: "/api/v1/vendor-type/remove"
} as const;

export const vendorEndpoints = {
  vendorProfile: "/api/v1/vendor/profile",
  removeVendor: "/api/v1/vendor/remove"
} as const;

export const adminEndpoints = {
  getDashboardData: "/api/v1/admin/get-dashboard"
} as const;
