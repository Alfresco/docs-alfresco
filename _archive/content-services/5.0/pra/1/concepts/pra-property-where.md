---
author: Alfresco Documentation
---

# Using WHERE to restrict output

You can use the WHERE parameter to restrict the returned objects by a predicate. As in SQL, WHERE defines a boolean expression that all results must meet. It is made up of one or more conditions on properties, composed together using the logical connectors; AND, OR, and NOT. You can group expressions using parentheses.

Each condition contains one property name, comparison operator \(=, \>, <, \>=, <=, BETWEEN, MATCHES, EXISTS\), and depending on the specific comparison operator, the condition can include a value, a range of values, or a set of values. Ranges and sets of values are expressed using square brackets \(‘\[’ and ‘\]’\) and use the comma character \(‘,’\) as a delimiter. The following are practical examples:

```

GET .../public/alfresco/versions/1/sites?where=(type='public')
GET .../public/alfresco/versions/1/people?where=(age%20>=%2018)
GET .../public/alfresco/versions/1/sites?where=(creationDate%20BETWEEN%20['2012-01-01','2012-12-31'])
GET .../public/alfresco/versions/1/sites?where=(creationDate%20IN%20['2012-01-01','2012-01-03','2012-01-05','2012-01-07'])
GET .../public/alfresco/versions/1/sites?where=(name%20MATCHES%20'internal*')
GET .../public/alfresco/versions/1/people?where=(age%20>=%2018)%20AND%20(emailAddress%20MATCHES%20'*@example.com')
GET .../public/alfresco/versions/1/people?where=(age%20<%2018)%20OR%20(age%20>%2065)
GET .../public/alfresco/versions/1/people/fred.bloggs@yourcompany.com/favorites?where=(EXISTS(target/file))

```

Whitespace is allowed a WHERE clause. The operators BETWEEN, IN, MATCHES must have whitespace between the operand and the operator.

A 400 HTTP status code is returned when a restriction cannot be applied as requested. The "error" object returned states why the requested restriction could not be performed as requested.

**Parent topic:**[HTTP Parameters](../../../pra/1/concepts/pra-parameters.md)

