import { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { prepareHeatmapData, createColorScale, formatValue, getContrastColor } from './controls';
import { isDarkMode as checkDarkMode } from '../utils';
import '../assets/css/heatmap-chart.css';
import { HeatmapChartProps } from './types';

/**
 * HeatmapChart Component
 * 
 * Visualizes matrix data where color intensity represents values
 * Uses D3.js for rendering the heatmap
 */
export const HeatmapChartComponent: React.FC<HeatmapChartProps> = ({
    metadata,
    data,
    config = {},
}) => {
    // Determine theme based on system preference
    const isDarkMode = checkDarkMode();

    // Create ref for the SVG element
    const svgRef = useRef(null);

    // Extract configuration options with defaults
    const {
        cellPadding = 2,
        cellBorderWidth = 0,
        cellBorderColor = 'white',
        cellRadius = 0,
        showValues = true,
        valueFormat = '',
        valueFontSize = '12px',
        valueColor = 'auto',
        animationDuration = 500,
        showColorLegend = true,
        colorLegendTicks = 5,
    } = config;

    // Effect to handle initial render and updates
    useEffect(() => {
        if (!svgRef.current || !data.items.length) return;

        // Clear previous chart
        d3.select(svgRef.current).selectAll('*').remove();

        // Prepare data for the heatmap
        const { cells, xLabels, yLabels, minValue, maxValue } = prepareHeatmapData(data);

        // Create the color scale
        const colorScale = createColorScale(config, isDarkMode, minValue, maxValue);

        // Get the SVG element and its dimensions
        const svg = d3.select(svgRef.current);
        const width = (svgRef.current as SVGSVGElement).clientWidth;
        const height = (svgRef.current as SVGSVGElement).clientHeight;

        // Define margins for axes
        const margin = {
            top: 50,
            right: showColorLegend ? 120 : 40,
            bottom: 120,
            left: 120
        };

        // Calculate the available width and height for the chart
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Create scales for x and y axes
        const xScale = d3.scaleBand()
            .domain(xLabels as string[])
            .range([0, innerWidth])
            .padding(0);

        const yScale = d3.scaleBand()
            .domain(yLabels as string[])
            .range([0, innerHeight])
            .padding(0);

        // Create the chart group with margins
        const chart = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // Add x-axis
        chart.append('g')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(xScale))
            .selectAll('text')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end')
            .style('fill', isDarkMode ? '#eaeaea' : '#333')
            .style('font-size', '12px');

        // Add y-axis
        chart.append('g')
            .call(d3.axisLeft(yScale))
            .selectAll('text')
            .style('fill', isDarkMode ? '#eaeaea' : '#333')
            .style('font-size', '12px');

        // Add x-axis label
        if (config.xAxisLabel) {
            chart.append('text')
                .attr('class', 'x-axis-label')
                .attr('x', innerWidth / 2)
                .attr('y', innerHeight + margin.bottom / 2)
                .style('text-anchor', 'middle')
                .style('fill', isDarkMode ? '#eaeaea' : '#333')
                .text(config.xAxisLabel);
        }

        // Add y-axis label
        if (config.yAxisLabel) {
            chart.append('text')
                .attr('class', 'y-axis-label')
                .attr('transform', 'rotate(-90)')
                .attr('x', -innerHeight / 2)
                .attr('y', -margin.left / 1.5)
                .style('text-anchor', 'middle')
                .style('fill', isDarkMode ? '#eaeaea' : '#333')
                .text(config.yAxisLabel);
        }

        // Create tooltip
        const tooltip = d3.select('body').append('div')
            .attr('class', 'heatmap-tooltip')
            .style('opacity', 0);

        // Create and add cells to the heatmap
        const cellGroup = chart.append('g')
            .attr('class', 'cells');

        cellGroup.selectAll('rect')
            .data(cells)
            .enter()
            .append('rect')
            .attr('x', d => (xScale(d.x) || 0) + cellPadding / 2)
            .attr('y', d => (yScale(d.y) || 0) + cellPadding / 2)
            .attr('width', xScale.bandwidth() - cellPadding)
            .attr('height', yScale.bandwidth() - cellPadding)
            .attr('rx', cellRadius)
            .attr('ry', cellRadius)
            .style('fill', d => colorScale(d.value))
            .style('stroke', cellBorderColor)
            .style('stroke-width', cellBorderWidth)
            .style('opacity', 0) // Start with opacity 0 for animation
            .on('mouseover', function (event, d) {
                // Highlight cell
                d3.select(this)
                    .style('stroke', isDarkMode ? 'white' : 'black')
                    .style('stroke-width', 2);

                // Show tooltip
                const formattedValue = formatValue(d.value, valueFormat);
                const tooltipContent = config.tooltipTemplate ?
                    config.tooltipTemplate(d, cells.indexOf(d)) :
                    `${d.x}, ${d.y}: ${formattedValue}`;

                tooltip.html(tooltipContent)
                    .style('left', (event.pageX + 10) + 'px')
                    .style('top', (event.pageY - 28) + 'px')
                    .style('opacity', 0.9);
            })
            .on('mouseout', function () {
                // Remove highlight
                d3.select(this)
                    .style('stroke', cellBorderColor)
                    .style('stroke-width', cellBorderWidth);

                // Hide tooltip
                tooltip.style('opacity', 0);
            })
            .transition()
            .duration(animationDuration)
            .style('opacity', 1); // Animate to full opacity

        // Add text labels to cells if enabled
        if (showValues) {
            cellGroup.selectAll('text')
                .data(cells)
                .enter()
                .append('text')
                .attr('x', d => (xScale(d.x) || 0) + xScale.bandwidth() / 2)
                .attr('y', d => (yScale(d.y) || 0) + yScale.bandwidth() / 2)
                .attr('dy', '.35em')
                .style('text-anchor', 'middle')
                .style('font-size', valueFontSize)
                .style('fill', d => {
                    if (valueColor === 'auto') {
                        // Calculate appropriate text color based on background
                        return getContrastColor(colorScale(d.value));
                    }
                    return valueColor;
                })
                .style('opacity', 0) // Start with opacity 0
                .text(d => formatValue(d.value, valueFormat))
                .transition()
                .delay(animationDuration / 2)
                .duration(animationDuration)
                .style('opacity', 1); // Animate text appearance
        }

        // Add color legend if enabled
        if (showColorLegend) {
            const legendWidth = 30;
            const legendHeight = innerHeight;
            const legendX = innerWidth + 40;

            // Create gradient for legend
            const defs = svg.append('defs');
            const gradient = defs.append('linearGradient')
                .attr('id', 'heatmap-gradient')
                .attr('gradientUnits', 'userSpaceOnUse')
                .attr('x1', 0)
                .attr('y1', legendHeight)
                .attr('x2', 0)
                .attr('y2', 0);

            // Add color stops
            const colorRange = colorScale.range();
            const numStops = colorRange.length;

            for (let i = 0; i < numStops; i++) {
                gradient.append('stop')
                    .attr('offset', `${i / (numStops - 1) * 100}%`)
                    .attr('stop-color', colorRange[i]);
            }

            // Add gradient rectangle
            const legend = svg.append('g')
                .attr('class', 'legend')
                .attr('transform', `translate(${margin.left + legendX}, ${margin.top})`);

            legend.append('rect')
                .attr('width', legendWidth)
                .attr('height', legendHeight)
                .style('fill', 'url(#heatmap-gradient)');

            // Add legend axis
            const legendScale = d3.scaleLinear()
                .domain([minValue, maxValue])
                .range([legendHeight, 0]);

            const legendAxis = d3.axisRight(legendScale)
                .ticks(colorLegendTicks)
                .tickFormat(d => formatValue(+d, valueFormat));

            legend.append('g')
                .attr('transform', `translate(${legendWidth}, 0)`)
                .call(legendAxis)
                .selectAll('text')
                .style('fill', isDarkMode ? '#eaeaea' : '#333')
                .style('font-size', '12px');

            // Add legend title
            legend.append('text')
                .attr('class', 'legend-title')
                .attr('x', legendWidth / 2)
                .attr('y', -15)
                .style('text-anchor', 'middle')
                .style('fill', isDarkMode ? '#eaeaea' : '#333')
                .text('Value');
        }

        // Add chart title if provided
        if (config.title) {
            svg.append('text')
                .attr('class', 'chart-title')
                .attr('x', width / 2)
                .attr('y', 25)
                .style('text-anchor', 'middle')
                .style('font-size', '18px')
                .style('font-weight', 'bold')
                .style('fill', isDarkMode ? '#eaeaea' : '#333')
                .text(config.title);
        }

        // Cleanup function to remove tooltip when component unmounts
        return () => {
            tooltip.remove();
        };
    }, [data, config, isDarkMode]);

    return (
        <div className={`heatmap-chart-container ${isDarkMode ? 'dark-mode' : ''}`}>
            {metadata && (
                <div className="chart-metadata">
                    {metadata.title && <h3 className="chart-title">{metadata.title}</h3>}
                    {metadata.description && <p className="chart-description">{metadata.description}</p>}
                </div>
            )}

            <div className="chart-wrapper heatmap-chart">
                <svg ref={svgRef} width="100%" height="500px"></svg>
            </div>
        </div>
    );
};
