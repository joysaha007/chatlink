import * as ChatApi from "../api/ChatRequest";

export const createChat = (chatData) => async (dispatch) => {
  try {
    // Check if the chat already exists
    const { data: existingChat } = await ChatApi.findChat(
      chatData.senderId.toString(),
      chatData.receiverId.toString()
    );

    if (existingChat) {
      console.log("Chat already exists:", existingChat);
      return existingChat; // Return the existing chat
    }

    // If no chat exists, create a new one
    const { data: newChat } = await ChatApi.createChat({
      senderId: chatData.senderId.toString(),
      receiverId: chatData.receiverId.toString(),
    });

    console.log("Chat created successfully:", newChat);
    return newChat; // Return the newly created chat
  } catch (error) {
    console.error("Error creating or checking chat:", error);
  }
};
