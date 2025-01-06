import React from 'react';
import styles from '../styles/About.module.css';

const About = () => {
    return (
        <section id="about" className={`${styles.aboutSection} p-10 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 shadow-md rounded-lg`}>
            <div className={`${styles.aboutContainer} relative group`}>
                <div className={styles.card}>
                    <h2 className="text-4xl font-bold text-center mb-6 text-gray-700">About Me</h2>
                    <p className="text-lg leading-relaxed mb-6 text-gray-600">
                        I am a passionate B.Tech student specializing in Electrical and Electronics Engineering,
                        currently pursuing my degree from APJ Kalam Technological University. My journey in
                        engineering has been enriched by hands-on experience through internships and workshops
                        focused on IoT, PCB designing, and EV technologies.
                    </p>
                    <p className="text-lg leading-relaxed text-gray-600">
                        My goal is to contribute to the advancement of energy-efficient systems, leveraging
                        my technical knowledge and innovative mindset. I thrive on challenges and am eager
                        to make a positive impact in the field of sustainable technology.
                    </p>
                    <div className="mt-6 flex justify-center">
                        <a
                            href="/projects"
                            className="px-6 py-2 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
                        >
                            View My Projects
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
