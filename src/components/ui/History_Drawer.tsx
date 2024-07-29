import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Drawer,
  DrawerTrigger,
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
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/shadcn/pagination";

// Type definitions for Paginated History API
type HistoryEntry = {
  name: string;
  status: string;
  updatedAt: Date;
}
type PaginatedHistory = {
  data: HistoryEntry[];
  meta: {
    current_page: number;
    per_page: number;
    total_pages: number;
    total_count: number;
  }
}

export default function History_Drawer() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const perPage = 5;

  useEffect(() => {
    const fetchHistory = async (currentPage: number) => {
      try {
        const response = await fetch(`/api/get_paginated_history?page=${currentPage}&per_page=${perPage}`);
        if (!response.ok)
          throw new Error('Failed to fetch history');
        const data: PaginatedHistory = await response.json() as PaginatedHistory;
        setHistory(data.data);
        setTotalPages(data.meta.total_pages);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };
    fetchHistory(page)
    .catch((error) => {
      console.error('Error fetching history:', error);
    });
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Drawer>
      <DrawerTrigger>
        Status
      </DrawerTrigger>
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
        <Table className="w-5/6 lg:w-1/2 m-auto ">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Updated At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((entry, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{entry.name}</TableCell>
                <TableCell>{entry.status}</TableCell>
                <TableCell>{new Date(entry.updatedAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DrawerFooter>
          <Pagination>
            <PaginationContent>
              {page > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page - 1);
                    }}
                  />
                </PaginationItem>
              )}
              <h3 className="text-center font-semibold">Page {page}</h3>
              {page < totalPages && (
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page + 1);
                    }}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
          <DrawerClose>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
// If you want to show all page numbers:
//{Array.from({ length: totalPages }).map((_, idx) => (
  //<PaginationItem key={idx}>
    //<PaginationLink
      //href="#"
      //onClick={(e) => {
        //e.preventDefault();
        //handlePageChange(idx + 1);
      //}}
    //>{idx + 1}
    //</PaginationLink>
  //</PaginationItem>
//))}

