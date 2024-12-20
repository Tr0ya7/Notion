import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useCoverImage } from "@/hooks/useCoverImage"
import { useEdgeStore } from "@/lib/edgestore"
import { cn } from "@/lib/utils"
import { useMutation } from "convex/react"
import { ImageIcon, X } from "lucide-react"
import Image from "next/image"
import { useParams } from "next/navigation"

interface CoverProps {
    url?: string
    preview?: boolean
}

const Cover = ({ url, preview }: CoverProps) => {
    const coverImage = useCoverImage()
    const params = useParams()
    const removeCoverImage = useMutation(api.documents.removeCoverImage)
    const { edgestore } = useEdgeStore()

    const onRemove = async () => {
        if (url) await edgestore.publicFiles.delete({ url: url })

        removeCoverImage({ id: params.documentId as Id<"documents"> })
    }

    return (
        <div className={cn("relative w-full h-[35vh] group", !url && "h-[12vh]", url && "bg-muted")}>
            { !!url && <Image className="object-cover" src={ url } fill alt="Cover" /> }
            { url && !preview &&
                <div className="opacity-0 absolute bottom-5 right-5 flex items-center gap-x-2 group-hover:opacity-100">
                    <Button className="text-muted-foreground text-xs" variant="outline" size="sm" onClick={() => coverImage.onReplace(url)}>
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Change cover
                    </Button>
                    <Button className="text-muted-foreground text-xs" variant="outline" size="sm" onClick={() => onRemove()}>
                        <X className="w-4 h-4 mr-2" />
                        Remove
                    </Button>
                </div>
            }
        </div>
    )
}

Cover.Skeleton = function CoverSkeleton() {
    return <Skeleton className="w-full h-[12vh]" />
}

export default Cover