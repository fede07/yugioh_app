import { useEffect, useState } from 'react'
import {
  getCardsByFilterPaginated,
  getCardsLimitOffset,
} from '../../services/api.tsx'
import { Card } from '../../types/Card.ts'
import Pagination from '../../components/Pagination.tsx'
import SearchAndFilter from '../../components/SearchAndFilter.tsx'
import { LOGO_IMG_PUBLIC } from '../../constants/assets.ts'
import Loader from '../../components/Loader.tsx'
import GridView from '../../components/GridView.tsx'
import ListView from '../../components/ListView.tsx'
import ChangeViewButton from '../../components/ChangeViewButton.tsx'
import Selector from '../../components/Selector.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'

const CARDS_PER_PAGE = 12

const CARDS_PER_PAGE_ARRAY = ['12', '24', '36']

const Home = () => {
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [restart, setRestart] = useState(false)

  const [totalCards, setTotalCards] = useState(1)
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false)
  const [gridView, setGridView] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1
  )
  const [cardsPerPage, setCardsPerPage] = useState(
    Number(searchParams.get('limit')) || CARDS_PER_PAGE
  )
  const [queryParams, setQueryParams] = useState({
    search: searchParams.get('search') || '',
    filters: searchParams.get('filters') || '',
  })

  useEffect(() => {
    if (queryParams.search || queryParams.filters) {
      return
    }
    setLoading(true)
    getCardsLimitOffset(cardsPerPage, (currentPage - 1) * cardsPerPage)
      .then((data) => {
        setCards(data.data)
        setTotalCards(data.total)
        console.log(data)

        setLoading(false)
        setRestart(false)
      })
      .catch(() => {
        setError('Cannot load cards.')
        setLoading(false)
      })
  }, [restart, currentPage, cardsPerPage, queryParams])

  useEffect(() => {
    setSearchParams({
      search: queryParams.search,
      filters: queryParams.filters,
      page: currentPage.toString(),
      limit: cardsPerPage.toString(),
    })
  }, [queryParams, currentPage, cardsPerPage, setSearchParams])

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true)
      try {
        const queryParts = []

        if (queryParams.search) {
          queryParts.push(`fname=${encodeURIComponent(queryParams.search)}`)
        }
        if (queryParams.filters) {
          queryParts.push(queryParams.filters)
        }

        const queryString = queryParts.join('&')
        console.log('Fetching cards with query:', queryString)

        if (queryString.length === 0) {
          setLoading(false)
          setRestart(true)
          return
        }

        const result = await getCardsByFilterPaginated(
          queryString,
          cardsPerPage,
          (currentPage - 1) * cardsPerPage
        )
        console.log(result)
        setCards(result.data || [])
        setTotalCards(result.total)
      } catch {
        setError('Cannot load cards.')
      }
      setLoading(false)
    }
    fetchCards().then(() => {})
  }, [cardsPerPage, currentPage, queryParams])

  useEffect(() => {
    navigate(
      `/?search=${queryParams.search}&filters=${queryParams.filters}&page=${currentPage}&limit=${cardsPerPage}`
    )
  }, [queryParams, currentPage, cardsPerPage, navigate])

  if (error) return <div className="text-center text-red-500">{error}</div>

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const changePagesPerPage = (newPerPage: string) => {
    if (!Array.from(CARDS_PER_PAGE_ARRAY).includes(newPerPage)) {
      return
    }
    setCardsPerPage(Number(newPerPage))
  }

  return (
    <div className="container p-4 m-auto">
      <div className={'max-w-full top-0 left-0 right-0 z-50 bg-gray-900'}>
        <SearchAndFilter
          image={LOGO_IMG_PUBLIC}
          onApplyFilters={(newFilters) => {
            setQueryParams((prevParams) => ({
              ...prevParams,
              ...newFilters,
            }))
            setCurrentPage(1)
          }}
          onShowAdvanced={() => {
            setAdvancedFiltersOpen(!advancedFiltersOpen)
          }}
        />
      </div>

      <div
        className={`${advancedFiltersOpen ? '-mt-4' : 'mt-12'} grid grid-cols-3 gap-x-2 sm:gap-x-6 md:gap-x-12 p-4 w-auto`}
      >
        <ChangeViewButton onChange={setGridView} />
        <div
          className={
            'bg-gray-200 rounded-md p-2 content-center text-center font-bold text-gray-800 shadow-md'
          }
        >
          <p>Total cards: {totalCards}</p>
        </div>

        <div className={'bg-gray-200 rounded-md p-2'}>
          <Selector
            array={CARDS_PER_PAGE_ARRAY}
            onChange={changePagesPerPage}
          />
        </div>
      </div>

      <div
        className={` border-2 border-gray-400 rounded-md bg-indigo-950 text-white pt-4 sm:pt-3 md:pt-6`}
      >
        {cards.length === 0 && !loading && (
          <div className="text-center pb-4">No cards found</div>
        )}

        {loading ? (
          <div className="text-center p-36">
            <Loader />
          </div>
        ) : gridView ? (
          <GridView cards={cards} />
        ) : (
          <ListView cards={cards} />
        )}
      </div>
      {loading ? (
        <div></div>
      ) : (
        <Pagination
          itemsPerPage={cardsPerPage}
          totalItems={totalCards}
          currentPage={currentPage}
          paginate={paginate}
        />
      )}
    </div>
  )
}

export default Home
