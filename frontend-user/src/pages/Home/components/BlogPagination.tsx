import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination";

export default function BlogPagination({ currentPage, totalPages, onPageChange }:{currentPage:number, totalPages:number, onPageChange:(value:number)=>void}) {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={handlePrevious}   className={
              currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
            }/>
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index} >
            <PaginationLink
              href="#"
              isActive={index + 1 === currentPage}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href="#" onClick={handleNext}     className={
              currentPage >= totalPages? "pointer-events-none opacity-50" : undefined
            }/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
