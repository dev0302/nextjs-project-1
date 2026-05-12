import dbConnect from "./lib/dbConnect";


export default async function page() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  await dbConnect();
  return (
    // className="i-fonts w-10/12 mx-auto mt-5 flex flex-col items-center justify-center h-[calc(100vh-60px)]"

       <div className="i-fonts w-10/12 mx-auto flex flex-col mt-10">

        <div className="text-3xl font-bold text-[#f5f5f7f6] mt-14">
          Home Page
        </div>

      </div>
    
  )
}

