import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "~/components/ui/shadcn/drawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/shadcn/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/shadcn/pagination";
//import { Button } from "~/components/ui/shadcn/button";
import Image from "next/image";

export default function History_Drawer() {
  //const 
  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>
          <div className="flex flex-row items-center text-center
            sm:justify-center sm:ml-0 py-4">
            <Image src="/images/tech_tracker_logo.png"
              alt="Tech Tracker Logo" width={60} height={60}
              className="max-w-[40px] md:max-w-[120px]"
            />
            <h1 className="title-text text-sm md:text-2xl lg:text-6xl
              bg-gradient-to-r from-[#bec8e6] via-[#F0EEE4] to-[#FFF8E7]
              font-bold pl-2 md:pl-4 text-transparent bg-clip-text">
              History
            </h1>
          </div>
        </DrawerTitle>
      </DrawerHeader>
      <Table className="w-5/6 lg:w-1/2 m-auto"
      >
        <TableHeader>
          <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <DrawerFooter>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <DrawerClose>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};
