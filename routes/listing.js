const express = require("express")
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema ,reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const mongoose = require("mongoose");
const {isLoggedIn, isOwner}=require("../middleware.js")
const methodOverride = require("method-override");
const listingController = require("../controllers/listings.js")
router.use(methodOverride("_method")); 
const multer = require("multer");
const {storage}=require("../cloudConfig.js")
const upload= multer({storage});


const validateListing =(req,res,next)=>{
  let {error}=listingSchema.validate(req.body);

  if(error){
    let ermsg= error.details.map((el)=> el.message).join(",");
    throw new ExpressError(ermsg,400);
  }
  else{
    next();
  }
};

router.
  route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createListing)
  );

  

  router.get(
    "/new", isLoggedIn, listingController.renderNewForm);


  router.
  route("/:id")
  .get( wrapAsync(listingController.showListing)
  )
  .put( 
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListing)
)
.delete(
   isLoggedIn,
  wrapAsync(listingController.destoryListing));


 router.get(
    "/:id/edit",isLoggedIn, 
    wrapAsync(listingController.renderEditListing)
  );
  
   module.exports =router;