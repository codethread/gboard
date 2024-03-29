import { Result } from '@shared/Result';
import { ThemeName } from '@client/theme';

export interface ILogger extends Console {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info: (...msg: any[]) => void;
  errorWithContext(context: string): (err: Error | string) => void;
}

export type IClientLogger = Pick<ILogger, 'error' | 'info' | 'warn'>;

export type TimerType = keyof UserConfig['timers'];

export const emptyConfig: UserConfig = {
  timers: {
    pomo: 10,
    short: 5,
    long: 15,
  },
  displayTimerInStatusBar: true,
  longBreakEvery: 3,
  autoStart: {
    beforeShortBreak: true,
    beforeLongBreak: true,
    beforePomo: false,
  },
  slack: { enabled: false },
  theme: 'nord',
};

export interface UserConfig {
  timers: {
    pomo: number;
    short: number;
    long: number;
  };
  displayTimerInStatusBar: boolean;
  longBreakEvery: number;
  autoStart: {
    beforeShortBreak: boolean;
    beforeLongBreak: boolean;
    beforePomo: boolean;
  };
  slack:
    | {
        enabled: true;
        slackDomain: string;
        slackToken: string;
        slackDCookie: string;
        slackDSCookie: string;
      }
    | { enabled: false };
  theme: ThemeName;
}

export interface SlackAuth {
  domain: string;
  token: string;
  dCookie: string;
  dSCookie: string;
}

export interface SlackStatus {
  text: string;
  emoji: string;
  expiration?: Date;
}

interface SlackOk {
  ok: true;
}

/**
 * There are more of these, but I will add them as I find them
 */
type SlackErr =
  | {
      ok: false;
      error: 'connection_error';
    }
  | {
      ok: false;
      error: 'invalid_auth';
    };

export type IBridge<T = UserConfig> = {
  windowFocus(): Promise<void>;
  setTrayIcon(): Promise<void>;
  setTrayTitle(): Promise<void>;
  openExternal(url: string): Promise<void>;
  storeRead(): Promise<Result<T>>;
  storeUpdate(value: DeepPartial<T>): Promise<Result<T>>;
  storeReset(): Promise<Result<T>>;
  slackSetProfile(auth: SlackAuth, status: SlackStatus): Promise<Result<SlackOk, SlackErr>>;
  slackSetSnooze(auth: SlackAuth, minutes: number): Promise<Result<SlackOk, SlackErr>>;
  slackEndSnooze(auth: SlackAuth): Promise<Result<SlackOk, SlackErr>>;
  slackSetPresence(auth: SlackAuth, state: 'active' | 'away'): Promise<Result<SlackOk, SlackErr>>;
  info(): Promise<void>;
  warn(): Promise<void>;
  error(): Promise<void>;
  isProd(): Promise<Result<boolean>>;
  isTest(): Promise<Result<boolean>>;
  isDev(): Promise<Result<boolean>>;
  isIntegration(): Promise<Result<boolean>>;
};

export type Partial2Deep<T> = {
  [P in keyof T]?: Partial<T[P]>;
};

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

type CssSizeUnits = '%' | 'em' | 'px';
export type CssSize = `${string}${CssSizeUnits}`;

export interface HookContext {
  timer: {
    id: string;
    minutes: number;
    seconds: number;
    type: TimerType;
    autoStart: boolean;
    started: boolean;
  };
  config: UserConfig;
  bridge: IBridge;
}

type Hook = (context: HookContext) => void;

export interface TimerHooks {
  onStartHook: Hook;
  onTickHook: Hook;
  onPauseHook: Hook;
  onPlayHook: Hook;
  onStopHook: Hook;
  onCompleteHook: Hook;
}

export interface IChildren {
  children: React.ReactNode;
}
