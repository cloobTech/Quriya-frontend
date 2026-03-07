import InProgress from "@src/assets/app-logo.svg";

const Result = () => {
  return (
    <div className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <img src={InProgress} alt="Page in progress" className="w-64 h-64" />

      <h1 className="text-3xl font-bold mb-2">Result Page Under Development</h1>

      <p className="text-gray-600 max-w-md">
        We're currently working on this page. The results feature will be
        available soon. Please check back later.
      </p>
    </div>
  );
};

export default Result;
