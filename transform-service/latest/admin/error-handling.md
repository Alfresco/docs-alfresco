---
title: Error handling in transform router
---

Use this information to review the possible responses from the Transform Router (T-Router) if a problem occurs.

The Transform Service is designed to be easy to set-up and debug. However, when a problem occurs, the T-Router tries to respond with a failed Transform Reply (T-Reply). Here are a few examples:

|T-Reply|Possible T-Reply response|
|-------|-------------------------|
|400 BAD REQUEST|T-Request with an `invalid JSON` is received|
|400 BAD REQUEST|T-Request with `invalid/missing values` is received|
|400 BAD REQUEST|T-Request with an `unsupported transformation` is received|
|500 INTERNAL SERVER ERROR|Transformation `fails in the T-Engine`|
|500 INTERNAL SERVER ERROR|When any other `unexpected exception in the T-Router` is thrown|
|no reply|When a `Java Error` (*Throwable*, but not *Exception*) occurs in the T-Router, the problem is only logged.|
