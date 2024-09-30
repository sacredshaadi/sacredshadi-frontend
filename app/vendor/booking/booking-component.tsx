"use client";

import { useState } from "react";
import { CalendarIcon, Loader2, MessageSquare } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useUserStore } from "@/app/context/user-context";
import { useGetAllVendorBookingsMutation, useUpdateBookingStatusMutation } from "@/components/api";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Booking, BookingStatus } from "@/types/user-facing";
import React from "react";
import { cn } from "@/lib/utils";
import { useVendorContext } from "@/app/context/vendor-context";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

enum BookingStateEnum {
  confirmed = "confirmed",
  completed = "completed",
  cancelled = "cancelled"
}

const pageSize = 9;
const BookingComponent = () => {
  const { vendor } = useUserStore();
  const { bookings, setBookings } = useVendorContext();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const { mutate: getAllVendorBookingsFn, isPending, isError } = useGetAllVendorBookingsMutation();
  const { mutate: updateBookingStatusFn, isPending: bsPending, isError: bsError } = useUpdateBookingStatusMutation();
  const [bookingState, setBookingState] = useState<BookingStateEnum>(BookingStateEnum.confirmed);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    try {
      if (!vendor) return;
      getAllVendorBookingsFn(
        { accessToken: vendor?.tokens.accessToken, page, pageSize },
        {
          onSuccess: (data) => {
            setTotalCount(data.data.count);
            setBookings(data.data.rows as Booking[]);
          },
          onError: (error) => {
            throw error;
          }
        }
      );
    } catch (err: any) {
      const desc = err.error || err.message;
      if (!desc) return;
      toast({ title: "Error", description: desc, variant: "destructive" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendor, page]);

  const handleFeedback = (booking: any) => {
    setSelectedBooking(booking);
  };

  const submitFeedback = (e: any) => {
    e.preventDefault();
    try {
      if (!vendor?.tokens.accessToken) throw new Error("User not logged in");
      updateBookingStatusFn(
        { accessToken: vendor.tokens.accessToken, status: bookingState, id: selectedBooking?.id || -1 },
        {
          onSuccess: (data) => toast({ title: "Success", description: "Feedback submitted successfully" }),
          onError(error) {
            throw error;
          }
        }
      );
    } catch (err: any) {
      const desc = err.error || err.message;
      if (!desc) return;
      toast({ title: "Error", variant: "destructive", description: desc });
    } finally {
      setSelectedBooking(null);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <Card key={booking.id} className="flex flex-col shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{booking.vendorName}</span>
                <span className="flex items-center text-sm font-normal text-muted-foreground">
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  {format(new Date(booking.bookingDate), "dd/MM/yyyy")}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <h3 className="mb-2 font-semibold">{booking.serviceOfferedDetails}</h3>
              <p className="text-sm text-muted-foreground">{booking.serviceOfferedDetails}</p>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full border-2 border-primary bg-primary-foreground font-semibold text-primary shadow-md transition hover:bg-primary hover:text-white"
                    )}
                    onClick={() => handleFeedback(booking)}
                    disabled={bsPending || booking?.status === BookingStatus.completed}
                  >
                    {booking?.status === BookingStatus.completed ? (
                      <>Status Updated</>
                    ) : (
                      <>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Update Status
                      </>
                    )}
                  </Button>
                </DialogTrigger>
                {selectedBooking && (
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Status Update</DialogTitle>
                      <DialogDescription>
                        Update the status of the booking for {selectedBooking.serviceOfferedDetails}
                      </DialogDescription>
                    </DialogHeader>
                    <Select
                      value={bookingState}
                      onValueChange={(value) => {
                        setBookingState(value as BookingStateEnum);
                      }}
                      defaultValue={BookingStateEnum.confirmed}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value={BookingStateEnum.confirmed}>Confirm</SelectItem>
                          <SelectItem value={BookingStateEnum.completed}>Complete</SelectItem>
                          <SelectItem value={BookingStateEnum.cancelled}>Cancel</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <DialogFooter>
                      <Button type="submit" className="font-semibold shadow-lg" onClick={submitFeedback}>
                        {(isPending || bsPending) && !isError && !bsError && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Update Status
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                )}
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-end gap-4">
        <Button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
          Previous
        </Button>

        <div>
          Showing&nbsp;
          <span className="font-semibold">{bookings.length}</span>
          &nbsp;of&nbsp;
          <span className="font-semibold">{totalCount}</span>
          &nbsp;bookings
        </div>

        <Button onClick={() => setPage((prev) => prev + 1)} disabled={page * pageSize >= totalCount}>
          Next
        </Button>
      </div>
    </>
  );
};

export default BookingComponent;
