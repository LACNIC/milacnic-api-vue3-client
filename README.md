# MILACNIC API Vue 3 JS Client

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
```
For production environment you need to replace the value of the const API_URL from
"https://registro-demo.api.lacnic.net/lacnic/2.0/" to 
"https://registro.api.lacnic.net/lacnic/2.0/" in the src/utils/constants.js file.
```

### Features
```
/login
Login using ORG-ID and Token provided by oAuth: Token URL: https://dev-lacnic.auth0.com/oauth/token, Flow: password

/
Home page, Once logged in you will see a list of IPv4, IPv6, and ASN resources of the organization with links to View Delegations, and Edit Contacts.

/delegations/detail/{prefix}/{prefixLength}
See Delegations of a block - allows to see a list with all the delegations each one with their hostnames, a link to Delete, and a link to edit the delegation (edit the hostnames). Also a New delegation link is provided.

/delegations /new/{prefix}/{prefixLength}
New Delegation.

/delegations/detail/{prefix}/{prefixLength}
Delete delegation - deletes the delegation along with its reverse hosts.

/organization/edit
Edit Org - edit the organization information.

/rpki/certificate
View and Create RPKI Certificates.

/rpki/roas
View, Create and Revoke ROAs.

/rpki/roas/new
Create ROA

/ip/edit/{prefix}/{prefixLength}
Edit Contacts (IP)

/ip/edit/{as}
Edit Contacts (ASN)
```

### What is NOT included in this version:
```
This version doesn't include OAuth authentication, sub-assignments, IRR and Rate limit features.
```
