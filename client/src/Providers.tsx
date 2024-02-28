import { ErrorBoundary, ScrollBar } from '@client/components';
import { BridgeProvider, LoggerProvider } from '@client/hooks/providers';
import { PageManager } from '@client/pages/PageManager';
import { IBridge } from '@shared/types';

interface IProviders {
  bridge: IBridge;
}

export function Providers({ bridge }: IProviders): JSX.Element {
  return (
    <BridgeProvider bridge={bridge}>
      <LoggerProvider>
        <ErrorBoundary>
          <ScrollBar />
          <PageManager />
        </ErrorBoundary>
      </LoggerProvider>
    </BridgeProvider>
  );
}
