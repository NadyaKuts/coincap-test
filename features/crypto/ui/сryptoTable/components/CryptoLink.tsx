import { Link } from 'react-router'

type CryptoLinkProps = {
  to: string
  children: React.ReactNode
  className?: string
}

export default function CryptoLink({
  to,
  children,
  className = '',
}: CryptoLinkProps) {
  return (
    <Link to={to} className={`block transition-colors ${className}`}>
      {children}
    </Link>
  )
}
