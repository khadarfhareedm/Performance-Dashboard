import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import AnalyticsInteractive from './components/AnalyticsInteractive';

export const metadata: Metadata = {
  title: 'Analytics Visualization - Performance Analytics Dashboard',
  description: 'Explore large datasets through interactive visualizations, advanced filtering, and business intelligence tools for comprehensive data analysis.',
};

export default function AnalyticsVisualizationPage() {
  return (
    <>
      <Header />
      <AnalyticsInteractive />
    </>
  );
}
