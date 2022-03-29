const Movies=require("../models/movieModel");

class APIfeature {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
    filtering() {
      const queryObj = { ...this.queryString }; //queryString=request.query//
  
      const excludedFields = ["page", "sort", "limit"];
  
      excludedFields.forEach((el) => delete queryObj[el]);
  
      let queryStr = JSON.stringify(queryObj);
  
      queryStr = queryStr.replace(
        /\b(gte|gt|lt|lte|regex)\b/g,
        (match) => "$" + match
      );
  
      this.query.find(JSON.parse(queryStr));
  
      return this;
    }
    sorting() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(",").join(" ");
        console.log(sortBy);
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort("-createdAt");
      }
      return this;
    }
    paginating() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 9;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
  }


const movieCtrl={
    getmovies:async(request,response)=>{
        try {
            const features = new APIfeature(Movies.find(), request.query)
            .filtering()
            .sorting()
            .paginating();
    
          const movies = await features.query;
    
          response.json({
            status: "success",
            result: movies.length,
            movies: movies,
          });
            
            
        } catch (error) {
            return response.status(500).json({msg:error.message})
            
        }
    },

    createmovies:async(request,response)=>{
        try {
            const {
                movie_id,
                title,
                rating,
                summary,
                images,
                trailer,
                category,
              } = request.body;
              if (!images)
                return response.status(400).json({ msg: "No images upload" });
              const movie = await Movies.findOne({ movie_id });
              if (movie)
                return response
                  .status(400)
                  .json({ msg: "This Movie already Exists" });
        
              const newMovies = new Movies({
                movie_id,
                rating,
                summary,
                title,
                images,
                category,
                trailer
              });
              await newMovies.save();
              response.json({ msg: "Movie  Created Successfully" });

            
        } catch (error) {
            return response.status(500).json({msg:error.message})
            
        }
    },
    deletemovies:async(request,response)=>{
        try {
            await Movies.findByIdAndDelete(request.params.id);
            response.json({ msg: "Deleted A Movie" });
            
        } catch (error) {
            response.status(500).json({msg:error.message})
        }
    },
    updatemovies:async(request,response)=>{
        try {
            const { title,rating, summary, images, trailer, category } =
            request.body;
          if (!images) return response.status(400).json({ msg: "No image found" });
          await Movies.findOneAndUpdate(
            { _id: request.params.id },
            {
              title,
              rating,
              summary,
              trailer,
              images,
              category,
            }
          );
    
          response.json({ msg: "Movie Updated successfully" });
            
        } catch (error) {
            response.status(500).json({msg:error.message})
            
        }
    }


}


module.exports=movieCtrl;