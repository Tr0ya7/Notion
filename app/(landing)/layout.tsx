import Navbar from "@/components/LandingPage/Navbar"

const PagesLayout = ({ children }: { children: React.ReactNode }) => <div className="h-full"><Navbar /><main className="h-full pt-40">{ children }</main></div>

export default PagesLayout