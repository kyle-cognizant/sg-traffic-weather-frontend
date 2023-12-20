import { AppShell, Flex, Title } from '@mantine/core';
import { FC } from 'react';

type Props = {
  children?: React.ReactNode
};

const AppLayout: FC<Props> = ({ children }) => {
  return (
    <AppShell
      padding="md"
      header={{
        height: 48
      }}
    >
      <AppShell.Header>
        <Flex justify="center" py="xs">
          <Title order={1} size="h4" className="align-center">🇸🇬 SG Traffic/Weather</Title>
        </Flex>
      </AppShell.Header>
      <AppShell.Main px={0} bg="gray.0">
        {children}
      </AppShell.Main>
    </AppShell>
  );
}

export default AppLayout
