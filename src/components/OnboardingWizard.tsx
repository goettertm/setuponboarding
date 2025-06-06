
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle } from 'lucide-react';
import StepOne from './wizard-steps/StepOne';
import StepTwo from './wizard-steps/StepTwo';
import StepThree from './wizard-steps/StepThree';
import StepFour from './wizard-steps/StepFour';
import StepSix from './wizard-steps/StepSix';

interface OnboardingData {
  clientName: string;
  cnpj: string;
  fileContent: string;
  validationResult?: {
    status: string;
    message: string;
    logs: string;
  };
}

const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    clientName: '',
    cnpj: '',
    fileContent: '',
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, title: 'Informações iniciais', completed: currentStep > 1 },
    { number: 2, title: 'Manuais', completed: currentStep > 2 },
    { number: 3, title: 'Validação', completed: currentStep > 3 },
    { number: 4, title: 'Resultado', completed: currentStep > 4 },
    { number: 5, title: 'Ativação', completed: currentStep > 5 },
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateData = (stepData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...stepData }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne data={data} updateData={updateData} onNext={nextStep} />;
      case 2:
        return <StepTwo data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 3:
        return <StepThree data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 4:
        return <StepFour data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 5:
        return <StepSix data={data} onPrev={prevStep} />;
      default:
        return <StepOne data={data} updateData={updateData} onNext={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sistema de Onboarding Neogrid</h1>
          <p className="text-gray-600">Configure sua conta em {totalSteps} etapas simples</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">
              Etapa {currentStep} de {totalSteps}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}% completo
            </span>
          </div>
          <Progress value={progress} className="w-full h-2" />
        </div>

        {/* Steps Indicator */}
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 mb-2 transition-colors ${
                step.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : currentStep === step.number
                  ? 'border-blue-500 text-blue-500 bg-white'
                  : 'border-gray-300 text-gray-400 bg-white'
              }`}>
                {step.completed ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span className="text-sm font-medium">{step.number}</span>
                )}
              </div>
              <span className={`text-xs text-center ${
                currentStep === step.number ? 'text-blue-600 font-medium' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            {renderStep()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingWizard;
