import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/Home.module.css';
import profileImage from '../assets/A.gif';
import Linkedin from '../assets/icons/linkedin.svg';

const Home = () => {
    const [theme, setTheme] = useState('light'); // Default theme is light
    const textContentRef = useRef(null);
    const imageContainerRef = useRef(null);

    // Toggle theme function
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        document.body.className = theme;

        const canvas = document.getElementById('backgroundCanvas');
        const ctx = canvas.getContext('2d');
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const particles = [];
        const shootingStars = [];
        const fireflies = [];
        const numParticles = 100;

        // Particle class for glowing effect
        class Particle {
            constructor(x, y, vx, vy) {
                this.x = x;
                this.y = y;
                this.vx = vx;
                this.vy = vy;
                this.radius = 2;
            }

            move() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x > width || this.x < 0) this.vx *= -1;
                if (this.y > height || this.y < 0) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = '#8d99ae';
                ctx.fill();
            }
        }

        // Firefly Particle class for random movement
        class FireflyParticle {
            constructor(x, y, vx, vy, color) {
                this.x = x;
                this.y = y;
                this.vx = vx;
                this.vy = vy;
                this.alpha = Math.random() * 0.9 + 0.5;
                this.radius = Math.random() * 1 + 1;
                
                const r = Math.floor(Math.random() * 50); // Random red between 0-50 to keep the blue cool
                const g = Math.floor(Math.random() * 50); // Random green between 0-50 to keep the blue cool
                const b = Math.floor(Math.random() * 155 + 100); // Blue ranges from 100 to 255
                this.color = `${r},${g},${b}`; // RGB format (for blue shades)
            }

            move() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x > width || this.x < 0) this.vx *= -1;
                if (this.y > height || this.y < 0) this.vy *= -1;

                // Randomize opacity for glowing effect
                this.alpha = Math.random() * 0.5 + 0.5;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
                ctx.fill();
            }
        }

        // Shooting Star class
        class ShootingStar {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height / 2; // Starts in the upper half
                this.vx = -Math.random() * 4 - 2;
                this.vy = Math.random() * 4 + 2;
                this.alpha = 1;
                this.length = Math.random() * 50 + 50;
            }

            move() {
                this.x += this.vx;
                this.y += this.vy;
                this.alpha -= 0.01;

                if (this.alpha <= 0) {
                    const index = shootingStars.indexOf(this);
                    if (index > -1) shootingStars.splice(index, 1);
                }
            }

            draw() {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x - this.length * this.vx, this.y - this.length * this.vy);
                ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`;
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }

        function addShootingStar() {
            shootingStars.push(new ShootingStar());
        }

        // Create initial particles for the background
        for (let i = 0; i < numParticles; i++) {
            particles.push(
                new Particle(
                    Math.random() * width,
                    Math.random() * height,
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2
                )
            );
        }

        // Add fireflies (orange and white)
        function addFireflies() {
            for (let i = 0; i < 50; i++) {
                const color = Math.random() < 0.5 ? '255, 165, 0' : '255, 255, 255'; // Orange or white
                fireflies.push(
                    new FireflyParticle(
                        Math.random() * width,
                        Math.random() * height,
                        (Math.random() - 0.5) * 1,
                        (Math.random() - 0.5) * 1,
                        color
                    )
                );
            }
        }

        // Call the function to add fireflies to the array
        addFireflies();

        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(141, 153, 174, ${1 - distance / 150})`;
                        ctx.lineWidth = 0.7;
                        ctx.stroke();
                    }
                }
            }
        }

        // Handle mouse move to add parallax effect
        function handleMouseMoveCanvas(e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            particles.forEach((particle) => {
                const dx = particle.x - mouseX;
                const dy = particle.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 250) {
                    particle.vx += dx * -0.2;
                    particle.vy += dy * -0.2;
                }
            });
        }

        // Handle mouse movement for parallax effect on the text and image
        function handleMouseMoveParallax(e) {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 20;
            const centerY = window.innerHeight / 20;

            const xOffset = (clientX - centerX) / 50;
            const yOffset = (clientY - centerY) / 50;

            if (textContentRef.current) {
                textContentRef.current.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            }

            if (imageContainerRef.current) {
                imageContainerRef.current.style.transform = `translate(${-xOffset}px, ${-yOffset}px)`;
            }
        }

        // Canvas animation function
        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Draw particles (background glow)
            particles.forEach((particle) => {
                particle.move();
                particle.draw();
            });

            // Draw fireflies (glowing)
            fireflies.forEach((firefly) => {
                firefly.move();
                firefly.draw();
            });

            // Draw shooting stars
            shootingStars.forEach((star) => {
                star.move();
                star.draw();
            });

            // Draw lines connecting nearby particles
            drawLines();
            requestAnimationFrame(animate);
        }

        animate();

        const starInterval = setInterval(addShootingStar, 1000);

        // Add the mouse move listener for parallax effect after canvas setup
        canvas.addEventListener('mousemove', handleMouseMoveCanvas);
        window.addEventListener('mousemove', handleMouseMoveParallax);

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMoveCanvas);
            window.removeEventListener('mousemove', handleMouseMoveParallax);
            clearInterval(starInterval);
        };
    }, [theme]);

    function handleMouseOverImage(e) {
        const { offsetX, offsetY, target } = e.nativeEvent;
        const { offsetWidth, offsetHeight } = target;
        const x = offsetX - offsetWidth / 2;
        const y = offsetY - offsetHeight / 2;
        imageContainerRef.current.style.transform = `rotateX(${-y / 20}deg) rotateY(${x / 20}deg)`;
    }

    function handleMouseOutImage() {
        imageContainerRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }

    return (
        <div className={`${styles.background} ${theme === 'dark' ? styles.dark : styles.light}`}>
            <canvas id="backgroundCanvas" className={styles.canvas}></canvas>
            <section className={styles.homeContainer}>
                <div ref={textContentRef} className={styles.textContent}>
                    <h1 className={styles.title}>
                        Welcome to 
                    </h1> <span className={styles.highlight}>My Portfolio</span>
                    
                    <p className={styles.description}>
                        Hi, I'm <strong>Jishnu Prakash</strong>, a passionate software developer and electrical engineer.
                        I love building creative solutions and exploring innovative ideas in the tech world. Dive into my
                        projects and skills to learn more about my journey.
                    </p>
                    <div className={styles.buttonGroup}>
                        <a href="/projects" className={styles.ctaButton}>Explore Projects</a>
                        <a href="/contact" className={styles.secondaryButton}>Get in Touch</a>
                    </div>
                </div>
                
                {/* Circular text around the image */}
                <div className={styles.circularTextWrapper}>
                    <div
                        ref={imageContainerRef}
                        className={styles.imageContainer}
                        onMouseMove={handleMouseOverImage}
                        onMouseLeave={handleMouseOutImage}
                    >
                        <img src={profileImage} alt="Jishnu Prakash" className={styles.profileImage} />
                    </div>
                </div>

                <div className={styles.socialIcons}>
                    <a href="https://www.linkedin.com/in/jishnu7890" className={styles.iconLink}>
                        <img src={Linkedin} alt="LinkedIn" className={styles.customIcon} />
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Home;
