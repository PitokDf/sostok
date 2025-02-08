import { Post, Story } from "./types";
import { ApiService } from "./api-services";

const service = new ApiService()

const stories: Story[] = [{
    id: 1,
    type: "img",
    expiresAt: new Date().toISOString(),
    imageUrls: ["/batu_sangkar.png"],
    userID: 2,
    createdAt: new Date().toISOString()
}]

export async function getStories(): Promise<Story[]> {
    const now = new Date().getTime()
    return stories
        .filter(story => new Date(story.expiresAt).getTime() < now)
        .sort((a, b) =>
            new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
}

export async function getPostBeranda(): Promise<Post[]> {
    try {
        const res = await service.get("/posts/users/beranda");
        const posts: Post[] = res.data.data;
        return posts
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function createStory(story: Story): Promise<Story> {
    try {
        const newStory: Story = {
            id: 1,
            imageUrls: ["/"],
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date().toISOString(),
            type: "22",
            userID: 2
        }
        stories.push(newStory);
        return story
    } catch (error) {
        throw error
    }
}