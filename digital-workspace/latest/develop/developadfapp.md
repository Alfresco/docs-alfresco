---
title: Developing Alfresco Development Framework based applications
---

You can develop a custom Alfresco Development Framework application that adds features, behaviors, and customizations. Using the [Yeoman](https://yeoman.io/) scaffolding tool you can quickly create applications for testing in your development environment.

## Create an ADF based application using the Yeoman Generator

Consider adopting an ADF-based application to benefit from the ADF services and visual components provided by the framework. The [Yeoman Generator for Alfresco ADF Applications](https://github.com/Alfresco/generator-alfresco-adf-app) is available for free as an Open Source project on GitHub.

Below you can find the available tutorials on the most common and requested tasks about developing ADF based applications. To debug, test, or troubleshoot, visit [Build, debug, test, and promote the Alfresco Digital Workspace (and ADF-based applications)](https://docs.alfresco.com/digital-workspace/latest/develop/introduction).

### Prerequisites and the requirements

* Alfresco Content Services - Enterprise Edition.
  * Open your browser and check everything starts up correctly:

  ```bash
  Alfresco: http://localhost:8080/alfresco
  ```

* The latest **LTS** version of `Node.js`.

> **Note:** All Angular development is done using the Typescript language.

### Create and start an ADF application

1. To ensure you have Yeoman installed open a command prompt and enter `yo --version`.

    If this is not already installed, run the following command.

      ```shell
      npm install -g yo
      ```

   **Note:** If you're on Linux or MacOS, you might need to run the following commands using `sudo`.

2. Install the latest version of the Alfresco Yeoman Generator ADF App.

   ```shell
   npm install -g generator-alfresco-adf-app@latest
   ```

3. Install the angular CLI

   ```shell
   npm install -g @angular/cli
   ```

   Angular CLI makes it easy to create components, libraries, and more. You can check what version of the installed version Angular CLI you have installed by using the `ng v` command in the terminal.

4. Generate the application running the following command.

   ```shell
   yo alfresco-adf-app
   ```

5. Enter a name and choose **Content Services** as the application blueprint and then enter `Y` to install the dependencies.

   The Yeoman generator will create a new project and install all dependencies required for your application.

   **Note:** The Yeoman generator creates a new directory for your project. You must work within this directory.

7. To configure the application to work with Content Services open the `proxy.conf.js` file in a code editor.

8. Modify `"target": "http://localhost:8080"` so that it matches your Content Services URL and then save the file.

   You do not need `/alfresco` at the end of the target URL. For example, if you've launched Alfresco Content Services using Docker Compose your Alfresco Content Services repository might be available at `http://localhost:8080/alfresco`. In this case, your `proxy.conf.json` file might look like:

   ```JSON
   module.exports = {
     "/alfresco": {
       "target": "http://localhost:8080",
       "secure": false,
       "changeOrigin": true
     }
   };
   ```

   **Note:** If you're running an online trial, the Content Services URL is in the welcome email and the `proxy.conf.json` file might look like:

   ```JSON
   module.exports = {
     "/alfresco": {
       "target": "https://xyz.trials.alfresco.com",
       "secure": false,
       "changeOrigin": true
     }
   };
   ```

9. To start the application, open a command prompt and enter:

   `npm start`

   A browser window will automatically open up at `http://localhost:4200`.

10. Click the key icon in the side navigation to log in.

   **Note:** If you're running an online trial, the Content Services login credentials are in the welcome email.

You can browse, upload, and preview documents in the repository with this application.

### Troubleshooting and support

Ask questions in the Application Development Framework section of the [Alfresco Forum](https://hub.alfresco.com/t5/application-development/ct-p/developing){:target="_blank"} or in the Alfresco [Gitter Discussions](https://gitter.im/Alfresco/alfresco-ng2-components){:target="_blank"}. If you are an Alfresco customer or partner you can also request support in the [Alfresco Support Portal](https://myalfresco.force.com/support/SiteLogin){:target="_blank"}.
