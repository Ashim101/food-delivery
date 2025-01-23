import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type props = {
  pages: number;
  page: number;
  onPageChange: (page: number) => void;
};

const PaginationSelector = ({ pages, page, onPageChange }: props) => {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    pages > 1 && (
      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(page - 1)}
                href="#"
              />
            </PaginationItem>
          )}

          {pageNumbers.map((number) => (
            <PaginationItem key={number}>
              <PaginationLink
                href="#"
                isActive={page === number}
                onClick={() => onPageChange(number)}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}

          {page !== pageNumbers.length && (
            <PaginationItem>
              <PaginationNext onClick={() => onPageChange(page + 1)} href="#" />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    )
  );
};

export default PaginationSelector;
