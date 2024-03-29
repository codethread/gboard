import { Button, FormItem, InputSelect } from '@client/components';
import { useConfig } from '@client/hooks/useConfig';
import { useBridge } from '@client/hooks/useBridge';
import { ThemeName, themes } from '@client/theme';
import { Setting } from './Setting';

export function Theme(): JSX.Element {
  const { storeUpdate, config } = useConfig();
  const id = 'theme-selector';
  const bridge = useBridge();

  return (
    <Setting variant="simple" heading="Theme" onSubmit={() => {}}>
      <FormItem label="Set the current theme" id={id}>
        <InputSelect<ThemeName>
          id={id}
          onChange={(theme) => {
            storeUpdate({ theme });
          }}
          initialValue={config?.theme ?? 'nord'}
          options={themes}
        />
      </FormItem>
      <p className="mt-4 text-sm">
        Can&apos;t find the theme you want?{' '}
        <Button
          variant="tertiary"
          onClick={() => {
            bridge.openExternal(
              'https://github.com/codethread/pomo-electron/issues/new?assignees=codethread&labels=theme&template=theme-request.md&title='
            );
          }}
        >
          Request it here
        </Button>{' '}
        and we'll get right on it!
      </p>
    </Setting>
  );
}
