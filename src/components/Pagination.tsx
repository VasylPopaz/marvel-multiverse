import ReactPaginate from "react-paginate";

import { Icon } from "../components";

import { useBreakpointValue } from "../hooks";

interface PaginationProps {
  page: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export const Pagination = ({
  page,
  totalPages,
  handlePageChange,
}: PaginationProps) => {
  const pagesDisplayed = useBreakpointValue([2, 2, 1]);

  const handlePageClick = ({ selected }: { selected: number }): void => {
    handlePageChange(selected + 1);
  };

  if (page > totalPages && totalPages <= 1) return;

  return (
    <ReactPaginate
      forcePage={page ? page - 1 : 0}
      onPageChange={handlePageClick}
      marginPagesDisplayed={pagesDisplayed}
      pageRangeDisplayed={1}
      pageCount={totalPages}
      breakLabel="..."
      previousLabel={<Icon id="chevron-left" className="size-3 fill-white" />}
      nextLabel={<Icon id="chevron-right" className="size-3 fill-white" />}
      containerClassName=" flex justify-center items-center gap-2 text-[14px] font-medium leading-[1.29]"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      activeClassName="active-pg"
      previousClassName={"page-item"}
      previousLinkClassName={"page-link  page-link-prev"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link page-link-next"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
    />
  );
};
