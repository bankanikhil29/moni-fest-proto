import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Campaign {
  id: string;
  createdAt: string;
  status: 'Active' | 'Draft';
  creator: {
    id: string;
    name: string;
    avatar?: string;
    handle?: string;
  };
  objective: 'Awareness' | 'Engagement' | 'Website Visits' | 'Leads' | 'Sales';
  brief: string;
  content: {
    type: 'upload' | 'link';
    ref: string;
  };
  budgetINR: number;
  audiencePreset: 'India' | 'Metros' | 'Custom (coming soon)';
  platforms: string[];
}

interface CampaignInput {
  creator: {
    id: string;
    name: string;
    avatar?: string;
    handle?: string;
  };
  objective: string;
  brief: string;
  contentType: 'upload' | 'link';
  contentRef: string;
  budgetINR: number;
  audiencePreset: string;
  platforms: string[];
}

interface CampaignStore {
  campaigns: Campaign[];
  addCampaign: (input: CampaignInput) => string;
  getCampaign: (id: string) => Campaign | undefined;
}

const CampaignContext = createContext<CampaignStore | undefined>(undefined);

const STORAGE_KEY = 'monifest.campaigns';

export const CampaignProvider = ({ children }: { children: ReactNode }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    // Hydrate from localStorage on init
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage whenever campaigns change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));
  }, [campaigns]);

  const addCampaign = (input: CampaignInput): string => {
    const id = `campaign-${Date.now()}`;
    const newCampaign: Campaign = {
      id,
      createdAt: new Date().toISOString(),
      status: 'Active',
      creator: input.creator,
      objective: input.objective as Campaign['objective'],
      brief: input.brief,
      content: {
        type: input.contentType,
        ref: input.contentRef,
      },
      budgetINR: input.budgetINR,
      audiencePreset: input.audiencePreset as Campaign['audiencePreset'],
      platforms: input.platforms,
    };

    setCampaigns((prev) => [newCampaign, ...prev]);
    return id;
  };

  const getCampaign = (id: string): Campaign | undefined => {
    return campaigns.find((c) => c.id === id);
  };

  return (
    <CampaignContext.Provider value={{ campaigns, addCampaign, getCampaign }}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaigns = (): CampaignStore => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaigns must be used within a CampaignProvider');
  }
  return context;
};
