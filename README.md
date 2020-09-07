# speedle-ui
Web UI for Speedle-plus.
Provide the ability to create/delete/list service, policy, role-policy and function from UI.

## Deployment
Note: PMS-endpoint is set to http://localhost:6733/policy-mgmt/v1 by default, you need to change the setting in UI if you want to connect to other PMS-endpoint.
### quick deployment using docker
1. build docker image
```
docker build . -t speedle-ui
```
2. start container
```
docker run -d -p 8080:80 speedle-ui
```
3. access the UI
```
http://localhost:8080/
```
### access the public deployment on github
```
https://dingwenfang.github.io/speedle-ui/
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
