
const Footer = () => {
    return (
        <div className="bg-orange-500 py-8">

            <div className="container mx-auto flex flex-col gap-4 md:flex-row  md:justify-between items-center  text-white  ">
                <div className="text-3xl font-bold tracking-tighter">
                    <span>MernEats.com</span>
                </div>
                <div className="flex gap-3">
                    <span>Privacy Policy</span>
                    <span>Terms of services</span>
                </div>

            </div>
        </div>
    )
}

export default Footer