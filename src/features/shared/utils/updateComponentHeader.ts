const getLastSegment = (pathname: string) =>
  pathname.split("/").filter(Boolean).pop();

export const getPageTitle = (pathname: string): string => {
  const last = getLastSegment(pathname);

  switch (last) {
    case "agents":
      return "Agents Management";
    case "polling-units":
      return "Polling Unit Management";
    case "location-coverage":
      return "Location Coverage";
    case "dashboard":
      return "Dashboard Overview";
    case "details":
      return "Polling Unit Details";
    case "results":
      return "Results Overview";
    case "incident-report":
      return "Incident Report";
    case "settings":
      return "Settings Management";
    case "notifications":
      return "Notifications";
    default:
      return "Welcome";
  }
};

export const getPageSubtitle = (pathname: string): string => {
  const last = getLastSegment(pathname);

  switch (last) {
    case "agents":
      return "View and manage agents in real time";
    case "polling-units":
      return "Manage polling units in real time";
    case "location-coverage":
      return "Select locations you want to monitor";
    case "dashboard":
      return "Real-time election monitoring and management";
    case "details":
      return "View and manage polling units results and agent";
    case "results":
      return "View and manage election results in real time";
    case "incident-report":
      return "View  election incident reports";
    case "settings":
      return "Manage election settings";
    case "notifications":
      return "Manage notifications";
    default:
      return "The administrative management portal";
  }
};
