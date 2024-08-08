import { Footer } from "./_componets/footer";
import { Navbar } from "./_componets/navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full">
            <Navbar />
            <main className="pt-40 pb-20">
                {children}
            </main>
            <Footer />
        </div>
    )
};
export default MarketingLayout;
