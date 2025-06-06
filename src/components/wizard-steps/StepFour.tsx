
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plug, ArrowLeft, Database, Cloud, Mail, Calendar } from 'lucide-react';

interface StepFourProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const StepFour = ({ data, updateData, onNext, onPrev }: StepFourProps) => {
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>(data.integrations || []);

  const integrations = [
    {
      id: 'erp',
      label: 'Sistema ERP',
      description: 'SAP, Oracle, Microsoft Dynamics',
      icon: Database,
      popular: true,
    },
    {
      id: 'crm',
      label: 'CRM',
      description: 'Salesforce, HubSpot, Pipedrive',
      icon: Database,
      popular: true,
    },
    {
      id: 'email',
      label: 'Email Marketing',
      description: 'Mailchimp, SendGrid, Constant Contact',
      icon: Mail,
      popular: false,
    },
    {
      id: 'calendar',
      label: 'Calendário',
      description: 'Google Calendar, Outlook, Apple Calendar',
      icon: Calendar,
      popular: true,
    },
    {
      id: 'cloud',
      label: 'Armazenamento em Nuvem',
      description: 'AWS, Google Drive, Dropbox',
      icon: Cloud,
      popular: true,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      description: 'Google Analytics, Adobe Analytics',
      icon: Database,
      popular: false,
    },
  ];

  const toggleIntegration = (integrationId: string) => {
    setSelectedIntegrations(prev =>
      prev.includes(integrationId)
        ? prev.filter(id => id !== integrationId)
        : [...prev, integrationId]
    );
  };

  const handleNext = () => {
    updateData({ integrations: selectedIntegrations });
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Integrações Desejadas
        </h2>
        <p className="text-gray-600">
          Quais sistemas você gostaria de integrar? (Opcional)
        </p>
      </div>

      {/* Integrations Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plug className="w-5 h-5" />
            Sistemas para Integração
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map((integration) => {
              const IconComponent = integration.icon;
              const isSelected = selectedIntegrations.includes(integration.id);
              
              return (
                <div
                  key={integration.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all relative ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleIntegration(integration.id)}
                >
                  {integration.popular && (
                    <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      Popular
                    </div>
                  )}
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => toggleIntegration(integration.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <IconComponent className="w-4 h-4 text-blue-600" />
                        <h3 className="font-medium text-gray-900">
                          {integration.label}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {selectedIntegrations.length > 0 && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700">
                ✓ {selectedIntegrations.length} integração(ões) selecionada(s)
              </p>
            </div>
          )}
          
          {selectedIntegrations.length === 0 && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                💡 Você pode pular esta etapa e configurar integrações mais tarde
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
        <Button onClick={handleNext} className="px-8">
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default StepFour;
