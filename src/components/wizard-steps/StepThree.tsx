
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { FileCheck, ArrowLeft, Upload } from 'lucide-react';

interface StepThreeProps {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const StepThree = ({ data, updateData, onNext, onPrev }: StepThreeProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(data.uploadedFile || null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(data.selectedOptions || []);
  const [error, setError] = useState('');

  const optionsData = [
    'Cadastro de Fornecedor',
    'Cadastro de Produto', 
    'Cadastro de Local',
    'Movimento de Estoque e Vendas',
    'Movimento Histórico de Vendas'
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.name.toLowerCase().endsWith('.txt')) {
        setError('Por favor, selecione apenas arquivos TXT');
        return;
      }
      setUploadedFile(file);
      if (error) setError('');
    }
  };

  const handleOptionChange = (option: string, checked: boolean) => {
    let newSelectedOptions;
    if (checked) {
      newSelectedOptions = [...selectedOptions, option];
    } else {
      newSelectedOptions = selectedOptions.filter(item => item !== option);
    }
    setSelectedOptions(newSelectedOptions);
  };

  const handleValidateFiles = () => {
    if (!uploadedFile) {
      setError('Por favor, faça upload de um arquivo TXT para validação');
      return;
    }

    if (selectedOptions.length === 0) {
      setError('Por favor, selecione pelo menos uma opção');
      return;
    }

    console.log('Iniciando validação de arquivo:', uploadedFile.name);
    console.log('Opções selecionadas:', selectedOptions);
    
    // Simula processo de validação
    const validationResult = {
      status: 'success',
      message: 'Arquivo validado com sucesso',
      logs: `=== RELATÓRIO DE VALIDAÇÃO ===
Data: ${new Date().toLocaleString()}
Arquivo: ${uploadedFile.name}
Tamanho: ${(uploadedFile.size / 1024).toFixed(2)} KB
Tipo: ${uploadedFile.type}
Opções selecionadas: ${selectedOptions.join(', ')}

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
      selectedOptions,
      validationResult 
    });
    
    onNext();
  };

  const handleNext = () => {
    if (!uploadedFile) {
      setError('Por favor, faça upload de um arquivo TXT antes de continuar');
      return;
    }

    if (selectedOptions.length === 0) {
      setError('Por favor, selecione pelo menos uma opção antes de continuar');
      return;
    }
    
    updateData({ uploadedFile, selectedOptions });
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
          Faça upload do seu arquivo TXT e selecione as opções aplicáveis
        </p>
      </div>

      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload de Arquivo TXT
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fileUpload" className="text-sm font-medium text-gray-700">
              Selecione o arquivo TXT para validação
            </Label>
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  id="fileUpload"
                  type="file"
                  onChange={handleFileUpload}
                  className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  accept=".txt"
                />
                {error && (
                  <p className="text-sm text-red-600 mt-2">{error}</p>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <Button
                  onClick={handleValidateFiles}
                  className="flex items-center gap-2 whitespace-nowrap"
                  disabled={!uploadedFile || selectedOptions.length === 0}
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
            </div>
          )}
        </CardContent>
      </Card>

      {/* Multi-selection */}
      <Card>
        <CardHeader>
          <CardTitle>Opções de Processamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              Selecione as opções aplicáveis:
            </Label>
            {optionsData.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={option}
                  checked={selectedOptions.includes(option)}
                  onCheckedChange={(checked) => handleOptionChange(option, checked as boolean)}
                />
                <Label
                  htmlFor={option}
                  className="text-sm font-normal cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
            {selectedOptions.length > 0 && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  ✓ Selecionadas: <strong>{selectedOptions.length}</strong> opção(ões)
                </p>
              </div>
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
        <Button 
          onClick={handleNext} 
          className="px-8" 
          disabled={!uploadedFile || selectedOptions.length === 0}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default StepThree;
