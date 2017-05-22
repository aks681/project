# Job Application Portal
webops club application

To run this on a localhost, you need to have node.js installed and also node package manager (npm). No need to run npm install, as all the files are already present.

You also need to have mongodb installed and have its process running in the background. Just type sudo service mongod start for that.

Then, go into the project folder and just type node server.js in the terminal window in ubuntu to run the site on a localhost. By default, it runs on port 8080. 

If the message, comes in the terminal, connected to mongodb, you are good to go.

This is a web page for the HR department for a company regarding hiring people for particular posts. Uploading of documents is currently not supported.

Steps common to both users

1. Register yourself by clicking register link. There are some conditions:
 1. Name should have 2 words.
 2. Password should be between 8 and 35 characters with small, caps, numbers and special symbols.
 3. Username should be a single word with no special characters.
2. After registering login with your created username and password.

Steps to follow for an applicant:

1. In the first page, you can see the list of posts available and apply for any of the posts whose limit has not been reached, also you can return to this page by clicking on your username on the top-right corner.
2. On clicking the customer tab, you can see the history of posts pending for approval, approved and rejected.

Steps to follow for the admin:

1. In the first page, you also can see all posts available.
2. On clicking the HM tab, you can see all the posts in admin mode, i.e you can add posts, edit existing ones or delete posts.
3. On clicking the name of the posts, you can see the list of users who have applied for the post and those who have been approved.
4. Then, on the applicants waiting for approval, you can either approve or reject them for the post by clicking the corresponding buttons
