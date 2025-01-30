const express = require("express")
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js")
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const  reviewController = require("../controllers/reviews.js")
const { isLoggedIn, isReviewAuthor } = require("../middleware.js");


const validateReview =(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
  
    if(error){
      let ermsg= error.details.map((el)=> el.message).join(",");
      throw new ExpressError(ermsg,400);
    }
    else{
      next();
    }
  };


//------------------------reviews post route-----------------------------
router.post("/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview));
   //---------------------------reviews delete route -------------------------
   router.delete("/:reviewId",isLoggedIn,isReviewAuthor,
    wrapAsync(reviewController.destoryReview));
   
   module.exports= router;