import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Создаем экземпляр QueryClient
const queryClient = new QueryClient();

interface QueryProviderProps {
  children: React.ReactNode;
}

/**
 * Компонент-провайдер для TanStack Query.
 * Оборачивает дочерние компоненты в QueryClientProvider.
 */
const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryProvider; 