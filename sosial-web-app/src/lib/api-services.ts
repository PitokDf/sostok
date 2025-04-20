import api from "@/config/axios.config"

export const getConversationList = async () => {
    const res = await api.get(`/conversations`)
    return res.data
}

export const sendMessage = async (conversationID: string, data: { content: string, receiverID: number }) => {
    const res = await api.post(`/conversations/${conversationID}/message`, data)
    api.post(`/conversations/${conversationID}/stop-typing`);
    return res.data
}