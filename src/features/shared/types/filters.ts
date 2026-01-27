// Define filter types for different tables
export interface AgentFilters {
  search: string;
  status: string | null;
  state_id: string | null;
  lga_id: string | null;
  ward_id: string | null;
}

export interface ResultFilters {
  search: string;
  winner: string | null;
  election_status: string | null;
  election_type: string | null;
  state_id: string | null;
  lga_id: string | null;
  date_from: string | null;
  date_to: string | null;
}

export interface VoterFilters {
  search: string;
  registration_status: string | null;
  verification_status: string | null;
  polling_unit_id: string | null;
  ward_id: string | null;
  age_group: string | null;
}

// Agent filter configuration
export const agentFilterConfig = {
  initialFilters: {
    search: '',
    status: null,
    state_id: null,
    lga_id: null,
    ward_id: null,
  } as AgentFilters,
  
  filterFields: [
    {
      key: 'status',
      label: 'Status',
      type: 'checkbox' as const,
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'invited', label: 'Invited' },
      ],
    },
    {
      key: 'state_id',
      label: 'State',
      type: 'select' as const,
      placeholder: 'Select state',
      clearable: true,
      searchable: true,
    },
    {
      key: 'lga_id',
      label: 'Local Government',
      type: 'select' as const,
      placeholder: 'Select LGA',
      clearable: true,
      searchable: true,
      dependsOn: 'state_id',
    },
    {
      key: 'ward_id',
      label: 'Ward',
      type: 'select' as const,
      placeholder: 'Select ward',
      clearable: true,
      searchable: true,
      dependsOn: 'lga_id',
    },
  ],
  
  debounceFields: ['search'],
};

// Result filter configuration
export const resultFilterConfig = {
  initialFilters: {
    search: '',
    winner: null,
    election_status: null,
    election_type: null,
    state_id: null,
    lga_id: null,
    date_from: null,
    date_to: null,
  } as ResultFilters,
  
  filterFields: [
    {
      key: 'winner',
      label: 'Winner',
      type: 'select' as const,
      placeholder: 'Select winner',
      options: [
        { value: 'apc', label: 'APC' },
        { value: 'pdp', label: 'PDP' },
        { value: 'lp', label: 'Labour Party' },
      ],
      clearable: true,
    },
    {
      key: 'election_status',
      label: 'Election Status',
      type: 'checkbox' as const,
      options: [
        { value: 'completed', label: 'Completed' },
        { value: 'ongoing', label: 'Ongoing' },
        { value: 'scheduled', label: 'Scheduled' },
        { value: 'cancelled', label: 'Cancelled' },
      ],
    },
    {
      key: 'election_type',
      label: 'Election Type',
      type: 'select' as const,
      placeholder: 'Select election type',
      options: [
        { value: 'presidential', label: 'Presidential' },
        { value: 'gubernatorial', label: 'Gubernatorial' },
        { value: 'senatorial', label: 'Senatorial' },
        { value: 'house_of_reps', label: 'House of Reps' },
      ],
      clearable: true,
    },
    {
      key: 'state_id',
      label: 'State',
      type: 'select' as const,
      placeholder: 'Select state',
      clearable: true,
      searchable: true,
    },
    {
      key: 'date_from',
      label: 'From Date',
      type: 'date' as const,
      placeholder: 'Select start date',
      clearable: true,
    },
    {
      key: 'date_to',
      label: 'To Date',
      type: 'date' as const,
      placeholder: 'Select end date',
      clearable: true,
    },
  ],
  
  debounceFields: ['search'],
};

// Voter filter configuration
export const voterFilterConfig = {
  initialFilters: {
    search: '',
    registration_status: null,
    verification_status: null,
    polling_unit_id: null,
    ward_id: null,
    age_group: null,
  } as VoterFilters,
  
  filterFields: [
    {
      key: 'registration_status',
      label: 'Registration Status',
      type: 'checkbox' as const,
      options: [
        { value: 'registered', label: 'Registered' },
        { value: 'pending', label: 'Pending' },
        { value: 'rejected', label: 'Rejected' },
      ],
    },
    {
      key: 'verification_status',
      label: 'Verification Status',
      type: 'checkbox' as const,
      options: [
        { value: 'verified', label: 'Verified' },
        { value: 'unverified', label: 'Unverified' },
        { value: 'pending_verification', label: 'Pending Verification' },
      ],
    },
    {
      key: 'age_group',
      label: 'Age Group',
      type: 'select' as const,
      placeholder: 'Select age group',
      options: [
        { value: '18-25', label: '18-25 years' },
        { value: '26-35', label: '26-35 years' },
        { value: '36-45', label: '36-45 years' },
        { value: '46+', label: '46+ years' },
      ],
      clearable: true,
    },
  ],
  
  debounceFields: ['search'],
};