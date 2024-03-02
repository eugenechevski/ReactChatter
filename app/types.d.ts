import { Image } from 'expo-contacts';

declare interface MainChatMeta {
  isPinned: boolean;
  isMuted: boolean;
  unreadCount: number;
}

declare interface MainUserSettings {
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
  
declare interface MainUser {
    id: string;
    displayName: string;
    photoURL: string;
    status: string;
    lastSeen: number;
    settings: MainUserSettings;
    chats: {
      [chatId: string]: MainChatMeta;
    };
}

declare interface MainChat {
    id: string;
    name: string;
    meta: MainChatMeta;
    photoURL: string;
    description: string;
    isGroup: boolean;
    members: string[];
    messages: { [messageId: string]: string }; // indexed ids of messages
    creator: string;
    lastMessage: string;
}

declare interface MainMessage {
    id: string;
    chatId: string;
    sender: string;
    content: string;
    time: number;
    read: boolean;
    delivered: boolean;
}

declare interface MainContact {
    name: string;
    hasApp: boolean;
    user?: MainUser;
    image?: Image;
}