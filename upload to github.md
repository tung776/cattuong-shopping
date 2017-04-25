git config --global user.name "nguyen thanh tung"
Set your git config email (which should match your github account email):
git config --global user.email "thanhtung776@gmail.com"
Make your current directory a git repository by running:
git init
Using the SSH link you copied in step 7, add the remote repository as the origin:
git remote add origin git@github.com:tung776/cattuong-shopping.git
Add your files and commits, as you normally would:



git add .
git commit -m "First commit"
Push your changes:
git push -u origin master

