import { createTheme } from "@mantine/core";

export const theme = createTheme({
  colors: {
    primary: [
      "var(--primary-0, #F2F8F3)", // lightest
      "var(--primary-1, #DCEBE0)",
      "var(--primary-2, #C0DAC7)",
      "var(--primary-3, #9AC4A3)",
      "var(--primary-4, #6EAA7B)",
      "var(--primary-5, #14441A)", // base
      "var(--primary-6, #103817)",
      "var(--primary-7, #0C2D13)",
      "var(--primary-8, #09220F)",
      "var(--primary-9, #061A0C)", // darkest
    ],
  },

  primaryColor: "primary",
});
