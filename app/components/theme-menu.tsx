import type { Key } from 'react';
import * as v from 'valibot';

import { type Theme, colorSchemeSchema, useTheme } from '#utils/theme';
import { Button } from './ui/button/button';
import { Icon, type IconName } from './ui/icon/icon';
import { Menu, MenuItem, MenuItems } from './ui/menu/menu';

const colorSchemes: Record<
  Theme['colorScheme'],
  { label: string; icon: IconName }
> = {
  light: { label: 'Hell', icon: 'sun' },
  dark: { label: 'Dunkel', icon: 'moon' },
  system: { label: 'System', icon: 'sun-moon' },
};

export function ThemeMenu() {
  const { setTheme, theme } = useTheme();

  const selectedColorScheme = new Set([theme.colorScheme]);

  function handleAction(key: Key) {
    const result = v.safeParse(colorSchemeSchema, key);
    if (result.success) {
      const colorScheme = result.output;
      !selectedColorScheme.has(colorScheme) &&
        setTheme({ ...theme, colorScheme });
    }
  }

  return (
    <Menu>
      <Button>
        <Icon name={colorSchemes[theme.colorScheme].icon} />
      </Button>
      <MenuItems
        selectionMode="single"
        selectedKeys={selectedColorScheme}
        onAction={handleAction}
        aria-label="Liste der Farbschemata"
        items={Object.entries(colorSchemes)}
        className="w-44"
      >
        {([name, item]) => (
          <MenuItem key={name} id={name} className="pl-2">
            <Icon name={item.icon}>{item.label}</Icon>
          </MenuItem>
        )}
      </MenuItems>
    </Menu>
  );
}
