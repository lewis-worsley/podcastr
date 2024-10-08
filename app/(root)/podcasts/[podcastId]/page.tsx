"use client";

import EmptyState from '@/components/EmptyState';
import LoaderSpinner from '@/components/LoaderSpinner';
import PodcastCard from '@/components/PodcastCard';
import PodcastDetailPlayer from '@/components/PodcastDetailPlayer';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import Image from 'next/image';

const PodcastDetails = ({ params: { podcastId } }: { params: { podcastId: Id<'podcasts'> } }) => {
    const podcast = useQuery(api.podcasts.getPodcastById, { podcastId });
    const similarPodcasts = useQuery(api.podcasts.getPodcastByVoiceType, { podcastId });

    const { user } = useUser();

    const isOwner = user?.id === podcast?.authorId;

    if (!similarPodcasts || !podcast) return <LoaderSpinner />;

    return (
        <section className='flex w-full flex-col'>
            <header className='mt-9 flex items-center justify-between'>
                <div className='text-20 font-bold text-white-1'>
                    Currently Playing
                </div>
                <figure className='flex gap-3'>
                    <Image
                        src="/icons/headphone.svg"
                        width={24}
                        height={24}
                        alt='headphone'
                    />
                    <div className='text-16 font-bold text-white-1'>
                        {podcast?.views}
                    </div>
                </figure>
            </header>
            <PodcastDetailPlayer 
                isOwner={isOwner}
                podcastId={podcast._id}
                {...podcast}
            />
            <p className='text-white-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center'>
                {podcast?.podcastDescription}
            </p>
            <div className='flex flex-col gap-8'>
                <div className='flex flex-col gap-4'>
                    <h2 className='text-18 font-bold text-white-1'>Transcription</h2>
                    <p className='text-16 font-medium text-white-2'>{podcast?.voicePrompt}</p>
                </div>
                <div className='flex flex-col gap-4'>
                    <h2 className='text-18 font-bold text-white-1'>Thumbnail Prompt</h2>
                    <p className='text-16 font-medium text-white-2'>{podcast?.imagePrompt}</p>
                </div>
            </div>
            <section className='mt-8 flex flex-col gap-5'>
                <h2 className='text-18 font-bold text-white-1'>Similar Podcasts</h2>
                {similarPodcasts && similarPodcasts.length >
                    0 ? (
                    <div className='podcast_grid'>
                        {similarPodcasts.map(({ _id, podcastTitle, podcastDescription, imageUrl }) => (
                            <PodcastCard
                                key={_id}
                                imgUrl={imageUrl!}
                                title={podcastTitle}
                                description={podcastDescription}
                                podcastId={_id}
                            />
                        ))}
                    </div>
                ) : (
                    <>
                        <EmptyState
                            title="No similiar podcasts found"
                            buttonLink="/discover"
                            buttonText="Discover more podcasts"
                        />
                    </>
                )}
            </section>
        </section>
    )
}

export default PodcastDetails