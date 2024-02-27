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

import { useForm, Controller } from "react-hook-form";

import { useState, useEffect } from "react";
import { useRouter, Link } from "expo-router";

import { useUserContext } from "@/context/user/UserContext";

import { MainUser } from "@/types";

type FormData = {
  email: string;
  password: string;
};

export default function SignInScreen() {
  const router = useRouter();
  const { dispatch } = useUserContext();
  const [isFound, setIsFound] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormData) => {
    // Check if the user has an account
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          console.table("User does not exist!");
          setIsFound(false);
        }
      });
  };

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    if (user) {
      // Set user credential and data
      dispatch({ type: "SET_USER_CREDENTIAL", payload: user });
      firestore().collection("users").doc(user.uid).get().then((doc) => {
        if (doc.exists) {
          dispatch({ type: "SET_USER_DATA", payload: doc.data() as MainUser });
        }
      });
      router.push("/main-menu");
    }
  }

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
        Returning user
      </Text>
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
      <Link href={'/sign-in/create-account'}>
        <Text color={"main.crisp"} shadow={"9"}>
          Create an account
        </Text>
      </Link>
      {!isFound && (
        <Text color={"warning.900"}>User does not exist. Please sign up.</Text>
      )}
      <Button onPress={handleSubmit(onSubmit)} width={32}>Sign-in</Button>
    </VStack>
  );
}
