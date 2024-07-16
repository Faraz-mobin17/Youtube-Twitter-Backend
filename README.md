# Project

The app is based on monolith architecture

## API DOCUMENTATION

| Api Doc       | Link                                                      |
| ------------- | --------------------------------------------------------- |
| Youtube Clone | https://documenter.getpostman.com/view/9805137/2sA35D42ne |

## Model Link

[Youtube Clone Model](https://drawsql.app/teams/farazs-team/diagrams/social-media)

## Problem I faced during design and building this product

- [✅] In the users table password field previosly had varchar(255) from the backend I was
  encrypitng the password and the password after encryption became > 255 length so the
  backend was giving error it took me some time to figure out how to fix error but I
  fixed it changed the value to varchar(255) to varchar(1000)

- [✅] I forgot to add on delete cascade and on update cascade to the tables
  which are linked to users table if the users is deleted his details were left
  in the table I fixed it by adding.

- [✅] I want to get youtube like searching feature I was searching how to get full
  text searching using mysql after reading the docs I figured it out that I need to add
  fulltext(colname) feature on title

- [✅] Table design was not perfect took me some time I added isSubscribed, isDeleted, LikedBy
  field

- [✅] As program was becoming complex it was difficult to handle import statement so I added
  index.js file in every folder that exports

- [✅] Migratign whole project to typescript took me a lot to fix bugs other than that I was stuck in when adding the some property to Request Object it took me a while to figure how to take care of that finally fixed it by creating a local.d.ts file and adding a property to the request object.

- [✅] Migrated from using raw SQL to prisma for faster development process.

# Features

- [] on the user channel there will be shuffling button along with the popular oldest and newest
  tag.

- [] Subscription will be given priority by being default page on the website and there will
  be separte page as explore like youtube homepage.

- [] there will be feature for favorite channel for those channel you will see the video
  on the top section of the home page and on the subscriptions tab they will be at the top

## Tech Stack

### Frontend

- [✅] React
  - [✅] Redux Toolkit
  - [✅] Tailwind CSS
  - [✅] React Router
  - [✅] React hook Forms
  - [✅] React Icons
- [✅] bundler
  - [✅] Vite

### Backend

- [✅] Type Safe Node and Express
  - [✅] Cookie Parser (storing cookie)
  - [✅] Cors
  - [✅] morgan (loggin)
  - [✅] winston (logging)
  - [✅] JWT and Bcrypt
  - [✅] cloudinary (static storage)
  - [✅] multer (file upload)
  - [✅] apicache (caching)
  - [❌] express rate limiter (rate limiting)
  - [✅] dotenv (for environment variable)

#### Database

- [✅] MySQL
  - [✅] mysql2 Node JS Driver (migrated to prisma)

### Dev Dependencies

- [✅] prettier
- [✅] eslint
- [✅] nodemon

# Features

## User Controller Methods

- [✅] Get all Users
- [✅] Get User
- [✅] Update User
- [✅] Delete User
- [✅] Login User
- [✅] Logout User
- [✅] Register User
- [✅] Change Current User Password
- [✅] Update Avatar
- [✅] Update CoverImage

## Tweets Controller

- [✅] Get User Tweets
- [✅] Update Tweets
- [✅] Create Tweets
- [✅] Update Tweets

## Comment Controller

- [✅] Get Video Comments
- [✅] Add Comment
- [✅] Update Comment
- [✅] Delete Comment

## Likes Controller

- [✅] toggleVideoLike
- [✅] toggleCommentLike
- [✅] toggleTweetLike
- [✅] getLikedVideos

## Best API Practices used

- [✅] Validation
- [✅] Use resource name (nouns)
- [✅] Use plurals
- [✅] Idempotency
- [✅] Use versioning
- [✅] Query after soft deletion
- [✅] Pagination
- [✅] Sorting
- [✅] Filtering
- [] Secure Access
- [] Resource cross references
- [✅] Rate Limit
- [✅] Caching
- [] Ip Blocking
- [] Sanitization
- [] Web app firewall (applicable after hosting)
