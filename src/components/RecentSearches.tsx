import { Box, Container, Divider, Flex, Loader, Stack, Text } from "@mantine/core"
import { FC } from "react"
import type { SearchTransaction } from "../../types.d.ts"

type Props = {
  searchQueries: SearchTransaction[]
  isLoading: boolean
}

const RecentSearches: FC<Props> = ({
  searchQueries,
  isLoading,
}) => {
  return (
    <>
      {
        isLoading ? (
          <Flex justify="center" mt="xl" pt="xl">
            <Loader size="lg" />
          </Flex>
        ) : (
          searchQueries.length === 0 ? (
            <Container size="xs" p="lg">
              <Text c="dimmed" size="sm" className="text-center">
                No recent searches found.
              </Text>
            </Container>
          ) : (
            <Stack component="ul" gap={0} py="sm">
              {searchQueries.map(searchQuery => {
                return (
                  <Box component="li" py={4} px="sm">
                    <Text size="xs">
                      <Text size="sm">
                        {searchQuery.params.area_name}
                      </Text>
                      <Text>
                        {searchQuery.params.latitude}, {searchQuery.params.longitude}
                      </Text>
                      <Text>
                        Timestamp: {+new Date(searchQuery.queryTimestamp)}
                      </Text>
                    </Text>
                    <Divider mt="xs" />
                  </Box>
                )
              })}
            </Stack>
          )
        )
      }
    </>
  )
}

export default RecentSearches
