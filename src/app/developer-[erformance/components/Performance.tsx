'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PerformanceControlPanelProps {
  onRenderModeChange: (mode: 'concurrent' | 'legacy') => void;
  onScrollingChange: (enabled: boolean) => void;
  onRenderingChange: (type: 'canvas' | 'svg') => void;
  onStressTestChange: (rate: number) => void;
}

const PerformanceControlPanel = ({
  onRenderModeChange,
  onScrollingChange,
  onRenderingChange,
  onStressTestChange
}: PerformanceControlPanelProps) => {
  const [renderMode, setRenderMode] = useState<'concurrent' | 'legacy'>('concurrent');
  const [virtualScrolling, setVirtualScrolling] = useState(true);
  const [renderingType, setRenderingType] = useState<'canvas' | 'svg'>('canvas');
  const [stressTestRate, setStressTestRate] = useState(1000);

  const handleRenderModeToggle = () => {
    const newMode = renderMode === 'concurrent' ? 'legacy' : 'concurrent';
    setRenderMode(newMode);
    onRenderModeChange(newMode);
  };

  const handleScrollingToggle = () => {
    const newScrolling = !virtualScrolling;
    setVirtualScrolling(newScrolling);
    onScrollingChange(newScrolling);
  };

  const handleRenderingToggle = () => {
    const newType = renderingType === 'canvas' ? 'svg' : 'canvas';
    setRenderingType(newType);
    onRenderingChange(newType);
  };

  const handleStressRateChange = (rate: number) => {
    setStressTestRate(rate);
    onStressTestChange(rate);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="Cog6ToothIcon" size={20} className="text-primary" />
          Performance Controls
        </h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="ClockIcon" size={16} />
          <span>Real-time Monitoring</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Concurrent Rendering Toggle */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            React Rendering Mode
          </label>
          <button
            onClick={handleRenderModeToggle}
            className={`
              w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200
              ${renderMode === 'concurrent' ?'bg-primary/10 border-primary text-primary' :'bg-muted border-border text-muted-foreground hover:bg-muted/80'
              }
            `}
          >
            <span className="font-medium">
              {renderMode === 'concurrent' ? 'Concurrent' : 'Legacy'}
            </span>
            <Icon 
              name={renderMode === 'concurrent' ? 'BoltIcon' : 'ClockIcon'} 
              size={16} 
            />
          </button>
          <p className="text-xs text-muted-foreground">
            {renderMode === 'concurrent' ?'Non-blocking updates enabled' :'Synchronous rendering active'
            }
          </p>
        </div>

        {/* Virtual Scrolling Toggle */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            Virtual Scrolling
          </label>
          <button
            onClick={handleScrollingToggle}
            className={`
              w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200
              ${virtualScrolling 
                ? 'bg-success/10 border-success text-success' :'bg-muted border-border text-muted-foreground hover:bg-muted/80'
              }
            `}
          >
            <span className="font-medium">
              {virtualScrolling ? 'Enabled' : 'Disabled'}
            </span>
            <Icon 
              name={virtualScrolling ? 'CheckCircleIcon' : 'XCircleIcon'} 
              size={16} 
            />
          </button>
          <p className="text-xs text-muted-foreground">
            {virtualScrolling 
              ? 'Optimized for large datasets' 
              : 'Standard DOM rendering'
            }
          </p>
        </div>

        {/* Canvas vs SVG Toggle */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            Rendering Engine
          </label>
          <button
            onClick={handleRenderingToggle}
            className={`
              w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200
              ${renderingType === 'canvas' ?'bg-accent/10 border-accent text-accent' :'bg-warning/10 border-warning text-warning'
              }
            `}
          >
            <span className="font-medium">
              {renderingType === 'canvas' ? 'Canvas' : 'SVG'}
            </span>
            <Icon 
              name={renderingType === 'canvas' ? 'RectangleStackIcon' : 'PaintBrushIcon'} 
              size={16} 
            />
          </button>
          <p className="text-xs text-muted-foreground">
            {renderingType === 'canvas' ?'High-performance rendering' :'Vector-based graphics'
            }
          </p>
        </div>

        {/* Stress Test Controls */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            Stress Test Rate
          </label>
          <div className="space-y-2">
            <select
              value={stressTestRate}
              onChange={(e) => handleStressRateChange(Number(e.target.value))}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value={100}>100 ops/sec</option>
              <option value={500}>500 ops/sec</option>
              <option value={1000}>1K ops/sec</option>
              <option value={5000}>5K ops/sec</option>
              <option value={10000}>10K ops/sec</option>
            </select>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon name="ExclamationTriangleIcon" size={12} />
              <span>Higher rates may impact performance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceControlPanel;
