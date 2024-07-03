// IMPORT MODULES
import Link from 'next/link';

// COMPONENT - WEBSITE HEADER
export default function Header() {
    return (
        <header>
            <h1><Link href="/">The Houseplant Care Database</Link></h1>
            <nav>
                <ul className="nav-ul">
                    <li><Link href="/houseplants">Find Houseplant</Link></li>
                    <li><Link href="/add-houseplant">Add Houseplant</Link></li>
                </ul>
            </nav>
        </header>
    )
}