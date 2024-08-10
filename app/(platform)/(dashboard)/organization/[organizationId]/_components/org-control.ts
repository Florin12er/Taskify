
import { Button } from "@/components/ui/button"
export const OrgControl = () => {
    return (
        <div className= "flex gap-x-2" >
        <Button size="sm" variant = "primary" className = "rounded-sm hidden md:block h-auto py-1.5 px-2" > Create </Button>
            < Button size = "sm" variant = "primary" className = "rounded-sm block md:hidden" > <Plus className="h-4 w-4" /> </Button>
                </div>
    )
}
