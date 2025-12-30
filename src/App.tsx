import { RouterProvider } from "react-router-dom";
import { routers } from "./router/router";
import { GlobalModal } from "@features/shared";

function App() {
  return (
    <>
      <RouterProvider router={routers} />;
      <GlobalModal />
    </>
  );
}

export default App;
