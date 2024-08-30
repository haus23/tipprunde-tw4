import { useFetcher, useRouteLoaderData } from '@remix-run/react';
import { useCallback } from 'react';
import * as v from 'valibot';

import type { loader } from '#root';

const colorSchemeNames = ['light', 'dark', 'system'] as const;

export const colorSchemeSchema = v.picklist(colorSchemeNames);
export const themeColorSchema = v.picklist(['default']);

export const themeSchema = v.object({
  colorScheme: v.picklist([...colorSchemeNames]),
  themeColor: themeColorSchema,
});

export type Theme = v.InferInput<typeof themeSchema>;

const themeAction = '/action/set-theme';

export function useTheme() {
  const fetcher = useFetcher();
  const data = useRouteLoaderData<typeof loader>('root');

  const requestedColorScheme = data?.requestInfo.theme?.colorScheme;

  const theme = {
    colorScheme: requestedColorScheme || 'system',
    themeColor: 'default' as const, // The only implemented themeColor
  } satisfies Theme;

  const setTheme = useCallback(
    (theme: Theme) => {
      fetcher.submit(theme, { method: 'POST', action: themeAction });
    },
    [fetcher],
  );

  return { theme, setTheme };
}
