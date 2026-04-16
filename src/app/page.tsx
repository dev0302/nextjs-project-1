import dbConnect from "./lib/dbConnect";


export default async function page() {
  await dbConnect();
  return (
    <div>page</div>
  )
}

