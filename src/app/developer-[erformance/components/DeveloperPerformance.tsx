'use client';

import React, { useState, useEffect } from 'react';
import PerformanceControlPanel from './PerformanceControlPanel';
import DeveloperMetricsGrid from './DeveloperMetricsGrid';
import PerformanceVisualization from './PerformanceVisualization';
import CodeInsightsSidebar from './CodeInsightsSidebar';
import ComponentPerformanceTable from './ComponentPerformanceTable';

const DeveloperPerformanceInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [renderMode, setRenderMode] = useState<'concurrent' | 'legacy'>('concurrent');
  const [virtualScrolling, setVirtualScrolling] = useState(true);
  const [renderingType, setRenderingType] = useState<'canvas' | 'svg'>('canvas');
  const [stressTestRate, setStressTestRate] = useState(1000);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleRenderModeChange = (mode: 'concurrent' | 'legacy') => {
    setRenderMode(mode);
    // In a real app, this would trigger React mode changes
    console.log('Render mode changed to:', mode);
  };

  const handleScrollingChange = (enabled: boolean) => {
    setVirtualScrolling(enabled);
    // In a real app, this would toggle virtual scrolling
    console.log('Virtual scrolling:', enabled);
  };

  const handleRenderingChange = (type: 'canvas' | 'svg') => {
    setRenderingType(type);
    // In a real app, this would switch rendering engines
    console.log('Rendering type changed to:', type);
  };

  const handleStressTestChange = (rate: number) => {
    setStressTestRate(rate);
    // In a real app, this would adjust stress test parameters
    console.log('Stress test rate:', rate);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="h-32 bg-muted rounded"></div>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-6">
                  <div className="h-64 bg-muted rounded"></div>
                  <div className="h-96 bg-muted rounded"></div>
                </div>
                <div className="h-96 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Developer Performance Dashboard
            </h1>
            <p className="text-muted-foreground">
              Advanced React performance monitoring and optimization insights for development teams
            </p>
          </div>

          {/* Control Panel */}
          <PerformanceControlPanel
            onRenderModeChange={handleRenderModeChange}
            onScrollingChange={handleScrollingChange}
            onRenderingChange={handleRenderingChange}
            onStressTestChange={handleStressTestChange}
          />

          {/* Metrics Grid */}
          <DeveloperMetricsGrid />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            {/* Visualization Area */}
            <div className="lg:col-span-3">
              <PerformanceVisualization />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <CodeInsightsSidebar />
            </div>
          </div>

          {/* Performance Table */}
          <ComponentPerformanceTable />
        </div>
      </div>
    </div>
  );
};

export default DeveloperPerformanceInteractive;
