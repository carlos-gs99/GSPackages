// ==========================================
// RENDER UTILITIES
// ==========================================

import React from 'react';
import { formatApiDate } from './dateUtils';
import { GSChip } from '../components/ui';
import { GSIcon } from '../components/ui/GSIcon';

// Tipos para configuração de renderização
export interface IconRendererConfig {
  value: string | number | boolean;
  icon: string;
  className?: string;
  title?: string;
  color?: string;
}

export interface StatusRendererConfig {
  value: string | number | boolean;
  text: string;
  variant: 'success' | 'danger' | 'warning' | 'info' | 'neutral' | 'primary' | 'secondary';
  icon?: string;
}

/**
 * Função genérica para renderizar ícones baseados no valor
 * @param configs - Array de configurações de ícones
 * @returns Função renderizadora
 */
export const createIconRenderer = (configs: IconRendererConfig[]) => {
  return (value: unknown) => {
    const config = configs.find(c => c.value === value);
    
    if (!config) {
      return <span>{String(value ?? '')}</span>;
    }

    return (
      <GSIcon
        name={config.icon}
        className={config.className}
        color={config.color}
        title={config.title || String(value)}
        size={1}
      />
    );
  };
};

/**
 * Função genérica para renderizar status com chips
 * @param configs - Array de configurações de status
 * @returns Função renderizadora
 */
export const createStatusRenderer = (configs: StatusRendererConfig[]) => {
  return (value: unknown) => {
    const config = configs.find(c => c.value === value);
    
    if (!config) {
      return <span>{String(value ?? '')}</span>;
    }

    return (
      <GSChip
        variant="soft"
        color={config.variant}
        size="sm"
        startIcon={config.icon ? <GSIcon name={config.icon} size={16} /> : undefined}
      >
        {config.text}
      </GSChip>
    );
  };
};

/**
 * Função genérica para renderizar checkboxes/booleanos
 * @param trueIcon - Ícone para valor verdadeiro
 * @param falseIcon - Ícone para valor falso
 * @returns Função renderizadora
 */
export const createBooleanRenderer = (trueIcon: string = 'mdi mdi-check', falseIcon: string = 'mdi mdi-close') => {
  return (value: unknown) => {
    const boolValue = value === true || value === 'true' || value === '1' || value === 'checked' || value === 'yes';

    return (
      <GSIcon
        name={boolValue ? trueIcon : falseIcon}
        color={boolValue ? '#28a745' : '#dc3545'}
        title={boolValue ? 'Sim' : 'Não'}
        size={1}
      />
    );
  };
};

/**
 * Função genérica para renderizar valores com formatação personalizada
 * @param formatter - Função de formatação personalizada
 * @returns Função renderizadora
 */
export const createCustomRenderer = <TValue = unknown, TRow = unknown>(formatter: (value: TValue, row: TRow) => React.ReactNode) => {
  return (value: TValue, row: TRow) => formatter(value, row);
};

/**
 * Função para renderizar datas formatadas
 * @param format - Formato da data ('date', 'datetime', 'time')
 * @returns Função renderizadora
 */
