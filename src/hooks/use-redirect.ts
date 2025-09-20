'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useRedirect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectToPathRequestedOrDefault = useCallback((defaultPath: string) => {
    const redirectPath = searchParams.get('requested');

    if (redirectPath) {
        router.push(redirectPath);
    } else {
        router.push(defaultPath);
    }
  }, [router, searchParams]); // Adiciona as dependências do hook

  return { redirectToPathRequestedOrDefault };
}