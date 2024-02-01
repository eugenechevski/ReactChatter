import { useGlobalSearchParams } from "expo-router";
import {
  VStack,
  Text,
  FormControl,
  Input,
  Button,
  FlatList,
} from "native-base";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

type FormData = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function CreateAccountScreen() {
  const phoneNumber = useGlobalSearchParams()["phone-number"];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form data: ", data);
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User created: ", user);
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
        Create account for {phoneNumber}
      </Text>
      <FormControl>
        <FormControl.Label _text={{ color: "main.crisp" }}>
          Display name
        </FormControl.Label>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value, onBlur } }) => (
            <Input
              placeholder="John Doe"
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
          name="displayName"
        />
      </FormControl>
      <FormControl>
        <FormControl.Label _text={{ color: "main.crisp" }}>
          Email
        </FormControl.Label>
        <Controller
          control={control}
          rules={{
            required: true,
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
          }}
          render={({ field: { onChange, value, onBlur } }) => (
            <Input
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
          name="password"
        />
        {errors.password && (
          <VStack>
            <Text color={"warning.900"}>Password must:</Text>
            <FlatList
              data={[
                "be at least 8 characters long",
                "contain at least one number",
                "contain at least one special character",
              ]}
              renderItem={({ item }) => (
                <Text color={"warning.900"}>{item}</Text>
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
          }}
          render={({ field: { onChange, value, onBlur } }) => (
            <Input
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
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
