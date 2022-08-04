# Simple Authentication api.

# Setting up the local server.
1. Install Mongodb. Get a free version from [Mongodb official](https://www.mongodb.com/try/download/community)
2. Create a mongodb connection with the connection string `mongodb://localhost:27017/zur-auth`
3. Clone this repository,  `cd zuri-authentication-system` and run `yarn` or `npm install` to install all required packages

# Routes definition
All routes are protected except for creating a resource(user) route
## User
[user](/screenshot/postuser.png)
1. The base route is `/`
2. Post a user route `/user`. Method = `POST`
3. Get all users route `/user`. Method = `GET`
4. Get a user route `/user/<id>`. Method = `GET`
5. Delete user route `/user/<id>`. Method = `DELETE`
6. Update a user route `/user/<id>`. Method = `PATCH`
## Staff
[user](/screenshot/poststaff.png)
1. The base route is `/`
2. Post a staff route `/staff`. Method = `POST`
3. Get all staffs route `/staff`. Method = `GET`
4. Get a staff route `/staff/<id>`. Method = `GET`
5. Delete staff route `/staff/<id>`. Method = `DELETE`
6. Update a staff route `/staff/<id>`. Method = `PATCH`
## Manager
[user](/screenshot/postmanager.png)
1. The base route is `/`
2. Post a manager route `/manager`. Method = `POST`
3. Get all managers route `/manager`. Method = `GET`
4. Get a manager route `/manager/<id>`. Method = `GET`
5. Delete manager route `/manager/<id>`. Method = `DELETE`
6. Update a manager route `/manager/<id>`. Method = `PATCH`
## Admin
[user](/screenshot/admin.png)
1. The base route is `/`
2. Post a admin route `/admin`. Method = `POST`
3. Get all admins route `/admin`. Method = `GET`
4. Get a admin route `/admin/<id>`. Method = `GET`
5. Delete admin route `/admin/<id>`. Method = `DELETE`
6. Update a admin route `/admin/<id>`. Method = `PATCH`