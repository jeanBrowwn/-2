
import React, { useState } from 'react';
import { STEPS_DATA } from '../constants';
import { ProjectData } from '../types';
import { ArrowLeftIcon, ArrowRightIcon, SparklesIcon } from './icons';

interface WizardProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  projectData: ProjectData | null;
  onGenerate: () => void;
}

const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
      <div
        className="bg-brand-secondary h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${(current / total) * 100}%` }}
      ></div>
    </div>
  );
};

const Wizard: React.FC<WizardProps> = ({ currentStep, setCurrentStep, projectData, onGenerate }) => {
  const [stepsData, setStepsData] = useState(STEPS_DATA);
  const stepData = stepsData[currentStep - 1];

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    // Go back one step. If on step 1, this will set step to 0, returning to the landing page.
    setCurrentStep(currentStep - 1);
  };

  const substitutePlaceholders = (text: string): string => {
    if (!projectData) return text;
    return text
      .replace(/{PROJECT_ADDRESS}/g, projectData.location || "the specified location")
      .replace(/{NEW_ARCHITECTURE_STYLE}/g, projectData.requirements || "the new architectural style")
      .replace(/{EXISTING_BUILDING_DESC}/g, "The existing red brick building");
  };

  const handleValueChange = (sectionIndex: number, detailIndex: number, itemIndex: number, newValue: string) => {
    // Use a deep copy to prevent direct state mutation
    const newStepsData = JSON.parse(JSON.stringify(stepsData));
    newStepsData[currentStep - 1].sections[sectionIndex].details[detailIndex].items[itemIndex].value = newValue;
    setStepsData(newStepsData);
  };

  const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white rounded-lg shadow p-4">
      <h4 className="font-semibold text-brand-primary border-b border-gray-200 pb-2 mb-3">{title}</h4>
      <div className="text-sm space-y-3 text-gray-600">{children}</div>
    </div>
  );

  const KeyValue: React.FC<{ label: string; value: string; onChange: (newValue: string) => void }> = ({ label, value, onChange }) => (
    <div className="flex justify-between items-center space-x-2">
      <span className="font-medium text-gray-500 flex-shrink-0">{label}:</span>
      <input
        type="text"
        value={substitutePlaceholders(value)}
        onChange={(e) => onChange(e.target.value)}
        className="text-right text-brand-dark font-mono bg-gray-50 border border-gray-200 rounded-md px-2 py-1 w-full focus:bg-white focus:ring-1 focus:ring-brand-secondary focus:border-brand-secondary transition sm:text-sm"
        aria-label={`Value for ${label}`}
      />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <ProgressBar current={currentStep} total={6} />
      <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
        <div className="text-center mb-6">
          <p className="text-sm font-semibold text-brand-secondary">STEP {stepData.id}/6</p>
          <h2 className="text-3xl font-bold text-brand-dark mt-1">{stepData.title}</h2>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">{substitutePlaceholders(stepData.goal)}</p>
        </div>

        <div className="mt-8 space-y-6">
          {stepData.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="text-lg font-bold text-brand-dark mb-4">{section.title}</h3>
              <p className="text-sm text-gray-500 mb-1">Keyword: <code className="bg-brand-light text-brand-primary font-semibold px-2 py-1 rounded text-xs">{section.keyword}</code></p>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {section.details.map((detail, detailIndex) => (
                  <InfoCard key={detailIndex} title={detail.title}>
                    {detail.items.map((item, itemIndex) => (
                      <KeyValue 
                        key={itemIndex} 
                        label={item.key} 
                        value={item.value} 
                        onChange={(newValue) => handleValueChange(sectionIndex, detailIndex, itemIndex, newValue)}
                      />
                    ))}
                  </InfoCard>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 pt-6 border-t">
            <div className="bg-blue-50 border-l-4 border-brand-secondary p-4 rounded-r-lg">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-brand-secondary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-blue-700">{substitutePlaceholders(stepData.confirmation)}</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={handleBack}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back
          </button>
          {currentStep < 6 ? (
            <button
              onClick={handleNext}
              className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-secondary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary transition-colors"
            >
              Confirm & Next Step
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={onGenerate}
              className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-primary hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-transform transform hover:scale-105"
            >
              Generate Final Image
              <SparklesIcon className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wizard;
