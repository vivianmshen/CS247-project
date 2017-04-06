Bing
====

Team
----
[Francisco Guzmán](mailto:fguzman1@stanford.edu) ~ [fguzman](https://github.com/fguzman)  
[Amanda Lin](mailto:alin3@stanford.edu) ~ [pandolin](https://github.com/pandolin)  
[Vivian Shen](mailto:vshen@stanford.edu) ~ [vivianshen](https://github.com/vivianshen)  
[Tim Shi](mailto:timshi@stanford.edu) ~ [timgshi](https://github.com/timgshi)

Intro
-----

This repo is to be used for all code related to our team's [DP4](http://hci.stanford.edu/courses/cs247/2013/p4.html) for [CS247 at Stanford](http://cs247.stanford.edu).

Homepage
--------
The project homepage can be found at http://cs247stanford.github.com/bing/.

For now we are using the [GitHub Automatic Page Generator](https://help.github.com/articles/creating-pages-with-the-automatic-generator). To edit, click on [Settings](https://github.com/cs247stanford/bing/settings) at the top of the project page and then click on [Automatic Page Generator](https://github.com/cs247stanford/bing/generated_pages/new).

In the future we'll probably want to create our own custom page, but for now the basic layout will work.

Git
---
We're going to follow the branching model described [here](http://nvie.com/posts/a-successful-git-branching-model/).
Basically the master branch is reserved for the live code. You should never be working in the master branch, instead branch off of develop for each feature you're working on, and merge back into develop when you're done. Changes in develop can then be merged into master and become live. Use pull requests to merge code in so that everybody sees what's going on and it's easier to keep track of updates as they come in.

To checkout the develop branch for the first time after cloning:
```
git checkout -t origin/develop
```
Then to checkout your own feature branch and push to GitHub so that we can all see (make sure to do this while in the develop branch):
```
git checkout develop
git checkout -b feature/my-new-feature-branch
git push -u origin feature/my-new-feature-branch
```

Once your branch is ready to merge in, open a pull request and assign it to somebody for review. Once they approve you can merge it. Make sure to merge into ```develop``` only! The ```master``` branch should only ever have merges from ```develop```. Example below:
```
git checkout develop
git merge --no-ff feature/my-finished-feature-branch
git push origin develop
```
The pull request will automatically be closed.

Once we're happy with ```develop``` we can merge into ```master``` to go live. Open a pull request from ```develop``` into ```master``` and:
```
git checkout master
git merge --no-ff develop
git push origin master
```
Note: ```no-ff``` is a "no fast forward" tag. Basically it makes sure that we keep all merge data and can see which branches are merging where.

Let's keep the repo clean and well organized!

Heroku
------
We're hosting our project on [Heroku](heroku.com) at [bing247.herokuapp.com](bing247.herokuapp.com). We're running a [meteor](meteor.com) project using the [meteorite](https://github.com/oortcloud/meteorite) package manager. To push live code to the server you just need to push the git repo to heroku.  

To get started first download the [Heroku Toolbelt](https://toolbelt.heroku.com/) and install.  
Next ```cd``` into your git repo for this project and run:
```
git remote add heroku git@heroku.com:bing247.git
git push heroku master
```
That will get you all set up to push to heroku. To push future update to heroku (assuming you're working in a feature branch, where ```feature/my-feature-branch``` is the name of your branch off of develop):
```
git checkout develop
git merge --no-ff feature/my-feature-branch
git push origin develop
git checkout master
git merge --no-ff develop
git push origin master
git push heroku master
```
The final command will push all of your new code (everything you've merged into master) onto heroku and relaunch the app!

Meteor
------
We're using [meteor](meteor.com) as our web app framework and using [meteorite](https://github.com/oortcloud/meteorite) to manage it. First you'll need to install Node from [here](http://nodejs.org/). Then install meteorite using:
```
https://github.com/oortcloud/meteorite
```
Once it's installed you can run locally. To run the app locally:
```
mrt
```
