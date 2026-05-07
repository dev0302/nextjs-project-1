
import MessageCard from "@/components/MessageCard"
import "../../(auth)/sign-up/sign-up.css"
import MessageToggle from "@/components/MessageToogle"
import CopyLink from "@/components/CopyLink"
import RefreshButton from "@/components/RefreshButton"

export default function page() {
  return (
    <div className="signup-page w-10/12 mx-auto flex flex-col">
        <div className="text-3xl font-bold text-[#f5f5f7f6] mt-14">User Dashboard</div>

        <div className="my-4 flex gap-2 w-full ">
          
          <MessageToggle></MessageToggle>
          <CopyLink></CopyLink>

        </div>

        <div className="w-full h-px bg-white/15 my-4" />
        
        {/* Message Card */}
        <div className="mt-4">
          <RefreshButton></RefreshButton>
          <MessageCard></MessageCard>
        </div>

        
    </div>
  )
}
