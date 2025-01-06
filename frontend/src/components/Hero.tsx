import hero from "../assets/hero.png"
const Hero = () => {
    return (
        <div>
            <img src={hero} className="min-w-full max-h-[600px] object-cover" alt="image" />
        </div>
    )
}

export default Hero