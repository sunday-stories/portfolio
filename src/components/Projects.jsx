import React, { useState, useEffect } from 'react';
import styles from '../styles/Projects.module.css';
import projectImage1 from '../assets/images/1.jpg';
import projectImage2 from '../assets/images/2.jpg';
import projectImage3 from '../assets/images/3.jpg';

const Projects = () => {
    const images = [
        projectImage1,
        projectImage2,
        projectImage3,
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Function to change the image every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="projects" className={styles.section}>
            <h2 className={styles.sectionTitle}>Projects</h2>
            <div className={styles.grid}>
                {/* Project 1 */}
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>SEUWS - Smart Energy Usage Warning System</h3>
                    <p className={styles.cardDescription}>
                        An app that monitors daily energy consumption, calculates monthly usage, and provides alerts for excess usage.
                    </p>
                    <div className={styles.slideshowContainer}>
                        <img
                            src={images[currentImageIndex]}
                            alt={`SEUWS project image ${currentImageIndex + 1}`}
                            className={styles.projectSlideshowImage}
                        />
                    </div>
                </div>

                {/* Placeholder for Future Projects */}
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Zavry</h3>
                    <p className={styles.cardDescription}>
                        Comming soon..
                    </p>
                    <div className={styles.placeholderContainer}>
                        <p className={styles.placeholderText}></p>
                    </div>
                </div>
            </div>

            {/* View More Projects Button */}
            <div className={styles.buttonContainer}>
                <a href="#more-projects" className={styles.viewMoreButton}>
                    View More Projects
                </a>
            </div>
        </section>
    );
};

export default Projects;
