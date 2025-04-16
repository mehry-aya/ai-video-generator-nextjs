import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useVideo } from "@/context/video";
import Image from "next/image";

export default function LoadingModal() {
    const { loading, loadingMessage } = useVideo();
    return (
        <Dialog open={loading}>
            <DialogContent className="sm:max-w-[425px] w-full bg-transparent border-none">
                <DialogHeader>
                    <DialogDescription>
                        <Image
                            src="/chargement.gif"
                            alt="Loading..."
                            width={350}
                            height={350}
                            className="mx-auto rounded-2xl"
                        />
                    </DialogDescription>
                    <br />
                    <DialogTitle className="text-center text-4xl animate-pulse">
                        {loadingMessage}
                    </DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}


