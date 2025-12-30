import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLoginMutation } from "../services/api";
import { setToken } from "@features/auth";
import { setOrganization } from "@features/organization";
import {
  useAppDispatch,
  showApiError,
  organizationDataFromToken,
} from "@features/shared";
import { useForm } from "@mantine/form";
import {
  Button,
  TextInput,
  Checkbox,
  Anchor,
  Divider,
  PasswordInput,
} from "@mantine/core";
import googleIcon from "../assets/7123025_logo_google_g_icon.svg";

const LoginUser: React.FC = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/redirect";
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm({
    mode: "controlled",
    initialValues: {
      email: "",
      password: "",
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value ? null : "Enter Password"),
    },
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    const credentials = { ...values };

    try {
      const response = await login(credentials).unwrap();
      if (response.token) {
        dispatch(setToken(response.token));
        const organizationData = organizationDataFromToken(response.token);
        if (organizationData?.organizationId && organizationData?.userRole) {
          dispatch(
            setOrganization({
              organizationId: organizationData.organizationId,
              userRole: organizationData.userRole,
            })
          );
        }

        navigate(from, { replace: true });
      }

      form.reset();
    } catch (err: any) {
      showApiError(err.data || err);
    }
  };

  const validForm = form.isValid();
  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="flex flex-col justify-center w-[80%] md:w-[588px] rounded-2xl p-8 bg-white shadow-sm gap-4"
    >
      <Button
        color="dark.8" // equivalent to bg-gray-800
        size="sm"
        fw="bold"
        leftSection={<img src={googleIcon} alt="Google" className="size-8" />}
        className="gap-4"
        radius={"md"}
      >
        Login with Google
      </Button>
      <Divider my="xs" label="or" labelPosition="center" />
      <TextInput
        placeholder="Enter your email"
        key={form.key("email")}
        {...form.getInputProps("email")}
        label="Email address"
      />
      <PasswordInput
        placeholder="Enter your password"
        key={form.key("password")}
        {...form.getInputProps("password")}
        label="Password"
      />
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          className="text-gray-600 font-bold"
          size="xs"
        />
        <Anchor href="#" target="_blank" fw={"bold"} size="sm">
          Forgot Password?
        </Anchor>
      </div>
      <Button
        type="submit"
        loading={isLoading}
        disabled={!validForm || isLoading}
        loaderProps={{ type: "dots", size: "md" }}
        size="sm"
        fw="bold"
        radius={"md"}
      >
        Login
      </Button>
      {error && (
        <p className="text-red-500 text-sm">Login failed. Please try again.</p>
      )}
    </form>
  );
};

export default LoginUser;
