import { CommonDataItem, DataFilter, CommonDataset } from '../types';

/**
 * Apply a filter to a data item based on the filter configuration
 */
export const applyFilter = (item: CommonDataItem, filter: DataFilter): boolean => {
    // Skip inactive filters
    if (!filter.active) return true;

    const fields = Array.isArray(filter.field) ? filter.field : [filter.field];
    const fieldLogic = filter.fieldLogic || 'AND';

    // Function to check if a single field matches the filter
    const fieldMatches = (fieldName: string): boolean => {
        // Get the value to compare, supporting nested paths
        const getValue = (path: string, obj: Record<string, unknown>): unknown => {
            const parts = path.split('.');
            return parts.reduce((acc: Record<string, unknown> | unknown, part) =>
                acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[part] : undefined, obj);
        };

        // Get field value from the item (can be in main object or extraData)
        const fieldValue = fieldName.includes('extraData.')
            ? getValue(fieldName.replace('extraData.', ''), item.extraData || {})
            : item[fieldName as keyof CommonDataItem];

        if (fieldValue === undefined) return false;

        switch (filter.operator) {
            case 'equals':
                return fieldValue === filter.value;
            case 'contains':
                return String(fieldValue).toLowerCase().includes(String(filter.value).toLowerCase());
            case 'greaterThan':
                return Number(fieldValue) > Number(filter.value);
            case 'lessThan':
                return Number(fieldValue) < Number(filter.value);
            default:
                return true;
        }
    };

    // Apply the logic for multiple fields
    if (fieldLogic === 'AND') {
        return fields.every(fieldMatches);
    } else {
        return fields.some(fieldMatches);
    }
};

/**
 * Filter a dataset using an array of filters
 */
export const filterData = (data: CommonDataset, filters: DataFilter[]): CommonDataset => {
    if (!filters || filters.length === 0) {
        return data;
    }

    const filteredItems = data.items.filter(item =>
        filters.every(filter => applyFilter(item, filter))
    );

    return {
        ...data,
        items: filteredItems
    };
};

/**
 * Extract available field names from dataset
 */
export const extractAvailableFields = (data: CommonDataset): string[] => {
    const fields = new Set<string>();
    const firstItem = data.items[0];

    if ("label" in firstItem) {
        fields.add('label');
    }

    if ("value" in firstItem) {
        fields.add('value');
    }

    if ("category" in firstItem) {
        fields.add('category');
    }

    if ("date" in firstItem) {
        fields.add('date');
    }

    // Add extraData fields from the first item
    // if (data.items.length > 0) {
    //     const firstItem = data.items[0];
    //     if (firstItem.extraData) {
    //         Object.keys(firstItem.extraData).forEach(key => {
    //             fields.add(`extraData.${key}`);
    //         });
    //     }
    // }

    return Array.from(fields);
};

/**
 * Calculate filtering statistics
 */
export const getFilterStats = (
    originalData: CommonDataset,
    filteredData: CommonDataset,
    filters: DataFilter[]
) => {
    const totalItems = originalData.items.length;
    const filteredItems = filteredData.items.length;
    const filteringActive = filters.some(f => f.active);

    return {
        totalItems,
        filteredItems,
        filteringActive
    };
};

/**
 * Gets unique values for a specific field from the dataset
 */
export const getFieldUniqueValues = (data: CommonDataset, field: string): (string | number)[] => {
    const values = new Set<string | number>();

    data.items.forEach(item => {
        let value: string | number | undefined = undefined;

        if (field.startsWith('extraData.')) {
            const nestedField = field.replace('extraData.', '');
            const extraValue = item.extraData?.[nestedField];
            if (typeof extraValue === 'string' || typeof extraValue === 'number') {
                value = extraValue;
            }
        } else if (field in item) {
            const fieldValue = item[field as keyof CommonDataItem];
            if (typeof fieldValue === 'string' || typeof fieldValue === 'number') {
                value = fieldValue;
            }
        }

        if (value !== undefined && (typeof value === 'string' || typeof value === 'number')) {
            values.add(value);
        }
    });

    return Array.from(values).sort((a, b) => {
        if (typeof a === 'number' && typeof b === 'number') {
            return a - b;
        }
        return String(a).localeCompare(String(b));
    });
};
