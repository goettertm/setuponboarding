
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, ArrowLeft, TrendingUp, BarChart, Shield, Zap } from 'lucide-react';

interface StepThreeProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const StepThree = ({ data, updateData, onNext, onPrev }: StepThreeProps) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>(data.mainGoals || []);
  const [error, setError] = useState('');

  const goals = [
    {
      id: 'efficiency',
      label: 'Aumentar Eficiência Operacional',
      description: 'Otimizar processos e reduzir custos',
      icon: TrendingUp,
    },
    {
      id: 'analytics',
      label: 'Melhorar Análise de Dados',
      description: 'Obter insights mais precisos do negócio',
      icon: BarChart,
    },
    {
      id: 'security',
      label: 'Fortalecer Segurança',
      description: 'Proteger dados e sistemas',
      icon: Shield,
    },
    {
      id: 'automation',
      label: 'Automatizar Processos',
      description: 'Reduzir tarefas manuais',
      icon: Zap,
    },
    {
      id: 'integration',
      label: 'Integrar Sistemas',
      description: 'Conectar diferentes plataformas',
      icon: Target,
    },
    {
      id: 'scale',
      label: 'Escalar Operações',
      description: 'Preparar para crescimento',
      icon: TrendingUp,
    },
  ];

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev => {
      const newGoals = prev.includes(goalId)
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId];
      
      if (error && newGoals.length > 0) {
        setError('');
      }
      
      return newGoals;
    });
  };

  const handleNext = () => {
    if (selectedGoals.length === 0) {
      setError('Selecione pelo menos um objetivo');
      return;
    }

    updateData({ mainGoals: selectedGoals });
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Objetivos Principais
        </h2>
        <p className="text-gray-600">
          Quais são os principais objetivos que deseja alcançar?
        </p>
      </div>

      {/* Goals Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Selecione seus Objetivos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.map((goal) => {
              const IconComponent = goal.icon;
              const isSelected = selectedGoals.includes(goal.id);
              
              return (
                <div
                  key={goal.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleGoal(goal.id)}
                >
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => toggleGoal(goal.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <IconComponent className="w-4 h-4 text-blue-600" />
                        <h3 className="font-medium text-gray-900">
                          {goal.label}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        {goal.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {error && (
            <p className="text-sm text-red-600 mt-4">{error}</p>
          )}
          
          {selectedGoals.length > 0 && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700">
                ✓ {selectedGoals.length} objetivo(s) selecionado(s)
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

export default StepThree;
