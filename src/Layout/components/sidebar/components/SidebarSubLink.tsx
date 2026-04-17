import { NavLink } from "react-router-dom";


interface Props {
    to: string
    label: string
}

const SidebarSubLink = ({to, label}: Props) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${isActive ? 'bg-(--chakra-colors-teal-subtle)! text-teal-500!' : ''} 
          flex! items-center gap-2 text-xs! px-4! py-2! rounded-sm w-full 
          hover:bg-(--chakra-colors-teal-subtle)!`
        }
      >
        {label}
      </NavLink>
    </li>
  );
}

export default SidebarSubLink