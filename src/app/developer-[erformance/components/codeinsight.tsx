'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface OptimizationRecommendation {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'performance' | 'memory' | 'bundle' | 'rendering';
  code?: string;
}

interface ErrorLog {
  id: string;
  timestamp: string;
  level: 'error' | 'warning' | 'info';
  message: string;
  component: string;
  stackTrace?: string;
}

const CodeInsightsSidebar = () => {
  const [activeTab, setActiveTab] = useState<'insights' | 'recommendations' | 'errors'>('insights');
  const [expandedError, setExpandedError] = useState<string | null>(null);

  const recommendations: OptimizationRecommendation[] = [
    {
      id: '1',
      title: 'Memoize Expensive Calculations',
      description: 'Use useMemo for heavy computations in DataTable component',
      impact: 'high',
      category: 'performance',
      code: 'const memoizedData = useMemo(() => processLargeDataset(data), [data]);'
    },
    {
      id: '2',
      title: 'Implement Virtual Scrolling',
      description: 'Large lists causing performance bottlenecks',
      impact: 'high',
      category: 'rendering'
    },
    {
      id: '3',
      title: 'Code Splitting Opportunity',
      description: 'Chart components can be lazy loaded',
      impact: 'medium',
      category: 'bundle',
      code: 'const Chart = lazy(() => import("./Chart"));'
    },
    {
      id: '4',
      title: 'Memory Leak Prevention',
      description: 'Add cleanup for event listeners in useEffect',
      impact: 'medium',
      category: 'memory',
      code: 'useEffect(() => { /* setup */ return () => cleanup(); }, []);'
    }
  ];

  const errorLogs: ErrorLog[] = [
    {
      id: '1',
      timestamp: '15:22:01',
      level: 'error',
      message: 'Cannot read property "map" of undefined',
      component: 'DataTable',
      stackTrace: 'at DataTable.render (DataTable.tsx:45)\nat performWork (react-dom.js:123)'
    },
    {
      id: '2',
      timestamp: '15:21:45',
      level: 'warning',
      message: 'Component re-rendered 15 times in 1 second',
      component: 'MetricCard'
    },
    {
      id: '3',
      timestamp: '15:21:30',
      level: 'info',
      message: 'Performance mark: chart-render-start',
      component: 'ChartContainer'
    },
    {
      id: '4',
      timestamp: '15:21:15',
      level: 'warning',
      message: 'Memory usage exceeded 50MB threshold',
      component: 'App'
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'text-error bg-error/10';
      case 'warning':
        return 'text-warning bg-warning/10';
      case 'info':
        return 'text-accent bg-accent/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const renderInsights = () => (
    <div className="space-y-4">
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="LightBulbIcon" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">Performance Insight</span>
        </div>
        <p className="text-sm text-foreground">
          Your app is performing well with 60fps maintained. Consider implementing React.memo for frequently updating components.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Key Metrics</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
            <span className="text-sm text-muted-foreground">Bundle Size</span>
            <span className="text-sm font-medium text-foreground">2.4 MB</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
            <span className="text-sm text-muted-foreground">Components</span>
            <span className="text-sm font-medium text-foreground">127 active</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-muted/50 rounded">
            <span className="text-sm text-muted-foreground">Hooks</span>
            <span className="text-sm font-medium text-foreground">89 instances</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-3">
      {recommendations.map((rec) => (
        <div key={rec.id} className="p-3 border border-border rounded-lg">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-sm font-medium text-foreground">{rec.title}</h4>
            <span className={`px-2 py-1 text-xs font-medium rounded border ${getImpactColor(rec.impact)}`}>
              {rec.impact}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-2">{rec.description}</p>
          {rec.code && (
            <div className="p-2 bg-muted rounded text-xs font-mono text-foreground overflow-x-auto">
              {rec.code}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderErrors = () => (
    <div className="space-y-2">
      {errorLogs.map((error) => (
        <div key={error.id} className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setExpandedError(expandedError === error.id ? null : error.id)}
            className="w-full p-3 text-left hover:bg-muted/50 transition-colors duration-150"
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`px-2 py-1 text-xs font-medium rounded ${getLevelColor(error.level)}`}>
                {error.level.toUpperCase()}
              </span>
              <span className="text-xs text-muted-foreground">{error.timestamp}</span>
            </div>
            <p className="text-sm text-foreground mb-1">{error.message}</p>
            <p className="text-xs text-muted-foreground">{error.component}</p>
          </button>
          
          {expandedError === error.id && error.stackTrace && (
            <div className="p-3 bg-muted border-t border-border">
              <h5 className="text-xs font-medium text-foreground mb-2">Stack Trace:</h5>
              <pre className="text-xs text-muted-foreground font-mono overflow-x-auto">
                {error.stackTrace}
              </pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center gap-1 mb-4 bg-muted rounded-lg p-1">
        <button
          onClick={() => setActiveTab('insights')}
          className={`flex-1 px-2 py-2 text-xs font-medium rounded-md transition-all duration-150 ${
            activeTab === 'insights' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          Insights
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`flex-1 px-2 py-2 text-xs font-medium rounded-md transition-all duration-150 ${
            activeTab === 'recommendations' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          Tips
        </button>
        <button
          onClick={() => setActiveTab('errors')}
          className={`flex-1 px-2 py-2 text-xs font-medium rounded-md transition-all duration-150 ${
            activeTab === 'errors' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          Logs
        </button>
      </div>

      <div className="min-h-[400px]">
        {activeTab === 'insights' && renderInsights()}
        {activeTab === 'recommendations' && renderRecommendations()}
        {activeTab === 'errors' && renderErrors()}
      </div>
    </div>
  );
};

export default CodeInsightsSidebar;
