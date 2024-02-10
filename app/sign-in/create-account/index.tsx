import {
  VStack,
  Text,
  FormControl,
  Input,
  Button,
  FlatList,
} from "native-base";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import { useUserContext } from "@/context/user/UserContext";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function CreateAccountScreen() {
  const router = useRouter();
  const { dispatch } = useUserContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.table("User entered their data: ", data);

    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User created: ", user);
        return user;
      })
      .then((user) => {
        // Create the firestore instance of the user
        const userData = {
          displayName: data.username,
          id: user.uid,
          status: "Active",
          email: data.email,
          photoURL: "",
          lastSeen: Date.now(),
          settings: {
            savedMessages: [],
            privacy: {
              blockedUsers: [] as string[],
              lastSeenPolicy: "My contacts",
              profilePhotoPolicy: "My contacts",
              groupInvitePolicy: "My contacts",
            },
            notifications: {
              messageNotifications: {
                notify: true,
                sound: "default",
              },
              groupNotifications: {
                notify: true,
                sound: "default",
              },
            },
            storage: {},
            language: "en",
          },
          chats: {},
        } as User;
        firestore().collection("users").doc(user.uid).set(userData);

        // Set the user's data in the context and navigate to the main menu
        dispatch({ type: "SET_USER_DATA", payload: userData });
        router.replace("/main-menu");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error creating user: ", errorCode, errorMessage);
      });
  };

  const onAuthStateChanged = (user: FirebaseAuthTypes.User) => {
    if (user) {
      console.log("User is signed in");
    } else {
      console.log("User is signed out");
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <VStack
      justifyContent={"center"}
      alignItems={"center"}
      padding={"8"}
      width={"full"}
      space={"4"}
    >
      <Text fontSize={"2xl"} shadow={"9"} color={"main.crisp"}>
        Create account
      </Text>
      <FormControl>
        <FormControl.Label _text={{ color: "main.crisp" }}>
          Username
        </FormControl.Label>
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 3,
            maxLength: 20,
            pattern: /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/,
          }}
          render={({ field: { onChange, value, onBlur } }) => (
            <Input
              placeholder="John Doe"
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
          name="username"
        />
        {errors.username && (
          <Text color={"warning.900"}>
            Username must be 3-20 characters long and contain only letters,
            numbers, spaces, hyphens, and underscores.
          </Text>
        )}
      </FormControl>
      <FormControl>
        <FormControl.Label _text={{ color: "main.crisp" }}>
          Email
        </FormControl.Label>
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          }}
          render={({ field: { onChange, value, onBlur } }) => (
            <Input
              placeholder="johndoe@mail.com"
              keyboardType="email-address"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text color={"warning.900"}>Email should be valid.</Text>
        )}
      </FormControl>
      <FormControl>
        <FormControl.Label _text={{ color: "main.crisp" }}>
          Password
        </FormControl.Label>
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 8,
            pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
          }}
          render={({ field: { onChange, value, onBlur } }) => (
            <Input onChangeText={onChange} value={value} onBlur={onBlur} />
          )}
          name="password"
        />
        {errors.password && (
          <VStack>
            <Text color={"warning.900"}>Your password must:</Text>
            <FlatList
              data={[
                "be at least 8 characters long",
                "contain at least one number",
                "contain at least one special character",
              ]}
              renderItem={({ item }) => (
                <Text color={"warning.900"}>{"* " + item}</Text>
              )}
            />
          </VStack>
        )}
      </FormControl>
      <FormControl>
        <FormControl.Label _text={{ color: "main.crisp" }}>
          Confirm password
        </FormControl.Label>
        <Controller
          control={control}
          rules={{
            required: true,
            validate: (value) => value === watch("password"),
          }}
          render={({ field: { onChange, value, onBlur } }) => (
            <Input onChangeText={onChange} value={value} onBlur={onBlur} />
          )}
          name="confirmPassword"
        />
        {errors.confirmPassword && (
          <Text color={"warning.900"}>Passwords must match.</Text>
        )}
      </FormControl>
      <Button onPress={handleSubmit(onSubmit)}>Create account</Button>
    </VStack>
  );
}
