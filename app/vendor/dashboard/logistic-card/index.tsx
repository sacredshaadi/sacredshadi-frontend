import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { DashboardLogisticType } from "@/types";
import React from "react";

interface LogisticCardProps {
  logisticType: DashboardLogisticType;
}

const LogisticCard = ({ logisticType }: LogisticCardProps) => {
  return (
    <Card className="flex flex-col gap-2 p-4 shadow-lg">
      <CardTitle>People ({logisticType})</CardTitle>
      <CardDescription>View and manage your orders</CardDescription>
      <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
        <div className="text-3xl font-bold text-primary">12</div>
        <div className="text-sm text-muted-foreground">Orders</div>
      </CardContent>
    </Card>
  );
};

export default LogisticCard;
