import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ScrollArea } from "~/components/ui/shadcn/scroll-area";
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
  PaginationLink,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/shadcn/pagination";

// Type definitions for Paginated History API
type HistoryEntry = {
  name: string;
  status: string;
  updatedAt: Date;
};
type PaginatedHistory = {
  data: HistoryEntry[];
  meta: {
    current_page: number;
    per_page: number;
    total_pages: number;
    total_count: number;
  }
};
type History_Drawer_Props = {
  user_id: number;
};

const History_Drawer: React.FC<History_Drawer_Props> = ({ user_id }) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const perPage = 50;

  const fetchHistory = async (currentPage: number, user_id: number) => {
    try {
      const response = await fetch(`/api/get_paginated_history?user_id=${user_id}&page=${currentPage}&per_page=${perPage}`);
      if (!response.ok) throw new Error('Failed to fetch history');
      const data: PaginatedHistory = await response.json() as PaginatedHistory;
      setHistory(data.data);
      setTotalPages(data.meta.total_pages);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  useEffect(() => {
    fetchHistory(page, user_id).catch((error) => {
      console.error('Error fetching history:', error);
    });
  }, [page, user_id]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>
          <div className="flex flex-row items-center text-center sm:justify-center sm:ml-0 py-4">
            <Image src="/images/tech_tracker_logo.png" alt="Tech Tracker Logo" width={60} height={60} className="max-w-[40px] md:max-w-[120px]" />
            <h1 className="title-text text-sm md:text-2xl lg:text-6xl bg-gradient-to-r from-[#bec8e6] via-[#F0EEE4] to-[#FFF8E7] font-bold pl-2 md:pl-4 text-transparent bg-clip-text">
              History
            </h1>
          </div>
        </DrawerTitle>
      </DrawerHeader>
      <ScrollArea className="w-full sm:w-5/6 lg:w-5/12 m-auto h-80">
        <Table className="w-full m-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold lg:max-w-[100px]">Name</TableHead>
              <TableHead className="font-semibold lg:max-w-[100px]">Status</TableHead>
              <TableHead className="font-semibold lg:max-w-[100px] justify-end items-end text-right">Updated At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((entry, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium lg:max-w-[100px]">{entry.name}</TableCell>
                <TableCell className="font-medium lg:max-w-[100px]">{entry.status}</TableCell>
                <TableCell className="font-medium lg:max-w-[100px] justify-end items-end text-right">{new Date(entry.updatedAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
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
            {totalPages > 10 && (
              <h3 className="text-center flex flex-row">
                Page 
                <h3 className="font-bold mx-1">
                  {page}
                </h3>
                of
                <h3 className="font-semibold ml-1">
                  {totalPages}
                </h3>
              </h3>
            )}
            {totalPages <= 10 && Array.from({ length: totalPages }).map((_, idx) => (
              <PaginationItem key={idx}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(idx + 1);
                  }}
                >{idx + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
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
  );
};
export default History_Drawer;
