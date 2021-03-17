# `PasswordEncoder` override

By default, Alfresco Process Services uses the `org.springframework.security.crypto.password.StandardPasswordEncoder` for encoding passwords in the database. Note that this is only relevant when using database-backed authentication \(so does not hold LDAP/Active Directory\). This is an encoder that uses SHA-256 with 1024 iterations and a random salt.

You can override the default setting by implementing the `com.activiti.api.security.AlfrescoPasswordEncoderOverride` interface.

**Parent topic:**[Security configuration overrides](../topics/security_configuration_overrides.md)

