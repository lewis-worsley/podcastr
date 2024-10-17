"use client";

import EmptyState from '@/components/EmptyState';
import LoaderSpinner from '@/components/LoaderSpinner';
import PodcastCard from '@/components/PodcastCard';
import ProfileCard from '@/components/ProfileCard';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

const ProfilePage = ({ params }: { params: { profileId: string } }) => {
	const user = useQuery(api.users.getUserById, { clerkId: params.profileId });
	const podcastsData = useQuery(api.podcasts.getPodcastByAuthorId, { authorId: params.profileId });

	if (!user || !podcastsData) return <LoaderSpinner />;

	return (
		<section className='mt-9 flex flex-col'>
			<h2 className='text-20 font-bold text-white-1 max-md:text-center'>Podcaster Profile</h2>
			<div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
				<ProfileCard
					podcastData={podcastsData!}
					imageUrl={user?.imageUrl!}
					userFirstName={user?.name!}
				/>
			</div>
			{podcastsData && podcastsData.podcasts.length > 0 ? (
				<section className="mt-9 flex flex-col gap-5">
					<h2 className='text-18 font-bold text-white-1'>All podcasts</h2>
					<div className='podcast_grid'>
						{podcastsData.podcasts.slice(0, 4).map((podcast) => (
							<PodcastCard
								key={podcast._id}
								imgUrl={podcast.imageUrl!}
								title={podcast.podcastTitle}
								description={podcast.podcastDescription}
								podcastId={podcast._id}
							/>
						))}
					</div>
				</section>
			) : (
				<div className='mt-9'>
					<EmptyState
						title={
							user._id === podcastsData.podcasts[0].user
								? "You currently have no podcasts. Create a new podcast today!"
								: `${podcastsData.podcasts[0].author} has no active podcasts`
						}
						buttonLink='/create-podcast'
						buttonText='Create podcast'
					/>
				</div>
			)}
		</section>
	)
}

export default ProfilePage