import { BsGeoAlt, BsChevronRight, BsMap } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Avatar, Box, Text, Accordion, Badge, Group } from "@mantine/core";
import { theme } from "@src/theme";
import { GridImageDisplay, useAppSelector } from "@features/shared";
import { PartyVotes } from "@features/results";
import type { ImageType, timeLeft } from "@features/shared";
import { useGetSinglePollingUnitQuery } from "../services/api";
import { useParams } from "react-router-dom";
import ResultDemoImage from "@src/assets/demo-result.png";
import IncidentImg from "@src/assets/incident-demo-1.png";
import IncidentImg2 from "@src/assets/incident-demo02.png";
import IncidentImg3 from "@src/assets/incident-demo03.png";
import IncidentImg4 from "@src/assets/incident-demo04.png";

// Define the ImageType interface

const incidentImages: ImageType[] = [
  {
    id: 1,
    url: IncidentImg,
  },
  {
    id: 2,
    url: IncidentImg2,
  },
  {
    id: 4,
    url: IncidentImg4,
  },
  {
    id: 3,
    url: IncidentImg3,
  },
];

const images: ImageType[] = [
  {
    id: 1,
    url: ResultDemoImage,
  },
  {
    id: 2,
    url: ResultDemoImage,
  },
];

const EmptyState = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <Box bg="white" className="rounded-2xl p-6 text-center">
    <Text fw={600}>{title}</Text>
    {description && (
      <Text size="xs" c="dimmed" mt={4}>
        {description}
      </Text>
    )}
  </Box>
);

const LocationDeatils = ({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex items-center gap-3 text-xs">
      <Box
        p={6}
        bg={theme?.colors?.primary?.[0] || "#f0f0f0"}
        variant="light"
        className="rounded-md"
        c={theme?.colors?.primary?.[5] ?? "#666"}
      >
        {icon}
      </Box>
      <div className="grid gap-1">
        <p className="text-gray-600 text-xs">{title}</p>
        <p className="font-semibold">{subtitle}</p>
      </div>
    </div>
  );
};

