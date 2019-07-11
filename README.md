# Property Pro Lite

[![Build Status](https://travis-ci.org/amilykassim/PropertyProLite.svg?branch=develop)](https://travis-ci.org/amilykassim/PropertyProLite)       [![Coverage Status](https://coveralls.io/repos/github/amilykassim/PropertyProLite/badge.svg?branch=develop)](https://coveralls.io/github/amilykassim/PropertyProLite?branch=develop)       [![Maintainability](https://api.codeclimate.com/v1/badges/3dbe4a90345d8b162c9b/maintainability)](https://codeclimate.com/github/amilykassim/PropertyProLite/maintainability)


# Table of contents

- Projects overview
- Features
- Demo
- Built with 
- Api endpoints
- Known Issues
- Installation
- Contributing
- License

# Project Overview

Property Pro Lite is a platform to buy and sell properties across the world.

# Features

- A user can create an account if he doesn't have one
- A user can log in to his account if he does have it
- A user can view all listed properties to buy
- A user can view more details about the property listed
- A user can sell a property
- A user can buy a property
- A user can log out to his account
- An admin user can update his listed property
- An admin user can delete his listed property
- An admin user can mark his property as sold
- User can reset his/her forgoten password

# Demo
![alt text](./UI/assets/preview.png)
# Built With
- Node.js
- Express framework
- Html
- CSS
- Javascript

# Api Endpoints
- POST /auth/signup  - Create user account 
- POST /auth/signin  - Login a user
- POST  /property  - Create a property ad
- PATCH  /property/<:property-id>  - Update property data
- PATCH  /property/<:property-id>/sold  - Mark a property as sold so users know it’s no longer available​.
- DELETE  /property/<:property-id>  - Delete a property advert.
- GET  /property/<:property-id>/  - Get all property adverts
- GET  /property/<:property-id>?type=​propertyType  - Get all property advertisement offering a specific type of property. 
- GET /property/<:property-id>  - View a specific property advert. 

# Known Issues
API is on point, i.e all endpoints works fine, but 
- The client side doesn't have API links implemented yet, so you can query the api using your browser or postman.
- The data is not persisted on the database yet, i.e if you restart the application the data are erased.

# Installation
- Run git clone github.com/amilykassim/PropertyProLite.git
- Run cd Property Pro Lite to navigate to the project directory
- Run npm install to download and install all packages
- Run npm start to start the server
- And then Test the end points using postman or your browser

# Contributing
> You can contribute to this project by forking the project github.com/amilykassim/PropertyProLite.git

> And then submit your changes by creating a new pull request github.com/amilykassim/PropertyProLite/compare


# License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
- MIT license
- Copyright (c) AMILY Kassim


