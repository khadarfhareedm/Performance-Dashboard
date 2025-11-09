'use client';

import React, { useState, useMemo } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ComponentMetric {
  id: string;
  name: string;
  renderTime: number;
  memoryUsage: number;
  reRenderCount: number;
  hookCount: number;
  childrenCount: number;
  lastUpdate: string;
  status: 'optimal' | 'warning' | 'critical';
}

type SortField = 'renderTime' | 'memoryUsage' | 'reRenderCount' | 'name';
type SortDirection = 'asc' | 'desc';

const ComponentPerformanceTable = () => {
  const [sortField, setSortField] = useState<SortField>('renderTime');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filterStatus, setFilterStatus] = useState<'all' | 'optimal' | 'warning' | 'critical'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const componentMetrics: ComponentMetric[] = [
    {
      id: '1',
      name: 'DataTable',
      renderTime: 24.3,
      memoryUsage: 8.7,
      reRenderCount: 45,
      hookCount: 12,
      childrenCount: 156,
      lastUpdate: '15:22:01',
      status: 'warning'
    },
    {
      id: '2',
      name: 'ChartContainer',
      renderTime: 28.7,
      memoryUsage: 12.4,
      reRenderCount: 23,
      hookCount: 8,
      childrenCount: 4,
      lastUpdate: '15:22:00',
      status: 'critical'
    },
    {
      id: '3',
      name: 'MetricCard',
      renderTime: 18.9,
      memoryUsage: 3.2,
      reRenderCount: 67,
      hookCount: 5,
      childrenCount: 2,
      lastUpdate: '15:21:59',
      status: 'warning'
    },
    {
      id: '4',
      name: 'Dashboard',
      renderTime: 32.1,
      memoryUsage: 15.6,
      reRenderCount: 12,
      hookCount: 15,
      childrenCount: 8,
      lastUpdate: '15:21:58',
      status: 'optimal'
    },
    {
      id: '5',
      name: 'IconButton',
      renderTime: 12.4,
      memoryUsage: 1.8,
      reRenderCount: 89,
      hookCount: 3,
      childrenCount: 1,
      lastUpdate: '15:21:57',
      status: 'optimal'
    },
    {
      id: '6',
      name: 'Tooltip',
      renderTime: 8.7,
      memoryUsage: 2.1,
      reRenderCount: 156,
      hookCount: 4,
      childrenCount: 0,
      lastUpdate: '15:21:56',
      status: 'warning'
    },
    {
      id: '7',
      name: 'Badge',
      renderTime: 6.2,
      memoryUsage: 0.9,
      reRenderCount: 34,
      hookCount: 1,
      childrenCount: 0,
      lastUpdate: '15:21:55',
      status: 'optimal'
    },
    {
      id: '8',
      name: 'LoadingSpinner',
      renderTime: 14.5,
      memoryUsage: 2.7,
      reRenderCount: 203,
      hookCount: 2,
      childrenCount: 0,
      lastUpdate: '15:21:54',
      status: 'critical'
    }
  ];

  const filteredAndSortedData = useMemo(() => {
    let filtered = componentMetrics;

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(item => item.status === filterStatus);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [sortField, sortDirection, filterStatus, searchTerm]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'text-success bg-success/10 border-success/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'critical':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <th 
      className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors duration-150"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortField === field && (
          <Icon 
            name={sortDirection === 'asc' ? 'ChevronUpIcon' : 'ChevronDownIcon'} 
            size={12} 
          />
        )}
      </div>
    </th>
  );

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Icon name="TableCellsIcon" size={20} className="text-primary" />
            Component Performance Metrics
          </h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="ArrowPathIcon" size={16} className="animate-spin" />
            <span>Live Updates</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Icon 
                name="MagnifyingGlassIcon" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Search components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Status</option>
            <option value="optimal">Optimal</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <SortableHeader field="name">Component</SortableHeader>
              <SortableHeader field="renderTime">Render Time</SortableHeader>
              <SortableHeader field="memoryUsage">Memory</SortableHeader>
              <SortableHeader field="reRenderCount">Re-renders</SortableHeader>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Hooks
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Children
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Last Update
              </th>
            </tr>
          </thead>
          <tbody className="bg-background divide-y divide-border">
            {filteredAndSortedData.map((component) => (
              <tr key={component.id} className="hover:bg-muted/30 transition-colors duration-150">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Icon name="CodeBracketIcon" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">{component.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-sm text-foreground">{component.renderTime}ms</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-sm text-foreground">{component.memoryUsage}MB</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-sm text-foreground">{component.reRenderCount}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-sm text-muted-foreground">{component.hookCount}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-sm text-muted-foreground">{component.childrenCount}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(component.status)}`}>
                    {component.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-sm text-muted-foreground">{component.lastUpdate}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedData.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="ExclamationCircleIcon" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No components match your current filters.</p>
        </div>
      )}
    </div>
  );
};

export default ComponentPerformanceTable;
