import React, { useState } from 'react';
import { DataFilter } from '../types';
import FilterControl from './FilterControl';
import "../assets/css/filter-panel.css";

interface FilterPanelProps {
    filters: DataFilter[];
    onFiltersChange: (filters: DataFilter[]) => void;
    availableFields: string[];
}

/**
 * Filter panel component for managing all filters
 */
const FilterPanel: React.FC<FilterPanelProps> = ({
    filters,
    onFiltersChange,
    availableFields,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleAddFilter = () => {
        const newFilter: DataFilter = {
            field: 'label',
            operator: 'contains',
            value: "",
            active: true,
            ...(filters.length > 0 && { fieldLogic: 'AND' }),
        };

        onFiltersChange([...filters, newFilter]);
    };

    const handleUpdateFilter = (index: number, updatedFilter: DataFilter) => {
        const newFilters = [...filters];
        newFilters[index] = updatedFilter;
        onFiltersChange(newFilters);
    };

    const handleRemoveFilter = (index: number) => {
        const newFilters = filters.filter((_, i) => i !== index);
        onFiltersChange(newFilters);
    };

    return (
        <div className="filter-panel">
            <button
                className="filter-toggle-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                {isOpen ? 'Hide Filters' : 'Show Filters'} ({filters.filter(f => f.active).length} active)
            </button>

            {isOpen && (
                <div className="filter-panel-content">
                    <h4>Data Filters</h4>

                    {filters.length === 0 ? (
                        <p>No filters defined. Add a filter to start filtering your data.</p>
                    ) : (
                        <div className="filter-list">
                            {filters.map((filter, index) => (
                                <FilterControl
                                    key={index}
                                    filter={filter}
                                    index={index}
                                    onUpdate={handleUpdateFilter}
                                    onRemove={handleRemoveFilter}
                                    availableFields={availableFields}
                                />
                            ))}
                        </div>
                    )}

                    <button
                        className="filter-add-btn"
                        onClick={handleAddFilter}
                    >
                        Add Filter
                    </button>
                </div>
            )}
        </div>
    );
};

export default FilterPanel;
