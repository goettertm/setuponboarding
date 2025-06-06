
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
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
  const [uploadedFile, setUploadedFile] = useState<File | null>(data.uploadedFile || null);
  const [error, setError] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      if (error) setError('');
    }
  };

  const handleValidateFiles = () => {
    if (!uploadedFile) {
      setError('Por favor, faça upload de um arquivo para validação');
      return;
    }

    console.log('Iniciando validação de arquivo:', uploadedFile.name);
    
    // Simula processo de validação
    const validationResult = {
      status: 'success',
      message: 'Arquivo validado com sucesso',
      logs: `=== RELATÓRIO DE VALIDAÇÃO ===
Data: ${new Date().toLocaleString()}
Arquivo: ${uploadedFile.name}
Tamanho: ${(uploadedFile.size / 1024).toFixed(2)} KB
Tipo: ${uploadedFile.type}

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
Arquivo pronto para processamento.`
    };

    updateData({ 
      uploadedFile,
      validationResult 
    });
    
    onNext();
  };

  const handleNext = () => {
    if (!uploadedFile) {
      setError('Por favor, faça upload de um arquivo antes de continuar');
      return;
    }
    
    updateData({ uploadedFile });
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Upload de Arquivos
        </h2>
        <p className="text-gray-600">
          Faça upload dos seus arquivos para validação
        </p>
      </div>

      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload de Arquivo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fileUpload" className="text-sm font-medium text-gray-700">
              Selecione o arquivo para validação
            </Label>
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  id="fileUpload"
                  type="file"
                  onChange={handleFileUpload}
                  className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  accept=".txt,.csv,.json,.xml"
                />
                {error && (
                  <p className="text-sm text-red-600 mt-2">{error}</p>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <Button
                  onClick={handleValidateFiles}
                  className="flex items-center gap-2 whitespace-nowrap"
                  disabled={!uploadedFile}
                >
                  <FileCheck className="w-4 h-4" />
                  Validador de arquivos
                </Button>
              </div>
            </div>
          </div>

          {uploadedFile && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700">
                ✓ Arquivo carregado: <strong>{uploadedFile.name}</strong> ({(uploadedFile.size / 1024).toFixed(2)} KB)
              </p>
              <p className="text-sm text-green-600 mt-1">
                Clique em "Validador de arquivos" para processar ou continue para a próxima etapa.
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
        <Button onClick={handleNext} className="px-8" disabled={!uploadedFile}>
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default StepThree;
