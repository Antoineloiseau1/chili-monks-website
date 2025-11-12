interface EmptyStateProps {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export const EmptyState = ({ 
  title, 
  description, 
  icon, 
  action, 
  className = '' 
}: EmptyStateProps) => {
  return (
    <div className={`text-center py-12 px-6 ${className}`}>
      {icon && (
        <div className="mx-auto mb-4 text-gray-400">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
      {description && (
        <p className="text-gray-300 mb-6 max-w-sm mx-auto">
          {description}
        </p>
      )}
      {action && action}
    </div>
  )
}