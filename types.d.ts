declare interface ChatMeta {
  isPinned: boolean;
  isMuted: boolean;
  unreadCount: number;
}

declare interface UserSettings {
    savedMessages: string[];
    privacy: {
      blockedUsers: string[];
      lastSeenPolicy: "My contacts" | "Nobody" | "Everyone";
      profilePhotoPolicy: "My contacts" | "Nobody" | "Everyone";
      groupInvitePolicy: "My contacts" | "Nobody" | "Everyone";
    };
    notifications: {
      messageNotifications: {
        notify: boolean;
        sound: "default";
      };
      groupNotifications: {
        notify: boolean;
        sound: "default";
      };
    };
    storage: Record<string, { dataStored: number }>;
    language: string;
  }
  
declare interface User {
    id: string;
    displayName: string;
    photoURL: string;
    status: string;
    lastSeen: number;
    settings: UserSettings;
    chats: {
      [chatId: string]: ChatMeta;
    };
}

declare interface Chat {
    id: string;
    name: string;
    photoURL: string;
    description: string;
    isGroup: boolean;
    members: string[];
    messages: string[];
    creator: string;
    lastMessage: string;
}

declare interface Message {
    id: string;
    chatID: string;
    sender: string;
    content: string;
    time: number;
    read: boolean;
    delivered: boolean;
}