'use client'
import { usePathname } from "next/navigation"
import Link from "next/link"

export  function NavLinks() {
    const pathname = usePathname()
    return (
        <nav>
            <Link className={`link ${pathname == '/' ? 'active' : ''}`} href="/">Home</Link>
            <Link className={`link ${pathname == '/dashboard' ? 'active' : ''}`} href="/dashboard">Dashboard</Link>
            <Link className={`link ${pathname == '/signup' ? 'active' : ''}`} href="/signup">Sign Up</Link>
            <Link className={`link ${pathname == '/login' ? 'active' : ''}`} href="/login">Log In</Link>
            <Link className={`link" ${pathname == '/tasks' ? 'active' : ''}`} href="/tasks">Tasks</Link>
        </nav>
    )
}