import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

type Props = {
    children: React.ReactNode
    showHero: Boolean

}

const Layout = ({ children, showHero }: Props) => {
    return (
        <div className=" flex flex-col min-h-screen">

            <Header />
            {

                showHero && <Hero />
            }

            <div className=" container mx-auto py-10">{children}</div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    )

}

export default Layout;