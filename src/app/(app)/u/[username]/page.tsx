

export default function Page() {
  return (
    <div className="i-font w-9/12 mx-auto flex flex-col mt-10 text-i-white font-serif font-normal gap-4">

        {/* main heading */}
        <h1 className="text-4xl mx-auto">Public Profile Link</h1>

        {/* input feild */}
        <input type="text" placeholder="write your anoymous message here"
          className="mt-6 w-10/12 rounded-lg border border-gray-400/60 h-16 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-i-black4"
        />

        {/* button */}
        <button
          // onClick={handleCopy}
          // disabled={!username}
          aria-label="Copy link"
          className={`
            shrink-0 h-10 px-4 flex items-center gap-2
            rounded-xl border text-[13px] font-medium
            transition-all duration-200
            disabled:opacity-30 disabled:cursor-not-allowed
            active:scale-[0.96] bg-white/[0.07] border-white/[0.1] text-white/70 hover:bg-white/[0.11] hover:text-white/90 w-fit
            
          `}
        >
          Send it
        </button>
      
    </div>
  );
}