// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
    const navItems = [
        { name: "Home", link: "/" },
        { name: "About", link: "/about" },
        { name: "Skills", link: "/skills" },
        { name: "Projects", link: "/projects" },
        { name: "Contact", link: "/contact" },
    ];

    return (
        <nav className={styles.navBar}>
            <h1 className="text-2xl font-bold">
                <Link to="/" className={styles.logo}>
                    Jishnu Prakash
                </Link>
            </h1>
            <div className={styles.navItems}>
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.link}
                        className={styles.navItem}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default NavBar;
