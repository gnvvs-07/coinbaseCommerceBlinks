"use client"

import { Button } from "@/components/common/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  hasNext: boolean
  hasPrevious: boolean
  onNext: () => void
  onPrevious: () => void
  totalItems?: number
  itemsPerPage?: number
  isLoading?: boolean
}

export function Pagination({
  currentPage,
  hasNext,
  hasPrevious,
  onNext,
  onPrevious,
  totalItems,
  itemsPerPage,
  isLoading = false,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <Button
        onClick={onPrevious}
        disabled={!hasPrevious || isLoading}
        variant="outline"
        className="flex items-center gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">Page {currentPage}</span>
        {totalItems && itemsPerPage && (
          <div className="text-xs text-gray-500">
            {Math.min(itemsPerPage, totalItems)} of {totalItems} items
          </div>
        )}
      </div>

      <Button onClick={onNext} disabled={!hasNext || isLoading} variant="outline" className="flex items-center gap-2">
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
