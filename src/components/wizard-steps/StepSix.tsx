
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowLeft, Mail, Send, Clock } from 'lucide-react';

interface StepSixProps {
  data: any;
  onPrev: () => void;
}

const StepSix = ({ data, onPrev }: StepSixProps) => {
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendActivationEmail = async () => {
    setIsLoading(true);
    
    // Simula envio de email
    setTimeout(() => {
      console.log('Enviando email de ativação para:', data);
      setEmailSent(true);
      setIsLoading(false);
      alert('Email de ativação enviado com sucesso!');
    }, 2000);
  };

  const handleFinish = () => {
    console.log('Onboarding finalizado com os dados:', data);
    alert('Onboarding concluído! Redirecionando para o dashboard...');
  };

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Configuração Concluída! 🎉
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          Seu sistema está pronto para ser ativado
        </p>
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Resumo da Configuração</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-gray-700">Nome:</span>
              <p className="text-gray-900">{data.clientName || 'Não informado'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">CNPJ:</span>
              <p className="text-gray-900">{data.cnpj || 'Não informado'}</p>
            </div>
            <div className="md:col-span-2">
              <span className="font-medium text-gray-700">Arquivos Validados:</span>
              <p className="text-gray-900">
                {data.validationResult ? 'Sim ✓' : 'Não validados'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activation Email */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
            <Mail className="w-5 h-5" />
            Ativação do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-blue-700">
              Para finalizar o processo, enviaremos um email de ativação para confirmar 
              a configuração do seu sistema Neogrid.
            </p>
            
            {!emailSent ? (
              <Button 
                onClick={handleSendActivationEmail}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Enviando Email...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Email de Ativação
                  </>
                )}
              </Button>
            ) : (
              <div className="p-4 bg-green-100 border border-green-300 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Email enviado com sucesso!</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Verifique sua caixa de entrada e siga as instruções para ativar o sistema.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-green-800">
            <CheckCircle className="w-5 h-5" />
            Próximos Passos
          </CardTitle>
        </CardHeader>
        <CardContent className="text-green-700">
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Verifique o email de ativação
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Siga as instruções de ativação
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Acesse o dashboard após ativação
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Entre em contato com suporte se necessário
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
        {emailSent && (
          <Button
            onClick={handleFinish}
            className="px-8 bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Concluir Onboarding
          </Button>
        )}
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
