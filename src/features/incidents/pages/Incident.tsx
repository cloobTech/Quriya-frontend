import InProgress from "@src/assets/app-logo.svg";

const Incident = () => {
  return (
    <div className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <img
        src={InProgress}
        alt="Incident page in progress"
        className="w-64 h-64"
      />

      <h1 className="text-3xl font-bold mb-2">
        Incident Page Under Development
      </h1>

      <p className="text-gray-600 max-w-md">
        This section is currently being built. Soon you will be able to view and
        manage incidents here.
      </p>
    </div>
  );
};

export default Incident;
