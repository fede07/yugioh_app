import { Link } from 'react-router-dom'

interface navigationBarProps {
  image: string
}

const NavigationBar = ({ image }: navigationBarProps) => {
  return (
    <div className="flex items-center gap-2 p-2 bg-gray-200 rounded-lg shadow-md">
      <Link to={'/'}>
        <img src={image} alt={'Logo'} className={'w-12 h-12'} />
      </Link>
    </div>
  )
}
export default NavigationBar
