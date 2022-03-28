---
title: Developing ADF based applications
---

In this section, you are going to learn how to develop a custom ADF based application. Once made you can can start adding features, behaviors, and customizations. The creation of this basic ADF-based application is possible through the scaffolding tool called [Yeoman](https://yeoman.io/). This means in a small amount of time you can create a working ADF based application in your development environment.

You may consider adopting an ADF-based application in case you want to benefit from the ADF services and visual components provided by the framework. The [Alfresco Yeoman Generator](https://github.com/Alfresco/generator-alfresco-adf-app) used for this purpose is available for free as an Open Source project on GitHub.

Below you can find the available tutorials on the most common and requested tasks about developing ADF based applications. To debug, test, or troubleshoot, visit [How to debug, test, build, and promote ADW (and ADF-based applications)](https://docs.alfresco.com/digital-workspace/latest/develop/introduction).

## Create an ADF based application using the Yeoman Generator
<!-- Jump-to links navigation -->
* [Prerequisites and the requirements](#Prereqs)
* [Installing the ADF Yeoman Generator](#ADFYeoman)
* [Installing the Angular CLI](#Angular)
* [Create your first ADF application](#CreateADF)
* [Configure the application to work with Alfresco Content Services](#Configure)
* [Start the application](#Start)
* [Troubleshooting and support](#Troubleshooting)
* [Other types of ADF based applications](#OtherADF)


### Prerequisites and the requirements <a id='Prereqs'></a>
The first thing to do is to check the prerequisites and the requirements to run the front-end application directly into a development environment.

* Alfresco Content Services (ACS) Enterprise edition up and running (identify the URL that will be required as configuration). 

* The latest Long-Time Support (LTS) version of [NodeJs](https://nodejs.org/en/).

* A recent (and supported) version of a browser (see [here](https://github.com/Alfresco/alfresco-ng2-components#browser-support) for further details).

All the Angular development is done using the [Typescript](https://www.typescriptlang.org/) language. With this in mind, it is highly suggested to adopt a good text editor to help you in this task. We recommend [Visual Studio Code](https://code.visualstudio.com/) a free, lightweight, and very powerful tool from Microsoft that works well with Angular development and has a [big ecosystem of plugins](https://marketplace.visualstudio.com/VSCode) to make the developer experience even better.

### Installing the ADF Yeoman Generator <a id='ADFYeoman'></a>
**Note:** If you're on Linux or MacOS, you might need to run the following commands using `sudo`.

You need to ensure you have [Yeoman](https://yeoman.io/) installed by running `yo --version`. If this is not already installed, run the following command.

```shell
npm install -g yo
```

Now install the latest version of the [generator-alfresco-adf-app](https://github.com/Alfresco/generator-alfresco-adf-app).

```shell
npm install -g generator-alfresco-adf-app@latest
```

> **Note:** For more details on the [generator-alfresco-adf-app see its repository](https://github.com/Alfresco/generator-alfresco-adf-app). The project is open Source.

### Install the Angular CLI <a id='Angular'></a>

```shell
npm install -g @angular/cli
```

[Angular CLI](https://cli.angular.io/) makes it easy to create components, libraries, and more. You can check what version of the installed version Angular CLI you have installed by using the `ng v` command in the terminal.

### Create your first ADF application <a id='CreateADF'></a>

Now that the system is properly configured you can generate the application running the following command.

```shell
yo alfresco-adf-app
```

Enter a name and choose `Content Services` as the application blueprint, then enter `Y` to install the dependencies (the following questions are optional and easy to understand).

The Yeoman generator will create a new project and install all dependencies required for your application.

**Note:** The Yeoman generator creates a new directory for your project. Make sure you change into this new directory.

### Configure the application to work with Alfresco Content Services <a id='Configure'></a>
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

### Start the application <a id='Start'></a>
To run the project, open a terminal and run:

`npm start`
A browser will automatically open up at `http://localhost:4200`.

Click the key icon in the side navigation to log in.

**Note:** If you're running an online trial, you can find your login credentials in the welcome email.

Take a few minutes to explore your application. You have the essential features: Browsing the repository, uploading, and previewing documents.

### Troubleshooting and support <a id='Troubleshooting'></a>
If you have any issue, there is an entire community available to help you.
<!-- insert links? -->
In case of problems raise a question into the Alfresco Forum (Application Development Framework section) or connect with the developers into the Alfresco Gitter channel. Being an Alfresco customer or partner you can also raise a request for support into the Alfresco Support Portal.

### Other types of ADF based applications <a id='OtherADF'></a>
In this tutorial, you learned how to create an ADF based application from scratch and run it against an existing instance of Alfresco Content Services. Using the [ADF Yeoman Generator](https://github.com/Alfresco/generator-alfresco-adf-app), during the creation of the ADF based application, you can decide to use a different application blueprint (content only, content and process, and process only). The tasks described above don’t really change except for the fact that you have to update the URLs of the backend services accordingly.
