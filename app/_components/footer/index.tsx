import { Facebook, Heart, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import Pinterest from "./icons/pinterest";
import { phoneArr } from "@/constants/data";
import Image from "next/image";
import { HeartFilledIcon } from "@radix-ui/react-icons";

export default function Footer() {
  return (
    <footer className="bg-muted py-10 ">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-8 sm:grid-cols-2 md:grid-cols-4">
        <div className="space-y-4 sm:col-span-2">
          <Link href="https://sacredshaadi.com" target="_blank" className="flex items-center" prefetch={false}>
            <HeartFilledIcon className="mr-2 h-6 w-6 text-primary" />
            <span className="text-xl font-bold">What&apos;s in store</span>
          </Link>
          <p className="text-sm">
            To solve all your wedding planning woes, Sacredshaadi provides a range of wedding services. So sit back,
            relax and plan your wedding with us with the click of a button.
          </p>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Follow Us</h4>
          <div className="flex gap-2">
            <Link
              href="https://www.facebook.com/SacredShaadi/"
              target="_blank"
              className="flex items-center justify-center rounded-full border border-gray-300 p-2 text-muted-foreground transition hover:bg-gray-300 hover:text-primary"
              prefetch={false}
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.instagram.com/sacredshaadi/"
              target="_blank"
              className="flex items-center justify-center rounded-full border border-gray-300 p-2 text-muted-foreground transition hover:bg-gray-300 hover:text-primary"
              prefetch={false}
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.pinterest.com/sacredshaadi/"
              target="_blank"
              className="flex items-center justify-center rounded-full border border-gray-300 p-2 text-muted-foreground transition hover:bg-gray-300 hover:text-primary"
              prefetch={false}
            >
              <Pinterest />
            </Link>
            <Link
              href="https://www.youtube.com/c/SacredShaadi"
              target="_blank"
              className="flex items-center justify-center rounded-full border border-gray-300 p-2 text-muted-foreground transition hover:bg-gray-300 hover:text-primary"
              prefetch={false}
            >
              <Youtube className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Contact Us</h4>
          <nav className="flex items-center gap-1">
            <a href={`tel:${phoneArr[0]}`} className="text-sm text-muted-foreground hover:text-primary">
              {phoneArr[0]}
            </a>
            <div className="text-muted-foreground">|</div>
            <a href={`tel:${phoneArr[1]}`} className="text-sm text-muted-foreground hover:text-primary">
              {phoneArr[1]}
            </a>
          </nav>
        </div>
      </div>
      <div
        className="mt-8 flex items-center justify-center gap-2 border-t border-muted/50
        px-4 pt-4 text-center text-xs text-muted-foreground
      "
      >
        <span className="flex items-center justify-center gap-2">
          <Link href={"https://sacredshaadi.com"} target="_blank">
            <Image
              src={"https://sacredshaadi.com/images/shadi_logo%20copy.png"}
              alt="Sacred Shaadi"
              width={100}
              height={50}
            />
          </Link>
          <p>
            &copy; Copyright 2024. All rights reserved Sacred Shaadi. Design and developed by Nexus Solutions Pvt. Ltd..
          </p>
        </span>
        <section className="flex items-center justify-center gap-1">
          <Link href={"/front/faq"} className="underline hover:text-primary">
            FAQs
          </Link>
          <Link href={"/front/contact"} className="underline hover:text-primary">
            Contact Us
          </Link>
        </section>
      </div>
    </footer>
  );
}
