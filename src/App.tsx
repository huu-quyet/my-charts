import './App.css'
import {
  ChartMetadata,
  CommonDataset,
  DynamicChart,
  ChartType,
} from '@plugins/chartjs'

function App() {
  // Sample metadata
  const chartMetadata: ChartMetadata = {
    title: "Chart Demo",
    description: "A demonstration of chart.js components"
  }

  // Create a common dataset for all charts
  const commonDataset: CommonDataset = {
    items: [
      { label: "Red", value: 12, category: "Group 1" },
      { label: "Blue", value: 19, category: "Group 1" },
      { label: "Yellow", value: 3, category: "Group 1" },
      { label: "Green", value: 5, category: "Group 2" },
      { label: "Purple", value: 2, category: "Group 2" },
      { label: "Orange", value: 3, category: "Group 2" },
      { label: "Red", value: 8, category: "Group 3" },
      { label: "Blue", value: 12, category: "Group 3" },
      { label: "Yellow", value: 8, category: "Group 3" },
    ]
  }

  // Time series dataset for line chart
  const timeSeriesDataset: CommonDataset = {
    items: [
      { label: "January", value: 65, category: "Dataset 1", date: "2023-01-01" },
      { label: "February", value: 59, category: "Dataset 1", date: "2023-02-01" },
      { label: "March", value: 80, category: "Dataset 1", date: "2023-03-01" },
      { label: "April", value: 81, category: "Dataset 1", date: "2023-04-01" },
      { label: "May", value: 56, category: "Dataset 1", date: "2023-05-01" },
      { label: "June", value: 55, category: "Dataset 1", date: "2023-06-01" },
      { label: "July", value: 40, category: "Dataset 1", date: "2023-07-01" },
      { label: "January", value: 28, category: "Dataset 2", date: "2023-01-01" },
      { label: "February", value: 48, category: "Dataset 2", date: "2023-02-01" },
      { label: "March", value: 40, category: "Dataset 2", date: "2023-03-01" },
      { label: "April", value: 19, category: "Dataset 2", date: "2023-04-01" },
      { label: "May", value: 86, category: "Dataset 2", date: "2023-05-01" },
      { label: "June", value: 27, category: "Dataset 2", date: "2023-06-01" },
      { label: "July", value: 90, category: "Dataset 2", date: "2023-07-01" },
    ]
  }

  // Years dataset for bar chart
  const yearsDataset: CommonDataset = {
    items: [
      { label: "2019", value: 42, category: "Sales" },
      { label: "2020", value: 31, category: "Sales" },
      { label: "2021", value: 50, category: "Sales" },
      { label: "2022", value: 63, category: "Sales" },
      { label: "2023", value: 58, category: "Sales" },
      { label: "2019", value: 35, category: "Expenses" },
      { label: "2020", value: 37, category: "Expenses" },
      { label: "2021", value: 42, category: "Expenses" },
      { label: "2022", value: 53, category: "Expenses" },
      { label: "2023", value: 47, category: "Expenses" },
    ]
  }

  // Radar dataset
  const radarDataset: CommonDataset = {
    items: [
      { label: "Eating", value: 65, category: "Person A" },
      { label: "Drinking", value: 59, category: "Person A" },
      { label: "Sleeping", value: 90, category: "Person A" },
      { label: "Designing", value: 81, category: "Person A" },
      { label: "Coding", value: 56, category: "Person A" },
      { label: "Cycling", value: 55, category: "Person A" },
      { label: "Running", value: 40, category: "Person A" },
      { label: "Eating", value: 28, category: "Person B" },
      { label: "Drinking", value: 48, category: "Person B" },
      { label: "Sleeping", value: 40, category: "Person B" },
      { label: "Designing", value: 19, category: "Person B" },
      { label: "Coding", value: 96, category: "Person B" },
      { label: "Cycling", value: 27, category: "Person B" },
      { label: "Running", value: 100, category: "Person B" },
    ]
  }

  // Bubble chart dataset
  const bubbleDataset: CommonDataset = {
    items: [
      { label: "10", value: 20, category: "Dataset 1", extraData: { r: 10 } },
      { label: "20", value: 35, category: "Dataset 1", extraData: { r: 15 } },
      { label: "30", value: 15, category: "Dataset 1", extraData: { r: 8 } },
      { label: "40", value: 40, category: "Dataset 1", extraData: { r: 20 } },
      { label: "15", value: 30, category: "Dataset 2", extraData: { r: 18 } },
      { label: "25", value: 25, category: "Dataset 2", extraData: { r: 12 } },
      { label: "35", value: 10, category: "Dataset 2", extraData: { r: 5 } },
      { label: "45", value: 50, category: "Dataset 2", extraData: { r: 25 } },
    ]
  }

  // Scatter chart dataset
  const scatterDataset: CommonDataset = {
    items: [
      { label: "5", value: 10, category: "Group A" },
      { label: "10", value: 20, category: "Group A" },
      { label: "15", value: 15, category: "Group A" },
      { label: "20", value: 25, category: "Group A" },
      { label: "25", value: 30, category: "Group A" },
      { label: "7", value: 25, category: "Group B" },
      { label: "12", value: 10, category: "Group B" },
      { label: "17", value: 20, category: "Group B" },
      { label: "22", value: 15, category: "Group B" },
      { label: "27", value: 5, category: "Group B" },
    ]
  }

  // Stack chart dataset
  const stackDataset: CommonDataset = {
    items: [
      { label: "Q1", value: 300, category: "Product A" },
      { label: "Q2", value: 400, category: "Product A" },
      { label: "Q3", value: 350, category: "Product A" },
      { label: "Q4", value: 500, category: "Product A" },
      { label: "Q1", value: 250, category: "Product B" },
      { label: "Q2", value: 350, category: "Product B" },
      { label: "Q3", value: 450, category: "Product B" },
      { label: "Q4", value: 400, category: "Product B" },
      { label: "Q1", value: 150, category: "Product C" },
      { label: "Q2", value: 200, category: "Product C" },
      { label: "Q3", value: 250, category: "Product C" },
      { label: "Q4", value: 300, category: "Product C" }
    ]
  }

  // Heatmap dataset
  const heatmapDataset: CommonDataset = {
    items: [
      { label: "Item A", value: 10, category: "Category 1" },
      { label: "Item B", value: 20, category: "Category 1" },
      { label: "Item C", value: 30, category: "Category 1" },
      { label: "Item D", value: 40, category: "Category 1" },
      { label: "Item A", value: 50, category: "Category 2" },
      { label: "Item B", value: 60, category: "Category 2" },
      { label: "Item C", value: 70, category: "Category 2" },
      { label: "Item D", value: 80, category: "Category 2" },
      { label: "Item A", value: 90, category: "Category 3" },
      { label: "Item B", value: 100, category: "Category 3" },
      { label: "Item C", value: 45, category: "Category 3" },
      { label: "Item D", value: 25, category: "Category 3" },
      { label: "Item A", value: 65, category: "Category 4" },
      { label: "Item B", value: 85, category: "Category 4" },
      { label: "Item C", value: 15, category: "Category 4" },
      { label: "Item D", value: 55, category: "Category 4" }
    ]
  }

  // Add floating chart dataset
  const floatingDataset: CommonDataset = {
    items: [
      { label: "A", value: 20, category: "Series 1", extraData: { min: 10, max: 30 } },
      { label: "B", value: 35, category: "Series 1", extraData: { min: 25, max: 45 } },
      { label: "C", value: 25, category: "Series 1", extraData: { min: 15, max: 35 } },
      { label: "A", value: 15, category: "Series 2", extraData: { min: 5, max: 25 } },
      { label: "B", value: 40, category: "Series 2", extraData: { min: 30, max: 50 } },
      { label: "C", value: 30, category: "Series 2", extraData: { min: 20, max: 40 } }
    ]
  }

  return (
    <div className='chart-list'>
      <h1>Viz Platform</h1>
      <div className="chart-container">
        <div className="chart-demo">
          <h2>Pie Chart</h2>
          <DynamicChart
            chartType={ChartType.PIE}
            metadata={chartMetadata}
            data={commonDataset}
            config={{
              title: 'Sample Distribution',
              showLegend: true,
              cutout: '30%'
            }}
          />
        </div>

        <div className="chart-demo">
          <h2>Line Chart</h2>
          <DynamicChart
            chartType={ChartType.LINE}
            metadata={chartMetadata}
            data={timeSeriesDataset}
            config={{
              title: 'Monthly Performance',
              xAxisLabel: 'Month',
              yAxisLabel: 'Value',
              tension: 0.3,
              showPoints: true
            }}
          />
        </div>

        <div className="chart-demo">
          <h2>Bar Chart</h2>
          <DynamicChart
            chartType={ChartType.BAR}
            metadata={chartMetadata}
            data={yearsDataset}
            config={{
              title: 'Annual Performance',
              xAxisLabel: 'Year',
              yAxisLabel: 'Value',
              borderRadius: 4,
            }}
          />
        </div>

        <div className="chart-demo">
          <h2>Horizontal Bar Chart</h2>
          <DynamicChart
            chartType={ChartType.HORIZONTAL_BAR}
            metadata={chartMetadata}
            data={yearsDataset}
            config={{
              title: 'Annual Performance',
              xAxisLabel: 'Year',
              yAxisLabel: 'Value',
              borderRadius: 4,
            }}
          />
        </div>

        <div className="chart-demo">
          <h2>Radar Chart</h2>
          <DynamicChart
            chartType={ChartType.RADAR}
            metadata={chartMetadata}
            data={radarDataset}
            config={{
              title: 'Activity Comparison',
              showLegend: true
            }}
          />
        </div>

        <div className="chart-demo">
          <h2>Bubble Chart</h2>
          <DynamicChart
            chartType={ChartType.BUBBLE}
            metadata={chartMetadata}
            data={bubbleDataset}
            config={{
              title: 'Size Comparison',
              xAxisLabel: 'X Position',
              yAxisLabel: 'Y Position',
              sizeLabel: 'Bubble Size',
              showLegend: true
            }}
          />
        </div>

        <div className="chart-demo">
          <h2>Polar Area Chart</h2>
          <DynamicChart
            chartType={ChartType.POLAR_AREA}
            metadata={chartMetadata}
            data={commonDataset}
            config={{
              title: 'Value Distribution',
              showLegend: true,
              animateRotate: true,
              animateScale: true
            }}
          />
        </div>

        <div className="chart-demo">
          <h2>Scatter Plot</h2>
          <DynamicChart
            chartType={ChartType.SCATTER}
            metadata={chartMetadata}
            data={scatterDataset}
            config={{
              title: 'Point Distribution',
              xAxisLabel: 'X Axis',
              yAxisLabel: 'Y Axis',
              pointRadius: 6,
              showLegend: true
            }}
          />
        </div>

        {/* New chart demos below */}
        <div className="chart-demo">
          <h2>Doughnut Chart</h2>
          <DynamicChart
            chartType={ChartType.DOUGHNUT}
            metadata={chartMetadata}
            data={commonDataset}
            config={{
              title: 'Distribution with Center',
              showLegend: true,
              cutout: '60%',
            }}
          />
        </div>

        <div className="chart-demo">
          <h2>Stack Chart</h2>
          <DynamicChart
            chartType={ChartType.STACK}
            metadata={chartMetadata}
            data={stackDataset}
            config={{
              title: 'Quarterly Product Performance',
              xAxisLabel: 'Quarter',
              yAxisLabel: 'Sales ($)',
              borderRadius: 4,
              showLegend: true
            }}
          />
        </div>

        <div className="chart-demo">
          <h2>Stack Chart (Percentage)</h2>
          <DynamicChart
            chartType={ChartType.STACK}
            metadata={chartMetadata}
            data={stackDataset}
            config={{
              title: 'Quarterly Product Percentage',
              xAxisLabel: 'Quarter',
              yAxisLabel: 'Percentage',
              showLegend: true,
              percentage: true
            }}
          />
        </div>

        {/* Add Heatmap Chart Demo */}
        <div className="chart-demo">
          <h2>Heatmap Chart</h2>
          <DynamicChart
            chartType={ChartType.HEATMAP}
            metadata={chartMetadata}
            data={heatmapDataset}
            config={{
              title: 'Value Distribution Matrix',
              xAxisLabel: 'Categories',
              yAxisLabel: 'Items',
              showValues: true,
              showColorLegend: true,
              valueFormat: '.0f',
              cellPadding: 4,
              cellRadius: 2,
              animationDuration: 800,
              colorInterpolation: 'hsl'
            }}
          />
        </div>

        {/* Add floating chart demo */}
        <div className="chart-demo">
          <h2>Floating Bar Chart</h2>
          <DynamicChart
            chartType={ChartType.FLOATING}
            metadata={chartMetadata}
            data={floatingDataset}
            config={{
              title: 'Value Ranges',
              xAxisLabel: 'Categories',
              yAxisLabel: 'Values',
              showLegend: true,
              borderRadius: 4
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
