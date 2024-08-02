import { defineConfig } from "cypress";
import { clerkSetup } from "@clerk/testing/cypress";

export default defineConfig({
  projectId: "g3j5ae",

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      return clerkSetup({ config });
    },
    baseUrl: "http://localhost:3000", // your app's URL
  },
});
