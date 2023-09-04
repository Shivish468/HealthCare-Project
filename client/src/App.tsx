import React from 'react';
import ObservationCard from './components/Card/ObservationCard';
import ConditionCard from './components/Card/ConditionCard';
import ImmunizationCard from './components/Card/ImmunizationCard';
import MedicationCard from './components/Card/MedicationCard';
import ProcedureCard from './components/Card/ProcedureCard';
import AllergiesCard from './components/Card/AllergiesCard';
import Carousel from './components/Card/TimelineCard';

const App: React.FC = () => {
  // Sample timeline data
  const timelineObjects = [
    { id: 1, eventType: 'Event A' },
    { id: 2, eventType: 'Event B' },
    // Add more timeline objects as needed
  ];
  return (
    <div>
      <div>
        <ConditionCard title="Condition"  />
        <ObservationCard title="Observation"  />
        <ProcedureCard title="Procedure" />
        <AllergiesCard title="Allergies"/>
        <ImmunizationCard title="Immunization" />
        <MedicationCard title="Medication" />
      </div>
      <div>
        <h1>Timeline Event</h1>
        <Carousel timelineObjects={timelineObjects} />
      </div>
    </div>
  );
};

export default App;
