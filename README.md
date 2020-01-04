# FLAVOR IT
![FLAVOR-IT Demo](/public/images/readme-img.png?raw=true "FLAVOR-IT Demo")
A web app to promote recipe-sharing and foodies’ community. 

One of the main priorities of this project is to help users manage their recipes in a more organised way, to do so this platform allows users to publish their favourite recipes and save other users' recipes by the like function.  

Another main priority of this project is to help users to connect with other foodies. To achieve that, it allows users to follow other users by the following function and exchange cooking tips / experience by the recipe commenting function. 

You may use our demonstration account to look around on [our deployment page](https://flavor-it.herokuapp.com/).
```
username: Evelyn
password: flavor-it
```
## Getting Started
### Prerequisites
1. Make sure you have [`node`](https://nodejs.org/), [`MongoDB`](https://www.mongodb.com/) and [`npm`](https://www.npmjs.com/get-npm) installed.

2. For the photo upload function, make sure you have an account on [Cloudindary](https://cloudinary.com/).

### Installing

1. Clone the repository and install the dependencies:  
```
cd ./flavor-it
npm install
```
2. Add a `.env` file and include the following keys:

```
PORT=3000
ENV=development
SESSION_SECRET=<It is used for Passport session security, You can use any secret word of your choice.>
```
3. Refer to your account details from Cloudinary and include `CLOUD_NAME`, `CLOUD_KEY` and `CLOUD_SECRET` in the `.env` file.

## Running 
Building and starting the server for production:
```
npm start
```
if you have nodemon installed, you can also use this command to start and run the server:
```
npm run dev
```
## Built with


* Node.js
* Express.js
* MongoDB
* handlebars
* axios
* Cloudinary

## License

This project is licensed under the MIT License.
