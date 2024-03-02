import { VStack, HStack, Box } from "native-base";

import { Slot } from "expo-router";
import { Link } from "expo-router";
import * as Contacts from "expo-contacts";

import { useEffect } from "react";
import { Platform } from "react-native";

import IconBox from "@/components/IconBox";
import MainIcon from "@/components/MainIcon";

import { useUserContext } from "@/context/user/UserContext";
import { useContactsContext } from "@/context/contacts/ContactsContext";
import { useChatsContext } from "@/context/chats/ChatsContext";

import firestore from "@react-native-firebase/firestore";

import { MainChat, MainContact, MainMessage, MainUser } from "@/types";

export default function MainMenuLayout() {
  const { state } = useUserContext();
  const { dispatch: dispatchChats } = useChatsContext();
  const { dispatch: dispatchContacts } = useContactsContext();

  // Fetch user's contacts if on mobile
  useEffect(() => {
    if (Platform.OS === "web") return;

    (async () => {
      // Request contacts permission
      const { status } = await Contacts.requestPermissionsAsync();

      if (status === "granted") {
        // Fetch contacts from the user's device
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.Name,
            Contacts.Fields.Emails,
            Contacts.Fields.PhoneNumbers,
          ],
        });

        console.log(data);

        if (data.length > 0) {
          // Build contacts array
          const contacts: MainContact[] = [];
          for (const contact of data) {
            const mainContact: MainContact = {
              name: contact.name,
              hasApp: false,
              image: contact.imageAvailable ? contact.image : null,
            };

            // Determine if the contact has the app
            // If so, fetch their user data from firestore
            const user = await firestore()
              .collection("users")
              .where("phoneNumber", "==", contact.phoneNumbers[0].number)
              .get();
            if (!user.empty) {
              mainContact.hasApp = true;
              mainContact.user = user.docs[0].data() as MainUser;
            }

            contacts.push(mainContact);
          }

          // Set contacts in context
          dispatchContacts({ type: "SET_CONTACTS", payload: contacts });
        }
      }
    })();
  }, []);

  // Fetch user's chats & messages
  useEffect(() => {
    (async () => {
      const metaChats = state.userData.chats;
      const chats: { [chatId: string]: MainChat } = {};
      const messages: { [messageId: string]: MainMessage } = {};

      // Fetch chats from firestore
      for (const chatId in metaChats) {
        const chat = await firestore().collection("chats").doc(chatId).get();
        if (chat.exists) {
          chats[chatId] = chat.data() as MainChat;

          // Fetch messages from chat
          const chatMessages = chats[chatId].messages;
          for (const messageId in chatMessages) {
            const message = await firestore()
              .collection("messages")
              .doc(messageId)
              .get();
            if (message.exists) {
              messages[messageId] = message.data() as MainMessage;
            }
          }
        }
      }

      // Set chats in context
      dispatchChats({
        type: "SET_CHATS",
        payload: chats,
      });

      // Set messages in context
      dispatchChats({
        type: "SET_MESSAGES",
        payload: messages,
      });
    })();
  }, [state.userData.chats]);

  return (
    <VStack
      flex={1}
      height={"full"}
      width={"full"}
      alignItems="center"
      justifyContent="center"
    >
      {/** Child root */}
      <Box height={"90%"} width={"full"}>
        <Slot />
      </Box>
      <HStack
        width={"full"}
        height={"10%"}
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingX={"5"}
        borderTopColor={"main.crisp"}
        borderTopWidth={"2"}
      >
        <IconBox>
          <Link href="/main-menu/contacts">
            <MainIcon iconName={"contacts"} provider="ant" size={48} />
          </Link>
        </IconBox>
        <IconBox>
          <Link href="/main-menu/chats">
            <MainIcon iconName={"chatbubble-ellipses"} provider="ion" />
          </Link>
        </IconBox>
        <IconBox>
          <Link href="/settings">
            <MainIcon iconName={"wrench"} provider="foundation" />
          </Link>
        </IconBox>
      </HStack>
    </VStack>
  );
}