export const createDateRenderer = (format: 'date' | 'datetime' | 'time' = 'date') => {
  return (value: unknown) => {
    if (!value) return <span className="gs-text-muted">-</span>;
    
    let formattedDate = '';
    const valueStr = String(value);
    
    try {
      if (format === 'date') {
        formattedDate = formatApiDate(valueStr);
      } else if (format === 'datetime') {
        const dateMatch = valueStr.match(/\/Date\((-?\d+)\)\//);
        if (dateMatch) {
          const timestamp = parseInt(dateMatch[1]);
          const date = new Date(timestamp);
          formattedDate = date.toLocaleString('pt-PT');
        } else {
          const date = new Date(valueStr);
          if (!isNaN(date.getTime())) {
            formattedDate = date.toLocaleString('pt-PT');
          } else {
            formattedDate = formatApiDate(valueStr);
          }
        }
      } else if (format === 'time') {
        const dateMatch = valueStr.match(/\/Date\((-?\d+)\)\//);
        if (dateMatch) {
          const timestamp = parseInt(dateMatch[1]);
          const date = new Date(timestamp);
          formattedDate = date.toLocaleTimeString('pt-PT');
        } else {
          const date = new Date(valueStr);
          if (!isNaN(date.getTime())) {
            formattedDate = date.toLocaleTimeString('pt-PT');
          } else {
            formattedDate = formatApiDate(valueStr);
          }
        }
      }
    } catch (error) {
      console.warn('Erro ao formatar data:', value, error);
      formattedDate = '-';
    }
    
    return (
      <span className="gs-text-muted">
        {formattedDate}
      </span>
    );
  };
};

/**
 * Função para renderizar valores booleanos com ícones
 * @param trueIcon - Ícone para valor verdadeiro
 * @param falseIcon - Ícone para valor falso
 * @returns Função renderizadora
 */
export const createBooleanIconRenderer = (trueIcon: string = 'mdi mdi-check-circle', falseIcon: string = 'mdi mdi-close-circle') => {
  return (value: unknown) => {
    const boolValue = value === true || value === 'true' || value === '1' || value === 'checked' || value === 'yes';

    return (
      <GSIcon
        name={boolValue ? trueIcon : falseIcon}
        color={boolValue ? '#28a745' : '#dc3545'}
        title={boolValue ? 'Sim' : 'Não'}
        size={1}
      />
    );
  };
};

/**
 * Função para renderizar valores numéricos com formatação
 * @param decimals - Número de casas decimais
 * @param prefix - Prefixo do número
 * @param suffix - Sufixo do número
 * @returns Função renderizadora
 */
export const createNumberRenderer = (decimals: number = 0, prefix: string = '', suffix: string = '') => {
  return (value: unknown) => {
    if (value === null || value === undefined || value === '') return <span className="gs-text-muted">-</span>;
    
    const numValue = parseFloat(String(value));
    if (isNaN(numValue)) return <span className="gs-text-muted">-</span>;
    
    return (
      <span className="gs-text-end">
        {prefix}{numValue.toFixed(decimals)}{suffix}
      </span>
    );
  };
};

/**
 * Função para renderizar texto com truncamento
 * @param maxLength - Comprimento máximo do texto
 * @param showTooltip - Se deve mostrar tooltip com texto completo
 * @returns Função renderizadora
 */
export const createTextRenderer = (maxLength: number = 50, showTooltip: boolean = true) => {
  return (value: unknown) => {
    if (!value) return <span className="gs-text-muted">-</span>;
    
    const text = String(value);
    const truncated = text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    
    if (showTooltip && text.length > maxLength) {
      return (
        <span title={text} className="gs-text-truncate gs-d-inline-block" style={{ maxWidth: '100%' }}>
          {truncated}
        </span>
      );
    }
    
    return <span>{truncated}</span>;
  };
};

// formatApiDate is now imported from dateUtils.ts

/**
 * Renderizadores pré-definidos comuns
 */
export const commonRenderers = {
  // Para campos booleanos simples
  boolean: createBooleanRenderer(),
  
  // Para campos de estado ativo/inativo
  activeStatus: createStatusRenderer([
    { value: true, text: 'Ativo', variant: 'success', icon: 'mdi mdi-check-circle' },
    { value: false, text: 'Inativo', variant: 'neutral', icon: 'mdi mdi-close-circle' },
    { value: '1', text: 'Ativo', variant: 'success', icon: 'mdi mdi-check-circle' },
    { value: '0', text: 'Inativo', variant: 'neutral', icon: 'mdi mdi-close-circle' },
  ]),
  
  // Para campos de sim/não
  yesNo: createStatusRenderer([
    { value: true, text: 'Sim', variant: 'success', icon: 'mdi mdi-check' },
    { value: false, text: 'Não', variant: 'neutral', icon: 'mdi mdi-close' },
    { value: 'yes', text: 'Sim', variant: 'success', icon: 'mdi mdi-check' },
    { value: 'no', text: 'Não', variant: 'neutral', icon: 'mdi mdi-close' },
  ]),
  
  // Para campos de globalbooking
  globalbooking: createIconRenderer([
    { value: 'checked', icon: 'mdi mdi-check-circle', color: '#28a745', title: 'Globalbooking Ativo' },
    { value: 'unchecked', icon: 'mdi mdi-close-circle', color: '#dc3545', title: 'Globalbooking Inativo' },
    { value: true, icon: 'mdi mdi-check-circle', color: '#28a745', title: 'Globalbooking Ativo' },
    { value: false, icon: 'mdi mdi-close-circle', color: '#dc3545', title: 'Globalbooking Inativo' },
  ]),
  
  // Para campos de estado geral
  generalStatus: createStatusRenderer([
    { value: 'active', text: 'Ativo', variant: 'success', icon: 'mdi mdi-check-circle' },
    { value: 'inactive', text: 'Inativo', variant: 'neutral', icon: 'mdi mdi-close-circle' },
    { value: 'pending', text: 'Pendente', variant: 'warning', icon: 'mdi mdi-clock' },
    { value: 'completed', text: 'Concluído', variant: 'info', icon: 'mdi mdi-check' },
  ]),
};
