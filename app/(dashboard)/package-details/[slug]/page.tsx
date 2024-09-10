"use client";

import { useEffect, useState } from "react";
import { Star, Mail, Phone, MapPin, Camera, Video, Music, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSearchByIdMutation } from "@/components/api";
import { toast } from "@/components/ui/use-toast";
import { Root } from "@/app/context/vendor-search-context";
import Image from "next/image";
import { BookModal } from "./book-modal";

const PackageDetails = (props: { params: { slug: string } }) => {
  const [message, setMessage] = useState("");
  const { mutate: searchByIdFn, isPending, isError } = useSearchByIdMutation();
  const [packageDetails, setPackageDetails] = useState<any>({});

  useEffect(() => {
    try {
      searchByIdFn(props.params.slug || "", {
        onSuccess(data, variables, context) {
          console.log("Data fetched successfully:", data);
          setPackageDetails(data.data);
        },
        onError(error, variables, context) {
          console.log("Error fetching data:", error);
          throw error;
        }
      });
    } catch (error) {
      console.log("Error fetching data:", error);
      toast({
        title: "Error fetching data",
        description: "An error occurred while fetching data",
        variant: "destructive"
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Message submitted:", message);
    setMessage("");
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="sticky top-0 mb-8 flex items-center justify-between">
        <section className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold drop-shadow-lg ">{packageDetails?.vendor?.vendorType?.type || ""}</h1>
          <h2 className="text-3xl font-bold text-muted-foreground">{packageDetails?.vendor?.user?.name || ""}</h2>
        </section>
        <BookModal
          phoneNo={packageDetails?.vendor?.user?.phone || ""}
          email={packageDetails?.vendor?.user?.email || ""}
        />
      </section>

      {/* Package Details */}
      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl tracking-tight drop-shadow-lg">Package Details</CardTitle>
          <CardDescription>Everything you need for your perfect day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center">
              <Camera className="mr-2" /> Professional Photography
            </div>
            <div className="flex items-center">
              <Video className="mr-2" /> Cinematic Videography
            </div>
            <div className="flex items-center">
              <Music className="mr-2" /> DJ and Sound System
            </div>
            <div className="flex items-center">
              <Utensils className="mr-2" /> Catering for 100 guests
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-2xl font-bold">₹{packageDetails?.price || ""}</p>
        </CardFooter>
      </Card>

      {/* Vendor Details */}
      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl tracking-tight drop-shadow-lg">Vendor Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center">
            <Avatar className="mr-4 h-16 w-16">
              <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Vendor" />
              <AvatarFallback>VD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">Dream Weddings Inc.</h3>
              <div className="flex items-center">
                <Star className="fill-current text-yellow-400" />
                <Star className="fill-current text-yellow-400" />
                <Star className="fill-current text-yellow-400" />
                <Star className="fill-current text-yellow-400" />
                <Star className="fill-current text-yellow-400" />
                <span className="ml-2 text-sm text-gray-600">(52 reviews)</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center">
              <Mail className="mr-2" /> {packageDetails?.vendor?.user?.email || "No email found"}
            </div>
            <div className="flex items-center">
              <Phone className="mr-2" /> {packageDetails?.vendor?.user?.phone || "No phone number found"}
            </div>
            <div className="col-span-2 flex items-center">
              <MapPin className="mr-2" />{" "}
              {packageDetails?.vendor?.user?.addresses?.[0]?.city?.name || "No address found"}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vendor Album */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Vendor Album</CardTitle>
          <CardDescription>Previous work by Dream Weddings Inc.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <img
                key={i}
                src={`/placeholder.svg?height=150&width=150&text=Wedding+${i}`}
                alt={`Wedding ${i}`}
                className="aspect-square h-auto w-full rounded-lg object-cover"
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Vendor */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Contact Vendor</CardTitle>
          <CardDescription>Send a message to Dream Weddings Inc.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input type="text" placeholder="Your Name" required />
            </div>
            <div className="mb-4">
              <Input type="email" placeholder="Your Email" required />
            </div>
            <div className="mb-4">
              <Textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Send Message</Button>
          </form>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default PackageDetails;
