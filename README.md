# Youtube Clone APP

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
