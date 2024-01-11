import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMicroscope, FaFlask, FaAtom, FaBrain, FaLaughBeam, FaRegLaughBeam } from 'react-icons/fa';
import FunFact from './FunFact';

const HomePage = () => {
    const [facts, setFacts] = useState([]);

    useEffect(() => {
      const fetchFacts = async () => {
        try {
          const response = await axios.get('https://api.api-ninjas.com/v1/facts?limit=10', {
            headers: { 'X-Api-Key': '7xiJG3ZG/DVXBFQcpnUANw==DCKsOuWEdluVhptV' }
          });
          setFacts(response.data);
        } catch (error) {
          console.error('Error fetching facts:', error);
        }
      };
  
      fetchFacts();
    }, []);
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
          {facts.map((fact, index) => (
            <FunFact key={index} fact={fact.fact} />
          ))}
        </ul>
      </section>
     
    </div>
  );
};

export default HomePage;
