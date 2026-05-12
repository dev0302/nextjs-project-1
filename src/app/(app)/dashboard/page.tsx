import MessageCard from "@/components/MessageCard";
import "../../(auth)/sign-up/sign-up.css";
import MessageToggle from "@/components/MessageToogle";
import CopyLink from "@/components/CopyLink";
import { Suspense } from "react";

import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";

import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/app/lib/auth";

function MessagesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-48 rounded-2xl bg-white/4 animate-pulse"
        />
      ))}
    </div>
  );
}

export default async function Dashboard() {

  const session = await getServerSession(NEXT_AUTH_CONFIG);

  await dbConnect();

  const user = await User.findById(session?.user._id)
    .select("isAcceptingMessages")
    .lean();

  return (
    <div className="signup-page w-10/12 mx-auto flex flex-col mt-10">

      <div className="text-3xl font-bold text-[#f5f5f7f6] mt-14">
        User Dashboard
      </div>

      <div className="my-4 flex gap-2 w-full sm:flex-row flex-col">

        <MessageToggle
          initialIsAccepting={
            user?.isAcceptingMessages ?? false
          }
        />

        <CopyLink />

      </div>

      <div className="w-full h-px bg-white/15 my-4" />

      <div className="mt-4">
        <Suspense fallback={<MessagesSkeleton />}>
          <MessageCard />
        </Suspense>
      </div>

    </div>
  );
}