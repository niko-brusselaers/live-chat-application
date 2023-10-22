# changelog

## [0.0.1] - 2022-10-10

### Added

    created initial frontend structure of live chat application
    -frontend
        -sideNavComponent
        -chatComponent
        -messageComponent
        -messageInputComponent
    
## [0.0.2] - 2022-11-10

### Added

    created backend server with socket io and added sockets:
    - login : used to login with username
    - logout : used to logout with username

    started on building socket:
    - message

## [0.0.3] - 2022-20-10
    
    ### changed

    - message socket: made it possible to make chatrooms and send messages to specific chatrooms
    - login socket: made it so that socketId is saved with username in database

    ### Added

    - getmessages socket : way to let user get updated messages and chatrooms from database
    - disconnect socket : way to let user disconnect from chatroom and where user and user data is removed from database

    ### removed

    - logout socket 

## [0.0.4] - 2022-21-10

    ### changed

    - frontend: updated style of frontend live chat application