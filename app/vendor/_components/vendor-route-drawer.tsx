import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import { VendorSidebar } from "./vendor-sidebar";

export default function VendorRouteDrawer() {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild className="ml-4 text-primary">
        <Menu className="h-8 w-8 cursor-pointer" />
        {/* <Button variant="outline" size="icon">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button> */}
      </DrawerTrigger>
      <DrawerContent className="h-screen w-fit gap-0 overflow-hidden rounded-none rounded-r-md">
        <VendorSidebar collapsed={false} />
        {/* <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
          <DrawerDescription>Navigate through our app</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-0">
          <nav className="flex flex-col space-y-1">
            <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">Home</a>
            <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">About</a>
            <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">Services</a>
            <a href="#" className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">Contact</a>
          </nav>
        </div> */}
        {/* <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
}
