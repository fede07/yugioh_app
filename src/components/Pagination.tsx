interface PaginationProps {
  itemsPerPage: number
  totalItems: number
  currentPage: number
  paginate: (pageNumber: number) => void
}

const Pagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  paginate,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const maxVisibleButtons = 7

  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = []
    const halfRange = Math.floor(maxVisibleButtons / 2)

    if (totalPages <= maxVisibleButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      if (currentPage <= halfRange + 1) {
        for (let i = 1; i <= maxVisibleButtons - 2; i++) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      }
      else if (currentPage >= totalPages - halfRange) {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (
          let i = totalPages - (maxVisibleButtons - 3);
          i <= totalPages;
          i++
        ) {
          pageNumbers.push(i)
        }
      }
      else {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (
          let i = currentPage - halfRange + 1;
          i <= currentPage + halfRange - 1;
          i++
        ) {
          pageNumbers.push(i)
        }
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      }
    }

    return pageNumbers
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav className="flex justify-center items-center mt-4">
      <ul className="flex">
        {/* Botón Anterior */}
        <li
          className={`mx-1 px-3 py-1 border rounded-lg cursor-pointer ${
            currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200'
          }`}
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
        >
          {'<'}
        </li>

        {pageNumbers.map((number, index) =>
          typeof number === 'number' ? (
            <li
              key={index}
              className={`mx-1 px-3 py-1 border rounded-lg cursor-pointer ${
                currentPage === number
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => paginate(number)}
            >
              {number}
            </li>
          ) : (
            <li key={index} className="mx-1 px-3 py-1 text-gray-500">
              {number}
            </li>
          )
        )}

        <li
          className={`mx-1 px-3 py-1 border rounded-lg cursor-pointer ${
            currentPage === totalPages
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gray-200'
          }`}
          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
        >
          {'>'}
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
