import { cn } from '../../lib'

export function Badge({ className, children, ...props }) {
  return <span className={cn('badge', className)} {...props}>{children}</span>
}
