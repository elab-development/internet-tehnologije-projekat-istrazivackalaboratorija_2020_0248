import React from 'react';
import { FaMicroscope, FaFlask, FaAtom, FaBrain, FaLaughBeam } from 'react-icons/fa';

const HomePage = () => {
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
        <h2>Zanimljive činjenice</h2>
        <ul>
          <li>Da li ste znali da kava može povećati vašu sposobnost učenja?</li>
          <li>Znate li da je DNK dovoljno dugačka da se proteže od Zemlje do Sunca i nazad više od 300 puta?</li>
          <li>Atomske čestice se ponašaju drugačije kada ih neko posmatra. To je kvantna mehanika u akciji!</li>
        </ul>
      </section>
     
    </div>
  );
};

export default HomePage;
