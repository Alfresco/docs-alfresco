---
title: Developing Alfresco Development Framework based applications
---

Develop a custom Alfresco Development Framework (ADF) based application to add features, behaviors, and customizations. The creation of this basic ADF-based application is possible through the scaffolding tool called Yeoman. This means in a small amount of time you can create a working ADF based application in your development environment.

## Create an ADF based application using the Yeoman Generator

Consider adopting an ADF-based application to benefit from the ADF services and visual components provided by the framework. The [Yeoman Generator for Alfresco ADF Applications](https://github.com/Alfresco/generator-alfresco-adf-app) is available for free as an Open Source project on GitHub.

Below you can find the available tutorials on the most common and requested tasks about developing ADF based applications. To debug, test, or troubleshoot, visit [Build, debug, test, and promote the Alfresco Digital Workspace (and ADF-based applications)](https://docs.alfresco.com/digital-workspace/latest/develop/introduction).

### Prerequisites and the requirements

To develop an Alfresco front-end application, make sure the required software is available on your system:

* Alfresco Content Services (ACS) Enterprise edition

* The latest **14** version of Node.js (available on their site **Home** or **Downloads** page)

All the Angular development is done using the Typescript language. It is highly suggested to adopt a good text editor to help you in this task. Visual Studio Code, a free, lightweight, and powerful tool from Microsoft that works well with Angular development.

### Installing the ADF Yeoman Generator

1. You need to ensure you have Yeoman installed by running `yo --version`. If this is not already installed, run the following command.

   ```shell
   npm install -g yo
   ```
   **Note:** If you're on Linux or MacOS, you might need to run the following commands    using `sudo`.

2. Install the latest version of the Alfresco Yeoman Generator ADF App.

   ```shell
   npm install -g generator-alfresco-adf-app@latest
   ```

### Install the Angular CLI

```shell
npm install -g @angular/cli
```

Angular CLI makes it easy to create components, libraries, and more. You can check what version of the installed version Angular CLI you have installed by using the `ng v` command in the terminal.

### Create your first ADF application

Generate the application running the following command.

```shell
yo alfresco-adf-app
```

Enter a name and choose `Content Services` as the application blueprint, then enter `Y` to install the dependencies (the following settings are optional).

The Yeoman generator will create a new project and install all dependencies required for your application.

**Note:** The Yeoman generator creates a new directory for your project. Make sure you change into this new directory.

### Configure the application to work with Alfresco Content Services
1. Open the project in your code editor.
2. Open the file `proxy.conf.js`.
3. Change the target property in this file, so it points to your Alfresco Content Services URL and port. Please refer to your installation guide to find this URL, or if you're running an online trial, you will find the information in the email.
4. Modify `"target": "http://localhost:8080"`, so that it matches your URL and save the file.

   You do not need `/alfresco` at the end of the target URL. For example, you've launched Alfresco Content Services 6.1 using Docker Compose. Your Alfresco Content Services repository might be available at `http://localhost:8080/alfresco`. In this case, you will want the `proxy.conf.json` file to look like this:

   ```JSON
   module.exports = {
     "/alfresco": {
       "target": "http://localhost:8080",
       "secure": false,
       "changeOrigin": true
     }
   };
   ```

   If you're running an online trial, consult your emails for the correct URL. The    `proxy.conf.json` should look like this:

   ```JSON
   module.exports = {
     "/alfresco": {
       "target": "https://xyz.trials.alfresco.com",
       "secure": false,
       "changeOrigin": true
     }
   };
   ```

### Start the application

1. To run the project, open a terminal and run:

   `npm start`

   A browser will automatically open up at `http://localhost:4200`.

2. Click the key icon in the side navigation to log in.

   **Note:** If you're running an online trial, you can find your login credentials in the welcome email.

These essential features are available: browsing the repository, uploading, and previewing documents.

### Troubleshooting and support

For troubleshooting, browse and ask questions in the Alfresco Forum (Application Development Framework section) or connect with the developers into the Alfresco Gitter channel. As an Alfresco customer or partner, seek support in the Alfresco Support Portal.
