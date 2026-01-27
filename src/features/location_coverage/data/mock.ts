// @ts-nocheck

// compactMockData.js
export const compactMockLocations = {
  states: [
    { id: 1, name: 'Lagos', code: 'LA', region: 'South-West' },
    { id: 2, name: 'Rivers', code: 'RI', region: 'South-South' },
    { id: 3, name: 'Kano', code: 'KN', region: 'North-West' },
    { id: 4, name: 'Enugu', code: 'EN', region: 'South-East' },
    { id: 5, name: 'Kaduna', code: 'KD', region: 'North-West' }
  ],

  lgas: [
    // Lagos LGAs (3)
    { id: 101, name: 'Ikeja', state_id: 1, type: 'Urban', capital: true },
    { id: 102, name: 'Lagos Island', state_id: 1, type: 'Urban' },
    { id: 103, name: 'Eti-Osa', state_id: 1, type: 'Urban' },
    
    // Rivers LGAs (3)
    { id: 201, name: 'Port Harcourt', state_id: 2, type: 'Urban', capital: true },
    { id: 202, name: 'Obio-Akpor', state_id: 2, type: 'Urban' },
    { id: 203, name: 'Eleme', state_id: 2, type: 'Semi-Urban' },
    
    // Kano LGAs (3)
    { id: 301, name: 'Kano Municipal', state_id: 3, type: 'Urban', capital: true },
    { id: 302, name: 'Dala', state_id: 3, type: 'Urban' },
    { id: 303, name: 'Nassarawa', state_id: 3, type: 'Urban' },
    
    // Enugu LGAs (3)
    { id: 401, name: 'Enugu East', state_id: 4, type: 'Urban', capital: true },
    { id: 402, name: 'Enugu North', state_id: 4, type: 'Urban' },
    { id: 403, name: 'Enugu South', state_id: 4, type: 'Urban' },
    
    // Kaduna LGAs (3)
    { id: 501, name: 'Kaduna North', state_id: 5, type: 'Urban', capital: true },
    { id: 502, name: 'Kaduna South', state_id: 5, type: 'Urban' },
    { id: 503, name: 'Chikun', state_id: 5, type: 'Semi-Urban' }
  ],

  wards: [
    // Ikeja LGA Wards (3)
    { id: 1001, name: 'Ward A: Ikeja GRA', lga_id: 101, code: 'IKE-A' },
    { id: 1002, name: 'Ward B: Opebi', lga_id: 101, code: 'IKE-B' },
    { id: 1003, name: 'Ward C: Airport', lga_id: 101, code: 'IKE-C' },
    
    // Lagos Island Wards (2)
    { id: 1004, name: 'Ward A: Idumota', lga_id: 102, code: 'LIS-A' },
    { id: 1005, name: 'Ward B: Obalende', lga_id: 102, code: 'LIS-B' },
    
    // Eti-Osa Wards (2)
    { id: 1006, name: 'Ward A: Victoria Island', lga_id: 103, code: 'ETI-A' },
    { id: 1007, name: 'Ward B: Lekki Phase 1', lga_id: 103, code: 'ETI-B' },
    
    // Port Harcourt Wards (3)
    { id: 2001, name: 'Ward 1: Old GRA', lga_id: 201, code: 'PH-A' },
    { id: 2002, name: 'Ward 2: D/Line', lga_id: 201, code: 'PH-B' },
    { id: 2003, name: 'Ward 3: New GRA', lga_id: 201, code: 'PH-C' },
    
    // Obio-Akpor Wards (2)
    { id: 2004, name: 'Ward 1: Rumuokoro', lga_id: 202, code: 'OB-A' },
    { id: 2005, name: 'Ward 2: Rumuodara', lga_id: 202, code: 'OB-B' },
    
    // Kano Municipal Wards (3)
    { id: 3001, name: 'Ward A: Fagge', lga_id: 301, code: 'KAN-A' },
    { id: 3002, name: 'Ward B: Sabon Gari', lga_id: 301, code: 'KAN-B' },
    { id: 3003, name: 'Ward C: Nasarawa', lga_id: 301, code: 'KAN-C' },
    
    // Enugu East Wards (2)
    { id: 4001, name: 'Ward 1: GRA', lga_id: 401, code: 'EN-A' },
    { id: 4002, name: 'Ward 2: Independence Layout', lga_id: 401, code: 'EN-B' },
    
    // Kaduna North Wards (3)
    { id: 5001, name: 'Ward A: Unguwan Sarki', lga_id: 501, code: 'KDN-A' },
    { id: 5002, name: 'Ward B: Kabala', lga_id: 501, code: 'KDN-B' },
    { id: 5003, name: 'Ward C: Badarawa', lga_id: 501, code: 'KDN-C' }
  ],

  pollingUnits: [
    // Ikeja GRA Ward Polling Units (3)
    { id: 10001, name: 'Ikeja High School', ward_id: 1001, code: 'IKE-A-01', voters: 800 },
    { id: 10002, name: 'Government House Annex', ward_id: 1001, code: 'IKE-A-02', voters: 500 },
    { id: 10003, name: 'Police College Hall', ward_id: 1001, code: 'IKE-A-03', voters: 750 },
    
    // Opebi Ward Polling Units (2)
    { id: 10004, name: 'Opebi Primary School', ward_id: 1002, code: 'IKE-B-01', voters: 900 },
    { id: 10005, name: 'Sheraton Hotel Annex', ward_id: 1002, code: 'IKE-B-02', voters: 600 },
    
    // Idumota Ward Polling Units (2)
    { id: 10006, name: 'Idumota Market Square', ward_id: 1004, code: 'LIS-A-01', voters: 1200 },
    { id: 10007, name: 'CMS Primary School', ward_id: 1004, code: 'LIS-A-02', voters: 850 },
    
    // Victoria Island Ward Polling Units (2)
    { id: 10008, name: 'Muson Centre', ward_id: 1006, code: 'ETI-A-01', voters: 700 },
    { id: 10009, name: 'Falomo Shopping Centre', ward_id: 1006, code: 'ETI-A-02', voters: 550 },
    
    // Port Harcourt Old GRA Ward Polling Units (3)
    { id: 20001, name: 'State Secretariat', ward_id: 2001, code: 'PH-A-01', voters: 950 },
    { id: 20002, name: 'Rivers High Court', ward_id: 2001, code: 'PH-A-02', voters: 650 },
    { id: 20003, name: 'Government House', ward_id: 2001, code: 'PH-A-03', voters: 400 },
    
    // Kano Fagge Ward Polling Units (2)
    { id: 30001, name: 'Fagge Market Square', ward_id: 3001, code: 'KAN-A-01', voters: 1500 },
    { id: 30002, name: 'Fagge Primary School', ward_id: 3001, code: 'KAN-A-02', voters: 1100 },
    
    // Enugu GRA Ward Polling Units (2)
    { id: 40001, name: 'Government House Enugu', ward_id: 4001, code: 'EN-A-01', voters: 600 },
    { id: 40002, name: 'Women Development Centre', ward_id: 4001, code: 'EN-A-02', voters: 450 },
    
    // Kaduna Unguwan Sarki Ward Polling Units (2)
    { id: 50001, name: 'Unguwan Sarki Primary', ward_id: 5001, code: 'KDN-A-01', voters: 800 },
    { id: 50002, name: 'Central Mosque Hall', ward_id: 5001, code: 'KDN-A-02', voters: 1000 }
  ],

  // Helper functions
  getStateById(id) {
    return this.states.find(state => state.id === id);
  },

  getLgasByStateId(stateId) {
    return this.lgas.filter(lga => lga.state_id === stateId);
  },

  getWardsByLgaId(lgaId) {
    return this.wards.filter(ward => ward.lga_id === lgaId);
  },

  getPollingUnitsByWardId(wardId) {
    return this.pollingUnits.filter(pu => pu.ward_id === wardId);
  },

  getFullHierarchy() {
    return this.states.map(state => ({
      ...state,
      lgas: this.getLgasByStateId(state.id).map(lga => ({
        ...lga,
        wards: this.getWardsByLgaId(lga.id).map(ward => ({
          ...ward,
          pollingUnits: this.getPollingUnitsByWardId(ward.id)
        }))
      }))
    }));
  },

  // Get summary stats
  getStats() {
    return {
      states: this.states.length,
      lgas: this.lgas.length,
      wards: this.wards.length,
      pollingUnits: this.pollingUnits.length,
      totalVoters: this.pollingUnits.reduce((sum, pu) => sum + pu.voters, 0)
    };
  }
};