import { IBridge } from '@shared/types';
import { bridgeContext } from './useBridge';

const { Provider } = bridgeContext;

export interface IBridgeProvider {
  bridge: IBridge;
  children: React.ReactNode;
}

export function BridgeProvider({ bridge, children }: IBridgeProvider): JSX.Element {
  return <Provider value={bridge}>{children}</Provider>;
}
