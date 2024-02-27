import { VStack, HStack, Box } from "native-base";
import { Slot } from "expo-router";
import { Link } from "expo-router";
import IconBox from "@/components/IconBox";
import MainIcon from "@/components/MainIcon";
import { useContactsContext } from "@/context/contacts/ContactsContext";
import { useEffect } from "react";
import * as Contacts from "expo-contacts";
import firestore from '@react-native-firebase/firestore';
import { MainContact, MainUser } from "@/types";

export default function MainMenuLayout() {
  const { dispatch } = useContactsContext();

  // Fetch user's contacts
  useEffect(() => {
    (async () => {
      // Request contacts permission
      const { status } = await Contacts.requestPermissionsAsync();

      if (status === "granted") {
        // Fetch contacts from the user's device
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
        });

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
            const user = await firestore().collection('users').where('phoneNumber', '==', contact.phoneNumbers[0].number).get();
            if (!user.empty) {
              mainContact.hasApp = true;
              mainContact.user = (user.docs[0].data() as MainUser);
            }

            contacts.push(mainContact);
          }

          // Set contacts in context
          dispatch({ type: "SET_CONTACTS", payload: contacts });
        }
      }
    })
  }, []);

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
