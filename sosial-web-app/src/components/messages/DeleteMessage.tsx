import api from "@/config/axios.config";
import { DropdownMenuItem } from "../ui/DropdownMenu";

const DeleteMessageButton: React.FC<{ messageID: number }> = ({ messageID }) => {
    const handleDelete = async () => {
        try {
            await api.delete(`/messages/${messageID}`)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <DropdownMenuItem
            onClick={handleDelete}
            aria-label="delete comment"
            className="text-destructive  focus:bg-red-500 cursor-pointer hover:bg-red-500">
            Delete
        </DropdownMenuItem>
    )
}

export default DeleteMessageButton