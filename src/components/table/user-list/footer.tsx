import React from "react";
import { TableContentFooter } from "@/components/base/table";

interface UserListFooterProps {
  currentPage: number;
  pageSize: number;
  totalPage: number;
  totalData: number;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

const UserListFooter: React.FC<UserListFooterProps> = ({
  currentPage,
  pageSize,
  totalPage,
  totalData,
  setCurrentPage,
  setPageSize,
}) => {
  const onChangeShowLimit = (n: number) => {
    setPageSize(n);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <TableContentFooter
      onPageChange={handlePageChange}
      currentPage={currentPage}
      showLimit={pageSize}
      totalPage={totalPage}
      onChangeLimit={onChangeShowLimit}
      totalData={totalData}
    />
  );
};

export default UserListFooter;
