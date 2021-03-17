# Server connection configuration

The following code snippet shows the properties involved in configuring a connection to an LDAP server \(Active Directory is similar\). These are the typical parameters used when connecting with an LDAP server. Advanced parameters are commented out in the example below:

```
# The URL to connect to the LDAP server
ldap.authentication.java.naming.provider.url=ldap://localhost:10389

# The default principal to use (only used for LDAP sync)
ldap.synchronization.java.naming.security.principal=uid=admin,ou=system

# The password for the default principal (only used for LDAP sync)
ldap.synchronization.java.naming.security.credentials=secret

# The authentication mechanism to use for synchronization
#ldap.synchronization.java.naming.security.authentication=simple

# LDAPS truststore configuration properties
#ldap.authentication.truststore.path=
#ldap.authentication.truststore.passphrase=
#ldap.authentication.truststore.type=
# Set to 'ssl' to enable truststore configuration via subsystem's properties
#ldap.authentication.java.naming.security.protocol=ssl

# The LDAP context factory to use
#ldap.authentication.java.naming.factory.initial=com.sun.jndi.ldap.LdapCtxFactory

# Requests timeout, in miliseconds, use 0 for none (default)
#ldap.authentication.java.naming.read.timeout=0

# See http://docs.oracle.com/javase/jndi/tutorial/ldap/referral/jndi.html
#ldap.synchronization.java.naming.referral=follow
```

It is possible to configure connection pooling for the LDAP/AD connections. This is an advanced feature and is only needed when creating a connection to the IDM system has an impact on system performance.

The connection pooling is implemented using the Spring-LDAP framework. Below are all the properties that it is possible to configure. These follow the semantics of the properties possible for Spring-LDAP and are described [here](http://docs.spring.io/spring-ldap/docs/2.0.2.RELEASE/reference/#pooling).

```
# -----------------------
# LDAP CONNECTION POOLING
# -----------------------

# Options=
# nothing filled in: no connection pooling
# 'jdk': use the default jdk pooling mechanism
# 'spring': use the spring ldap connection pooling facilities. These can be configured further below
#ldap.synchronization.pooling.type=spring

# Following settings follow the semantics of org.springframework.ldap.pool.factory.PoolingContextSource
#ldap.synchronization.pooling.minIdle=0
#ldap.synchronization.pooling.maxIdle=8
#ldap.synchronization.pooling.maxActive=0
#ldap.synchronization.pooling.maxTotal=-1
#ldap.synchronization.pooling.maxWait=-1
# Options for exhausted action: fail | block | grow
#ldap.synchronization.pooling.whenExhaustedAction=block
#ldap.synchronization.pooling.testOnBorrow=false
#ldap.synchronization.pooling.testOnReturn=false
#ldap.synchronization.pooling.testWhileIdle=false
#ldap.synchronization.pooling.timeBetweenEvictionRunsMillis=-1
#ldap.synchronization.pooling.minEvictableIdleTimeMillis=1800000
#ldap.synchronization.pooling.numTestsPerEvictionRun=3

# Connection pool validation (see http://docs.spring.io/spring-ldap/docs/2.0.2.RELEASE/reference/#pooling for semantics)
# Used when any of the testXXX above are set to true
#ldap.synchronization.pooling.validation.base=
#ldap.synchronization.pooling.validation.filter=
# Search control: object, oneLevel, subTree
#ldap.synchronization.pooling.validation.searchControlsRefs=
```

**Parent topic:**[External Identity Management \(LDAP/Active Directory\)](../topics/externalIdentityManagement.md)

