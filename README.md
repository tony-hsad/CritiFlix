# Movies App
## What is CritiFlix ?
You are passionate of cinematographics ? Welcome in **CritiFlix**, share your cinematographic passions with your family, your friends, or even colleagues on free time.

CritiFlix is a real-time web app where users can search for different types of cinematographic such as movies, series, documentaries or others types. Down below you can see numerous features :
- [x] Easy pagination buttons to navigate the users or contents
- [x] Create your account
- [] Rate a content
- [] Give an opinion
- [] Recommend users : movies, series, documentaries and more
- [] Add in bookmarks
- [x] Display the amount of admissions
- [x] Update or Delete the content you've just added
- [x] Add an inexistent content
- [x] Friends system

## Authors
- HADJ SADOUN Tony

# Installation & Configuration
To run the application, you need to set up Docker on your computer.

When done you can open a terminal.

The first time you'll need to build the image by running this command :
```shell
docker compose -f compose.yaml -f compose.override.yaml up -d --build database php pwa
```

To stop the application please run :
```shell
docker compose stop
```
