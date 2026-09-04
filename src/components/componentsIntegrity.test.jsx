// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

import CommandPaletteModal from './Navigation/CommandPaletteModal';
import LabsDashboard from './Content/LabsDashboard';
import DashboardQuickAccessGrid from './Content/DashboardQuickAccessGrid';
import NwaScoringLab from './Content/NwaScoringLab';
import RaidCalculatorLab from './Content/RaidCalculatorLab';
import VlsmSubnetLab from './Content/VlsmSubnetLab';
import IhkProjectProposalLab from './Content/IhkProjectProposalLab';

describe('Component Integrity & Smoke Tests', () => {
  it('rendert CommandPaletteModal ohne ReferenceError (alle Lucide Icons importiert)', () => {
    const { container } = render(
      <CommandPaletteModal
        isOpen={true}
        onClose={() => {}}
        onNavigate={() => {}}
        onOpenModal={() => {}}
      />
    );
    expect(container).toBeDefined();
    expect(screen.getByPlaceholderText(/Suche Themen/i)).toBeDefined();
  });

  it('rendert LabsDashboard fehlerfrei mit allen Modulen', () => {
    const { container } = render(
      <LabsDashboard onSelectLab={() => {}} />
    );
    expect(container).toBeDefined();
    expect(screen.getAllByText(/Nutzwertanalyse/i).length).toBeGreaterThan(0);
  });

  it('rendert DashboardQuickAccessGrid fehlerfrei', () => {
    const { container } = render(
      <DashboardQuickAccessGrid setActiveTab={() => {}} />
    );
    expect(container).toBeDefined();
    expect(screen.getByText(/IHK Nutzwertanalyse Studio/i)).toBeDefined();
    expect(screen.getByText(/RAID Storage & Paritäts-Rechner/i)).toBeDefined();
  });

  it('rendert NwaScoringLab fehlerfrei', () => {
    const { container } = render(
      <NwaScoringLab onRewardXP={() => {}} />
    );
    expect(container).toBeDefined();
    expect(screen.getByText(/IHK Nutzwertanalyse Studio/i)).toBeDefined();
  });

  it('rendert RaidCalculatorLab fehlerfrei', () => {
    const { container } = render(
      <RaidCalculatorLab onRewardXP={() => {}} />
    );
    expect(container).toBeDefined();
    expect(screen.getByText(/RAID Storage & Paritäts-Rechner/i)).toBeDefined();
  });

  it('rendert VlsmSubnetLab fehlerfrei', () => {
    const { container } = render(
      <VlsmSubnetLab onRewardXP={() => {}} />
    );
    expect(container).toBeDefined();
    expect(screen.getByText(/VLSM Subnet Splitter/i)).toBeDefined();
  });

  it('rendert IhkProjectProposalLab fehlerfrei', () => {
    const { container } = render(
      <IhkProjectProposalLab onRewardXP={() => {}} />
    );
    expect(container).toBeDefined();
    expect(screen.getByText(/IHK Projektantrag/i)).toBeDefined();
  });
});
