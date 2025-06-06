
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck, ArrowLeft, Upload } from 'lucide-react';

interface StepThreeProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const StepThree = ({ data, updateData, onNext, onPrev }: StepThreeProps) => {
  const [fileContent, setFileContent] = useState<string>(data.fileContent || '');
  const [error, setError] = useState('');

  const handleValidateFiles = () => {
    if (!fileContent.trim()) {
      setError('Por favor, insira o conteúdo dos arquivos para validação');
      return;
    }

    console.log('Iniciando validação de arquivos:', fileContent);
    
    // Simula processo de validação
    const validationResult = {
      status: 'success',
      message: 'Arquivos validados com sucesso',
      logs: `=== RELATÓRIO DE VALIDAÇÃO ===
Data: ${new Date().toLocaleString()}
Arquivos processados: 3
Linhas analisadas: ${fileContent.split('\n').length}

✓ Estrutura de dados: OK
✓ Formatação: OK  
✓ Encoding: UTF-8 válido
✓ Tamanho: Dentro do limite
✓ Sintaxe: Sem erros

=== DETALHES ===
- Registros válidos: ${Math.floor(Math.random() * 100) + 50}
- Registros com warning: ${Math.floor(Math.random() * 5)}
- Registros com erro: 0

=== STATUS FINAL ===
Validação concluída com sucesso!
Arquivos prontos para processamento.`
    };

    updateData({ 
      fileContent,
      validationResult 
    });
    
    onNext();
  };

  const handleNext = () => {
    if (!fileContent.trim()) {
      setError('Por favor, insira o conteúdo dos arquivos antes de continuar');
      return;
    }
    
    updateData({ fileContent });
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Validação de Arquivos
        </h2>
        <p className="text-gray-600">
          Cole o conteúdo dos seus arquivos para validação
        </p>
      </div>

      {/* File Content Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Conteúdo dos Arquivos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fileContent" className="text-sm font-medium text-gray-700">
              Cole o conteúdo dos arquivos aqui (máximo 1000 caracteres)
            </Label>
            <div className="flex gap-4">
              <div className="flex-1">
                <Textarea
                  id="fileContent"
                  placeholder="Cole aqui o conteúdo dos arquivos que deseja validar..."
                  value={fileContent}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 1000) {
                      setFileContent(value);
                      if (error) setError('');
                    }
                  }}
                  className={`min-h-[200px] resize-none ${error ? 'border-red-500' : ''}`}
                  maxLength={1000}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500">
                    {fileContent.length}/1000 caracteres
                  </span>
                  {error && (
                    <p className="text-sm text-red-600">{error}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <Button
                  onClick={handleValidateFiles}
                  className="flex items-center gap-2 whitespace-nowrap"
                  disabled={!fileContent.trim()}
                >
                  <FileCheck className="w-4 h-4" />
                  Validador de arquivos
                </Button>
              </div>
            </div>
          </div>

          {fileContent && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                ✓ Conteúdo carregado. Clique em "Validador de arquivos" para processar ou continue para a próxima etapa.
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
        <Button onClick={handleNext} className="px-8" disabled={!fileContent.trim()}>
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default StepThree;
