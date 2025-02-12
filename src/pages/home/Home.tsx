import { useEffect, useState } from 'react'
import { getAllCards ,getCardsByFilter } from '../../services/api.tsx'
import CardComponent from '../../components/CardComponent.tsx'
import { Card } from '../../types/Card.ts'
import Pagination from '../../components/Pagination.tsx'
import SearchAndFilter from '../../components/SearchAndFilter.tsx'
import { LOGO_IMG } from '../../constants/assets.ts'
// import CardFrame from '../../components/CardFrame.tsx'

const Home = () => {
  const [cards, setCards] = useState<Card[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [restart, setRestart] = useState(false)
  const [queryParams, setQueryParams] = useState<{
    search?: string
    filters?: string
  }>({
    search: '',
    filters: '',
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [cardsPerPage] = useState(12)

  useEffect(() => {
    getAllCards()
    // getCardsLimitOffset(
    //   cardsPerPage,
    //   (currentPage - 1) * cardsPerPage)
      .then((data) => {
        setCards(data)
        setLoading(false)
        setRestart(false)
      })
      .catch(() => {
        setError('Cannot load cards.')
        setLoading(false)
      })
  }, [restart])

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

        const result = await getCardsByFilter(queryString)
        setCards(result || [])
      } catch {
        setError('Cannot load cards.')
      }
      setLoading(false)
      setCurrentPage(1)
    }
    fetchCards().then(() => {})
  }, [queryParams])

  if (error) return <div className="text-center text-red-500">{error}</div>


  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard)
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="container p-4 m-auto">
      {/*<h1 className="flex justify-center text-2xl font-bold, text-center, m-4 text-white">*/}
      {/*  Yu-Gi-Oh!*/}
      {/*</h1>*/}

      <div className={"fixed top-0 left-0 md:pl-8 md:pr-8 lg:pl-16 lg:pr-16 z-50 w-full"}>
        <SearchAndFilter image={LOGO_IMG} onApplyFilters={setQueryParams}/>
      </div>

      <div className="mt-32 border-2 border-gray-400 rounded-md bg-indigo-950 text-white pt-4 sm:pt-3 md:pt-6">
        {cards.length === 0 && (!loading) && <div className="text-center pb-4">No cards found</div>}

        {(loading)? (
          <div className="text-center text-white font-extrabold p-36">Loading...</div>
        ) : (
          <div className="grid gap-2 mb-4 place-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-screen">
          {currentCards.map((card) => (
            <CardComponent key={card.id} card={card} />
          ))}
        </div>)}

      </div>
      <Pagination
        itemsPerPage={cardsPerPage}
        totalItems={cards.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  )
}

export default Home
