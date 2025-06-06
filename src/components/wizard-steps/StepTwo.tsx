
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Users, ArrowLeft } from 'lucide-react';

interface StepTwoProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const StepTwo = ({ data, updateData, onNext, onPrev }: StepTwoProps) => {
  const [formData, setFormData] = useState({
    companySize: data.companySize || '',
    industry: data.industry || '',
  });

  const [errors, setErrors] = useState({
    companySize: '',
    industry: '',
  });

  const companySizes = [
    { value: 'micro', label: 'Micro (até 9 funcionários)' },
    { value: 'pequena', label: 'Pequena (10-49 funcionários)' },
    { value: 'media', label: 'Média (50-249 funcionários)' },
    { value: 'grande', label: 'Grande (250+ funcionários)' },
  ];

  const industries = [
    { value: 'tecnologia', label: 'Tecnologia' },
    { value: 'varejo', label: 'Varejo' },
    { value: 'servicos', label: 'Serviços' },
    { value: 'industria', label: 'Indústria' },
    { value: 'saude', label: 'Saúde' },
    { value: 'educacao', label: 'Educação' },
    { value: 'financeiro', label: 'Financeiro' },
    { value: 'agricultura', label: 'Agricultura' },
    { value: 'construcao', label: 'Construção' },
    { value: 'outros', label: 'Outros' },
  ];

  const handleNext = () => {
    const newErrors = {
      companySize: '',
      industry: '',
    };

    if (!formData.companySize) {
      newErrors.companySize = 'Selecione o porte da empresa';
    }

    if (!formData.industry) {
      newErrors.industry = 'Selecione o setor de atuação';
    }

    setErrors(newErrors);

    if (!newErrors.companySize && !newErrors.industry) {
      updateData({
        companySize: formData.companySize,
        industry: formData.industry,
      });
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Informações da Empresa
        </h2>
        <p className="text-gray-600">
          Nos ajude a entender melhor sua empresa
        </p>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Dados Empresariais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Porte da Empresa */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Porte da Empresa
            </Label>
            <Select
              value={formData.companySize}
              onValueChange={(value) => {
                setFormData(prev => ({ ...prev, companySize: value }));
                if (errors.companySize) {
                  setErrors(prev => ({ ...prev, companySize: '' }));
                }
              }}
            >
              <SelectTrigger className={errors.companySize ? 'border-red-500' : ''}>
                <SelectValue placeholder="Selecione o porte da sua empresa" />
              </SelectTrigger>
              <SelectContent>
                {companySizes.map((size) => (
                  <SelectItem key={size.value} value={size.value}>
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.companySize && (
              <p className="text-sm text-red-600">{errors.companySize}</p>
            )}
          </div>

          {/* Setor de Atuação */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Building className="w-4 h-4" />
              Setor de Atuação
            </Label>
            <Select
              value={formData.industry}
              onValueChange={(value) => {
                setFormData(prev => ({ ...prev, industry: value }));
                if (errors.industry) {
                  setErrors(prev => ({ ...prev, industry: '' }));
                }
              }}
            >
              <SelectTrigger className={errors.industry ? 'border-red-500' : ''}>
                <SelectValue placeholder="Selecione o setor da sua empresa" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry.value} value={industry.value}>
                    {industry.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.industry && (
              <p className="text-sm text-red-600">{errors.industry}</p>
            )}
          </div>
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

export default StepTwo;
