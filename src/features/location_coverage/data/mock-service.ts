
// @ts-nocheck

// mockApiService.js
import { compactMockLocations } from './mock';

// Simulate API delay
const simulateDelay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API service
export const mockApi = {
  // Get all states
  async getStates() {
    await simulateDelay();
    return {
      data: compactMockLocations.states,
      success: true,
      timestamp: new Date().toISOString()
    };
  },

  // Get LGAs by state ID
  async getLgasByState(stateId, search = '') {
    await simulateDelay();
    let lgas = compactMockLocations.getLgasByStateId(stateId);
    
    if (search) {
      lgas = lgas.filter(lga => 
        lga.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return {
      data: lgas,
      success: true,
      count: lgas.length
    };
  },

  // Get wards by LGA ID
  async getWardsByLga(lgaId, search = '') {
    await simulateDelay();
    let wards = compactMockLocations.getWardsByLgaId(lgaId);
    
    if (search) {
      wards = wards.filter(ward => 
        ward.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return {
      data: wards,
      success: true,
      count: wards.length
    };
  },

  // Get polling units by ward ID
  async getPollingUnitsByWard(wardId, search = '') {
    await simulateDelay();
    let pollingUnits = compactMockLocations.getPollingUnitsByWardId(wardId);
    
    if (search) {
      pollingUnits = pollingUnits.filter(pu => 
        pu.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return {
      data: pollingUnits,
      success: true,
      count: pollingUnits.length
    };
  },

  // Expand selection (backend processing simulation)
  async expandSelection(selection) {
    await simulateDelay(500);
    
    const { state_ids = [], excluded_lgas = [], excluded_wards = [], excluded_polling_units = [] } = selection;
    
    // Get all LGAs for selected states
    const allLgas = compactMockLocations.lgas.filter(lga => 
      state_ids.includes(lga.state_id) && !excluded_lgas.includes(lga.id)
    );
    
    // Get all wards for selected LGAs
    const allWards = compactMockLocations.wards.filter(ward => 
      allLgas.some(lga => lga.id === ward.lga_id) && !excluded_wards.includes(ward.id)
    );
    
    // Get all polling units for selected wards
    const allPollingUnits = compactMockLocations.pollingUnits.filter(pu => 
      allWards.some(ward => ward.id === pu.ward_id) && !excluded_polling_units.includes(pu.id)
    );
    
    return {
      data: {
        state_ids,
        lga_ids: allLgas.map(l => l.id),
        ward_ids: allWards.map(w => w.id),
        polling_unit_ids: allPollingUnits.map(p => p.id),
        summary: {
          states: state_ids.length,
          lgas: allLgas.length,
          wards: allWards.length,
          polling_units: allPollingUnits.length
        }
      },
      success: true
    };
  },

  // Get stats
  async getStats() {
    await simulateDelay();
    return {
      data: compactMockLocations.getStats(),
      success: true
    };
  }
};

// Generate sample selection
export function generateSampleSelection() {
  // Select Lagos and Rivers states
  const state_ids = [1, 2];
  
  // Get all LGAs for these states
  const lgas = compactMockLocations.lgas.filter(lga => state_ids.includes(lga.state_id));
  const lga_ids = lgas.map(l => l.id);
  
  // Get all wards for these LGAs
  const wards = compactMockLocations.wards.filter(ward => lga_ids.includes(ward.lga_id));
  const ward_ids = wards.map(w => w.id);
  
  // Get all polling units for these wards
  const pollingUnits = compactMockLocations.pollingUnits.filter(pu => ward_ids.includes(pu.ward_id));
  const polling_unit_ids = pollingUnits.map(p => p.id);
  
  return {
    state_ids,
    lga_ids,
    ward_ids,
    polling_unit_ids,
    count: {
      states: state_ids.length,
      lgas: lga_ids.length,
      wards: ward_ids.length,
      polling_units: polling_unit_ids.length
    }
  };
}