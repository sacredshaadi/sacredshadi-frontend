"use client";

import { CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import React from "react";
import RatingSubComp from "./rating-subcomp";
import { useVendorContext } from "@/app/context/vendor-context";

const FeedbackNodes = () => {
  const { feedbacks } = useVendorContext();

  return (
    <>
      {feedbacks.map((feedback) => (
        <Card key={feedback.id} className="flex flex-col shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{feedback.user.name}</span>
              <span className="flex items-center text-sm font-normal text-muted-foreground">
                <CalendarIcon className="mr-1 h-4 w-4" />
                {feedback.createdAt}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">{feedback.feedback}</p>
          </CardContent>
          <CardFooter>
            <RatingSubComp rating={parseInt(feedback.rating)} />
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default FeedbackNodes;
