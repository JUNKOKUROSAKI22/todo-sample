export default function DueDateDisplay({ dueDate, dueTime, completed }) {
  if (!dueDate) return null;

  const calculateDaysUntil = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const daysUntil = calculateDaysUntil();
  let statusClass = '';
  let statusText = '';

  if (completed) {
    statusClass = 'due-completed';
    statusText = '✓ Done';
  } else if (daysUntil < 0) {
    statusClass = 'due-overdue';
    statusText = `${Math.abs(daysUntil)} day${Math.abs(daysUntil) !== 1 ? 's' : ''} overdue`;
  } else if (daysUntil === 0) {
    statusClass = 'due-today';
    statusText = 'Today';
  } else if (daysUntil === 1) {
    statusClass = 'due-tomorrow';
    statusText = 'Tomorrow';
  } else {
    statusClass = 'due-future';
    statusText = `In ${daysUntil} days`;
  }

  return (
    <div className={`due-date-display ${statusClass}`} aria-label={`Due: ${dueDate}${dueTime ? ` at ${dueTime}` : ''}`}>
      <span className="due-date">{dueDate}</span>
      {dueTime && <span className="due-time">{dueTime}</span>}
      <span className="due-status">{statusText}</span>
    </div>
  );
}
