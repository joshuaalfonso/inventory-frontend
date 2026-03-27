import { useTheme } from "next-themes";
import { Toaster } from "sileo";



const SileoToaster = () => {

    const {theme} = useTheme();

    const isDark = theme === "dark";

    return (
        // <Toaster
        //     position="top-right"
        //     options={{
        //     fill: isDark ? "#171717" : "#ffffff",
        //     styles: {
        //         description: isDark ? "text-white/75" : "text-black/75",
        //     },
        //     }}
        // />
        <Toaster
        
            position="top-right"
            options={{
                fill: isDark ? "#171717" : "#ffffff",
                styles: {
                    
                }
            }}
            offset={{ top: 20, right: 16 }}
            
        />
    )
}

export default SileoToaster