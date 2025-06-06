
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowLeft, Download, Mail, Calendar } from 'lucide-react';

interface StepSixProps {
  data: any;
  onPrev: () => void;
}

const StepSix = ({ data, onPrev }: StepSixProps) => {
  const handleFinish = () => {
    console.log('Onboarding finalizado com os dados:', data);
    // Aqui você enviaria os dados para o backend
    alert('Onboarding concluído com sucesso! Redirecionando para o dashboard...');
  };

  const handleDownloadSummary = () => {
    // Simula download de um resumo
    console.log('Baixando resumo do onboarding:', data);
    alert('Resumo baixado com sucesso!');
  };

  const getIndustryLabel = (value: string) => {
    const industries: { [key: string]: string } = {
      'tecnologia': 'Tecnologia',
      'varejo': 'Varejo',
      'servicos': 'Serviços',
      'industria': 'Indústria',
      'saude': 'Saúde',
      'educacao': 'Educação',
      'financeiro': 'Financeiro',
      'agricultura': 'Agricultura',
      'construcao': 'Construção',
      'outros': 'Outros',
    };
    return industries[value] || value;
  };

  const getCompanySizeLabel = (value: string) => {
    const sizes: { [key: string]: string } = {
      'micro': 'Micro (até 9 funcionários)',
      'pequena': 'Pequena (10-49 funcionários)',
      'media': 'Média (50-249 funcionários)',
      'grande': 'Grande (250+ funcionários)',
    };
    return sizes[value] || value;
  };

  const getSupportLabel = (value: string) => {
    const supports: { [key: string]: string } = {
      'basic': 'Suporte Básico (Email)',
      'standard': 'Suporte Padrão (Email + Chat)',
      'premium': 'Suporte Premium (24/7)',
    };
    return supports[value] || value;
  };

  const getContactLabel = (value: string) => {
    const contacts: { [key: string]: string } = {
      'email': 'Email',
      'phone': 'Telefone',
      'chat': 'Chat',
    };
    return contacts[value] || value;
  };

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Parabéns! 🎉
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          Seu onboarding foi concluído com sucesso
        </p>
        <p className="text-gray-500">
          Aqui está um resumo das informações coletadas:
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informações da Empresa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="font-medium text-gray-700">Nome:</span>
              <p className="text-gray-900">{data.clientName}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">CNPJ:</span>
              <p className="text-gray-900">{data.cnpj}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Porte:</span>
              <p className="text-gray-900">{getCompanySizeLabel(data.companySize)}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Setor:</span>
              <p className="text-gray-900">{getIndustryLabel(data.industry)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Objetivos Selecionados</CardTitle>
          </CardHeader>
          <CardContent>
            {data.mainGoals && data.mainGoals.length > 0 ? (
              <ul className="space-y-2">
                {data.mainGoals.map((goal: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-900 capitalize">{goal.replace('_', ' ')}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Nenhum objetivo selecionado</p>
            )}
          </CardContent>
        </Card>

        {/* Integrations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Integrações</CardTitle>
          </CardHeader>
          <CardContent>
            {data.integrations && data.integrations.length > 0 ? (
              <ul className="space-y-2">
                {data.integrations.map((integration: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-900 capitalize">{integration.replace('_', ' ')}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Nenhuma integração selecionada</p>
            )}
          </CardContent>
        </Card>

        {/* Contact & Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contato e Preferências</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="font-medium text-gray-700">Email:</span>
              <p className="text-gray-900">{data.contact?.email}</p>
            </div>
            {data.contact?.phone && (
              <div>
                <span className="font-medium text-gray-700">Telefone:</span>
                <p className="text-gray-900">{data.contact.phone}</p>
              </div>
            )}
            <div>
              <span className="font-medium text-gray-700">Contato Preferido:</span>
              <p className="text-gray-900">{getContactLabel(data.contact?.preferredContact)}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Suporte:</span>
              <p className="text-gray-900">{getSupportLabel(data.preferences?.support)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-green-800">
            <Calendar className="w-5 h-5" />
            Próximos Passos
          </CardTitle>
        </CardHeader>
        <CardContent className="text-green-700">
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Você receberá um email de confirmação em breve
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Nossa equipe entrará em contato dentro de 24h
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Acesso ao dashboard será liberado após validação
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
        <Button
          variant="outline"
          onClick={handleDownloadSummary}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Baixar Resumo
        </Button>
        
        <Button
          onClick={handleFinish}
          className="px-8 bg-green-600 hover:bg-green-700"
        >
          <Mail className="w-4 h-4 mr-2" />
          Finalizar e Ir para Dashboard
        </Button>
      </div>

      {/* Back Button */}
      <div className="flex justify-start pt-4">
        <Button variant="ghost" onClick={onPrev} className="flex items-center gap-2 text-gray-500">
          <ArrowLeft className="w-4 h-4" />
          Voltar para revisar
        </Button>
      </div>
    </div>
  );
};

export default StepSix;
