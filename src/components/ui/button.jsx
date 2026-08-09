import React from 'react'
import { cn } from '../../lib'

const variants = {
  default: 'btn btn-default',
  outline: 'btn btn-outline',
  ghost: 'btn btn-ghost',
}

export function Button({ className, variant = 'default', asChild = false, children, ...props }) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      className: cn(variants[variant], className, children.props.className),
    })
  }
  return <button className={cn(variants[variant], className)} {...props}>{children}</button>
}
