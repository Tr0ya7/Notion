import Navbar from "@/components/Navbar"

const PagesLayout = ({ children }: { children: React.ReactNode }) => <div className="h-full"><Navbar /><main className="h-full pt-40">{ children }</main></div>

export default PagesLayout