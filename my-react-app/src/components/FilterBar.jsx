export default function FilterBar({ filter, onChangeFilter, remainingCount, completedCount }) {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="filter-bar">
      <div className="filter-buttons" role="tablist" aria-label="Filter todos">
        {filters.map((f) => (
          <button
            key={f.value}
            className={`filter-button ${filter === f.value ? 'active' : ''}`}
            onClick={() => onChangeFilter(f.value)}
            role="tab"
            aria-selected={filter === f.value}
            aria-label={`Show ${f.label.toLowerCase()} todos`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="todo-stats" aria-live="polite" aria-atomic="true">
        <span>{remainingCount} active</span>
        <span className="separator">•</span>
        <span>{completedCount} completed</span>
      </div>
    </div>
  );
}
