"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchByIdMutation } from "@/components/api";
import { toast } from "@/components/ui/use-toast";
import { BookModal } from "./book-modal";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import UplodedImages from "@/app/vendor/profile/album-wrapper/uploaded-images";
import { FaHandPointRight } from "react-icons/fa6";
import Image from "next/image";
import { Metadata } from "next";
import { getUrlMetadataForSeo } from "@/app/utils/functions";

export default function PackageDetails(props: { params: { slug: string } }) {
  const router = useRouter();
  const { mutate: searchByIdFn, isPending } = useSearchByIdMutation();
  const [packageDetails, setPackageDetails] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      searchByIdFn(props.params.slug || "", {
        onSuccess: (data) => setPackageDetails(data.data),
        onError: (error) => {
          throw error;
        }
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error fetching data",
        description: "An error occurred while fetching data"
      });
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="sticky top-0 mb-8 flex items-center justify-between">
        <section className="flex flex-col gap-6">
          {isPending ? (
            <Skeleton className="h-16 w-96 bg-gray-100" />
          ) : (
            <h1 className="text-3xl font-bold drop-shadow-lg ">{packageDetails?.vendor?.vendorType?.type || ""}</h1>
          )}
          {isPending ? (
            <Skeleton className="h-14 w-80 bg-gray-100" />
          ) : (
            <section className="flex items-center gap-2">
              {packageDetails?.vendor?.user?.media?.map((media: any) => {
                if (media?.type !== "cover_image") return null;
                else if (media?.type === "cover_image" && !media?.url) return null;
                return (
                  <Image
                    key={media.id}
                    src={media.url}
                    alt="Vendor Image"
                    layout="fixed"
                    width={100}
                    height={100}
                    className="h-24 w-24 rounded-full object-cover"
                  />
                );
              })}
              <section className="flex flex-col items-start gap-2">
                <h2 className="text-3xl font-bold text-muted-foreground">{packageDetails?.vendor?.user?.name || ""}</h2>
                <section className=" flex items-center gap-0 font-semibold text-muted-foreground" title="Total views">
                  <Eye className="mr-px" />
                  {packageDetails?.vendor?.totalViews || 0}
                </section>
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
      <Card className="mb-8 grid grid-cols-1 overflow-hidden shadow-lg md:grid-cols-2">
        <section className="">
          <CardHeader>
            <CardTitle className="text-xl tracking-tight drop-shadow-lg">Package Details</CardTitle>
            <CardDescription>Everything you need for your perfect day</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {(packageDetails?.vendor?.vendorType?.vendorSubTypes || []).map((subType: any) => (
                <div key={subType.id} className="flex items-center">
                  <FaHandPointRight className="mr-2" /> {subType.subType}
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter>
            {isPending ? (
              <Skeleton className="h-12 w-24 bg-gray-100"></Skeleton>
            ) : (
              <p className="text-2xl font-bold drop-shadow-lg">₹{packageDetails?.price || ""}</p>
            )}
          </CardFooter>
        </section>
        <Image
          src={packageDetails?.image || ""}
          alt="Package Image"
          width={400}
          height={150}
          className="w-full object-cover"
        />
      </Card>

      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl tracking-tight drop-shadow-lg">Vendor Details</CardTitle>
        </CardHeader>

        <CardContent>
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
        <Card className="flex flex-col gap-4 p-4">
          <CardTitle className="text-xl tracking-tight drop-shadow-lg">Sample Photos</CardTitle>
          <CardContent className="p-0">
            <UplodedImages userFacing vendorId={packageDetails?.vendor?.id} />
          </CardContent>
        </Card>
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
}

export async function generateMetadata(...params: any): Promise<Metadata> {
  console.log({ params });
  const data = await getUrlMetadataForSeo({
    routeUrl: "/",
    fallbackTitle: "Sacred Shadi",
    fallbackDescription:
      "Sacredshaadi provides a range of wedding services to solve all your wedding planning woes. So sit back, relax and plan your wedding with us with the click of a button"
  });
  return data;
}
