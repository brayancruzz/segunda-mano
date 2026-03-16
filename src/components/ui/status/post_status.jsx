import './post_status.css';

/**
 * Status color mapping for products
 */
const statusColorMap = {
  active: '#28a745',      // green
  inactive: '#6c757d',    // gray
  draft: '#ffc107',       // yellow
  pending: '#fd7e14',     // orange
  rejected: '#dc3545',    // red
  restricted: '#ff6b35',  // dark orange
  archived: '#495057'     // dark gray
};

function PostStatus({ status, view }) {
  // Only show status if view is "detail" and status is provided
  if (view !== 'detail' || !status) {
    return null;
  }

  const backgroundColor = statusColorMap[status] || '#6c757d';

  return (
    <div
      className="post-status"
      style={{ backgroundColor }}
    >
      {status}
    </div>
  );
}

export default PostStatus;
