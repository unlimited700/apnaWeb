### This repository contains code for web implementation of apnavaidya ###

### Set up: ###
```npm install```



App will listen on port localhost:3000


### Guide to deploy:


Step 1: Install nodejs and npm 
Step 2: Clone the repository
Step 3: ```cd web```
Step 4: ```npm install```
Step 5: (Only for deploying on production server)
```
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000```
sudo apt-get install iptables-persistent
sudo /etc/init.d/iptables-persistent save 
```

Step 6: ```npm run compile``` 
Step 7: ```npm run run```