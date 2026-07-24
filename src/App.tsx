import React from 'react';
import Navbar from './components/Layout/Navbar';
import Hero from './components/Sections/Hero';
import Projects from './components/Sections/Projects';
import Skills from './components/Sections/Skills';
import About from './components/Sections/About';
import Contact from './components/Sections/Contact';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <About />
      </main>
      <Contact />
    </>
  );
};

export default App;
