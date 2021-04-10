# Scheduler

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.4.

# Steps to deploy
1. `npm install` from root folder
2. `cd server` and `npm install` to install server dependencies
3. `cd server` and `node script.js` to first run server
4. `npm run start` from root folder to run the angular application

## Default set admin user
```
email : admin@admin.com
password : admin1234
```
## Sample user 
```
email : emattioni1@wordpress.org
password : Klr49f3gW
```

# Routes
| Routes                       | Description                                                            |
| ---------------------------- | ---------------------------------------------------------------------- |
| dashboard/list               | Home page after user logs in displaying **all or user's** appointments |
| dashboard/list/details/:id   | Detail page of particular appointment                                  |
| home/signin                  | Sign in page                                                           |
| home/signup                  | Sign out page                                                          |
| appointment/create           | Appointment creation page                                              |
| appointment/update/:id       | Appointment updation page                                              |
| admin/users                  | Admin dashboard showing registered users awaiting approval             |
| admin/rooms                  | Admin dashboard showing rooms                                          |
| admin/rooms/create           | Create a room                                                          |
| not-found-404                | 404 page                                                               |
