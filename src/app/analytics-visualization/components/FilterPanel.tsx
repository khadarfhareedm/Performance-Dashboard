'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface DateRange {
  start: string;
  end: string;
}

interface FilterOptions {
  dateRange: DateRange;
  dataSource: string;
  category: string;
  visualizationType: string;
}

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

const FilterPanel = ({ filters, onFiltersChange }: FilterPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    handleFilterChange('dateRange', {
      ...filters.dateRange,
      [field]: value
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      dateRange: { start: '2024-01-01', end: '2024-12-31' },
      dataSource: 'all',
      category: 'all',
      visualizationType: 'bar'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="FunnelIcon" size={20} />
          Advanced Filters
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={resetFilters}
            className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            Reset
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors duration-150 md:hidden"
          >
            <Icon 
              name="ChevronDownIcon" 
              size={16} 
              className={`transition-transform duration-150 ${isExpanded ? 'rotate-180' : ''}`} 
            />
          </button>
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${isExpanded ? 'block' : 'hidden md:grid'}`}>
        {/* Date Range */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Date Range
          </label>
          <div className="space-y-2">
            <input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) => handleDateRangeChange('start', e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              type="date"
              value={filters.dateRange.end}
              onChange={(e) => handleDateRangeChange('end', e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Data Source */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Data Source
          </label>
          <select
            value={filters.dataSource}
            onChange={(e) => handleFilterChange('dataSource', e.target.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Sources</option>
            <option value="api">API Metrics</option>
            <option value="database">Database</option>
            <option value="frontend">Frontend</option>
            <option value="mobile">Mobile App</option>
          </select>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Categories</option>
            <option value="performance">Performance</option>
            <option value="user-behavior">User Behavior</option>
            <option value="revenue">Revenue</option>
            <option value="engagement">Engagement</option>
          </select>
        </div>

        {/* Visualization Type */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Visualization Type
          </label>
          <select
            value={filters.visualizationType}
            onChange={(e) => handleFilterChange('visualizationType', e.target.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="bar">Bar Chart</option>
            <option value="scatter">Scatter Plot</option>
            <option value="heatmap">Heatmap</option>
            <option value="line">Line Chart</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
