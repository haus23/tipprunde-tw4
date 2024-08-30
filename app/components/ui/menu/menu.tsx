import type { ReactNode } from 'react';
import {
  ButtonContext,
  type MenuItemProps,
  type MenuProps,
  MenuTrigger,
  type MenuTriggerProps,
  type PopoverProps,
  Menu as RACMenu,
  MenuItem as RACMenuItem,
  composeRenderProps,
} from 'react-aria-components';

import { tv } from '#utils/tv';
import { Icon } from '../icon/icon';
import { Popover } from '../popover/popover';

const menuItemsStyles = tv({
  base: ['space-y-1 p-1.5 outline-none'],
});

const menuItemStyles = tv({
  base: [
    'relative flex items-center justify-between',
    'cursor-default select-none',
    'px-4 py-2 text-sm',
  ],
  variants: {
    isSelected: { true: 'pr-2' },
  },
});

namespace Menu {
  export interface Props extends MenuTriggerProps {}
}

export function Menu({ ...props }: Menu.Props) {
  return (
    <ButtonContext.Provider value={{ className: '' }}>
      <MenuTrigger {...props} />
    </ButtonContext.Provider>
  );
}

namespace MenuItems {
  export interface Props<T> extends MenuProps<T> {
    placement?: PopoverProps['placement'];
  }
}

export function MenuItems<T extends object>({
  className,
  placement,
  ...props
}: MenuItems.Props<T>) {
  return (
    <Popover withArrow placement={placement || 'bottom'}>
      <RACMenu className={menuItemsStyles({ className })} {...props} />
    </Popover>
  );
}

namespace MenuItem {
  export interface Props extends MenuItemProps {
    children: ReactNode;
  }
}

export function MenuItem({ className, children, ...props }: MenuItem.Props) {
  return (
    <RACMenuItem
      className={composeRenderProps(className, (className, renderProps) =>
        menuItemStyles({ ...renderProps, className }),
      )}
      {...props}
    >
      {({ isSelected }) => (
        <>
          {children}
          {isSelected && <Icon name="check" />}
        </>
      )}
    </RACMenuItem>
  );
}
