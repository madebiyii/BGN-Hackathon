const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  projectId: 'yy6heh',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",


  },
  env: {
    ...process.env
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    specPattern: '**/*.cy.jsx',

  },
});
