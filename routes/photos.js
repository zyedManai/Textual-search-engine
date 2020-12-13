const express = require("express");
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

const router = express.Router();
const app = express()
let links = []

router.get("/",(req,res)=>{
    res.render('photos',{photos:links});
})
router.post("/",(req,res)=>{
    async function run () {
        // Let's search!
        links =[];
        const { body } = await client.search({
            index: 'flickrphotos',
            body: {
                query: {
                    fuzzy: {
                        tags : {
                           value : req.body.tag,
                        }
                    }
                }
            }
        })

        body.hits.hits.forEach(response =>{
            links.push("http://farm"+response._source.flickr_farm+".staticflickr.com/" +response._source.flickr_server+"/"+response._source.id+"_"+response._source.flickr_secret+".jpg")
        })
        //console.log(links);
        //res.redirect("/");
        await res.render('photos',{photos:links});
    }
    run().catch(console.log);
})

module.exports = {router:router};