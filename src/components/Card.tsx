import { Movie } from "../interfaces"
import { dateTransform } from "../utilities"

interface Props {
    movie: Movie
    rentMovie: any
}

const Card = ({ movie, rentMovie }: Props) => {
    return (
        <div key={movie.id} className="px-6 py-4 max-w-sm rounded overflow-hidden shadow-xl">
            <div className="font-bold text-xl mb-2 text-center">{movie.name}</div>
            <p className="mt-2 text-gray-700 text-base"> <span className='font-semibold'>Budget Movie:</span> ${movie.budget}</p>
            <p className="mt-2 text-gray-700 text-base"> <span className='font-semibold'>Date Movie:</span> {dateTransform(new Date(movie.date))}</p>
            <p className="mt-2 text-gray-700 text-base"> <span className='font-semibold'>Duration Movie:</span> {movie.duration} minutes</p>
            <p className="mt-2 text-gray-700 text-base"> <span className='font-semibold'>Description Movie:</span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat iure officiis et dolorem fugiat odit eos tenetur dignissimos quisquam quia.</p>
            <button
                onClick={() => rentMovie(movie)}
                className='p-2 font-semibold border-2 border-cyan-900 bg-cyan-700 text-white mt-2 rounded-e-md'
            >Rent Movie</button>
        </div>
    )
}
export default Card