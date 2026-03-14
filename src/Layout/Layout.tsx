import { useState } from "react"
import { LuChevronDown, LuCircleUser, LuForklift, LuLayoutPanelLeft, LuTag } from "react-icons/lu"
import { NavLink, Outlet } from "react-router-dom"


const Layout = () => {


    const [open, setOpen] = useState<Record<string, boolean>>({});

    const toggle = (key: string) => {
      setOpen(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    };


  return (
    <div className="min-h-svh flex">

        <aside className="w-69 border-r! border-(--chakra-colors-border) px-4!" >

            <div className="grid place-items-center h-12 mb-8!">
                <h1>Logo</h1> 
            </div>

            <ul className="flex flex-col gap-1.5 [&>li]:flex!">
                <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `${isActive ? 'bg-(--chakra-colors-teal-subtle)! text-teal-400!' : '' } flex! items-center gap-2 text-sm! px-4! py-2! rounded-sm w-full hover:bg-(--chakra-colors-teal-subtle)!`
                        }
                    >
                        <LuLayoutPanelLeft size={'19px'} />
                        Dashboard
                    </NavLink>
                </li>
                <li className="flex flex-col">
                    <a
                        // className={({ isActive }) =>
                        //     `${isActive ? 'bg-(--chakra-colors-teal-subtle)! text-teal-400!' : '' } flex! items-center gap-2 text-sm! px-4! py-1.5! rounded-sm w-full hover:bg-(--chakra-colors-teal-subtle)!`
                        // }
                        className="cursor-pointer flex! items-center gap-2 text-sm! px-4! py-2! rounded-sm w-full hover:bg-(--chakra-colors-teal-subtle)!"
                        onClick={() => toggle('item')}
                    >
                        <LuTag size={'19px'} />
                        <span className="flex-1">Item</span>
                        <LuChevronDown 
                            size={'19px'}
                            className={
                                `${open?.item ? '-rotate-90' : ''} transition-transform duration-100`
                            } 
                        />
                    </a>

                    <div 
                        className={`grid transition-all duration-100 ${
                            open?.item ? 'grid-rows-[1fr] mt-1.5!' : 'grid-rows-[0fr]'
                        }`}
                    >
                        <ul className="overflow-hidden ml-6! pl-6! space-y-1.5! border-l! border-red-200">
                            <li>
                                <NavLink 
                                    to="/item"
                                    className={({ isActive }) =>
                                    `${isActive ? 'bg-(--chakra-colors-teal-subtle)! text-teal-400!' : '' } flex! items-center gap-2 text-sm! px-4! py-1.5! rounded-sm w-full hover:bg-(--chakra-colors-teal-subtle)!`
                                }
                                >
                                    List
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/brand"
                                    className={({ isActive }) =>
                                    `${isActive ? 'bg-(--chakra-colors-teal-subtle)! text-teal-400!' : '' } flex! items-center gap-2 text-sm! px-4! py-1.5! rounded-sm w-full hover:bg-(--chakra-colors-teal-subtle)!`
                                }
                                >
                                    Brand
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/category"
                                    className={({ isActive }) =>
                                    `${isActive ? 'bg-(--chakra-colors-teal-subtle)! text-teal-400!' : '' } flex! items-center gap-2 text-sm! px-4! py-1.5! rounded-sm w-full hover:bg-(--chakra-colors-teal-subtle)!`
                                }
                                >
                                    Category
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                </li>
                <li>
                    <NavLink
                        to="/employee"
                        className={({ isActive }) =>
                            `${isActive ? 'bg-(--chakra-colors-teal-subtle)! text-teal-400!' : '' } flex! items-center gap-2 text-sm! px-4! py-2! rounded-sm w-full hover:bg-(--chakra-colors-teal-subtle)!`
                        }
                    >
                        <LuCircleUser size={'19px'} />
                        Employee
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/supplier"
                        className={({ isActive }) =>
                            `${isActive ? 'bg-(--chakra-colors-teal-subtle)! text-teal-400!' : '' } flex! items-center gap-2 text-sm! px-4! py-2! rounded-sm w-full hover:bg-(--chakra-colors-teal-subtle)!`
                        }
                    >
                        <LuForklift size={'19px'} />
                        Supplier
                    </NavLink>
                </li>
            </ul>

        </aside>

        <div className="flex-1 py-10! px-16!">
            <Outlet />
        </div>

    </div>
  )
}

export default Layout