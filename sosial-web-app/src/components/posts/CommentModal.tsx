
import { FormEvent, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import { ScrollArea } from "../ui/ScrollArea";
import { Comment } from "@/lib/types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/DropdownMenu";
import { Button } from "../ui/Button";
import { MoreHorizontal, Send, Trash2 } from "lucide-react";
import api from "@/config/axios.config";
import { Input } from "../ui/Input";
import Username from "../ui/Username";
import ProfilePicture from "../ProfilePicture";
import { getFromLocalStorage } from "@/lib/storage";

interface CommentModalProps {
    postID: number
    isOpen: boolean
    onClose: () => void
}

export default function CommentModal({ postID, isOpen, onClose }: CommentModalProps) {
    const [comments, setComments] = useState<Comment[]>([])
    const user = getFromLocalStorage("user")
    const [newComment, setNewComment] = useState<string>("")

    const getComments = async () => {
        try {
            const res = await api.get(`/posts/${postID}/comments`)
            setComments(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { getComments() }, [postID])

    const handleSendComment = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const res = await api.post(`/posts/${postID}/comments`, { text: newComment })
            setNewComment("")
            setComments([res.data.data, ...comments])
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteComment = async (commentID: number) => {
        try {
            const res = await api.delete(`/posts/${commentID}/comments`)
            setComments(comments.filter(comment => comment.id !== res.data.data.id))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent aria-label="comment content" aria-describedby="comment content" className="sm:max[500px] h-[600px] bg-card flex flex-col">
                <DialogHeader>
                    <DialogTitle>Comments</DialogTitle>
                </DialogHeader>
                <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-6">
                        {comments.length > 0 ?
                            comments.map(comment => (
                                <div
                                    className="space-y-4"
                                    key={comment.id}>
                                    <div className="flex justify-between items-start">
                                        <div className="flex space-x-3">
                                            <ProfilePicture user={comment.user} className="flex h-9 w-9 items-center justify-center rounded-full bg-muted" />
                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-center space-x-2">
                                                    <Username username={comment.user.username} isVerified={comment.user.isVerified} className="font-semibold text-sm" />
                                                    <span className="text-xs text-muted-foreground">{new Date(comment.createdAt!).toLocaleDateString('ID', {
                                                        month: 'short',
                                                        day: "numeric"
                                                    })}</span>
                                                </div>
                                                <p className="text-xm break-words">{comment.text}</p>
                                            </div>
                                        </div>
                                        {comment.user.username === user?.username && (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant={"ghost"} size={'icon'} className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        aria-label="delete comment"
                                                        onClick={() => { handleDeleteComment(comment.id!) }}
                                                        className="text-destructive  focus:bg-red-500 cursor-pointer hover:bg-red-500">
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )}
                                    </div>
                                </div>
                            )) : (
                                <div className="flex justify-center items-center h-[430px] text-gray-500">No comment yet</div>
                            )}
                    </div>
                </ScrollArea>
                <form className="flex flex-col gap-2 pt-4 border-t" onSubmit={handleSendComment}>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Add a comment..."
                            className="flex-1"
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                        />
                        <Button aria-label="send comment" type="submit" size={'icon'} disabled={!newComment.trim()}>
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog >
    );
}