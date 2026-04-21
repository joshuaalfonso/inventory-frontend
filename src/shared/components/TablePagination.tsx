


import { Box, Button } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface Props {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
}

const TablePagination = ({
  currentPage,
  totalPages,
  onNext,
  onPrev,
}: Props) => {
  if (totalPages <= 1) return null;

  return (
        <div className="flex justify-end items-center">
            <Box
                mt={4}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={4}
            >
                <Button
                    size="xs"
                    variant="ghost"
                    colorPalette="gray"
                    onClick={onPrev}
                    disabled={currentPage === 1}
                >
                    <LuChevronLeft />
                </Button>

                <Box fontSize="xs">
                    Page {currentPage} of {totalPages}
                </Box>

                <Button
                    size="xs"
                    variant="ghost"
                    colorPalette="gray"
                    onClick={onNext}
                    disabled={currentPage === totalPages}
                >
                    <LuChevronRight />
                </Button>
            </Box>
        </div>
    );
};

export default TablePagination;