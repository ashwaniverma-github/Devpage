export default function Loading(){
    return <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center text-2xl">
            <Spinner/>
        </div>

    </div>
}


function Spinner(){
    return <div className="flex justify-center items-center">
        <div className=" animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black">
        </div>
    </div>
}