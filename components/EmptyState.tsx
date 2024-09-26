import { EmptyStateProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

const EmptyState = ({ title, search, buttonLink, buttonText }: EmptyStateProps) => {
    return (
        <section className='flex-center size-full flex-col gap-3'>
            <Image 
                src="/icons/emptyState.svg"
                width={250}
                height={250}
                alt='empty state'
            />
            <div className='flex-center w-full max-w-[254px] flex-col gap-3'>
                <p className='text-16 text-center font-medium text-white-1'>
                    {title}
                </p>
                {search && (
                    <p className='text-16 text-center font-medium text-white-2'>
                        Try adjusting your search to find what you are looking for
                    </p>
                )}
                {buttonLink && (
                    <Button className='bg-orange-1' asChild>
                        <Link href={buttonLink} className='gap-2'>
                            <Image
                                src="/icons/discover.svg"
                                width={20}
                                height={20}
                                alt='discover'
                            />
                            <span className='text-16 font-extrabold text-white-1'>{buttonText}</span>
                        </Link>
                    </Button>
                )}
            </div>
        </section>
    )
}

export default EmptyState