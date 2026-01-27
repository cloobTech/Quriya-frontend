import AgentsTable from "../components/AgentsTable";
import StatCards from "../components/StatCards";

const Agents = () => {
  return (
    <div className="grid gap-6">
      <StatCards />
      <AgentsTable />
    </div>
  );
};

export default Agents;
