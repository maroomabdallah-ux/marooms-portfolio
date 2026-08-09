import { cn } from '../../lib'

export function Card({ className, ...props }) {
  return <div className={cn('card', className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn('card-content', className)} {...props} />
}
