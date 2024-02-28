import { DeepPartial, UserConfig } from '@shared/types';

interface ConfigUpdaters {
  storeUpdate(config: DeepPartial<UserConfig>): void;
  storeReset(): void;
}

interface ConfigLoaded extends ConfigUpdaters {
  config: UserConfig;
  loading: false;
}

interface ConfigLoading extends ConfigUpdaters {
  config: null;
  loading: true;
}

type ConfigMaybe = ConfigLoaded | ConfigLoading;

export const useConfig = (): ConfigMaybe => {
  return {
    storeUpdate: (newConfig) => {
      // send(configModel.events.UPDATE(newConfig));
    },
    storeReset: () => {
      // send(configModel.events.RESET());
    },
    loading: true,
    config: null,
  };
};
