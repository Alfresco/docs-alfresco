---
title: Install a tool to make HTTP calls
---

Information about the `cURL` command line tool that can be used to make HTTP calls.

When we have an ACS Server up and running we also need a tool that can be used to make HTTP requests to the server. 
The ReST API is accessed via HTTP and returns responses in JSON. We could use a Web Browser for all API calls that 
require HTTP GET, but lots of API calls will need a client that can execute HTTP POST and HTTP PUT operations.

So it is best to start working with a tool that can make HTTP GET, POST, and PUT calls.

One such tool is **cURL** and it is commonly available on most Linux based systems. Check if you have it by doing:

```bash
$ curl 
curl: try 'curl --help' or 'curl --manual' for more information
```

If you don’t have curl installed you can find it here: [https://curl.haxx.se/](https://curl.haxx.se/){:target="_blank"}
