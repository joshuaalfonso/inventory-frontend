import { useColorMode } from "@/components/ui/color-mode";
import { Avatar, Box, Button, Heading, Menu, Portal, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LuBox, LuChevronDown, LuCircleUser, LuEllipsisVertical, LuForklift, LuLayoutPanelLeft, LuMoon, LuSun, LuTag } from "react-icons/lu"
import { NavLink } from "react-router-dom"


const Sidebar = () => {

    const { colorMode, toggleColorMode } = useColorMode()

    const [open, setOpen] = useState<Record<string, boolean>>({});
    

    const toggle = (key: string) => {
      setOpen(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    };


  return (
    <aside 
        className="w-0 xl:w-69 flex flex-col gap-6 border-r-0! xl:border-r! border-(--chakra-colors-border) px-0! xl:px-4! pb-4! overflow-x-hidden" 
    >

            <div className="flex items-center justify-center gap-2 h-12">
                <LuBox 
                    size={26}
                    color={'teal.200'} 
                />
                <Heading size={'xl'}>
                    Logo
                </Heading> 
            </div>

            <div>
                <Heading
                    fontSize={'xs'}
                    color={'fg.muted'}
                    mb={1.5}
                    textTransform={'uppercase'}
                >
                    Main
                </Heading>
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
                </ul>
            </div>

            <div className="flex-1!">

                <Heading
                    fontSize={'xs'}
                    color={'fg.muted'}
                    mb={1.5}
                    textTransform={'uppercase'}
                >
                    Master
                </Heading>

                <ul className="flex flex-col gap-1.5 [&>li]:flex!">
                    {/* <li>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `${isActive ? 'bg-(--chakra-colors-teal-subtle)! text-teal-400!' : '' } flex! items-center gap-2 text-sm! px-4! py-2! rounded-sm w-full hover:bg-(--chakra-colors-teal-subtle)!`
                            }
                        >
                            <LuLayoutPanelLeft size={'19px'} />
                            Dashboard
                        </NavLink>
                    </li> */}
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
                                        `${isActive ? 'bg-(--chakra-colors-teal-subtle)! text-teal-400!' : '' } flex! items-center gap-2 text-xs! px-4! py-2! rounded-sm w-full hover:bg-(--chakra-colors-teal-subtle)!`
                                    }
                                    >
                                        List
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/brand"
                                        className={({ isActive }) =>
                                        `${isActive ? 'bg-(--chakra-colors-teal-subtle)! text-teal-400!' : '' } flex! items-center gap-2 text-xs! px-4! py-2! rounded-sm w-full hover:bg-(--chakra-colors-teal-subtle)!`
                                    }
                                    >
                                        Brand
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/category"
                                        className={({ isActive }) =>
                                        `${isActive ? 'bg-(--chakra-colors-teal-subtle)! text-teal-400!' : '' } flex! items-center gap-2 text-xs! px-4! py-2! rounded-sm w-full hover:bg-(--chakra-colors-teal-subtle)!`
                                    }
                                    >
                                        Category
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/item-type"
                                        className={({ isActive }) =>
                                        `${isActive ? 'bg-(--chakra-colors-teal-subtle)! text-teal-400!' : '' } flex! items-center gap-2 text-xs! px-4! py-2! rounded-sm w-full hover:bg-(--chakra-colors-teal-subtle)!`
                                    }
                                    >
                                        Type
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        to="/unit-of-measure"
                                        className={({ isActive }) =>
                                        `${isActive ? 'bg-(--chakra-colors-teal-subtle)! text-teal-400!' : '' } flex! items-center gap-2 text-xs! px-4! py-1.5! rounded-sm w-full hover:bg-(--chakra-colors-teal-subtle)!`
                                    }
                                    >
                                        Unit of Measure
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
            </div>

            <Box 
                className="flex items-center gap-3 bg-teal-400/5"
                px={3}
                py={2.5}
                rounded={'md'}
            >
                <Avatar.Root 
                    variant={'subtle'} 
                    colorPalette={'gray'}
                    size={'sm'}
                >
                    <Avatar.Fallback 
                        name="Lebron James" 
                    />
                </Avatar.Root>
                <div className="flex-1 grid">
                    <Heading 
                        size={'sm'} 
                        className="text-nowrap overflow-hidden truncate"
                    >
                        Lebron James 
                    </Heading>
                    <Text 
                        fontSize={'xs'} 
                        color={'fg.subtle'}
                    >
                        Administrator
                    </Text>
                </div>
                {/* <Button 
                    size={'xs'} 
                    colorPalette={'gray'} 
                    variant={'ghost'}
                >
                    <LuEllipsisVertical />
                </Button> */}
                <Menu.Root
                    positioning={{ placement: "top-end" }}
                >
                    <Menu.Trigger asChild>
                        <Button 
                            size={'xs'} 
                            colorPalette={'gray'} 
                            variant={'plain'}
                        >
                            <LuEllipsisVertical />
                        </Button>
                    </Menu.Trigger>
                    <Portal>
                        <Menu.Positioner>
                        <Menu.Content>
                            <Menu.Item value="new-txt" onClick={toggleColorMode}>
                                {colorMode == 'light' ? (
                                    <>
                                        <LuMoon />
                                        Dark Theme
                                    </>
                                ) : (
                                    <>
                                        <LuSun />
                                        Light Theme
                                    </>
                                )}
                            </Menu.Item>
                            {/* <Menu.Item value="new-file">New File...</Menu.Item>
                            <Menu.Item value="new-win">New Window</Menu.Item>
                            <Menu.Item value="open-file">Open File...</Menu.Item>
                            <Menu.Item value="export">Export</Menu.Item> */}
                        </Menu.Content>
                        </Menu.Positioner>
                    </Portal>
                </Menu.Root>
            </Box>

        </aside>
  )
}

export default Sidebar