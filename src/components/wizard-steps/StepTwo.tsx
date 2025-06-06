
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, ArrowLeft, FileText, Settings } from 'lucide-react';

interface StepTwoProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const StepTwo = ({ data, updateData, onNext, onPrev }: StepTwoProps) => {
  const handleDownloadClientManual = () => {
    console.log('Baixando Manual de instalação do client');
    // Aqui seria implementado o download do manual
    alert('Download do Manual de instalação do client iniciado!');
  };

  const handleDownloadFileStandardManual = () => {
    console.log('Baixando Manual do padrão de arquivos');
    // Aqui seria implementado o download do manual
    alert('Download do Manual do padrão de arquivos iniciado!');
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Manuais de Instalação
        </h2>
        <p className="text-gray-600">
          Baixe os manuais necessários para configurar seu sistema
        </p>
      </div>

      {/* Manuals Download */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Documentação Técnica
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Manual de Instalação do Client */}
          <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Settings className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Manual de instalação do client
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Guia completo para instalação e configuração do cliente Neogrid
                </p>
                <Button 
                  onClick={handleDownloadClientManual}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Baixar Manual
                </Button>
              </div>
            </div>
          </div>

          {/* Manual do Padrão de Arquivos */}
          <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Manual do padrão de arquivos
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Especificações técnicas para formatação e estrutura de arquivos
                </p>
                <Button 
                  onClick={handleDownloadFileStandardManual}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Baixar Manual
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 Recomendamos baixar ambos os manuais antes de prosseguir com a configuração
            </p>
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
