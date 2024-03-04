"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from "@/components/navbar-header";
import { Meteors } from "@/components/ui/meteors";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton, SkeletonRow } from '@/components/ui/skeleton';

const columns = [
  {
    key: "model",
    label: "MODEL",
  },
  {
    key: "ImageUrl",
    label: "IMAGE",
  },
  {
    key: "data",
    label: "DATA",
  },
];

const limit = 5; // Set the limit of items per page

export default function Test() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:4000/search/all?page=${page}&limit=${limit}`)
      .then(response => response.json())
      .then(data => {
        setRows(data.results);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [page]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-20">
      <Header/>
      <div >
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
          Test things here
        </h1>
        <Meteors number={20} />
        {loading ? (
          <div className="space-y-4">
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </div>
        ) : (
          <Table aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={rows}>
              {(item) => (
                <TableRow key={item.model}>
                  <TableCell>{item.model}</TableCell>
                  <TableCell>
                    <div style={{ borderRadius: '50%', overflow: 'hidden', width: '40px', height: '40px' }}>
                      <Image src={item.ImageUrl} alt={item.model} width={40} height={40} />
                    </div>
                  </TableCell>
                  <TableCell>{item.data.join(', ')}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
        <div className="flex justify-center mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={(e) => {e.preventDefault(); if(page > 1) setPage(page - 1);}} />
              </PaginationItem>
              {[...Array(totalPages).keys()].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink href="#" onClick={(e) => {e.preventDefault(); setPage(index + 1);}}>{index + 1}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext href="#" onClick={(e) => {e.preventDefault(); if(page < totalPages) setPage(page + 1);}} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </main>
  );
}