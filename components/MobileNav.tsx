"use client";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { useUser } from "@clerk/nextjs";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MobileNav = () => {
    const pathname = usePathname();
    const { user, isSignedIn } = useUser();

    return (
        <section>
            <Sheet>
                <SheetTrigger>
                    <Image
                        src="/icons/hamburger.svg"
                        width={30}
                        height={30}
                        alt='menu'
                        className='cursor-pointer'
                    />
                </SheetTrigger>
                <SheetContent
                    side="left"
                    className='border-none bg-black-1'
                    aria-describedby="Navigation menu; the following links include Home, Discover and Create Podcast"
                >
                    <SheetClose asChild>
                        <Link href="/" className="flex cursor-pointer items-center gap-1 pb-10 pl-4">
                            <Image
                                src="/icons/logo.svg"
                                width={23}
                                height={27}
                                alt='logo'
                            />
                            <h1 className='text-24 font-extrabold text-white-1 ml-2'>Podcastr</h1>
                        </Link>
                    </SheetClose>
                    <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                        <nav className="flex h-full flex-col gap-6 text-white-1">
                            {sidebarLinks.map(({ route, label, imgURL }) => {
                                const isActive = pathname === route || pathname.startsWith(`${route}/`);
                                return (
                                    <SheetClose asChild key={route}>
                                        <Link href={route} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-start", {
                                            'bg-nav-focus border-r-4 border-orange-1': isActive
                                        })}>
                                            <Image
                                                src={imgURL}
                                                alt={label}
                                                width={24}
                                                height={24}
                                            />
                                            <p>{label}</p>
                                        </Link>
                                    </SheetClose>
                                )
                            })}
                            <SheetClose asChild>
                                {isSignedIn && (
                                    <Link
                                        href={`/profile/${user.id}`}
                                        className={cn('flex gap-3 items-center py-4 max-lg:px-4  lg:justify-start', {
                                            'bg-nav-focus border-r-4 border-orange-1': pathname.startsWith("/profile/")
                                        })}
                                    >
                                        <Image
                                            src="/icons/profile.svg"
                                            alt="profile icon"
                                            width={24}
                                            height={24}
                                        />
                                        <p>Profile</p>
                                    </Link>
                                )}
                            </SheetClose>
                        </nav>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav