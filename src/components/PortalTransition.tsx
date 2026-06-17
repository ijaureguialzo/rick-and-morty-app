export default function PortalTransition() {
  return (
    <div className="portal-overlay" aria-hidden="true">
      <div className="portal-ring portal-ring--outer" />
      <div className="portal-ring portal-ring--middle" />
      <div className="portal-ring portal-ring--inner" />
      <div className="portal-core" />
      <span className="portal-text">PORTAL OPENING...</span>
    </div>
  )
}
