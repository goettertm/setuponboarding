
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, User } from 'lucide-react';

interface StepOneProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
}

const StepOne = ({ data, updateData, onNext }: StepOneProps) => {
  const [formData, setFormData] = useState({
    clientName: data.clientName || '',
    cnpj: data.cnpj || '',
  });

  const [errors, setErrors] = useState({
    clientName: '',
    cnpj: '',
  });

  const validateCNPJ = (cnpj: string) => {
    // Remove caracteres especiais
    const cleanCNPJ = cnpj.replace(/[^\d]/g, '');
    
    // Verifica se tem 14 dígitos
    if (cleanCNPJ.length !== 14) {
      return false;
    }

    // Verifica se não são todos iguais
    if (/^(\d)\1+$/.test(cleanCNPJ)) {
      return false;
    }

    return true;
  };

  const formatCNPJ = (value: string) => {
    // Remove caracteres não numéricos
    const cleanValue = value.replace(/[^\d]/g, '');
    
    // Aplica a máscara
    if (cleanValue.length <= 14) {
      return cleanValue
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
    
    return value;
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'cnpj') {
      value = formatCNPJ(value);
    }
    
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpa erro quando usuário começa a digitar
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNext = () => {
    const newErrors = {
      clientName: '',
      cnpj: '',
    };

    // Validação do nome
    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Nome do cliente é obrigatório';
    }

    // Validação do CNPJ
    if (!formData.cnpj.trim()) {
      newErrors.cnpj = 'CNPJ é obrigatório';
    } else if (!validateCNPJ(formData.cnpj)) {
      newErrors.cnpj = 'CNPJ deve conter 14 dígitos válidos';
    }

    setErrors(newErrors);

    // Se não há erros, continua
    if (!newErrors.clientName && !newErrors.cnpj) {
      updateData({
        clientName: formData.clientName,
        cnpj: formData.cnpj,
      });
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Building2 className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Seja Bem-vindo ao Portal de Integração
        </h2>
        <p className="text-gray-600">
          Vamos começar coletando algumas informações básicas sobre sua empresa
        </p>
      </div>

      {/* Form Fields */}
      <Card className="border-2 border-dashed border-gray-200">
        <CardContent className="p-6 space-y-6">
          {/* Nome do Cliente */}
          <div className="space-y-2">
            <Label htmlFor="clientName" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <User className="w-4 h-4" />
              Nome do Cliente
            </Label>
            <Input
              id="clientName"
              type="text"
              placeholder="Digite o nome da sua empresa"
              value={formData.clientName}
              onChange={(e) => handleInputChange('clientName', e.target.value)}
              className={`transition-colors ${errors.clientName ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
            />
            {errors.clientName && (
              <p className="text-sm text-red-600">{errors.clientName}</p>
            )}
          </div>

          {/* CNPJ */}
          <div className="space-y-2">
            <Label htmlFor="cnpj" className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              CNPJ do Cliente
            </Label>
            <Input
              id="cnpj"
              type="text"
              placeholder="00.000.000/0000-00"
              value={formData.cnpj}
              onChange={(e) => handleInputChange('cnpj', e.target.value)}
              maxLength={18}
              className={`transition-colors ${errors.cnpj ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
            />
            {errors.cnpj && (
              <p className="text-sm text-red-600">{errors.cnpj}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-end pt-6">
        <Button onClick={handleNext} className="px-8">
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default StepOne;
