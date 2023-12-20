import { AppShell } from '@mantine/core';
import { FC } from 'react';

type Props = {
  children?: React.ReactNode
};

const AppLayout: FC<Props> = ({ children }) => {
  return (
    <AppShell
      padding="md"
    >
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}

export default AppLayout
