"use client";

import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from './Header';

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import Carousel from './Carousel';

const RightSidebar = () => {
    const { user } = useUser();
    const router = useRouter();
    const topPodcasters = useQuery(api.users.getTopUserByPodcastCount);

    return (
        <section className='right_sidebar text-white-1'>
            <SignedIn>
                <Link href={`/profile/${user?.id}`} className='flex gap-3 pb-12'>
                    <UserButton />
                    <div className='flex w-full items-center justify-between'>
                        <h2 className='text-16 truncate font-semibold text-white-1'>{user?.firstName} {user?.lastName}</h2>
                        <Image
                            src="/icons/right-arrow.svg"
                            alt='arrow'
                            width={24}
                            height={24}
                        />
                    </div>
                </Link>
            </SignedIn>
            <section>
                <Header headerTitle="Fans like you" />
                <Carousel fansLikeDetail={topPodcasters!} />
            </section>
            <section className='flex flex-col mt-12'>
                <Header headerTitle="Top Podcasters" />
                <div className='flex flex-col gap-6'>
                    {topPodcasters?.slice(0, 3).map((podcaster) => (
                        <div
                            key={podcaster._id}
                            className='flex cursor-pointer justify-between'
                            onClick={() => router.push(`/profile/${podcaster.clerkId}`)}
                        >
                            <figure className='flex items-center gap-2'>
                                <Image
                                    src={podcaster.imageUrl}
                                    alt={podcaster.name}
                                    width={44}
                                    height={44}
                                    className='aspect-square rounded-lg'
                                />
                                <h2>{podcaster.name}</h2>
                            </figure>
                            <div className='flex items-center'>
                                <p className='text-12 font-normal text-white-1'>
                                    {podcaster.totalPodcasts} {podcaster.totalPodcasts > 1 ? "podcasts" : "podcast"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </section>
    )
}

export default RightSidebar