
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, ArrowLeft, Bell, Mail, Phone, MessageSquare } from 'lucide-react';

interface StepFiveProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const StepFive = ({ data, updateData, onNext, onPrev }: StepFiveProps) => {
  const [formData, setFormData] = useState({
    notifications: data.preferences?.notifications ?? true,
    newsletter: data.preferences?.newsletter ?? false,
    support: data.preferences?.support || '',
    email: data.contact?.email || '',
    phone: data.contact?.phone || '',
    preferredContact: data.contact?.preferredContact || '',
  });

  const [errors, setErrors] = useState({
    email: '',
    support: '',
    preferredContact: '',
  });

  const supportOptions = [
    { value: 'basic', label: 'Suporte Básico (Email)' },
    { value: 'standard', label: 'Suporte Padrão (Email + Chat)' },
    { value: 'premium', label: 'Suporte Premium (24/7)' },
  ];

  const contactOptions = [
    { value: 'email', label: 'Email', icon: Mail },
    { value: 'phone', label: 'Telefone', icon: Phone },
    { value: 'chat', label: 'Chat', icon: MessageSquare },
  ];

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const formatPhone = (value: string) => {
    const cleanValue = value.replace(/[^\d]/g, '');
    
    if (cleanValue.length <= 11) {
      return cleanValue
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }
    
    return value;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field === 'phone' && typeof value === 'string') {
      value = formatPhone(value);
    }
    
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNext = () => {
    const newErrors = {
      email: '',
      support: '',
      preferredContact: '',
    };

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.support) {
      newErrors.support = 'Selecione um plano de suporte';
    }

    if (!formData.preferredContact) {
      newErrors.preferredContact = 'Selecione a forma de contato preferida';
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.support && !newErrors.preferredContact) {
      updateData({
        preferences: {
          notifications: formData.notifications,
          newsletter: formData.newsletter,
          support: formData.support,
        },
        contact: {
          email: formData.email,
          phone: formData.phone,
          preferredContact: formData.preferredContact,
        },
      });
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Preferências e Contato
        </h2>
        <p className="text-gray-600">
          Configure suas preferências de comunicação e suporte
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Preferências
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Notificações Push
                </Label>
                <p className="text-sm text-gray-600">
                  Receber notificações importantes
                </p>
              </div>
              <Switch
                checked={formData.notifications}
                onCheckedChange={(checked) => handleInputChange('notifications', checked)}
              />
            </div>

            {/* Newsletter */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Newsletter
                </Label>
                <p className="text-sm text-gray-600">
                  Receber novidades e dicas
                </p>
              </div>
              <Switch
                checked={formData.newsletter}
                onCheckedChange={(checked) => handleInputChange('newsletter', checked)}
              />
            </div>

            {/* Support Plan */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Plano de Suporte
              </Label>
              <Select
                value={formData.support}
                onValueChange={(value) => handleInputChange('support', value)}
              >
                <SelectTrigger className={errors.support ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Selecione um plano" />
                </SelectTrigger>
                <SelectContent>
                  {supportOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.support && (
                <p className="text-sm text-red-600">{errors.support}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Informações de Contato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Telefone (Opcional)
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                maxLength={15}
              />
            </div>

            {/* Preferred Contact */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Forma de Contato Preferida
              </Label>
              <Select
                value={formData.preferredContact}
                onValueChange={(value) => handleInputChange('preferredContact', value)}
              >
                <SelectTrigger className={errors.preferredContact ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent>
                  {contactOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-4 h-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {errors.preferredContact && (
                <p className="text-sm text-red-600">{errors.preferredContact}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={onPrev} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
        <Button onClick={handleNext} className="px-8">
          Finalizar
        </Button>
      </div>
    </div>
  );
};

export default StepFive;
