'use client'

import { usePathname } from 'next/navigation';
import { categories } from '../constants';
import NavLink from './NavLink';

type Props = {};

const NavLinks = (props: Props) => {
    const pathname = usePathname();

    // Take the path, converts it into an array, remove the last value then compare it to the pathname.
    const isActive = (path:string) => {
        return pathname?.split('/').pop() === path;
    }
	return (
		<nav className='grid grid-cols-4 md:grid-cols-7 text-xs md:text-sm gap-4 pb-10 max-w-6xl mx-auto border-b'>
			{categories.map((category) => (
				<NavLink key={category} category={category} isActive={isActive(category)} />
			))}
		</nav>
	);
};

export default NavLinks;
