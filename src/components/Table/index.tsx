import clsx from 'clsx'
import { Children, cloneElement, isValidElement } from 'react'
import { tv } from 'tailwind-variants'
import { match } from 'ts-pattern'

interface HeadProps {
  headers: React.ReactNode[]
}

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  index: number
}

interface CellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  edge?: 'left' | 'right'
}

const th = tv({
  base: 'text-neutralSubtle py-4 text-left font-normal',
  variants: {
    isFirst: {
      false: 'text-right',
    },
    edge: {
      left: 'pl-3',
      right: 'pr-3',
      normal: '',
    },
  },
})

const td = tv({
  variants: {
    edge: {
      left: 'rounded-l-md pl-3',
      right: 'rounded-r-md pr-3',
      normal: '',
    },
  },
})

const getEdgeByIndex = (index: number, length: number) => {
  return match(index)
    .with(0, () => 'left' as const)
    .with(length - 1, () => 'right' as const)
    .otherwise(() => 'normal' as const)
}

export const Cell = ({
  children,
  edge,
  className,
  ...props
}: React.PropsWithChildren<CellProps>) => {
  return (
    <td
      className={clsx(
        td({
          edge: edge ?? 'normal',
        }),
        className
      )}
      {...props}
    >
      <div className={clsx('flex min-w-16 items-center', edge !== 'left' && 'justify-end')}>
        {children}
      </div>
    </td>
  )
}

export const Row = ({ children, index, className, ...props }: RowProps) => {
  const childrenLength = Children.count(children)
  return (
    <tr
      className={clsx(
        `h-12 rounded-sm text-sm`,
        index % 2 === 0 && 'bg-tableBackground',
        className
      )}
      {...props}
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) {
          return child
        }
        return cloneElement(child, {
          ...Object(child.props),
          edge: getEdgeByIndex(index, childrenLength),
        })
      })}
    </tr>
  )
}

export const Head = ({ headers }: HeadProps) => {
  return (
    <thead>
      <tr className="text-fg-neutralSubtle text-sm">
        {headers.map((header, index) => (
          <th
            className={th({
              isFirst: index === 0,
              edge: getEdgeByIndex(index, headers.length),
            })}
            key={index}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export const Table = ({ children }: React.PropsWithChildren<unknown>) => {
  return (
    <div className="w-full overflow-auto">
      <table className="w-full">{children}</table>
    </div>
  )
}

Table.Head = Head
Table.Row = Row
Table.Cell = Cell
