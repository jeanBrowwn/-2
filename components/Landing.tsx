
import React, { useState } from 'react';
import { ProjectData } from '../types';
import { UploadIcon, LocationIcon, DocumentIcon, CheckCircleIcon } from './icons';

interface LandingProps {
  onStart: (data: ProjectData) => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [conceptImage, setConceptImage] = useState<File | null>(null);
  const [location, setLocation] = useState('');
  const [requirements, setRequirements] = useState('');
  const [error, setError] = useState('');
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
      if (e.target.files && e.target.files[0]) {
          setter(e.target.files[0]);
      }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !requirements) {
      setError('Location and Requirements are mandatory fields.');
      return;
    }
    setError('');
    onStart({ originalImage, conceptImage, location, requirements });
  };
  
  const FileInput: React.FC<{
    id: string;
    label: string;
    file: File | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    helpText: string;
  }> = ({ id, label, file, onChange, helpText }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
                <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                    <label htmlFor={id} className="relative cursor-pointer bg-white rounded-md font-medium text-brand-secondary hover:text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-secondary">
                        <span>Upload a file</span>
                        <input id={id} name={id} type="file" className="sr-only" onChange={onChange} accept="image/*" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">{helpText}</p>
                {file && <p className="text-sm text-green-600 font-semibold mt-2">{file.name}</p>}
            </div>
        </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-brand-dark sm:text-4xl">
                AI Architectural Virtual Synthesis System
            </h2>
            <p className="mt-4 text-lg text-gray-600">
                Turn your ideas into reality. Our 6-step AI process transforms your concept into a photorealistic architectural image.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
                <p className="text-lg font-semibold text-brand-dark border-b pb-2">1. Provide Project Details</p>
                
                <div className="space-y-4">
                  <FileInput
                      id="original-image"
                      label="Original Site Image"
                      file={originalImage}
                      onChange={(e) => handleFileChange(e, setOriginalImage)}
                      helpText="Photo of the existing site/building."
                  />
                  <FileInput
                      id="concept-image"
                      label="Concept Architecture Image"
                      file={conceptImage}
                      onChange={(e) => handleFileChange(e, setConceptImage)}
                      helpText="Image of the new building style."
                  />
                  <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">Project Location*</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <LocationIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input type="text" name="location" id="location" value={location} onChange={e => setLocation(e.target.value)} className="focus:ring-brand-secondary focus:border-brand-secondary block w-full pl-10 sm:text-sm border-gray-300 rounded-md" placeholder="e.g., Nonhyeon-ro 128-gil 23, Seoul" required />
                      </div>
                  </div>
                  <div>
                      <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">Basic Requirements*</label>
                      <div className="mt-1 relative">
                          <DocumentIcon className="h-5 w-5 text-gray-400 absolute top-3 left-3" />
                          <textarea id="requirements" name="requirements" rows={4} value={requirements} onChange={e => setRequirements(e.target.value)} className="shadow-sm focus:ring-brand-secondary focus:border-brand-secondary mt-1 block w-full sm:text-sm border border-gray-300 rounded-md pl-10 pt-2" placeholder="Describe the project goals, style, materials, etc." required></textarea>
                      </div>
                  </div>
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}
                
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all duration-300 transform hover:scale-105">
                    Start Synthesis
                </button>
            </form>

            <div className="space-y-6 bg-brand-light p-8 rounded-xl shadow-lg">
                 <p className="text-lg font-semibold text-brand-dark border-b border-brand-primary pb-2">2. User Checklist</p>
                 <ul className="space-y-3">
                    <li className="flex items-start">
                        <CheckCircleIcon className="flex-shrink-0 h-6 w-6 text-green-500 mr-2 mt-0.5" />
                        <span>High-resolution original site image ready.</span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircleIcon className="flex-shrink-0 h-6 w-6 text-green-500 mr-2 mt-0.5" />
                        <span>Reference architecture images prepared (multi-angle recommended).</span>
                    </li>
                     <li className="flex items-start">
                        <CheckCircleIcon className="flex-shrink-0 h-6 w-6 text-green-500 mr-2 mt-0.5" />
                        <span>Project location details confirmed.</span>
                    </li>
                     <li className="flex items-start">
                        <CheckCircleIcon className="flex-shrink-0 h-6 w-6 text-green-500 mr-2 mt-0.5" />
                        <span>Basic project requirements summarized.</span>
                    </li>
                     <li className="flex items-start">
                        <CheckCircleIcon className="flex-shrink-0 h-6 w-6 text-green-500 mr-2 mt-0.5" />
                        <span>Allocate approx. 5-10 minutes for the process.</span>
                    </li>
                 </ul>
                 <div className="pt-4 border-t border-brand-primary">
                    <h4 className="font-semibold text-brand-dark">Quality Guarantee</h4>
                    <p className="text-sm text-gray-700 mt-2">Each step involves automated validation to ensure over 95% accuracy, with user confirmation required at key milestones to guarantee alignment with your vision.</p>
                 </div>
            </div>
        </div>
    </div>
  );
};

export default Landing;
