import Image from "next/image";

const UserCard = ({type}:{type:String}) =>{
    return(
        <div className="rounded-2xl odd:bg-[#0e7490] even:bg-[#155e75] flex-1 p-3 min-w-[130px]">
            <div className="flex justify-between">
                <span className="text-[10px] bg-white px-2 py-1 rounded-full text-slate-600">
                    09/09/2025
                </span>
                <Image src="/more.png" alt={String(type)} width={20} height={20}/>
            </div>
            <h1 className="text-2xl font-semibold my-4 text-[#ecfdf5]">1234</h1>
            <h2 className="text-md text-[#ecfdf5]">{type}</h2>
        </div>
    )
}

export default UserCard;