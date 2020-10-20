---
title: Extend Transform Service
---

Use this information to extend the functionality of the Transform Service by adding and configuring custom transform engines (T-Engines).

Two things need to be configured in the transform router \(T-Router\) so that it knows about a custom transform engine (T-Engine) and can use it. One is information about the T-Engine, such as the access URL and JMS queue name, and the other is the actual transform routes. This configuration is described in the linked pages.

To match the transform routes with the T-Engines, the T-Router uses internal T-Engine labels (also known as transformer names). Examples of such labels are: `IMAGEMAGICK`, `LIBREOFFICE`, `PDF_RENDERER`, TIKA, `TRANSFORMER1`, `CUSTOM_ENGINE`.

> **Note:**

* The T-Engine labels are case-insensitive, and come into play when the T-Router configuration is parsed, and T-Engine HTTP URLs and JMS queue names are identified.
* The T-Engine labels in the route configuration files must match the URL and queue variable names.