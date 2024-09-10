import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone } from "lucide-react";

interface BookModalProps {
  phoneNo: string;
  email: string;
}

export function BookModal(props: BookModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-fit text-lg font-semibold shadow-lg">Book Now</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-4 sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle>Confirm Booking</DialogTitle>
          <DialogDescription className="font-semibold">
            <section className="flex items-center gap-2">
              <Mail className="mr-2" /> {props.email || "No email found"}
            </section>
            <section className="flex items-center gap-2">
              <Phone className="mr-2" /> {props.phoneNo || "No phone number found"}
            </section>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" className="ml-auto mr-2 font-semibold shadow-lg ">
            Cancel
          </Button>
          <Button type="submit" className="font-semibold shadow-lg">
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
