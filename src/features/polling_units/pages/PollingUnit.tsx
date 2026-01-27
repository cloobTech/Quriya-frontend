import PollingUnitCoverageMap from "../components/PollingUnitCoverageMap";
import PollingUnitTable from "../components/PollingUnitTable";
const PollingUnit = () => {
  return (
    <div className="grid gap-6">
      <PollingUnitCoverageMap />
      <PollingUnitTable />
    </div>
  );
};

export default PollingUnit;
