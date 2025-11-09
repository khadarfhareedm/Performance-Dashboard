'use client';

import React, { useState, useMemo } from 'react';
import Icon from '@/components/ui/AppIcon';

interface TableRow {
  id: string;
  timestamp: string;
  source: string;
  category: string;
  value: number;
  status: string;
  correlation: number;
}

interface DataTableProps {
  data: TableRow[];
  onRowClick?: (row: TableRow) => void;
}

const DataTable = ({ data, onRowClick }: DataTableProps) => {
  const [sortField, setSortField] = useState<keyof TableRow>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  const filteredAndSortedData = useMemo(() => {
    let filtered = data;

    // Apply search filter
    if (searchTerm) {
      filtered = data.filter(row =>
        Object.values(row).some(value =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      const aStr = aValue.toString();
      const bStr = bValue.toString();
      return sortDirection === 'asc' 
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });

    return filtered;
  }, [data, searchTerm, sortField, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  const handleSort = (field: keyof TableRow) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: keyof TableRow) => {
    if (sortField !== field) return 'ChevronUpDownIcon';
    return sortDirection === 'asc' ? 'ChevronUpIcon' : 'ChevronDownIcon';
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-success bg-success/10';
      case 'warning':
        return 'text-warning bg-warning/10';
      case 'error':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Table Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Icon name="TableCellsIcon" size={20} />
            Data Records
          </h2>
          <div className="text-sm text-muted-foreground">
            {filteredAndSortedData.length.toLocaleString()} records
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Icon 
            name="MagnifyingGlassIcon" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              {[
                { key: 'timestamp', label: 'Timestamp' },
                { key: 'source', label: 'Source' },
                { key: 'category', label: 'Category' },
                { key: 'value', label: 'Value' },
                { key: 'status', label: 'Status' },
                { key: 'correlation', label: 'Correlation' }
              ].map(({ key, label }) => (
                <th
                  key={key}
                  className="px-4 py-3 text-left text-sm font-medium text-foreground cursor-pointer hover:bg-muted/80 transition-colors duration-150"
                  onClick={() => handleSort(key as keyof TableRow)}
                >
                  <div className="flex items-center gap-2">
                    {label}
                    <Icon name={getSortIcon(key as keyof TableRow) as any} size={14} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr
                key={row.id}
                className={`border-b border-border hover:bg-muted/50 cursor-pointer transition-colors duration-150 ${
                  index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                }`}
                onClick={() => onRowClick && onRowClick(row)}
              >
                <td className="px-4 py-3 text-sm text-foreground font-mono">
                  {new Date(row.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  {row.source}
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  {row.category}
                </td>
                <td className="px-4 py-3 text-sm text-foreground font-medium">
                  {row.value.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(row.status)}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-foreground font-mono">
                  {row.correlation > 0 ? '+' : ''}{row.correlation.toFixed(3)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} records
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              <Icon name="ChevronLeftIcon" size={16} />
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-150 ${
                      currentPage === page
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              <Icon name="ChevronRightIcon" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
