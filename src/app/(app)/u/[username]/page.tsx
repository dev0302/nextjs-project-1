import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";
import SendMessageProfile from "@/components/SendMessageProfile";


export async function generateStaticParams() {
  await dbConnect();

  const users = await User.find({})
    .select("username")
    .lean();

  return users.map((user) => ({
    username: user.username,
  }));
}

export const revalidate = 60;

export default async function Page({ params, }: { params: { username: string }; }) {
  const { username } = await params;
  return (
    <SendMessageProfile username={username} />
  );
}