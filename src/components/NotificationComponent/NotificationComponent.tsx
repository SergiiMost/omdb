import { Alert } from "@mantine/core"
import { IconAlertCircle } from "@tabler/icons"

interface Error {
  error: string
  type: "notification" | "error"
}

export function NotificationComponent({ error, type }: Error) {
  return (
    <Alert
      icon={<IconAlertCircle size={16} />}
      mt="md"
      title="Bummer!"
      color={type === "notification" ? "indigo" : "red"}
    >
      {error}
    </Alert>
  )
}
