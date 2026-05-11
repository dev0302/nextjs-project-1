"use client"
import { ApiResponse } from "@/app/types/ApiResponse";
import axios, { AxiosResponse } from "axios";
import { Key, Loader2 } from "lucide-react";
import { Fascinate_Inline } from "next/font/google";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import "@/app/(auth)/sign-up/sign-up.css"
export default function SendMessageProfile({username}: { username: string;}) {

  // 1. fetch username from url
  //  const params = useParams();
  //  const {username} = params;

  // no need of now, since getting from page.tsx (server component)
    


  // 2. content? create usestate for it
  const[content, setContent] = useState("");

  // 3. another usestate for submitting loader
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isSuggesting, setIsSuggesting] = useState(false);

  const [suggestions, setSuggestions] = useState<string[]>([]);

  // 4. for input box below message
  interface SendResponseType {
    success: boolean;
    message: string;
  }

  const [sendResponse, setSendResponse] = useState<SendResponseType | null>(null);


  async function onSend() {

    // frontend validation
    if (!content.trim()) {
      toast.error("Message cannot be empty");
      setSendResponse({
        success: false,
        message: "Message cannot be empty",
      });
      setTimeout(() => {
        setSendResponse({
          success: false,
          message: "",
        });
      }, 4000);
      return;
    }

    try {
      setIsSubmitting(true);

      const response: AxiosResponse<ApiResponse> = await axios.post("/api/send-message", { username, content });
      
      toast.success(response.data.message); //as sent by backend
      setSendResponse({
        success: response.data.success,
        message: response.data.message,
      });

      setContent("");

    } catch (error) {
      // axios error
      if (axios.isAxiosError(error)) {

        // backend custom error message
        const errorMessage =
          error.response?.data?.message ||
          "Something went wrong";

        toast.error(errorMessage);
        setSendResponse({
          success: false,
          message: errorMessage
        });

      } else {
        toast.error("Unexpected error occurred");
        setSendResponse({
          success: false,
          message: "Unexpected error occurred",
        });
    
      }

    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 200);
      
      setTimeout(() => {
        setSendResponse({
          success: false,
          message: "",
        });
      }, 4000);
    }
  }

  async function onSuggestClick() {

    setIsSuggesting(true);
    setSuggestions([]);

    try {

      const response = await axios.get<{ success: boolean; suggestions: string }>("/api/suggest-messages");

      if (response.data.success) {

        const allSuggestions = response.data.suggestions.split("||").map((s)=>s.trim()).filter(Boolean);
        console.log(allSuggestions);
        setSuggestions(allSuggestions);
        
      }
      
    } catch (error) {
      
    } finally {
       setIsSuggesting(false);
    }
  }

  const onSelectSuggestion = (text: string) => {
    setContent(text);
    // smooth scroll to top of card
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="i-fonts w-9/12 mx-auto flex flex-col mt-24 mb-6 text-i-white font-serif font-normal gap-4">

        {/* main heading */}
        <h1 className="animation-1 text-4xl mx-auto font-bold text-[#f5f5f7e4]">Public Profile Link</h1>

        {/* input feild */}
        <div className="relative mt-2 flex flex-col gap-1 ">
            <p className={` ml-2 text-[12px] tracking-[0.5px] text-[#64cbf4dc] min-h-[18px] transition-opacity duration-200 ${content.length > 0 ? "opacity-100" : "opacity-0"} `} >
              
              send anonymous message to @{username}

            </p>

            <input type="text" placeholder="write your anonymous message here"
              value={content}
              onChange={(e)=>setContent(e.target.value)}
              className="animation-2 w-10/12 rounded-lg border border-gray-400/60 h-16 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-i-black4"
            />

            <p className={` absolute bottom-[-25px] right-44 ml-2 text-[12px] tracking-[0.5px] min-h-[18px]  duration-200  transition-all duration-300 ease-out ${
              sendResponse?.message
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            } ${sendResponse?.success ? "text-[#32d74b]" : "text-[#ff453a]"} `} >
              
              {sendResponse?.message}

            </p>
        </div>
        

        {/* button */}
        <button
          onClick={onSend}
          disabled={isSubmitting}
          className={` animation-3
            shrink-0 h-10 px-4 flex items-center gap-2
            rounded-xl border text-[13px] font-medium cursor-pointer
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            active:scale-[0.96] hover:text-white/90 w-fit
            ${isSubmitting
              ? "bg-[#50f7694c] border-[#32d74b]/20 text-i-white"
              : "bg-white/[0.07] border-white/[0.1] text-white/70 hover:bg-white/[0.11] hover:text-white/90"
            } `}
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin mr-0" />}
          { isSubmitting ? "Sending..." : "Send It" }
          
        </button>


        {/* suggest message section */}
        <div className="mt-4 flex flex-col gap-2 i-fonts ">
          {/* button */}
          <button
            onClick={onSuggestClick}
            disabled={isSuggesting}
            className={` animation-4
              shrink-0 h-10 px-4 flex items-center gap-2
              rounded-xl border text-[13px] font-medium
              transition-all duration-200 cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed
              active:scale-[0.96] hover:text-white/90 w-fit
              ${isSuggesting
                ? "bg-[#50f7694c] border-[#32d74b]/20 text-i-white"
                : "bg-white/[0.07] border-white/[0.1] text-white/70 hover:bg-white/[0.11] hover:text-white/90"
              } `}
          >
            {isSuggesting && <Loader2 className="w-4 h-4 animate-spin mr-0" />}
            { isSuggesting ? "Generating..." : "Suggest Messages" }
            
          </button>

          {/* heading */}
          <p className="animation-5  ml-2 text-i-white/90">Click on any message below to select it.</p>

          <div className = "animation-6 flex flex-col gap-3 bg-white/4 border border-white/8 rounded-2xl px-5 py-4 backdrop-blur-xl shadow-[0_2px_16px_rgba(0,0,0,0.3),inset_0_0_0_0.5px_rgba(255,255,255,0.04)] w-11/12">

              <span className="text-[15px] font-semibold text-white/70 tracking-[-0.2px]">
                Messages
              </span>

              
                {/* suggested messages field */}
                <div className = "flex flex-col overflow-hidden gap-4" >

                  {
                    suggestions.map((suggestion,index) => {
                      
                      return ( 
                        <span key={index} className="text-[13px] py-2  text-white/40 truncate bg-white/5 border border-white/8 rounded-xl px-3.5 w-11/12 cursor-pointer hover:bg-white/10 transition-all duration-200 ease-in"
                        onClick={()=>onSelectSuggestion(suggestion)}
                        >
                          {suggestion}
                        </span>
                      )
                    })
                  }

                </div>
            
            
          </div>

        </div>
      
    </div>
  );
}