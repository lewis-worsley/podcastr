import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'

type headerProps = {
    headerTitle?: string;
    titleClassName?: string;
}

export const Header = ({ headerTitle, titleClassName }: headerProps ) => {
    return (
        <header className='flex items-center justify-between'>
            {headerTitle ? (
                <h2 className={cn('text-18 font-bold text-white-1', titleClassName)}>
                    {headerTitle}
                </h2>
            ) : ""}
            <Link href='/discover' className='text-16 font-semibold text-orange-1'>
                See all
            </Link>
        </header>
    )
}
