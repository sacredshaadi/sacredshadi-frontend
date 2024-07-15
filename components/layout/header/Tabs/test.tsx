import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TabsDemo() {
  return (
    <Tabs defaultValue="home" className="">
      <TabsList className="gap-2">
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="vendors">Vendors</TabsTrigger>
        <TabsTrigger value="booking">Booking</TabsTrigger>
        <TabsTrigger value="hangout">Hangout</TabsTrigger>
        <TabsTrigger value="quiz">Quiz</TabsTrigger>
        <TabsTrigger value="about">About Us</TabsTrigger>
        <TabsTrigger value="contact">Contact Us</TabsTrigger>
      </TabsList>

      {/* <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent> */}
    </Tabs>
  );
}
