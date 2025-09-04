
import React, { useState, useCallback } from 'react';
import { ProjectData } from './types';
import Landing from './components/Landing';
import Wizard from './components/Wizard';
import Result from './components/Result';
import { generateArchitecturalImage } from './services/geminiService';
import { Header } from './components/Header';

const App: React.FC = () => {
  const [step, setStep] = useState(0);
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStart = (data: ProjectData) => {
    setProjectData(data);
    setStep(1);
    setError(null);
    setGeneratedImage(null);
  };

  const handleReset = () => {
    setStep(0);
    setProjectData(null);
    setIsLoading(false);
    setGeneratedImage(null);
    setError(null);
  };

  const handleGenerate = useCallback(async () => {
    if (!projectData) {
      setError("Project data is missing.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setStep(7); // Move to result page
    try {
      const imageUrl = await generateArchitecturalImage(projectData);
      setGeneratedImage(imageUrl);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred during image generation.");
    } finally {
      setIsLoading(false);
    }
  }, [projectData]);

  const renderContent = () => {
    if (step === 0) {
      return <Landing onStart={handleStart} />;
    }
    if (step > 0 && step <= 6) {
      return <Wizard currentStep={step} setCurrentStep={setStep} projectData={projectData} onGenerate={handleGenerate} />;
    }
    if (step === 7) {
      return <Result isLoading={isLoading} image={generatedImage} error={error} onReset={handleReset} />;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <Header onReset={handleReset} showReset={step > 0} />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
