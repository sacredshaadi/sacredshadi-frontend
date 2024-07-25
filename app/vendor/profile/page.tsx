import { SuperAdminLayout } from "@/app/admin/_components/adminLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { CameraIcon } from "lucide-react";
import React from "react";
import { VendorLayout } from "../_components/vendor-layout";

const page = () => {
  return (
    <VendorLayout title="Profile">
      <div className="mx-auto rounded-md bg-background p-6 sm:p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <div className="relative">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback className="text-2xl">AN</AvatarFallback>
            </Avatar>
            <Button variant="secondary" size="sm" className="absolute bottom-0 right-0 rounded-full">
              <CameraIcon className="h-4 w-4" />
              <span className="sr-only">Upload profile image</span>
            </Button>
          </div>
          <div className="grid gap-2 text-center sm:text-left">
            <h1 className="text-2xl font-bold">Catherine Nguyen</h1>
            <p className="text-muted-foreground">Software Engineer at Acme Inc.</p>
            <p className="text-sm text-muted-foreground">
              I'm a passionate software engineer with a love for building innovative products. In my free time, I enjoy
              hiking and exploring the great outdoors.
            </p>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="grid gap-8">
          <div className="grid gap-4">
            <h2 className="text-lg font-semibold">Contact Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="catherine@acme.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <h2 className="text-lg font-semibold">Introduction</h2>
            <Textarea
              rows={2}
              defaultValue="I like to build things and make the world a better place. I'm a software engineer at Acme Inc. and I love what I do."
            />
          </div>
          <div className="grid gap-2">
            <h2 className="text-lg font-semibold">Address</h2>
            <Textarea rows={2} defaultValue="1234 Elm Street, Springfield, IL 62701" />
          </div>

          {/* <div className="grid gap-4">
            <h2 className="text-lg font-semibold">Achievements</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="group">
                <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
                  <div className="rounded-full bg-primary p-2 text-primary-foreground transition-colors group-hover:bg-primary-foreground group-hover:text-primary">
                    <AwardIcon className="h-8 w-8" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">Hackathon Winner 2022</h3>
                    <p className="text-sm text-muted-foreground">Won the annual Acme Inc. hackathon with my team.</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="group">
                <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
                  <div className="rounded-full bg-primary p-2 text-primary-foreground transition-colors group-hover:bg-primary-foreground group-hover:text-primary">
                    <StarIcon className="h-8 w-8" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">Employee of the Month</h3>
                    <p className="text-sm text-muted-foreground">
                      Recognized for outstanding performance and dedication.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="group">
                <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
                  <div className="rounded-full bg-primary p-2 text-primary-foreground transition-colors group-hover:bg-primary-foreground group-hover:text-primary">
                    <RocketIcon className="h-8 w-8" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">Promoted to Senior Engineer</h3>
                    <p className="text-sm text-muted-foreground">
                      Recognized for my technical expertise and leadership.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div> */}
        </div>
      </div>
    </VendorLayout>
  );
};

export default page;
