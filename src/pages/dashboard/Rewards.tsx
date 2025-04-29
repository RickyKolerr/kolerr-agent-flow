
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RewardsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Rewards</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Rewards program content will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RewardsPage;
