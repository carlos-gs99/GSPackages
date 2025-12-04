import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export interface GSBreadcrumbsProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  children: React.ReactNode;
  separator?: React.ReactNode;
  ariaLabel?: string;
}

export interface GSBreadcrumbItemProps {
  children: React.ReactNode;
  active?: boolean;
  href?: string;
  as?: React.ElementType;
  className?: string;
}

const GSBreadcrumbsComponent = React.forwardRef<HTMLElement, GSBreadcrumbsProps>(
  ({ children, className, separator = '/', ariaLabel = 'Breadcrumb', ...rest }, ref) => {
    const items = React.Children.toArray(children);

    return (
      <nav {...rest} ref={ref} aria-label={ariaLabel} className={clsx(styles.nav, className)} data-gs="GSBreadcrumbs">
        <ol className={styles.list}>
          {items.map((child, index) => {
            if (!React.isValidElement(child)) return null;
            const isLast = index === items.length - 1;
            const key = child.key ?? `breadcrumb-item-${index}`;
            return (
              <React.Fragment key={key}>
                {child}
                {!isLast && <li className={styles.separator} aria-hidden="true">{separator}</li>}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  }
);

GSBreadcrumbsComponent.displayName = 'GSBreadcrumbs';

const GSBreadcrumbItem = React.forwardRef<HTMLLIElement, GSBreadcrumbItemProps>(
  ({ children, active = false, href, as: Component, className }, ref) => {
    const itemClasses = clsx(styles.item, { [styles.itemActive]: active }, className);
    
    let content: React.ReactNode = children;
    if (!active && Component) {
      content = React.createElement(Component, { className: styles.link }, children);
    } else if (!active && href) {
      content = <a href={href} className={styles.link}>{children}</a>;
    }

    return (
      <li ref={ref} className={itemClasses} aria-current={active ? 'page' : undefined}>
        {content}
      </li>
    );
  }
);

GSBreadcrumbItem.displayName = 'GSBreadcrumbs.Item';

export const GSBreadcrumbs = Object.assign(React.memo(GSBreadcrumbsComponent), {
  Item: GSBreadcrumbItem,
});

export default GSBreadcrumbs;

