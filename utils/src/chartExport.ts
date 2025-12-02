/**
 * Utilities for exporting chart data in various formats
 */

export interface ChartData {
  categories: string[];
  series: Array<{
    name: string;
    data: (number | string)[];
  }>;
  title?: string;
}

/**
 * Export chart data as CSV
 */
export function exportChartAsCSV(data: ChartData, filename?: string): void {
  const rows: string[][] = [];

  // Header row: Category, Series1, Series2, ...
  const headers = ['Categoria', ...data.series.map((s) => s.name)];
  rows.push(headers);

  // Data rows
  data.categories.forEach((category, index) => {
    const row = [
      category,
      ...data.series.map((serie) => String(serie.data[index] ?? ''))
    ];
    rows.push(row);
  });

  // Convert to CSV string
  const csvContent = rows
    .map((row) =>
      row
        .map((cell) => {
          // Escape quotes and wrap in quotes if contains comma, quote, or newline
          const escaped = String(cell).replace(/"/g, '""');
          if (escaped.includes(',') || escaped.includes('"') || escaped.includes('\n')) {
            return `"${escaped}"`;
          }
          return escaped;
        })
        .join(',')
    )
    .join('\n');

  // Create blob and download
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `${data.title || 'chart'}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export chart data as JSON
 */
export function exportChartAsJSON(data: ChartData, filename?: string): void {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `${data.title || 'chart'}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export chart data as Excel (XLSX format using CSV with .xlsx extension)
 * Note: This creates a simple CSV that Excel can open
 * For full XLSX support, consider using a library like 'xlsx'
 */
export function exportChartAsExcel(data: ChartData, filename?: string): void {
  // For now, export as CSV but with .xlsx extension
  // Excel will open it correctly
  exportChartAsCSV(data, filename?.replace(/\.(csv|json)$/i, '.xlsx') || `${data.title || 'chart'}.xlsx`);
}

/**
 * Export chart image as PNG/JPEG
 * This is handled by ECharts toolbox, but we provide a helper for programmatic export
 */
export function exportChartAsImage(
  chartInstance: any,
  filename?: string,
  format: 'png' | 'jpeg' = 'png'
): void {
  if (!chartInstance || typeof chartInstance.getDataURL !== 'function') {
    console.error('Chart instance not available or does not support getDataURL');
    return;
  }

  const url = chartInstance.getDataURL({
    type: format,
    pixelRatio: 2,
    backgroundColor: '#fff'
  });

  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `chart.${format}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Get sanitized filename from chart title
 */
export function getChartFilename(title: string, extension: string): string {
  const sanitized = title
    .replace(/[^a-z0-9]/gi, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .toLowerCase();
  return `${sanitized || 'chart'}.${extension}`;
}

