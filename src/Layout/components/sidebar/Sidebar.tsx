import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import { Avatar, Box, Button, Heading, Menu, Portal, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LuArrowUp10, LuBox, LuBoxes, LuChevronDown, LuCircleUser, LuEllipsisVertical, LuForklift, LuLayoutPanelLeft, LuMoon, LuShoppingCart, LuSun, LuTag } from "react-icons/lu"
import { NavLink } from "react-router-dom"
import SidebarSubLink from "./components/SidebarSubLink";


const Sidebar = () => {

    const { colorMode, toggleColorMode } = useColorMode()

    const [open, setOpen] = useState<Record<string, boolean>>({});
    

    const toggle = (key: string) => {
      setOpen(prev => ({
        ...prev,
        [key]: !prev[key]
      }));
    };

    // const bg = useColorModeValue('white', 'bg.emphisized');
    const bg = useColorModeValue('white', '#0e0e10')


  return (
    <Box 
        bg={bg}
        className="w-0 xl:w-69 flex flex-col gap-6 border-r-0! xl:border-r! border-(--chakra-colors-border) px-0! xl:px-4! py-4! overflow-x-hidden" 
    > 

            <div className="flex items-center justify-center gap-2">
                <LuBox 
                    size={26}
                    className="text-teal-500" 
                />
                <Heading size={'xl'}>
                    Logo
                </Heading> 
            </div>

            <div className="space-y-6! flex-1">

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
                                    `${isActive ? 'bg-(--chakra-colors-teal-subtle)! text-teal-500!' : '' } flex! items-center gap-2 text-sm! px-4! py-2! rounded-sm w-full hover:bg-(--chakra-colors-teal-subtle)!`
                                }
                            >
                                <LuLayoutPanelLeft size={'21px'} className="text-teal-500!" />
                                Dashboard
                            </NavLink>
                        </li>

                        <li className="flex flex-col">
                            <a
                                className="cursor-pointer flex! items-center gap-2 text-sm! px-4! py-2! rounded-sm w-full hover:bg-(--chakra-colors-teal-subtle)!"
                                onClick={() => toggle('inventory')}
                            >
                                <LuBoxes size={'21px'} className="text-teal-500!" />
                                <span className="flex-1">Inventory</span>
                                <LuChevronDown 
                                    size={'19px'}
                                    className={
                                        `${open?.inventory ? '-rotate-90' : ''} transition-transform duration-100`
                                    } 
                                />
                            </a>

                            <div 
                                className={`grid  ease-out duration-100 ${
                                    open?.inventory ? 'grid-rows-[1fr] mt-1.5!' : 'grid-rows-[0fr]'
                                }`}
                            >
                                <ul className="overflow-hidden ml-6! pl-6! space-y-1.5! border-l! border-red-200">
                                    
                                    <SidebarSubLink
                                        to="/inventory-consumable"
                                        label="Consumable"
                                    />
                                    <SidebarSubLink 
                                        to="/inventory-asset"
                                        label="Asset"
                                    />
                                    
                                </ul>
                            </div>

                        </li>


                    </ul>

                </div>


                <div>

                    <Heading
                        fontSize={'xs'}
                        color={'fg.muted'}
                        mb={1.5}
                        textTransform={'uppercase'}
                    >
                        Transaction
                    </Heading>

                    <ul className="flex flex-col gap-1.5 [&>li]:flex!">
                        <li>
                            <NavLink
                                to="/purchase-order"
                                className={({ isActive }) =>
                                    `${isActive ? 'bg-(--chakra-colors-teal-subtle)! text-teal-500!' : '' } flex! items-center gap-2 text-sm! px-4! py-2! rounded-sm w-full hover:bg-(--chakra-colors-teal-subtle)!`
                                }
                            >
                                <LuShoppingCart size={'21px'} className="text-teal-500!" />
                                Purchase Order
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/incoming"
                                className={({ isActive }) =>
                                    `${isActive ? 'bg-(--chakra-colors-teal-subtle)! text-teal-500!' : '' } flex! items-center gap-2 text-sm! px-4! py-2! rounded-sm w-full hover:bg-(--chakra-colors-teal-subtle)!`
                                }
                            >
                                <LuArrowUp10 size={'21px'} className="text-teal-500!" />
                                Incoming
                            </NavLink>
                        </li>
                    </ul>


                    </div>


                <div>

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
                                <LuTag size={'21px'} className="text-teal-500!" />
                                <span className="flex-1">Item</span>
                                <LuChevronDown 
                                    size={'19px'}
                                    className={
                                        `${open?.item ? '-rotate-90' : ''} transition-transform duration-100`
                                    } 
                                />
                            </a>

                            <div 
                                className={`grid  ease-out duration-100 ${
                                    open?.item ? 'grid-rows-[1fr] mt-1.5!' : 'grid-rows-[0fr]'
                                }`}
                            >
                                <ul className="overflow-hidden ml-6! pl-6! space-y-1.5! border-l! border-red-200">
                                    
                                    <SidebarSubLink
                                        to="/item"
                                        label="List"
                                    />
                                    <SidebarSubLink 
                                        to="/brand"
                                        label="Brand"
                                    />
                                    <SidebarSubLink 
                                        to="/category"
                                        label="Category"
                                    />

                                    <SidebarSubLink 
                                        to="/item-type"
                                        label="Type"
                                    />

                                    <SidebarSubLink 
                                        to="/unit-of-measure"
                                        label="Unit of Measure"
                                    />
                                    
                                    
                                </ul>
                            </div>

                        </li>


                        <li className="flex flex-col">
                            <a
                                // className={({ isActive }) =>
                                //     `${isActive ? 'bg-(--chakra-colors-teal-subtle)! text-teal-400!' : '' } flex! items-center gap-2 text-sm! px-4! py-1.5! rounded-sm w-full hover:bg-(--chakra-colors-teal-subtle)!`
                                // }
                                className="cursor-pointer flex! items-center gap-2 text-sm! px-4! py-2! rounded-sm w-full hover:bg-(--chakra-colors-teal-subtle)!"
                                onClick={() => toggle('employee')}
                            >
                                <LuCircleUser size={'21px'} className="text-teal-500!" />
                                <span className="flex-1">Employee</span>
                                <LuChevronDown 
                                    size={'19px'}
                                    className={
                                        `${open?.employee ? '-rotate-90' : ''} transition-transform duration-100`
                                    } 
                                />
                            </a>

                            <div 
                                className={`grid  ease-out duration-100 ${
                                    open?.employee ? 'grid-rows-[1fr] mt-1.5!' : 'grid-rows-[0fr]'
                                }`}
                            >
                                <ul className="overflow-hidden ml-6! pl-6! space-y-1.5! border-l! border-red-200">

                                    <SidebarSubLink 
                                        to="/employee"
                                        label="List"
                                    />

                                    <SidebarSubLink 
                                        to="/department"
                                        label="Department"
                                    />

                                    
                                </ul>
                            </div>
                        </li>

                        <li>
                            <NavLink
                                to="/supplier"
                                className={({ isActive }) =>
                                    `${isActive ? 'bg-(--chakra-colors-teal-subtle)! text-teal-500!' : '' }  flex! items-center gap-2 text-sm! px-4! py-2! rounded-sm w-full hover:bg-(--chakra-colors-teal-subtle)!`
                                }
                            >
                                <LuForklift size={'21px'} className="text-teal-500!"  />
                                Supplier
                            </NavLink>
                        </li>

                    </ul>

                </div>




            </div>

        

        

            <Box 
                className="flex items-center gap-3 bg-teal-500/5"
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
                        </Menu.Content>
                        </Menu.Positioner>
                    </Portal>
                </Menu.Root>
            </Box>

        </Box>
  )
}

export default Sidebar