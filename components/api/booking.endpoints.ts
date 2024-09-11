import apiClient from "@/lib/apiConfig/apiClient";
import { bookingEndpoints } from "@/lib/apiConfig/endpoints";

export const createBooking = (payload: any) => {
  return apiClient(bookingEndpoints.createBooking, {
    method: "POST",
    body: JSON.stringify({ ...payload, accessToken: null }),
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${payload.accessToken}` }
  });
};

export const getAllBookingsForAdmin = (accessToken: string) =>
  apiClient(bookingEndpoints.getAllBookingsForAdmin, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` }
  });

export const getAllUserBookings = (accessToken: string) =>
  apiClient(bookingEndpoints.getAllUserBookings, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` }
  });

export const getAllVendorBookings = (accessToken: string) =>
  apiClient(bookingEndpoints.getAllVendorBookings, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` }
  });

export const getBookingById = (payload: { id: string; accessToken: string }) =>
  apiClient(`${bookingEndpoints.getBookingById}/${payload.id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${payload.accessToken}` }
  });

export const updateBookingStatus = (payload: { id: string; status: string; accessToken: string }) =>
  apiClient(bookingEndpoints.updateBooking, {
    method: "PUT",
    body: JSON.stringify({ status: payload.status, id: payload.id }),
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${payload.accessToken}` }
  });
