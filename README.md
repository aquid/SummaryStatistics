# Summary Statistics
This app provides you with statistical data for a number of eployees. App  has  features to add  new  employees, delete  existing one and view all of them. 

## How  to  run  the app
You can run the app locally using node. 
```
-> Download/clone the app 
-> Go into the root directory
-> run npm install
-> create .env in the root using sample file and update values
-> run npm start
```

Run Using docker 
```
-> Download/clone the app 
-> Go into the root directory
-> create .env in the root using sample file and update values
-> run command "docker-compose up"
```

## Authentication and  Authorization
The app authenticated most of the employee and stats related and to acces them you need to get a token which you need to pass as Headers while making the request.

> Header = x-access-token {{token}}


## API methods and endpoints
The application exposes multiple endpoints to perform the tasks. You can run the app and test the api on `http://localhost:3000`.

Please find the details of the API below

#### Register API
```
API Endpoint - http://localhost:3000/users/register
Method - Post
Sample input -  {
    "first_name": "Aquid",
    "last_name": "Shahwar",
    "email":  "testing@user.com",
    "password":  "123456"
}

expected output - {
    "first_name": "Aquid",
    "last_name": "Shahwar",
    "email": "testing@user.com",
    "password": "$2a$10$ISMrM5ViqB4n6RNEoSF8JecL5vAP1Cq0s7qKZR8sMx77IPW5cLUC",
    "_id": "6307dcb8501df9a1e2e67293",
    "__v": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjMwN2RjYjg1MDFkZjlhMWUyZTY3MjkzIiwiZW1haWwiOiJ0ZXN0aW5nQHVzZXIuY29tIiwiaWF0IjoxNjYxNDU5NjQwLCJleHAiOjE2NjE0NzQwNDB9.HFZrqeKKeli2Bq-FRrDAnuT_1qfgxpZXgobVfrSbt9o"
}
```

#### Login API
```
API Endpoint - http://localhost:3000/users/login
Method - Post
Sample input -  {
    "email":  "testing@user.com",
    "password":  "123456"
}

expected output - {
    "first_name": "Aquid",
    "last_name": "Shahwar",
    "email": "testing@user.com",
    "password": "$2a$10$ISMrM5ViqB4n6RNEoSF8JecL5vAP1Cq0s7qKZR8sMx77IPW5cLUC",
    "_id": "6307dcb8501df9a1e2e67293",
    "__v": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjMwN2RjYjg1MDFkZjlhMWUyZTY3MjkzIiwiZW1haWwiOiJ0ZXN0aW5nQHVzZXIuY29tIiwiaWF0IjoxNjYxNDU5NjQwLCJleHAiOjE2NjE0NzQwNDB9.HFZrqeKKeli2Bq-FRrDAnuT_1qfgxpZXgobVfrSbt9o"
}
```

#### Employee Create API 
#####   (Single and Multiple both supported)
```
API Endpoint - http://localhost:3000/employees
Method - Post
Header - x-access-token {{token}}
Sample input -  [
    {
    "name": "Abhishek",
    "salary": "145000",
    "currency": "USD",
    "department": "Engineering",
    "sub_department": "Platform"
    },
    {
    "name": "Anurag",
    "salary": "90000",
    "currency": "USD",
    "department": "Banking",
    "on_contract": "true",
    "sub_department": "Loan"
    },
]

expected output - [
    {
        "name": "Abhishek",
        "salary": 145000,
        "currency": "USD",
        "department": "Engineering",
        "sub_department": "Platform",
        "on_contract": false,
        "_id": "6307dec192f75841df68f79a",
        "__v": 0
    },
    {
        "name": "Anurag",
        "salary": 90000,
        "currency": "USD",
        "department": "Banking",
        "sub_department": "Loan",
        "on_contract": true,
        "_id": "6307dec192f75841df68f79b",
        "__v": 0
    }
]
```

#### Employee Fetch API 
```
API Endpoint - http://localhost:3000/employees
Method - GET
Header - x-access-token {{token}}
expected output - [
    {
        "name": "Abhishek",
        "salary": 145000,
        "currency": "USD",
        "department": "Engineering",
        "sub_department": "Platform",
        "on_contract": false,
        "_id": "6307dec192f75841df68f79a",
        "__v": 0
    },
    {
        "name": "Anurag",
        "salary": 90000,
        "currency": "USD",
        "department": "Banking",
        "sub_department": "Loan",
        "on_contract": true,
        "_id": "6307dec192f75841df68f79b",
        "__v": 0
    }
]
```

#### Employee Delete API 
```
API Endpoint - http://localhost:3000/employees/:empId
Method - DELETE
Header - x-access-token {{token}}
```

#### Employee Statistics API 
```
API Endpoint - http://localhost:3000/employees/stats
Method - GET
Query Param - (either or all)
    sub_department=true 
    department=true 
    on_contract=true 
Header - x-access-token {{token}}
expected output -
[
    {
        "_id": null,
        "avg": 22295010,
        "min": 30,
        "max": 200000000
    }
]

Sample output 2 - [
    {
        "_id": {
            "department": "Operations",
            "sub_department": "CustomerOnboarding"
        },
        "avg": 35015,
        "min": 30,
        "max": 70000
    },
    {
        "_id": {
            "department": "Engineering",
            "sub_department": "Platform"
        },
        "avg": 40099006,
        "min": 30,
        "max": 200000000
    },
    {
        "_id": {
            "department": "Administration",
            "sub_department": "Agriculture"
        },
        "avg": 30,
        "min": 30,
        "max": 30
    },
    {
        "_id": {
            "department": "Banking",
            "sub_department": "Loan"
        },
        "avg": 90000,
        "min": 90000,
        "max": 90000
    }
]
```

##  How to run the Tests
All the tests are present inside the tests folder and you can see two tests files which contain the suits for employee and user testing

#### Run the Tests
Most of the things are pre-configured you just need to  setup the .env if not already done

```
-> Add .env file in the root if not already setup. 
-> Run command " npm run test "
```



