import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from 'chart.js';
import { DoughnutChartProps } from './types';
import { prepareDoughnutChartData, prepareDoughnutChartOptions } from './controls';
import { isDarkMode as checkDarkMode } from '../utils';
import '../assets/css/doughnut-chart.css';
// Register Chart.js components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Title
);

export const DoughnutChartComponent: React.FC<DoughnutChartProps> = ({
    metadata,
    data,
    config = {},
}) => {
    // Determine theme based on system preference
    const isDarkMode = checkDarkMode();

    // Track active labels state
    const [activeLabels, setActiveLabels] = React.useState<string[]>([]);
    const [initialized, setInitialized] = React.useState(false);
    const [isOverflowing, setIsOverflowing] = React.useState(false);
    const [totalPages, setTotalPages] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(0);
    const labelsContainerRef = React.useRef<HTMLDivElement>(null);
    const chartContainerRef = React.useRef<HTMLDivElement>(null);

    // Initialize activeLabels with all labels on first render
    const chartData = prepareDoughnutChartData(data, isDarkMode);
    React.useEffect(() => {
        if (!initialized && chartData.labels) {
            setActiveLabels([...chartData.labels]);
            setInitialized(true);
        }
    }, [chartData.labels, initialized]);

    // Check if labels container is overflowing
    React.useEffect(() => {
        const checkOverflow = () => {
            const container = labelsContainerRef.current;
            const maxWidth = chartContainerRef.current?.clientWidth || 0;
            if (container && maxWidth) {
                // Calculate the total width of all labels
                const totalWidth = Array.from(container.children).reduce((acc, child) => {
                    return acc + (child as HTMLElement).offsetWidth;
                }, 0);
                // Calculate the number of pages based on the total width and container width
                const containerWidth = container.clientWidth - 50; // Adjusted for padding
                const pages = Math.ceil(totalWidth / containerWidth);
                setTotalPages(pages);
                setIsOverflowing(totalWidth > containerWidth);
            }
        };

        // Check initially
        checkOverflow();

        // Set up resize observer to check when window resizes
        const resizeObserver = new ResizeObserver(checkOverflow);
        if (labelsContainerRef.current) {
            resizeObserver.observe(labelsContainerRef.current);
        }

        return () => {
            if (labelsContainerRef.current) {
                resizeObserver.unobserve(labelsContainerRef.current);
            }
            resizeObserver.disconnect();
        };
    }, [chartData.labels]);

    // Filter data based on active labels
    const filteredData = React.useMemo(() => {
        if (!initialized || activeLabels.length === chartData.labels.length) {
            return chartData;
        }

        return {
            ...chartData,
            labels: chartData.labels.filter(label => activeLabels.includes(label)),
            datasets: chartData.datasets.map(dataset => ({
                ...dataset,
                data: dataset.data.filter((_, index) => activeLabels.includes(chartData.labels[index])),
                backgroundColor: dataset.backgroundColor.filter((_, index) => activeLabels.includes(chartData.labels[index])),
                borderColor: dataset.borderColor.filter((_, index) => activeLabels.includes(chartData.labels[index])),
            }))
        };
    }, [data, activeLabels, initialized]);

    // Prepare chart options
    const chartOptions = prepareDoughnutChartOptions(config, isDarkMode);

    // Toggle label visibility
    const toggleLabel = (label: string) => {
        setActiveLabels(prev => {
            if (prev.includes(label)) {
                // If removing the last active label, don't allow it
                if (prev.length === 1) return prev;
                return prev.filter(l => l !== label);
            } else {
                return [...prev, label];
            }
        });
    };

    const containerWidth = chartContainerRef.current?.clientWidth || 0;

    return (
        <div className="doughnut-chart-container" ref={chartContainerRef}>
            {metadata && (
                <div className="chart-metadata">
                    {metadata.title && <h3 className="chart-title">{metadata.title}</h3>}
                    {metadata.description && <p className="chart-description">{metadata.description}</p>}
                </div>
            )}

            {config?.title &&
                <h4 className='chart-heading'>{config.title}</h4>
            }

            {chartData.labels && chartData.labels.length > 0 && (
                <div className="chart-labels-container" ref={labelsContainerRef}>
                    <div className="chart-labels-scroll-container">
                        <div className="chart-labels-wrapper">
                            {chartData.labels.map((label, index) => {
                                // Get color from the chart data
                                const color = chartData.datasets[0].backgroundColor[index] || '#ccc';

                                const isActive = activeLabels.includes(label);
                                const displayColor = isActive ? color : '#d9d9d9';

                                return (
                                    <div
                                        key={`label-${index}`}
                                        className={`chart-label-item ${isActive ? 'active' : 'inactive'}`}
                                        onClick={() => toggleLabel(label)}
                                    >
                                        <span
                                            className="color-indicator"
                                            style={{ backgroundColor: displayColor }}
                                        />
                                        <span
                                            className="label-text"
                                        >
                                            {label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {isOverflowing && (
                        <>
                            <button
                                className="scroll-button scroll-left"
                                onClick={(e) => {
                                    const container = e.currentTarget.parentElement?.querySelector('.chart-labels-scroll-container');
                                    if (container) {
                                        container.scrollLeft -= containerWidth;
                                        setCurrentPage(prev => {
                                            if (prev > 0) {
                                                return prev - 1;
                                            } else {
                                                return prev;
                                            }
                                        })
                                    }
                                }}
                            >
                                &#11207;
                            </button>
                            <p style={{ fontSize: "12px" }}>
                                {currentPage + 1}/{totalPages}
                            </p>
                            <button
                                className="scroll-button scroll-right"
                                onClick={(e) => {
                                    const container = e.currentTarget.parentElement?.querySelector('.chart-labels-scroll-container');
                                    if (container) {
                                        container.scrollLeft += containerWidth;
                                        setCurrentPage(prev => {
                                            if (prev < totalPages - 1) {
                                                return prev + 1;
                                            } else {
                                                return prev;
                                            }
                                        })
                                    }
                                }}
                            >
                                &#11208;
                            </button>
                        </>
                    )}
                </div>
            )}

            <div className="chart-wrapper doughnut-chart">
                <Doughnut data={filteredData} options={chartOptions} />
            </div>
        </div>
    );
};
