import { Text } from "@mantine/core";

const PartyVote = () => (
  <div className="flex justify-between items-center text-xs border-b border-gray-200 py-2">
    <div>APC</div>
    <div>
      <Text size="sm" fw={600}>
        5,445,765
      </Text>
      <small className="text-[10px] text-gray-500">50.00%</small>
    </div>
  </div>
);

export const PartyVotes = () => (
  <div className="grid gap-2 px-3 ">
    <PartyVote />
    <PartyVote />
    <PartyVote />
  </div>
);
