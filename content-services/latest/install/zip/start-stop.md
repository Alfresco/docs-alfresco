---
title: Start and stop server
---

Use this information to understand how to run the Alfresco Content Services server and Alfresco Share.

## Start server

Once you've installed Alfresco Content Services using the distribution zip, you can start the server. The server must be running before you can use Alfresco Share.

1. Navigate to the installation directory for your database and start the server.

2. Navigate to the Tomcat `/bin` directory and start the server:

    For example: (Linux)

    ```bash
    ./startup.sh
    ```

    For example: (Windows)

    ```bash
    startup
    ```

    You need administrator rights to run this command.

3. Browse to the location of your Alfresco Content Services installation:

    For example, `http://<your-host>:8080/alfresco`.

## Stop server

Use this information to stop the server.

1. Navigate to the Tomcat `/bin` directory then choose one of these options to stop the server:

    For example: (Linux)

    ```bash
    ./shutdown.sh
    ```

    For example: (Windows)

    ```bash
    shutdown
    ```

    You need administrator rights to run this command.

2. Navigate to the installation directory for your database and stop the server.

## Start Alfresco Share

Once you've started Alfresco Content Services, you can start Alfresco Share using a browser.

1. Browse to the location of your installation.

    For example, `http://<your-host>:8080/share`.

    Alfresco Share opens in a browser.

2. Sign in using a user name and password.

    The default administrator user name is `admin`.
