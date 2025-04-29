
import React from 'react';
import { useParams } from 'react-router-dom';
import OnboardingBrand from './OnboardingBrand';
import OnboardingKOL from './OnboardingKOL';

const OnboardingPage = () => {
  const { role } = useParams<{ role: string }>();
  
  if (role === 'kol') {
    return <OnboardingKOL />;
  }
  
  return <OnboardingBrand />;
};

export default OnboardingPage;
