import React, { useRef } from 'react';
import { DataFilter } from '../types';

interface FilterControlProps {
    filter: DataFilter;
    index: number;
    onUpdate: (index: number, filter: DataFilter) => void;
    onRemove: (index: number) => void;
    availableFields: string[];
}

/**
 * Filter UI component for displaying and managing a single filter
 */
const FilterControl: React.FC<FilterControlProps> = ({
    filter,
    index,
    onUpdate,
    onRemove,
    availableFields
}) => {
    const valueInputRef = useRef<HTMLInputElement>(null);
    const valueDropdownRef = useRef<HTMLDivElement>(null);

    // Get field-friendly labels
    const getFieldLabel = (field: string): string => {
        if (field === 'label') return 'Label';
        if (field === 'value') return 'Value';
        if (field === 'category') return 'Category';
        if (field === 'date') return 'Date';
        if (field.startsWith('extraData.')) {
            return field.replace('extraData.', '');
        }
        return field;
    };

    const handleToggleActive = () => {
        onUpdate(index, { ...filter, active: !filter.active });
    };

    const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // Reset field logic if we're switching from multiple fields to single field
        const newField = e.target.value;

        onUpdate(index, {
            ...filter,
            field: newField,
        });
    };

    const handleOperatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onUpdate(index, { ...filter, operator: e.target.value as DataFilter['operator'] });
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onUpdate(index, { ...filter, value: e.target.value });
    };

    const handleFilterLogic = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onUpdate(index, { ...filter, fieldLogic: e.target.value as DataFilter['fieldLogic'] });
    };

    return (
        <div className="filter-control">
            <div className="filter-header">
                <input
                    type="checkbox"
                    checked={filter.active}
                    onChange={handleToggleActive}
                    id={`filter-active-${index}`}
                />
                <label htmlFor={`filter-active-${index}`}>Active</label>
                <button
                    className="filter-remove-btn"
                    onClick={() => onRemove(index)}
                    aria-label="Remove filter"
                >
                    ×
                </button>
            </div>

            <div className="filter-body">
                <div className="filter-row">
                    <label>Field:</label>
                    <select
                        value={Array.isArray(filter.field) ? filter.field[0] : filter.field}
                        onChange={handleFieldChange}
                        disabled={!filter.active}
                        style={{
                            textTransform: 'capitalize'
                        }}
                    >
                        {availableFields.map(field => (
                            <option key={field} value={field} style={{
                                textTransform: 'capitalize',
                                cursor: 'pointer'
                            }}>
                                {getFieldLabel(field)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-row">
                    <label>Operator:</label>
                    <select
                        value={filter.operator}
                        onChange={handleOperatorChange}
                        disabled={!filter.active}
                    >
                        <option value="equals">Equals</option>
                        <option value="contains">Contains</option>
                        <option value="greaterThan">Greater Than</option>
                        <option value="lessThan">Less Than</option>
                    </select>
                </div>

                <div className="filter-row">
                    <label>Value:</label>
                    <div className="value-input-container" ref={valueDropdownRef}>
                        <input
                            ref={valueInputRef}
                            type="text"
                            value={filter.value.toString()}
                            onChange={handleValueChange}
                            placeholder="Filter value"
                            disabled={!filter.active}
                        />
                    </div>
                </div>

                {filter?.fieldLogic &&
                    <div className="filter-row">
                        <label>Logic:</label>
                        <select
                            value={filter.fieldLogic}
                            onChange={handleFilterLogic}
                            disabled={!filter.active}
                        >
                            <option value="AND">AND</option>
                            <option value="OR">OR</option>
                        </select>
                    </div>
                }
            </div>
        </div>
    );
};

export default FilterControl;
