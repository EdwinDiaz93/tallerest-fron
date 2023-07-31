import { useForm } from 'react-hook-form';
import { MovieFormValues } from '../../../../interfaces';

interface Props {
    closeModal: any;
    saveMovie: any
    movie: MovieFormValues
}

const MovieForm = ({ movie, closeModal, saveMovie }: Props) => {


    const form = useForm<MovieFormValues>({
        defaultValues: {
            ...movie,
        }
    });

    const { handleSubmit, formState, register, reset } = form;

    const { errors, isSubmitSuccessful } = formState;

    const submmitForm = (data: MovieFormValues) => {
        if (!isSubmitSuccessful) return;
        saveMovie(data);

        reset({
            id: 0,
            name: '',
            budget: 0,
            date: '',
            duration: 0
        })
    }

    return (
        <form className=" rounded grid grid-cols-1 sm:grid-cols-2 gap-2" noValidate autoComplete='off' onSubmit={handleSubmit(submmitForm)}>
            <h2 className="text-center text-2xl mb-2 font-semibold col-span-2 ">Movie Form</h2>
            <div className=" px-3 mb-6 ">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="name">
                    Name
                </label>
                <input
                    id="name"
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="text" placeholder="Tremors"
                    {...register('name', {
                        required: {
                            value: true,
                            message: 'the name field is required'
                        },
                        minLength: {
                            value: 5,
                            message: 'You have to type at least 5 characters'
                        }
                    })}
                />
                <p className="text-red text-sm italic text-red-600">{errors.name?.message}.</p>
            </div>
            <div className=" px-3 mb-6 ">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="budget">
                    Budget
                </label>
                <input
                    id="budget"
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="number"
                    {...register('budget', {
                        valueAsNumber: true,
                        required: {
                            value: true,
                            message: 'The budget field is required'
                        },
                        min: {
                            value: 1,
                            message: 'budget must be greather than zero'
                        },
                    })}
                />
                <p className="text-red text-sm italic text-red-600">{errors.budget?.message}.</p>
            </div>
            <div className=" px-3 mb-6 ">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="date">
                    Date
                </label>
                <input
                    id="date"
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="date"
                    {...register('date', {
                        valueAsDate: true,
                        required: {
                            value: true,
                            message: 'The date field is required'
                        },
                        validate: {
                            maxDate: (value) => {
                                const now = new Date().getTime();
                                const date = new Date(value).getTime();
                                return date <= now || 'Must be a past date';
                            }
                        }
                    })}
                />
                <p className="text-red text-sm italic text-red-600">{errors.date?.message}.</p>
            </div>
            <div className=" px-3 mb-6 ">
                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="duration">
                    Duration (min)
                </label>
                <input
                    id="duration"
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="number"
                    {...register('duration', {
                        valueAsNumber: true,
                        required: {
                            value: true,
                            message: 'The duration field is required'
                        },
                        min: {
                            value: 1,
                            message: 'duration must be greather than zero'
                        },
                        max: {
                            value: 240,
                            message: 'duration must be less than 240'
                        }
                    })}
                />
                <p className="text-red text-sm italic text-red-600">{errors.duration?.message}.</p>
            </div>
            <div className='flex flex-row flex-wrap  justify-between col-span-2'>
                <button className=' border-cyan-400 font-semibold text-white bg-cyan-800 p-2 border-2 ml-2' type='submit'>Save Movie</button>
                <button onClick={closeModal} className=' border-cyan-400 font-semibold text-white bg-red-600 p-2 border-2 ml-2'>Cancel</button>
            </div>
        </form>
    )
}
export default MovieForm