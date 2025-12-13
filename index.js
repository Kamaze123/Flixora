import express from "express";
import axios from "axios";
import path from "path";
import fs from "fs";

const __dirname = path.resolve(); 

const mockData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "mock/movies.json"), "utf-8")
);

let result;
let type;
let movie;


const app = express();
const port = 3000;
const APIkey = "04994c236bmshe3bb5b350551b3bp139d13jsn52b3a1fa8dd9";

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res)=>{
    res.sendFile(path.resolve("public/home.html"));
});

app.post("/find", async (req, res)=>{
    const userprompt = req.body.prompt;
    try{
        result = await axios.get(
            "https://ai-movie-recommender.p.rapidapi.com/api/search",
            {params:{
                q: userprompt
            },
            headers: {
                'x-rapidapi-key': APIkey,
                'x-rapidapi-host': 'ai-movie-recommender.p.rapidapi.com'
            }}
        )
        console.log(result.data);
        type = "find";
        res.render("find.ejs", {movies : result.data.movies, data : result.data});
        /*res.render("find.ejs", {movies : mockData.movies, data : mockData});*/
    }catch(error){
        console.log(error.message);
        res.sendFile(path.resolve("public/error.html"));
    }
});

app.get("/movies/:id", (req, res)=>{
    const id = req.params.id;
 
    if(type == "find"){
      movie = result.data.movies.find(m => m.id == id);
    }
    if(type == "trending"){
        movie = result.data.results.find(m => m.id == id);
    }

    if(!movie){
        return res.status(404).sendFile(path.resolve("public/error.html"));
    }
    res.render("movies.ejs", {film : movie});
});

app.get("/trending", async (req, res)=>{
    try{
        result = await axios.get(
            "https://ai-movie-recommender.p.rapidapi.com/api/trending",
            {headers: {
                'x-rapidapi-key': APIkey,
                'x-rapidapi-host': 'ai-movie-recommender.p.rapidapi.com'
            }}
        )
        type = "trending";
        const temp = "a";
        const limited = result.data.results.slice(0,10);
        console.log(limited);
        res.render("find.ejs", {movies : limited, trend : temp});
        /*res.render("find.ejs", {movies : mockData.movies, trend : temp});*/
    }catch(error){
        console.log(error.message);
        res.sendFile(path.resolve("public/error.html"));
    }
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});

app.use((req, res) => {
  res.status(404).render("404.ejs");
});



