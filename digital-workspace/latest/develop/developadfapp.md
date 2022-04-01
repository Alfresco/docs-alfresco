---
title: Developing ADF based applications
---

Create a simple Application Development Framework (ADF) based application using the Yeoman scaffolding tool. In the extention mechanism section, continue development by adding features, behaviors, and customizations.

## Create an ADF based application using the Yeoman Generator

You may consider adopting an ADF-based application in case you want to benefit from the ADF services and visual components provided by the framework. The [Alfresco Yeoman ADF Generator App](https://github.com/Alfresco/generator-alfresco-adf-app) used for this purpose is available for free as an Open Source project on GitHub.

Below you can find the available tutorials on the most common and requested tasks about developing ADF based applications. To debug, test, or troubleshoot, visit the [introduction documentation](https://docs.alfresco.com/digital-workspace/latest/develop/introduction).

### Prerequisites and the requirements

The first thing to do is to [check the prerequisites and the requirements](digital-workspace\latest\develop\index.md) to run the front-end application directly into a development environment.

All the Angular development is done using the Typescript language. With this in mind, it is highly suggested to adopt a good text editor to help you in this task. We recommend Visual Studio Code, a free, lightweight, and powerful tool from Microsoft that works well with Angular development.

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

Angular CLI makes it easy to create components, libraries, and more. For more information on Angular CLI, see **CLI Overview and Command Reference** on the Angular site. You can check what version of the installed version Angular CLI you have installed by using the `ng v` command in the terminal.

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

Take a few minutes to explore your application. You have the essential features: browsing the repository, uploading, and previewing documents.

### Troubleshooting and support 
If you have any issue, there is an entire community available to help you.

In case of problems raise a question into the [Alfresco Forum (Application Development Framework section)](https://hub.alfresco.com/t5/application-development/ct-p/developing) or connect with the developers in Gitter Discussions available in the [Alfresco Builder Network](https://www.alfresco.com/abn/adf/). Being an Alfresco customer or partner you can also request support into the [Alfresco Support Portal](https://myalfresco.force.com/support/SiteLogin).

### Other types of ADF based applications 
In this tutorial, you learned how to create an ADF based application from scratch and run it against an existing instance of Alfresco Content Services. Using the ADF Yeoman Generator, during the creation of the ADF based application, you can decide to use a different application blueprint (content only, content and process, and process only). The tasks described above don’t really change except for the fact that you have to update the URLs of the backend services accordingly.
<!--
## Resources

* [Yeoman](https://yeoman.io/)
* [Alfresco Yeoman ADF Generator App](https://github.com/Alfresco/generator-alfresco-adf-app)
* [How to debug, test, build, and promote ADW (and ADF-based applications)](https://docs.alfresco.com/digital-workspace/latest/develop/introduction)
* [NodeJs](https://nodejs.org/en/)
* [Alfresco browser support](https://github.com/Alfresco/alfresco-ng2-components#browser-support)
* [Typescript](https://www.typescriptlang.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [VS Code plugins](https://marketplace.visualstudio.com/VSCode)
* [Angular CLI](https://cli.angular.io/)
* [Alfresco Forum (Application Development Framework section)](https://hub.alfresco.com/t5/application-development/ct-p/developing)
* Gitter Discussions available in the [Alfresco Builder Network](https://www.alfresco.com/abn/adf/)
* [Alfresco Support Portal](https://myalfresco.force.com/support/SiteLogin)
-->