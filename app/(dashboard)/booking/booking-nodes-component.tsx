"use client";

import { useState } from "react";
import { CalendarIcon, Loader2, MessageSquare } from "lucide-react";

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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useUserStore } from "@/app/context/user-context";
import { useCreateFeedbackMutation, useGetAllUserBookingsMutation } from "@/components/api";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useCustomerStore } from "@/app/context/user-store";
import { Booking, BookingStatus } from "@/types/user-facing";
import React from "react";
import { cn } from "@/lib/utils";

const BookingNodesComponent = () => {
  const { user } = useUserStore();
  const { bookings, setBookings } = useCustomerStore();
  const [rating, setRating] = useState(4);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const { mutate: getAllUserBookingsFn, isPending, isError } = useGetAllUserBookingsMutation();
  const { mutate: createFeedbackFn, isPending: fbPending, isError: fbError } = useCreateFeedbackMutation();
  const [comment, setComment] = useState("");

  useEffect(() => {
    try {
      if (!user) return;
      getAllUserBookingsFn(user.tokens.accessToken, {
        onSuccess: (data) => {
          setBookings(data.data as Booking[]);
        },
        onError: (error) => {
          throw error;
        }
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.error || err.message || "Something went wrong",
        variant: "destructive"
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleFeedback = (booking: any) => {
    setSelectedBooking(booking);
  };

  const submitFeedback = (e: any) => {
    e.preventDefault();
    try {
      if (!user?.tokens.accessToken) throw new Error("User not logged in");
      createFeedbackFn(
        {
          accessToken: user.tokens.accessToken,
          data: {
            feedback: comment,
            rating,
            bookingId: selectedBooking?.id
          }
        },
        {
          onSuccess(data) {
            toast({ title: "Success", description: "Feedback submitted successfully" });
          },
          onError(error) {
            throw error;
          }
        }
      );
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.error || err.message || "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setComment("");
      setRating(4);
      setSelectedBooking(null);
    }
  };

  return (
    <>
      {bookings.map((booking) => (
        <Card key={booking.id} className="flex flex-col shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{booking.vendorName}</span>
              <span className="flex items-center text-sm font-normal text-muted-foreground">
                <CalendarIcon className="mr-1 h-4 w-4" />
                {booking.bookingDate}
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
                    "w-full border-2 border-primary bg-primary-foreground font-semibold text-primary shadow-md transition hover:bg-primary hover:text-white",
                    booking.status === BookingStatus.pending && "border-transparent bg-orange-600 text-white"
                  )}
                  onClick={() => handleFeedback(booking)}
                  disabled={booking.status === BookingStatus.pending}
                >
                  {booking.status === BookingStatus.pending ? (
                    <>Not completed</>
                  ) : (
                    <>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Give Feedback
                    </>
                  )}
                </Button>
              </DialogTrigger>
              {selectedBooking && (
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Feedback for {selectedBooking.vendorName}</DialogTitle>
                    <DialogDescription>
                      Please rate your experience and provide any comments. Your ratings are viewed by the vendors.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={submitFeedback}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="rating" className="text-right">
                          Rating
                        </Label>
                        <div className="rating">
                          <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" value={1} />
                          <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" value={2} />
                          <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" value={3} />
                          <input
                            type="radio"
                            name="rating-2"
                            className="mask mask-star-2 bg-orange-400"
                            defaultChecked
                            value={4}
                          />
                          <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" value={5} />
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="comment" className="text-right">
                          Comment
                        </Label>
                        <Textarea
                          id="comment"
                          className="col-span-3"
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="font-semibold shadow-lg">
                        {(isPending || fbPending) && !isError && !fbError && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Submit Feedback
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              )}
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default BookingNodesComponent;
