import { notifications } from "@mantine/notifications";

export function showApiError(errorData: any) {
  if (Array.isArray(errorData?.errors)) {
    errorData.errors.forEach((errorMsg: string) => {
      notifications.show({
        position: "top-right",
        title: "Error",
        message: errorMsg,
        color: "red",
      });
    });
  } else if (typeof errorData?.error === "string") {
    notifications.show({
      position: "top-right",
      // title: errorData.error,
      message: errorData.message,
      color: "red",
    });
  } else {
    notifications.show({
      position: "top-right",
      title: "Error",
      message: "An unexpected error occurred",
      color: "red",
    });
  }
}
