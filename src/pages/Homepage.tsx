import { MacbookScroll } from "@/components/ui/macbookScroll"
import Navbar from "@/components/navbar"

export default function Homepage(){

    return (
        <div>
            <Navbar/>
            <MacbookScroll src={`/macwall (3).png`}  />
        </div>
    );
}
