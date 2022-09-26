---
title: Front Tomcat With Apache
---

Use the Instructions below to front OCMS/OpenAnnotate/ActiveWizard installed on a webserver such as Tomcat with Apache.  This page assumes you're on the TSG network.  For a client environment, appropriate server values should be used.  

This page also assumes that you're deploying OCMS with the following setup:

- Tomcat port 8080 - alfresco.war, share.war
- Tomcat port 9090 - ocms.war, OpenAnnotate.war, WizardAdmin.war

## Install Apache
### *Nix
Obtain installation files from https://httpd.apache.org/download.cgi

### Windows
Obtain binaries from https://www.apachelounge.com/download/

Install Apache to `C:\Apache\Apache24` (change to your desired version as appropriate).  This is referred to as `${apache.home}` below.

- Navigate to `${apache.home}\conf` and open up `httpd.conf`
- Find the line that has ServerRoot on it  
   - It should default to something like `ServerRoot "c:/Apache24"`
   - Change the ServerRoot to where you extracted Apache
- If you would like to install as a service, consult the Readme.txt file that comes with the installation.

## Connect Apache Web Server to Alfresco Tomcat
Note, remember to replace `${apache.home}` in all steps below with the Apache installation home folder from your installation.

1. (WINDOWS) Modify httpd.conf (${apache.home}\conf\httpd.conf) to load the Virtual Hosts configuration file, and the Proxy, ProxyAJP, and Rewrite modules.  **Uncomment** the following lines:

           Include conf/extra/httpd-vhosts.conf
           LoadModule proxy_module modules/mod_proxy.so
           LoadModule proxy_ajp_module modules/mod_proxy_ajp.so
           LoadModule proxy_http_module modules/mod_proxy_http.so
           LoadModule rewrite_module modules/mod_rewrite.so
           LoadModule access_compat_module modules/mod_access_compat.so
           LoadModule authz_host_module modules/mod_authz_host.so
           LoadModule filter_module modules/mod_filter.so
           LoadModule deflate_module modules/mod_deflate.so   #optional - only needed if you plan on using the gzip flate stuff below


    (UBUNTU) Run `sudo a2enmod proxy`, `sudo a2enmod proxy_ajp`, `sudo a2enmod rewrite`, and `sudo a2enmod proxy_http`.

1. (WINDOWS) Modify the httpd-vhosts.conf file (${apache.home}\conf\extra\httpd-vhosts.conf).  Remove the sample virtual hosts from the file by deleting the `<VirtualHost *:80>` sections.

   (UBUNTU) Create a file in the `conf-available` folder named `httpd-vhosts.conf` (with the text as specified in the next step). Run `sudo a2enconf httpd-vhosts` then `service apache2 reload` to apply changes.

1. Add a new virtual host that points to the Alfresco Tomcat and Tomcat running HPI/OA/WizardAdmin by adding the following lines, making updates to server names and paths as needed:

```xml
    <VirtualHost *:80>
	    ServerName ${your-server-name}
	    ErrorLog "logs/${your-server-name}-error.log"
	    CustomLog "logs/${your-server-name}-access.log" common
	    ServerAlias ${your-server-name}

	    AllowEncodedSlashes On
	    LimitRequestFieldSize 65536
	    ProxyIOBufferSize 65536

	    #Optional - these two lines redirect the root URL (/) to /ocms.
	    RewriteEngine on
	    RewriteRule ^/$ /ocms [PT]
	
	    <Directory />
	        Options All
	        Order Deny,Allow
	        Allow from all
	    </Directory>

	    ProxyRequests off

	    <Proxy *>
	        Order Deny,Allow
	        Allow from all
	    </Proxy>

	    <Location />
	        Order Deny,Allow
	        Allow from all
	    </Location>

            #Optional - if you want to gzip static files before you send them out to clients, add the below
            <Location /hpi>
                AddOutputFilterByType DEFLATE text/plain
		AddOutputFilterByType DEFLATE text/html
		AddOutputFilterByType DEFLATE text/xml
		AddOutputFilterByType DEFLATE text/css
		AddOutputFilterByType DEFLATE application/xml
		AddOutputFilterByType DEFLATE application/xhtml+xml
		AddOutputFilterByType DEFLATE application/rss+xml
		AddOutputFilterByType DEFLATE application/javascript
		AddOutputFilterByType DEFLATE application/x-javascript
		AddOutputFilterByType DEFLATE application/json
            </Location>

	    #ALFRESCO ONLY: Proxy /alfresco requests to Alfresco's Tomcat
	    ProxyPass /alfresco ajp://${your-TOMCAT-server-name}:8009/alfresco
	    ProxyPass /share ajp://${your-TOMCAT-server-name}:8009/share
	    # OR, use HTTP like this (use AJP in a production environment, as HTTP has more overhead and issues):
	    # ProxyPass /alfresco http://${your-server-name}:8080/alfresco

	    #Proxy all requests at the root to the Tomcat that actually has the application in question ex: 
            #   /ocms
            #   /OpenAnnotate
            #   /WizardAdmin
            #   /OpenContent [Documentum/Hadoop/Solr only]) 
            # This is generally a separate tomcat than the Tomcat running Alfresco for Alfresco environments
	    ProxyPass / ajp://${your-TOMCAT-server-name}:9009/

    </VirtualHost>
```
4. Go to `${apache.home}`/bin, open a command prompt, and run httpd.exe 
5. Test by hitting http://${your-server-name} and http://${your-server-name}/ocms

## Non-Alfresco setup
If you are not using Alfresco as an ECM, the above settings are a little simpler.  For example, for Documentum or HBase, you would have one tomcat (say, port 8080) that hosts:

- ocms.war
- OpenContent.war
- OpenAnnotate.war
- WizardAdmin.war

You would then configure the proxies for these four webapps, from Apache to Tomcat on 8080.  There's no need to connect Apache to a second Tomcat instance in this case.  