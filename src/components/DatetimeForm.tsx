import { Box, Button, Card, Flex, Text } from "@mantine/core";
import { FC, FormEventHandler, useState } from "react";
import DateTimePicker from "./DatetimePicker";

type Props = {
  onSubmit: (datetime: Date | undefined) => void
};

const DatetimeForm: FC<Props> = ({
  onSubmit
}) => {
  const [datetime, setDatetime] = useState<Date | undefined>(undefined)

  const onDatetimeChange = (dates: Date[]) => {
    const date = dates[0]
    setDatetime(date)
  }

  const onFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (typeof onSubmit === 'function') onSubmit(datetime)
  }

  return (
    <Card withBorder shadow="sm" radius="lg">
      <form onSubmit={onFormSubmit}>
        <Flex direction="column" align="center" justify="center" gap="sm">
          <Box component="label" w="100%" px="xs">
            <Text size="sm" fw="bold" mb={4}>
              <Flex justify="space-between">
                <span>
                  Select a date and time
                </span>
                <span>
                  🕓
                </span>
              </Flex>
            </Text>
            <DateTimePicker
              required
              name="datetime"
              onChange={onDatetimeChange}
              value={datetime}
              options={{
                allowInput: true,
                dateFormat: "d F Y, h:i K",
                maxDate: Date.now(),
              }}
            />
          </Box>
          <Button fullWidth radius="xl" size="md" type="submit" variant="gradient">
            Show Traffic Cameras
          </Button>
        </Flex>
      </form>
    </Card>
  )
}

export default DatetimeForm
