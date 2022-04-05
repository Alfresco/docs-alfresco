---
title: Developing ADF based applications
---

In this section, you are going to learn how to develop a custom ADF based application. Once made you can can start adding features, behaviors, and customizations. The creation of this basic ADF-based application is possible through the scaffolding tool called [Yeoman](https://yeoman.io/). This means in a small amount of time you can create a working ADF based application in your development environment.

## Create an ADF based application using the Yeoman Generator

You may consider adopting an ADF-based application in case you want to benefit from the ADF services and visual components provided by the framework. The [Yeoman Generator for Alfresco ADF Applications](https://github.com/Alfresco/generator-alfresco-adf-app) used for this purpose is available for free as an Open Source project on GitHub.

Below you can find the available tutorials on the most common and requested tasks about developing ADF based applications. To debug, test, or troubleshoot, visit [How to debug, test, build, and promote ADW (and ADF-based applications)](https://docs.alfresco.com/digital-workspace/latest/develop/introduction).

### Prerequisites and the requirements

The first thing to do is to check the prerequisites and the requirements to run the front-end application directly into a development environment.

* Alfresco Content Services (ACS) Enterprise edition up and running (identify the URL that will be required as configuration). 

* The latest Long-Time Support (LTS) version of NodeJs.

* A recent (and supported) version of a browser.

All the Angular development is done using the Typescript language. With this in mind, it is highly suggested to adopt a good text editor to help you in this task. Visual Studio Code, a free, lightweight, and powerful tool from Microsoft that works well with Angular development.

### Installing the ADF Yeoman Generator 

**Note:** If you're on Linux or MacOS, you might need to run the following commands using `sudo`.

You need to ensure you have Yeoman installed by running `yo --version`. If this is not already installed, run the following command.

```shell
npm install -g yo
```

Now install the latest version of the Alfresco Yeoman Generator ADF App.

```shell
npm install -g generator-alfresco-adf-app@latest
```

### Install the Angular CLI 

```shell
npm install -g @angular/cli
```

[Angular CLI](https://cli.angular.io/) makes it easy to create components, libraries, and more. You can check what version of the installed version Angular CLI you have installed by using the `ng v` command in the terminal.

### Create your first ADF application 

Now that the system is properly configured you can generate the application running the following command.

```shell
yo alfresco-adf-app
```

Enter a name and choose `Content Services` as the application blueprint, then enter `Y` to install the dependencies (the following questions are optional and easy to understand).

The Yeoman generator will create a new project and install all dependencies required for your application.

**Note:** The Yeoman generator creates a new directory for your project. Make sure you change into this new directory.

### Configure the application to work with Alfresco Content Services 
The next step is to open up the newly-created project in your code editor and open the file `proxy.conf.js`. Change the target property in this file, so it points to your Alfresco Content Services URL and port. Please refer to your installation guide to find this URL, or if you're running an online trial, you will find the information in the email.

Modify `"target": "http://localhost:8080"`, so that it matches your URL and save the file.

Please note that you do not need `/alfresco` at the end of the target URL. Let's say you've launched Alfresco Content Services 6.1 using Docker Compose. Your Alfresco Content Services repository might be available at `http://localhost:8080/alfresco`. In this case, you will want the `proxy.conf.json` file to look like this:

```JSON
module.exports = {
  "/alfresco": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true
  }
};
```

If you're running an online trial, consult your emails for the correct URL. The `proxy.conf.json` should look like this:

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
To run the project, open a terminal and run:

`npm start`
A browser will automatically open up at `http://localhost:4200`.

Click the key icon in the side navigation to log in.

**Note:** If you're running an online trial, you can find your login credentials in the welcome email.

Take a few minutes to explore your application. You have the essential features: Browsing the repository, uploading, and previewing documents.

### Troubleshooting and support 
If you have any issue, there is an entire community available to help you.

In case of problems raise a question into the Alfresco Forum (Application Development Framework section) or connect with the developers into the Alfresco Gitter channel. Being an Alfresco customer or partner you can also raise a request for support into the Alfresco Support Portal.

### Other types of ADF based applications 
In this tutorial, you learned how to create an ADF based application from scratch and run it against an existing instance of Alfresco Content Services. Using the ADF Yeoman Generator, during the creation of the ADF based application, you can decide to use a different application blueprint (content only, content and process, and process only). The tasks described above don’t really change except for the fact that you have to update the URLs of the backend services accordingly.

## Resources

* [Yeoman](https://yeoman.io/)
* [Yeoman Generator for Alfresco ADF Applications](https://github.com/Alfresco/generator-alfresco-adf-app)
* [How to debug, test, build, and promote ADW (and ADF-based applications)](https://docs.alfresco.com/digital-workspace/latest/develop/introduction)
* [NodeJs](https://nodejs.org/en/)
* [Alfresco browser support](https://github.com/Alfresco/alfresco-ng2-components#browser-support)
* [Typescript](https://www.typescriptlang.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [VS Code plugins](https://marketplace.visualstudio.com/VSCode)
* [Angular CLI](https://cli.angular.io/)
* [Alfresco Forum (Application Development Framework section)](https://hub.alfresco.com/t5/application-development/ct-p/developing)
* [Alfresco Gitter channel](https://alfresco.atlassian.net/wiki/spaces/PM/overview)
* [Alfresco Support Portal](https://myalfresco.force.com/support/SiteLogin)
