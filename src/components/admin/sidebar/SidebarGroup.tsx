interface SidebarGroupProps {
  title: string
}

const SidebarGroup: React.FC<SidebarGroupProps> = ({ children, title }) => {
  return (
    <div className="space-y-3">
      <div className="text-lg font-bold text-purple-800">{title}</div>
      {children}
    </div>
  )
}

export default SidebarGroup
