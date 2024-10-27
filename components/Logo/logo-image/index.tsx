import Image from "next/image";

const LogoImage = () => (
    <>
        <Image className="dark:hidden" src="/logo.svg" width="40" height="40" alt="Logo" />
        <Image className="hidden dark:block" src="/black-logo.svg" width="40" height="40" alt="Logo" />
    </>
)

export default LogoImage