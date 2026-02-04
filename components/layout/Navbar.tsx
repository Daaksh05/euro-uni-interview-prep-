'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import styles from './navbar.module.css';

export default function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContainer}`}>
                <Link href="/" className={styles.logo}>
                    EuroUni AI 🎓
                </Link>
                <div className={styles.navLinks}>
                    <Link
                        href="/"
                        className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
                    >
                        Home
                    </Link>
                    <Link
                        href="/dashboard"
                        className={`${styles.navLink} ${isActive('/dashboard') ? styles.active : ''}`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/faculty-simulator"
                        className={`${styles.navLink} ${isActive('/faculty-simulator') ? styles.active : ''}`}
                    >
                        Faculty Sim
                    </Link>
                    <Link
                        href="/sop-review"
                        className={`${styles.navLink} ${isActive('/sop-review') ? styles.active : ''}`}
                    >
                        SOP Review <span className={styles.newBadge}>New</span>
                    </Link>
                    <Link
                        href="/analytics"
                        className={`${styles.navLink} ${isActive('/analytics') ? styles.active : ''}`}
                    >
                        Analytics 📈
                    </Link>

                    {session ? (
                        <div className={styles.userSection}>
                            <span className={styles.userName}>{session.user?.name || 'User'}</span>
                            <button onClick={() => signOut()} className={styles.logoutBtn}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className={styles.loginBtn}>
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
