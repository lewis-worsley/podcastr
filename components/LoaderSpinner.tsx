import { Loader } from 'lucide-react'

const LoaderSpinner = () => {
    return (
        <div className='flex-center h-screen w-full'>
            <Loader className='animate-spin text-orange-1' />
        </div>
    )
}

export default LoaderSpinner