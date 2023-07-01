const express =require('express')
const multer =require('multer')
const mongoose =require('mongoose')
const path =require('path')
const cors =require('cors')
const app =express()

const Schema = require('./src/model/filesSchema')

// const fileupload = require('express-fileupload')

// app.use(fileupload({ useTempFiles: true }));

app.use(express.static("public"))

// const body=require('body-parser')

// app.use(body.urlencoded({extended:true}))

app.use(cors())
app.use(express.urlencoded())

app.use(express.json({limit:"5mb"}))
// app.use(body.json())

// var cloudinary = require('cloudinary').v2;

// cloudinary.config({ 
//     cloud_name: 'djx4fvpwq',//process.env.CLOUD_NAME, 
//     api_key: '644941413397474',//process.env.API_KEY, 
//     api_secret: 'DSsfrlUpLywll4GBdeoK590kWck'//process.env.API_SCRE
// });



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });
// storing data

app.post('/filesupload/:name',upload.single('file'),async(req,res)=>{
    try {
        const audioUrls = req.file.path;
        console.log(req.file.mimetype,"mimitype")
        console.log(req.file.stream,"stream")
        console.log(req.file.originalname,"orginal")
        const uploadfile =await Schema.create({
            Email:req.params.name,
            fileName:audioUrls,
        })
        console.log(uploadfile)
        return res.json('done')
    } catch (error) {
        return res.json(error.message)
    }
})

// res.download(req.files.file.tempFilePath)

        // const fileuploader = await cloudinary.uploader.upload(req.files.file.tempFilePath,{
        //     public_id: `${Date.now()}`,
        //     resource_type: "auto",
        //     folder: "images",
        // })
        // console.log(fileuploader.secure_url)
        // console.log(fileuploader.public_id)
        // let dar =await cloudinary.url(fileuploader.public_id, { secure: true })
        // console.log(dar)
        // const audioUrls = req.files.map(file => file.filename);
        // console.log(audioUrls)
        // // const uploadfile =await Schema.create({
        // //     Email:req.params.name,
        // //     fileName:req.files.file.name,
            
        // // })
//fetching

app.post('/download',async(req,res)=>{
    try {
        const find =await Schema.find({Email:req.body.email})
        console.log(find)
        return res.status(200).json(find)
    } catch (error) {
        return res.status(404).json(error.message)
    }
})

//downloadfile 

app.get('/fileDownload/:id',async(req,res)=>{
    // try {
        const params =req.params.id
        const file64 =await Schema.findById(params)
        const paths = file64.fileName
        const filepath = path.join(__dirname,`./${paths}`)
         res.download(filepath)
    // } catch (error) {
    //     return res.json(error.message)
    // }
})

app.listen(3001,async()=>{
    await mongoose.connect('mongodb+srv://Aro:aro123@arockiajeyson.aswzaya.mongodb.net/?retryWrites=true&w=majority')
    console.log('dbconnented')
    console.log('port')
})