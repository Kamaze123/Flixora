# Flixora - movie recommending website
My website recommends you movies based on your mood. Basically you type out a prompt of whatever kind of movie you feel like watching and it sends back a few movies based on your prompt. 

## How to run the website
Navigate to terminal and run : 
`npm install express axios path fs`

## How It's Made:
Tech used: HTML, CSS, JavaScript, Node.js 

I'm not talented enough to build my own movie recommending AI yet, so I used an external API for this purpose. The API I used was [this](https://rapidapi.com/AirFU/api/ai-movie-recommender).

I'm a broke college student, so I was forced to used the free plan of the above API, which only allows 5 requests per day. 5 requests per day is a terrible number for any kind of a website, especially a movie website. But I really wanted to make something related to movies cuz I'm crazy about movies, hence I chose this API. 

So basically, my website has two options, trending and custom search. Choosing the trending option gives you a list of movies which are currently trending while the custom search option asks you for some prompts and gives you movies based on your prompts. The option you choose hits up a particular API endpoint which in return gives back an JSON. I have used axios to get back results from the API. This result JSON is passed to an ejs file. 

A list of movies are displayed in the ejs file along with some templating and formatting. From here, you can choose any movie you want. Clicking on a movie leads to a seperate webpage which contains the ratings, release date as well as the summary of this movie.

## What I learnt:
I learnt how to work with public APIS and their documentations. Rendering the JSON text into the ejs files were also a bit tricky, but I figured it out. I haven't applied any media queries though. I probably should in the futue.

