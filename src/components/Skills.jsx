import React from 'react';
import styles from '../styles/Skills.module.css';

const Skills = () => {
    const skills = ["C", "Python", "MATLAB", "Simulink", "Problem-solving", "Teamwork", "Communication"];

    return (
        <section id="skills" className="p-10 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800">
            <h2 className={styles.skillsHeading}>Skills</h2>
            <ul className={styles.skillsContainer}>
                {skills.map((skill, index) => (
                    <li key={index} className={styles.skillCard}>
                        <span>{skill}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Skills;
