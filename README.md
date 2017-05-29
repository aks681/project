# Job Application Portal
-- Shaastra webops club application

Running the site on a computer is simple enough.
1.  Clone the repository using url of repository.
2.  Make sure you have mongodb installed and its service started in the backgroung. Just type sudo service mongod start for that.
3.  Go inside the project folder in the terminal and type node server.js to start the server at the back-end.
4.  If the status in the terminal is Connected to mongodb and Server running on port 8080, you are good to go.

After this, go to http://localhost:8080 in your browser to load the site.

Working of the webpage:

From the homepage, you can first register yourself by pressing the register button.
For HR personnel only, you can check the 'Are you an admin?' check box, others leave it be.
Once registered, you can login by clicking the login button.
 
For applicants:
 1. In your profile page, once logged in, you can see the list of available posts as provided by the HR dept. At any point, you can return to this page by clicking on the Hello "username" title on the top-left.
 2. On clicking apply (only available for posts which has vacancies (limit>0)), you can apply for that post, and this redirects you to page where you can upload a single pdf doc (< 10 mb) having all necessary documents.
 3. In the customer page, you can see history of posts applied.
 
For admins:
  
  1. In your profile page, you can see the list of posts available.
  2. In the HR page, you can add a post, edit existing posts or delete a post.
  3. On clicking the name of the post, you can see all the applicants who have applied for that post.
  4. You can view their uploaded documents by clicking the respective link beside each applicant.
  5. Then, you can either approve or reject the applicant by clicking the respective buttons.
  
You can logout at any time by clicking the logout button.
