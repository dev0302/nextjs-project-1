import { cookies } from 'next/headers';
import MessageGrid from './MessageGrid';

export default async function MessageCard() {

  const cookieStore = await cookies();

  const response = await fetch("http://localhost:3000/api/get-messages", {
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const data = await response.json();
  const messages = data.messages ?? [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-2">
      {/* your CopyLink, MessageToggle etc above */}
      <MessageGrid initialMessages={messages} />
    </div>
  );
}