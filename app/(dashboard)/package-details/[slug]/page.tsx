"use client";

import { useEffect, useState } from "react";
import { Star, Mail, Phone, MapPin, Camera, Video, Music, Utensils, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSearchByIdMutation } from "@/components/api";
import { toast } from "@/components/ui/use-toast";
import { BookModal } from "./book-modal";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import UplodedImages from "@/app/vendor/profile/album-wrapper/uploaded-images";
import { FaHandPointRight } from "react-icons/fa6";

const PackageDetails = (props: { params: { slug: string } }) => {
  const router = useRouter();
  const { mutate: searchByIdFn, isPending } = useSearchByIdMutation();
  const [packageDetails, setPackageDetails] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      searchByIdFn(props.params.slug || "", {
        onSuccess(data, variables, context) {
          setPackageDetails(data.data);
        },
        onError(error, variables, context) {
          throw error;
        }
      });
    } catch (error) {
      toast({
        title: "Error fetching data",
        description: "An error occurred while fetching data",
        variant: "destructive"
      });
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="sticky top-0 mb-8 flex items-center justify-between">
        <section className="flex flex-col gap-2">
          {isPending ? (
            <Skeleton className="h-16 w-96 bg-gray-100" />
          ) : (
            <h1 className="text-3xl font-bold drop-shadow-lg ">{packageDetails?.vendor?.vendorType?.type || ""}</h1>
          )}
          {isPending ? (
            <Skeleton className="h-14 w-80 bg-gray-100" />
          ) : (
            <section className="flex items-end gap-2">
              <h2 className="text-3xl font-bold text-muted-foreground">{packageDetails?.vendor?.user?.name || ""}</h2>
              <section className=" flex items-center gap-0 font-semibold text-muted-foreground" title="Total views">
                <Eye className="mr-px" />
                {packageDetails?.vendor?.totalViews || 0}
              </section>
            </section>
          )}
        </section>
        {!isPending && (
          <BookModal
            phoneNo={packageDetails?.vendor?.user?.phone || ""}
            email={packageDetails?.vendor?.user?.email || ""}
            vendorId={packageDetails?.vendor?.id || ""}
            packageId={packageDetails?.id || ""}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
          />
        )}
      </section>

      {/* Package Details */}
      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl tracking-tight drop-shadow-lg">Package Details</CardTitle>
          <CardDescription>Everything you need for your perfect day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* {packageDetails?.vendor?.} */}
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
          {isPending ? (
            <Skeleton className="h-12 w-24 bg-gray-100"></Skeleton>
          ) : (
            <p className="text-2xl font-bold drop-shadow-lg">₹{packageDetails?.price || ""}</p>
          )}
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
              <Mail className="mr-2" />{" "}
              {isPending ? (
                <Skeleton className="h-6 w-48 rounded-lg bg-gray-100"></Skeleton>
              ) : (
                packageDetails?.vendor?.user?.email || "No email found"
              )}
            </div>
            <div className="flex items-center">
              <Phone className="mr-2" />{" "}
              {isPending ? (
                <Skeleton className="h-6 w-48 rounded-lg bg-gray-100"></Skeleton>
              ) : (
                packageDetails?.vendor?.user?.phone || "No phone number found"
              )}
            </div>
            <div className="col-span-2 flex items-center">
              <MapPin className="mr-2" />{" "}
              {isPending ? (
                <Skeleton className="h-6 w-48 rounded-lg bg-gray-100"></Skeleton>
              ) : (
                packageDetails?.vendor?.user?.addresses?.[0]?.city?.name || "No address found"
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vendor Album */}
      {isPending ? (
        <Skeleton className="">
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="h-12 w-96 rounded-lg bg-gray-100"></CardTitle>
              <CardDescription className="h-6 w-48 rounded-lg bg-gray-100"></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="h-48 w-48 rounded-lg bg-gray-100"></div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Skeleton>
      ) : (
        <UplodedImages userFacing vendorId={packageDetails?.vendor?.id} />
      )}

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
