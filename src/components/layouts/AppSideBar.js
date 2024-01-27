'use client';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFileLines, faChartLine} from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "@/components/buttons/LogoutButton";
import { usePathname } from "next/navigation";

export default function AppSideBar() {

    const pathname = usePathname();

    return (
        <nav className="flex flex-col gap-4 font-bold text-gray-500 mt-12">
            <Link href={"/account"} className={`flex gap-4 p-2 ${pathname === '/account' ? 'text-blue-500' : 'text-gray-500'}`}>
                <FontAwesomeIcon icon={faFileLines} className="h-6 w-6" />
                <span>My Page</span>
            </Link> 

            <Link href={'/analytics'} className={`flex gap-4 p-2 ${pathname === '/analytics' ? 'text-blue-500' : 'text-gray-500'}`}>
                <FontAwesomeIcon icon={faChartLine} className="h-6 w-6" />
                <span>Analytics</span>
            </Link>

            <LogoutButton 
                iconLeft={true}
                className={'flex gap-4 p-2 items-center text-gray-500'}
                iconClasses={'w-6 h-6'}>
            </LogoutButton>


            <Link href={'/'} className="flex gap-4 text-xs items-center text-gray-500 pt-4 border-t border-gray-400 mt-2">
                <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
                <span>Back to website</span>
            </Link>

        </nav>
    );
}