import { ReactNode } from "react";
import { cn } from "../../libs/cn";


export default function GCard({
  children,
  exSt,
}: {
  children: ReactNode;
  exSt?: string;
}) {
  return (
    <div
      className={cn(
        "p-[16px] mb-[16px]  border rounded-md border-gray transition duration-100 ",
        exSt && exSt
      )}
    >
      {children}
    </div>
  );
}
