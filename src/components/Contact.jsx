import React from 'react';
import styles from '../styles/Contact.module.css';

const Contact = () => {
    return (
        <section id="contact" className="p-10 bg-gradient-to-t from-gray-900 to-gray-800 text-white">
            <h2 className="text-4xl font-bold text-center mb-8">Contact</h2>
            <div className={styles.contactContainer}>
                <p className="text-lg mb-4">Email: <a href="mailto:jishnuprakash7890@gmail.com" className="text-yellow-400 hover:text-yellow-300">jishnuprakash7890@gmail.com</a></p>
                <p className="text-lg mb-4">Phone: +91 85901 94156</p>
                <p className="text-lg">LinkedIn: <a href="https://linkedin.com/in/jishnu7890" className="text-yellow-400 hover:text-yellow-300">linkedin.com/in/jishnu7890</a></p>
            </div>
        </section>
    );
};

export default Contact;
