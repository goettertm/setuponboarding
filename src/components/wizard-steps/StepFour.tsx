
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowLeft, FileText, AlertCircle } from 'lucide-react';

interface StepFourProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const StepFour = ({ data, updateData, onNext, onPrev }: StepFourProps) => {
  const validationResult = data.validationResult;
  const hasValidationResult = validationResult && validationResult.logs;

  const defaultLogs = `=== RELATÓRIO DE VALIDAÇÃO ===
Data: ${new Date().toLocaleString()}
Status: Aguardando validação

Para ver os logs de validação:
1. Volte para a etapa anterior
2. Cole o conteúdo dos arquivos
3. Clique em "Validador de arquivos"

=== AGUARDANDO PROCESSAMENTO ===`;

  const displayLogs = hasValidationResult ? validationResult.logs : defaultLogs;

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Resultado da Validação
        </h2>
        <p className="text-gray-600">
          Logs e informações do processo de validação dos arquivos
        </p>
      </div>

      {/* Validation Status */}
      {hasValidationResult ? (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="font-medium text-green-900">Validação Concluída</h3>
                <p className="text-sm text-green-700">
                  Os arquivos foram validados com sucesso
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-orange-600" />
              <div>
                <h3 className="font-medium text-orange-900">Validação Pendente</h3>
                <p className="text-sm text-orange-700">
                  Nenhuma validação foi executada ainda
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Validation Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Logs de Validação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Informações detalhadas do processo
            </Label>
            <Textarea
              value={displayLogs}
              readOnly
              className="min-h-[300px] bg-gray-50 font-mono text-sm resize-none"
            />
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 Os logs mostram informações detalhadas sobre o processo de validação dos arquivos
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
          Finalizar
        </Button>
      </div>
    </div>
  );
};

export default StepFour;
