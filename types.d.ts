declare interface ChatMeta {
  isPinned: boolean;
  isMuted: boolean;
  unreadCount: number;
}

declare interface UserSettings {
    savedMessages: string[];
    privacy: {
      blockedUsers: string[];
      lastSeenPolicy: string;
      phoneNumberPolicy: string;
      profilePhotoPolicy: string;
      groupInvitePolicy: string;
    };
    notifications: {
      messageNotifications: {
        notify: boolean;
        sound: string;
      };
      groupNotifications: {
        notify: boolean;
        sound: string;
      };
    };
    storage: Record<string, { dataStored: number }>;
    language: string;
  }
  
declare interface User {
    id: string;
    displayName: string;
    phoneNumber: string;
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