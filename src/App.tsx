import './App.css'
import {
  PieChartComponent,
  LineChartComponent,
  BarChartComponent,
  RadarChartComponent,
  BubbleChartComponent,
  PolarAreaChartComponent,
  ScatterChartComponent,
  ChartMetadata,
  CommonDataset,
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

  return (
    <div className='chart-list'>
      <h1>Viz Platform</h1>
      <div className="chart-container">
        <div className="chart-demo">
          <h2>Pie Chart</h2>
          <PieChartComponent
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
          <LineChartComponent
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
          <BarChartComponent
            metadata={chartMetadata}
            data={yearsDataset}
            config={{
              title: 'Annual Performance',
              xAxisLabel: 'Year',
              yAxisLabel: 'Value',
              borderRadius: 4,
              horizontal: false,
              stacked: false
            }}
          />
        </div>

        <div className="chart-demo">
          <h2>Radar Chart</h2>
          <RadarChartComponent
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
          <BubbleChartComponent
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
          <PolarAreaChartComponent
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
          <ScatterChartComponent
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
      </div>
    </div>
  )
}

export default App
