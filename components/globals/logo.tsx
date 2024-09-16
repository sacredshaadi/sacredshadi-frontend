import { HeartFilledIcon } from "@radix-ui/react-icons";

export function Logo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <HeartFilledIcon className="h-6 w-6 text-primary" />
      <span>Sacred Shaadi</span>
    </div>
  );
}
