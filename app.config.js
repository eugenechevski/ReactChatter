export default {
  expo: {
    name: "ReactChatter",
    slug: "react-chatter",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/logo.png",
    userInterfaceStyle: "light",
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      googleServicesFile: process.env.GOOGLE_SERVICES_PLIST || './GoogleService-Info.plist',
      bundleIdentifier: "eugenechevski.reactchatter",
    },
    web: {
      favicon: "./assets/images/logo.png",
    },
    plugins: [
      "@react-native-firebase/app",
      "@react-native-firebase/perf",
      "@react-native-firebase/crashlytics",
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
    ],
    android: {
      package: "eugenechevski.reactchatter",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON || "./google-services.json",
    },
    extra: {
      eas: {
        projectId: "4642cea0-c9d7-4073-9b4f-8f3efaec2697",
      },
    },
    owner: "eugenechevski",
  },
};
