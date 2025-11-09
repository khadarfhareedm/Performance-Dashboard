'use client';

import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell } from 'recharts';
import Icon from '@/components/ui/AppIcon';

interface DataPoint {
  id: string;
  name: string;
  value: number;
  category: string;
  x?: number;
  y?: number;
  correlation?: number;
}

interface VisualizationEngineProps {
  data: DataPoint[];
  visualizationType: string;
  onDataPointClick?: (dataPoint: DataPoint) => void;
}

const VisualizationEngine = ({ data, visualizationType, onDataPointClick }: VisualizationEngineProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const filteredData = useMemo(() => {
    if (!selectedCategory) return data;
    return data.filter(item => item.category === selectedCategory);
  }, [data, selectedCategory]);

  const categories = useMemo(() => {
    return Array.from(new Set(data.map(item => item.category)));
  }, [data]);

  const colors = ['#2563EB', '#059669', '#D97706', '#DC2626', '#7C3AED'];

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
        <XAxis 
          dataKey="name" 
          stroke="#64748B"
          fontSize={12}
          tick={{ fill: '#64748B' }}
        />
        <YAxis 
          stroke="#64748B"
          fontSize={12}
          tick={{ fill: '#64748B' }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Bar 
          dataKey="value" 
          fill="#2563EB"
          radius={[4, 4, 0, 0]}
          onClick={onDataPointClick}
          cursor="pointer"
        >
          {filteredData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={colors[categories.indexOf(entry.category) % colors.length]} 
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  const renderScatterPlot = () => (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
        <XAxis 
          type="number"
          dataKey="x"
          stroke="#64748B"
          fontSize={12}
          tick={{ fill: '#64748B' }}
        />
        <YAxis 
          type="number"
          dataKey="y"
          stroke="#64748B"
          fontSize={12}
          tick={{ fill: '#64748B' }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          formatter={(value, name) => [value, name === 'x' ? 'X Value' : 'Y Value']}
        />
        <Scatter 
          dataKey="y" 
          fill="#2563EB"
          onClick={onDataPointClick}
        >
          {filteredData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={colors[categories.indexOf(entry.category) % colors.length]} 
            />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );

  const renderHeatmap = () => {
    const heatmapData = useMemo(() => {
      const grid = [];
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const dataPoint = filteredData[Math.floor(Math.random() * filteredData.length)];
          grid.push({
            x: j,
            y: i,
            value: dataPoint ? dataPoint.value : Math.random() * 100,
            intensity: Math.random()
          });
        }
      }
      return grid;
    }, [filteredData]);

    return (
      <div className="grid grid-cols-10 gap-1 h-full">
        {heatmapData.map((cell, index) => (
          <div
            key={index}
            className="aspect-square rounded-sm cursor-pointer transition-all duration-150 hover:scale-110"
            style={{
              backgroundColor: `rgba(37, 99, 235, ${cell.intensity})`,
            }}
            title={`Value: ${cell.value.toFixed(2)}`}
            onClick={() => onDataPointClick && onDataPointClick({
              id: `heatmap-${index}`,
              name: `Cell (${cell.x}, ${cell.y})`,
              value: cell.value,
              category: 'heatmap'
            })}
          />
        ))}
      </div>
    );
  };

  const renderVisualization = () => {
    switch (visualizationType) {
      case 'scatter':
        return renderScatterPlot();
      case 'heatmap':
        return renderHeatmap();
      default:
        return renderBarChart();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="ChartBarIcon" size={20} />
          Interactive Visualization
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 2))}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-150"
            title="Zoom In"
          >
            <Icon name="MagnifyingGlassPlusIcon" size={16} />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.5))}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-150"
            title="Zoom Out"
          >
            <Icon name="MagnifyingGlassMinusIcon" size={16} />
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-150 ${
            !selectedCategory 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground hover:text-foreground'
          }`}
        >
          All Categories
        </button>
        {categories.map((category, index) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-150 ${
              selectedCategory === category 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
            style={{
              backgroundColor: selectedCategory === category ? colors[index % colors.length] : undefined
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Visualization Container */}
      <div 
        className="h-96 w-full"
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }}
      >
        {renderVisualization()}
      </div>

      {/* Data Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Total Points:</span>
            <span className="ml-2 font-medium text-foreground">{filteredData.length}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Avg Value:</span>
            <span className="ml-2 font-medium text-foreground">
              {(filteredData.reduce((sum, item) => sum + item.value, 0) / filteredData.length).toFixed(2)}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Max Value:</span>
            <span className="ml-2 font-medium text-foreground">
              {Math.max(...filteredData.map(item => item.value)).toFixed(2)}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Zoom Level:</span>
            <span className="ml-2 font-medium text-foreground">{(zoomLevel * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualizationEngine;
