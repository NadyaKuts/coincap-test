import { Link } from 'react-router'

type CryptoLinkProps = {
  to: string
  children: React.ReactNode
  className?: string
}

export const CryptoLink = ({
  to,
  children,
  className = '',
}: CryptoLinkProps) => (
  <Link to={to} className={`block transition-colors ${className}`}>
    {children}
  </Link>
)
