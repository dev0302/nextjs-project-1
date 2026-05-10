import dbConnect from "./lib/dbConnect";


export default async function page() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  await dbConnect();
  return (
    <div className="i-fonts w-10/12 mx-auto mt-5 flex flex-col items-center justify-center h-[calc(100vh-60px)]">
      <h1>Home Page</h1>
    </div>
  )
}

