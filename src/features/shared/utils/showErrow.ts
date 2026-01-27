import { notifications } from "@mantine/notifications";

export function showApiError(errorData: any) {
  // console.log(errorData);
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
      title: errorData.error
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (char: string) => char.toUpperCase()),
      message: errorData.message,
      color: "red",
    });
  } else if (typeof errorData?.name === "string") {
    notifications.show({
      position: "top-right",
      title: errorData.name,
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
