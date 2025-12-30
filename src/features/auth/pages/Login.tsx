import React from "react";
import LoginUser from "@features/auth/forms/LoginUser";
import appLogo from "@src/assets/app-logo.svg";

const Login: React.FC = () => {
  return (
    <div className="relative h-dvh flex items-center justify-center bg-gray-100">
      <img
        src={appLogo}
        alt="Omniqle Logo"
        className="h-6 w-auto absolute top-4 left-4"
      />
      <LoginUser />
    </div>
  );
};

export default Login;