const AgentDetails = ({
  full_name,
  email,
  user_id,
}: {
  full_name: string;
  email: string;
  user_id: string;
}) => {
  return (
    <div className="grid gap-3 text-xs bg-white rounded-2xl p-6" key={user_id}>
      <p className="text-sm font-semibold">Agent reporting</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar size="md" radius="xl" />
          <div className="grid gap-1">
            <p className="font-semibold">{full_name}</p>
            <p className="text-gray-500 text-[10px]">{email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <Text c="dimmed" size="xs">
            View details
          </Text>
          <BsChevronRight />
        </div>
      </div>
    </div>
  );
};

const ResultReport = (result: {
  timeSubmitted: string;
  totalVotes: number;
  totalValidVotes: number;
  totalInvalidVotes: number;
  totalRejectedVotes: number;
}) => {
  return (
    <Box bg="white" className="rounded-2xl" style={{ overflow: "hidden" }}>
      <Accordion
        radius="2xl"
        styles={{
          label: {
            fontWeight: 900,
            fontSize: "14px",
            padding: "12px",
          },
          item: {
            border: "none",
          },
        }}
      >
        <Accordion.Item value="result-report">
          <Accordion.Control>Result Report</Accordion.Control>
          <Accordion.Panel>
            <div className="grid gap-3 p-3">
              <div>
                <GridImageDisplay images={images} />
              </div>

              <div>
                <Text c="dimmed" size="xs">
                  Time submitted
                </Text>
                <Text size="sm" fw={600}>
                  {/* {result.timeSubmitted} */}
                  2:00 PM
                </Text>
              </div>

              {/* vote summary */}
              <div className="grid gap-2 bg-gray-100/50 rounded-lg p-3">
                <div className="flex justify-between">
                  <Text c="dimmed" size="xs">
                    Total Votes
                  </Text>
                  <Text fw={600} c={"blue"}>
                    {result.totalVotes}
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text c="dimmed" size="xs">
                    Total Valid Votes
                  </Text>
                  <Text fw={600} c={"green"}>
                    {result.totalValidVotes}
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text c="dimmed" size="xs">
                    Total Invalid Votes
                  </Text>
                  <Text fw={600} c={"red"}>
                    {result.totalInvalidVotes}
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text c="dimmed" size="xs">
                    Total Rejected Votes
                  </Text>
                  <Text fw={600} c={"red"}>
                    {result.totalRejectedVotes}
                  </Text>
                </div>
              </div>
              {/* Party Vote */}
              <PartyVotes />
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Box>
  );
};

const IncidentReport = () => {
  return (
    <Box bg="white" className="rounded-2xl" style={{ overflow: "hidden" }}>
      <Accordion
        radius="2xl"
        styles={{
          label: {
            fontWeight: 900,
            fontSize: "14px",
            padding: "12px",
          },
          item: {
            border: "none",
          },
        }}
      >
        <Accordion.Item value="incident-report">
          <Accordion.Control>Incident Report</Accordion.Control>
          <Accordion.Panel>
            <div className="grid gap-6 p-3">
              <div className="mb-8">
                <GridImageDisplay images={incidentImages} />
              </div>

              <div>
                <Text c="dimmed" size="xs">
                  Incident type
                </Text>
                <Text size="sm" fw={600}>
                  Ballot Box Snatching
                </Text>
              </div>
              <div>
                <Text c="dimmed" size="xs">
                  Severity
                </Text>
                <Badge color="red" tt={"none"} variant="light">
                  High
                </Badge>
              </div>
              <div>
                <Text c="dimmed" size="xs">
                  Time submitted
                </Text>
                <Text size="sm" fw={600}>
                  12:30:00 PM
                </Text>
              </div>
              <div>
                <Text c="dimmed" size="xs">
                  Description
                </Text>
                <Group>
                  <Text size="xs">
                    At approximately 10:45 AM, just as voting peaked, a group of
                    masked men stormed the polling unit on motorcycles.
                    Witnesses say the attackers, allegedly affiliated with the
                    shadowy Vanguard for Electoral Justice (VEJ), attempted to
                    snatch ballot boxes containing early votes favoring the DRA
                    candidate, Hon. Ifeanyi Okoro.
                  </Text>
                  <Text size="xs">
                    The assailants arrived swiftly, using tear gas canisters to
                    create chaos and disorient the voters and election
                    officials. Several ballot box guards were caught off-guard,
                    and desperate attempts to resist were met with threats and
                    aggression. The sudden eruption of violence sent voters
                    fleeing in all directions, with some trampled in the
                    confusion.
                  </Text>

                  <Text size="xs">
                    The attackers, allegedly affiliated with the shadowy
                    Vanguard for Electoral Justice (VEJ), attempted to snatch
                    ballot boxes containing early votes favoring the DRA
                    candidate, Hon. Ifeanyi Okoro.
                  </Text>
                </Group>
              </div>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Box>
  );
};

const PollingUnitLocationDetails = (data: {
  name: string;
  formatted_address: string;
  code: string;
}) => (
  <div className="p-6 bg-white rounded-2xl grid grid-cols-2 gap-6">
    {/* <LocationDeatils />
    <LocationDeatils />
    */}
    <LocationDeatils
      subtitle={data.name}
      icon={<FaMapMarkerAlt />}
      title="Polling unit"
    />
    <LocationDeatils
      title="Location"
      subtitle={`Unit ${data.code}`}
      icon={<BsGeoAlt />}
    />
    <LocationDeatils
      title="Address"
      subtitle={`Unit ${data?.formatted_address ?? "N/A"}`}
      icon={<BsMap />}
    />
  </div>
);

const PollingUnitDetails = () => {
  const organizationId = useAppSelector(
    (state) => state.organization.organizationId,
  );
  const { projectId, pollingUnitId } = useParams();
  const { data: pollingUnitData } = useGetSinglePollingUnitQuery({
    organizationId: organizationId!,
    projectId: projectId!,
    pollingUnitId: pollingUnitId!,
  });

  console.log(pollingUnitData);

  const pollingUnit = pollingUnitData?.polling_unit ?? null;
  const user = pollingUnitData?.user ?? null;
  const result = pollingUnitData?.result ?? null;
  const incidents = pollingUnitData?.incidents ?? null;

  console.log({incidents});
  

  return (
    <div className="grid gap-6 ">
      <PollingUnitLocationDetails
        name={pollingUnit?.name ?? ""}
        formatted_address={pollingUnit?.formatted_address ?? ""}
        code={pollingUnit?.code ?? ""}
      />
      {/* Agent Deatils */}
      {user ? (
        <AgentDetails
          full_name={user?.full_name ?? ""}
          email={user?.email ?? ""}
          user_id={user?.id ?? ""}
        />
      ) : (
        <EmptyState title="No agent assigned" description="" />
      )}
      {/* Result Report */}
      {result ? (
        <ResultReport
          timeSubmitted={pollingUnitData?.created_at ?? ""}
          totalVotes={result?.total_votes_cast ?? 0}
          totalValidVotes={result?.total_valid_votes ?? 0}
          totalInvalidVotes={result?.total_invalid_votes ?? 0}
          totalRejectedVotes={result?.total_cancelled_votes ?? 0}
        />
      ) : (
        <EmptyState title="No result reported" description="" />
      )}
      {/* Incident Report */}
      {incidents ? (
        <IncidentReport />
      ) : (
        <EmptyState title="No incident reported" />
      )}
    </div>
  );
};

export default PollingUnitDetails;
