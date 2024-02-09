import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMicroscope, FaFlask, FaAtom, FaBrain, FaLaughBeam, FaRegLaughBeam } from 'react-icons/fa';
import FunFact from './FunFact';
import { useQuery } from 'react-query';

const fetchFacts = async () => {
  const { data } = await axios.get('https://api.api-ninjas.com/v1/facts?limit=50', {
    headers: { 'X-Api-Key': 'QxMU0Daw1G4sRqVm6vPxjIB216188KMvISmtSJ1K' }
  });
  return data;
};

const HomePage = () => {
    const { data: facts, isLoading, error } = useQuery('facts', fetchFacts, {
     
      staleTime: 1000 * 60 * 5, // Podaci ostaju 'sveži' 5 minuta
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [factsPerPage] = useState(10);
 

    const lastFactIndex = currentPage * factsPerPage;
    const firstFactIndex = lastFactIndex - factsPerPage;
    const currentFacts = facts ? facts.slice(firstFactIndex, lastFactIndex) : [];
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    // Calculate the total number of pages
    const pageCount = facts ? Math.ceil(facts.length / factsPerPage) : 0;
  
    // Render pagination dots
    const PaginationDots = () => {
      let dots = [];
      for (let i = 1; i < pageCount; i++) {
        dots.push(
          <span
            key={i}
            className={`dot ${i === currentPage ? 'active' : ''}`}
            onClick={() => paginate(i)}
          />
        );
      }
      return <div className="pagination">{dots}</div>;
    };
  return (
    <div className="homepage">
     <h1><FaAtom /> Dobrodošli u našu naučno-istraživačku laboratoriju</h1>
      <p>
        Otkrijte svijet mikroskopski malih čuda i naprednih istraživanja. Naš tim
        stručnjaka je posvećen razumijevanju temelja znanosti kako bi
        unaprijedili medicinu, tehnologiju i naše razumijevanje svemira.
      </p>
      <div className="icons">
        <div><FaMicroscope /> Mikroskopija</div>
        <div><FaFlask /> Hemija</div>
        <div><FaAtom /> Fizika</div>
        <div><FaBrain /> Neuroscience</div>
      </div>
      <p>
        Otkrijte svijet mikroskopski malih čuda i naprednih istraživanja. Naš tim
        stručnjaka je posvećen razumijevanju temelja znanosti kako bi
        unaprijedili medicinu, tehnologiju i naše razumijevanje svemira.
      </p>
      <section className="science-importance">
        <h2><FaLaughBeam /> Nauka je važna i zabavna</h2>
        <p>
          U svijetu gdje se granice znanja neprestano pomjeraju, nauka nudi
          alat za razumijevanje složenosti oko nas. Osim što doprinosi našem 
          svakodnevnom životu, nauka nas uči kritičkom razmišljanju i rješavanju problema.
          A istraživanje novih koncepta može biti izuzetno zabavno!
        </p>
      </section>
      <section className="fun-facts">
        <h2><FaRegLaughBeam /> Zanimljive činjenice</h2>
        <ul>
            {currentFacts.map((fact, index) => (
            <FunFact key={index} fact={fact.fact} />
          ))}  
        </ul>
          <PaginationDots />  
      </section>
     
    </div>
  );
};

export default HomePage;
