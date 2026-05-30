import React from 'react';
import clsx from 'clsx';

interface StaggerGroupProps {
  children: React.ReactNode;
  /** Animation applied to each child. */
  variant?: 'fade-rise' | 'fade-zoom' | 'fade-in';
  className?: string;
  as?: React.ElementType;
}

/**
 * RSC-safe stagger wrapper. Applies animation to each child and uses
 * the `.stagger > :nth-child(N)` CSS utility for 60ms-beat delays.
 *
 * Renders synchronously — no IntersectionObserver. Use above-the-fold.
 * For scroll-triggered reveals below the fold, use <Reveal> instead.
 */
export function StaggerGroup({
  children,
  variant = 'fade-rise',
  className,
  as: Tag = 'div',
}: StaggerGroupProps) {
  const animClass = {
    'fade-rise': 'animate-fade-rise',
    'fade-zoom': 'animate-fade-zoom',
    'fade-in':   'animate-fade-in',
  }[variant];

  return (
    <Tag className={clsx('stagger', className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ className?: string }>, {
              className: clsx(animClass, (child.props as { className?: string }).className),
            })
          : child,
      )}
    </Tag>
  );
}
