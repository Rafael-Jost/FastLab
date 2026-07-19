import { useCallback, useState } from 'react';

function useLabRequest<TArgs extends unknown[], TResult>(
  requestFn: (...args: TArgs) => Promise<TResult>
) {
  const [result, setResult] = useState<TResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const run = useCallback(async (...args: TArgs) => {
    // ...args junta os argumentos num array (rest) e depois espalha eles pra requestFn (spread)
    setIsLoading(true);
    try {
      const response = await requestFn(...args);
      setResult(response);
    } catch (error) {
      console.error('Error in useLabRequest:', error);
    } finally {
      setIsLoading(false);
    }
  }, [requestFn]);

  return {labRequestRun: run, result, isLoading };
}

export default useLabRequest;