export default function PriorityBadge({ priority }) {
  const priorityConfig = {
    high: { label: 'High', className: 'priority-high', color: '#ef4444' },
    medium: { label: 'Medium', className: 'priority-medium', color: '#f59e0b' },
    low: { label: 'Low', className: 'priority-low', color: '#10b981' },
  };

  const config = priorityConfig[priority] || priorityConfig.medium;

  return (
    <span
      className={`priority-badge ${config.className}`}
      title={`Priority: ${config.label}`}
      aria-label={`Priority: ${config.label}`}
    >
      {config.label}
    </span>
  );
}
