
# SYMFONY 6 FAST TRACK BOOK SOLUTION

This is a working solution to the Symfony Fast Track Book, available here: 
https://symfony.com/doc/6.4/the-fast-track/en/index.html

This repo is meant to serve as a working-reference, for learning purposes, and
it can be extended and expanded, of course.

It is needless to say that coding the book project is a serious learning experience 
for anyone who wants to learn Symfony and its ecosystem. With the diverse feastures 
covered in the project, if you follow along, coding your way through it, you should 
emerge as a confident full stack Symfony developer. 
Let's look at what the project is about, so you can see what you will learn from 
coding it.

# Setup
## Setup Docker
You need to install Docker because the application uses a database service from a
PostgreSQL Docker container. All that is already setup in the compose.yamle and
compose.override.yaml files for the postgresql and other needed images to be installed
to your Docker engine. So just install Docker on your machine, and once that is done,
start up the containers by running this command in your CLI:

```bash
docker-compose up -d --remove-orphans
```
If later you get an error or not being able to connect to the database (inside the 
container image),and want to ssh into the container to test things, be aware that database 
user access credentials are as below. 
* These credentials are defined, as you would imagine, 
in the .env file in the DATABASE_URL variable:

 * DB name: 	     app
 * User: 		     app
 * PW:		  	     !ChangeMe!
 * Port (external): 61984

If you still have issues, enure to check what port is being exposed by the container
as it may change:

```bash
docker ps
```

and if that is no longer what is specified in the .env DATABASE_URL variable (61984),
then go ahead and update it with the new port number.

## Start up the Symfony application
This is the main/core Symfony aplication that serves as the backend for the API, and the SPA 
(which also accesses data behind the scened through API calls to this backend)
Next, run the application by running these commands in the CLI:

```bash
symfony server:start -d
```

This should serve the application on port 8000, here:

    http://127.0.0.1:8000/

This also automatically makes avaialable, an admin section of the site at:

    http://127.0.0.1:8000/admin

* You have to be logged in to access this section, so you will be redirected to the login view
if you are not yet authenticated. The auth credentials are:
 * Username:   admin
 * Password:   admin

## Compile assets and launch the SPA
Next, build the assets and launh the SPA application by running this command:

```bash
npm run dev
```


# Details of the project

The application is a Conference scheduling application whereby an organisation, 
say, the founders of Symfony, for example, will keep their followers up to date on 
past and up-coming comferences.

Visitors can view a list of all conferences with each displaying minimal information 
about the name, the date and the location of each conference. 

Visitors are able to click on a specific conference to see its details-standard feature 
of any CRUD application developers are familiar with. In this detailed view, visitors can 
view a list of all comments posted by other visitors for this specific conference. There  
is a form on this page for the visitor to place their own comment under th conference, 
if they wish to do so.  

Comments are filtered for spam using the Askimet API (https://akismet.com/) then stored 
in the database but not published immediately.
An admin user is able to login to the application and access an admin UI that allows for 
CRUD operations on the application like viewing all conferences, editing or deleting 
conferences, as well as updating the status to publish submitted comments.

* This is the core functionality of the app, but there are other features you will learn 
    how to implement like:
    * dispatching jobs/tasks to a queue 
    * consuming jobs from a queue
    * sending emails
    * cron jobs
    * dispatching events
    * consuming events
    * sending Slack notifications to admin users
    * setting environmental variables 
    * interacting with the service container
    * working with secrets
    * Database (PostgreSQL) management via Docker
    * Using RabbitMQ to consume jobs from a queue
    * Creating an API with Symfony's API Platform
    * Building an SPA application
    * Managing Assets with Webpack Encore-the Symfony way
and much more!

* There are three parts to this project:
    * A regular Symfony application, accessible from your browser
    * An API built using Symfony's famous API Platform
    * A simple Single Page Application (SPA) using Bootstrap & Webpack Encore


# The Symfony Application
This is available at: http://127.0.0.1:8000
and it looks something like this:

![Global SEO form](https://github.com/gustavNdamukong/guestbook/blob/main/public/photos/symfony_app.png?raw=true)



# The Symfony API
This is available at: http://127.0.0.1:8000/api
or even:            http://127.0.0.1:8000/api/docs
and it looks something like this:

![Global SEO form](https://github.com/gustavNdamukong/guestbook/blob/main/public/photos/symfony_API.png?raw=true)



# The Symfony Single Page Application (SPA)
This is available at: http://127.0.0.1:8000/spa
and it looks something like this:

![Global SEO form](https://github.com/gustavNdamukong/guestbook/blob/main/public/photos/symfony_SPA.png?raw=true)



# The Symfony Admin UI
This is available at: http://127.0.0.1:8000/admin
and it looks something like this:

![Global SEO form](https://github.com/gustavNdamukong/guestbook/blob/main/public/photos/symfony_admin_ui_1.png?raw=true)

![Global SEO form](https://github.com/gustavNdamukong/guestbook/blob/main/public/photos/symfony_admin_ui_2.png?raw=true)

