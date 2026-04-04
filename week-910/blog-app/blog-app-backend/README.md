### Backend development


1.Create git repo
git init

2.Add .gitignore file

3.Create .env file for environment variables and Read data from .env with "dotenv" module
npm install dotenv

during deployment whatever port is free we will use that

4.Generate package.json

5.Create express app(Http server basically)

6.Connect to DataBase

7.Add middlewares(Body Parser,err handdling middlewares)

8.Design Schema and create models

Author,User,Admin all come under user roles
{
    "role":"",
    "firstName":"",
    "lN":"",
    "email":"",
    "profileImageUrl":"",
    "isActive":""
}

9.Design REST APIs for all resources 

10. Registration