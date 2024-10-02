import { User } from "../models/auth_model.js"
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import axios from "axios"
import { profileUpdateNotification } from "./notification_controller.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {   
      return res.status(409).json("This Email already exists");
    }
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save(); 
    res.status(201).json("User Created Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const login= async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
}


export const google=async(req,res,next)=>{
  try {
    const user=await User.findOne({email:req.body.email})
     if(user)
     {
      const token=jwt.sign({id: user._id}, process.env.JWT_SECRET)
      const  {password: pass, ...rest } = user._doc;
      res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
    }
else{
  const genratedPassword=
  Math.random().toString(36).slice(-8) +
  Math.random().toString(36).slice(-8);
  const hashedPassword = bcryptjs.hashSync(genratedPassword, 10);
  const newUser = new User({
    username:
      req.body.name.split(' ').join('').toLowerCase() +
      Math.random().toString(36).slice(-4),
    email: req.body.email,
    password: hashedPassword,
    avatar: req.body.photo,
  });
  await newUser.save();
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
  const { password: pass, ...rest } = newUser._doc;
  res
    .cookie('access_token', token, { httpOnly: true })
    .status(200)
    .json(rest);
}
  } catch (error) {
    next(error)
  }
}

export const signout=async(req,res,next)=>{
  try {
    res.clearCookie('access_token')
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error)  
  }
}




export const updateUser = async (req, res, next) => {
  const userId=req.params.id
  try {
    // Hash password if provided
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Check if address is provided
    if (req.body.address) {
      const address = req.body.address; // Define address

      // Make API call to geocode.xyz
      const response = await axios.get('https://geocode.xyz/', {
        params: {
          auth: '112704341054483e15827224x55307',
          locate: address,
          json: 1,
        },
        timeout: 5000, // Optional: set timeout
      });

      console.log('Geocode.xyz Response:', response.data);

      // Check for API errors
      if (response.data.error) {
        return res.status(400).json({ error: response.data.error.description });
      }

      const { latt, longt } = response.data;

      // Validate latitude and longitude
      if (!latt || !longt) {
        return res.status(400).json({ error: 'Unable to retrieve coordinates.' });
      }

      // Update the location field as GeoJSON
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
            address: req.body.address,
            phone: req.body.phone,
            location: {
              type: 'Point',
              coordinates: [parseFloat(longt), parseFloat(latt)], // [longitude, latitude]
            },
          },
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const { password, ...rest } = updatedUser._doc;
      await profileUpdateNotification(userId);
      return res.status(200).json(rest);
    } else {
      // Update without location
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
            address: req.body.address,
            phone: req.body.phone,
          },
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const { password, ...rest } = updatedUser._doc;
      await profileUpdateNotification(userId);
      res.status(200).json(rest);
    }
  } catch (error) {
    console.error('Update User Error:', error);
    next(error);
  }
};



export const searchNearbyUsers = async (req, res, next) => {
  try {
    const { longitude, latitude, searchItem } = req.body;
    let distance = 50000; // Default distance of 50,000 meters (50 km)

    // Validate the request body
    if (!longitude || !latitude || !searchItem) {
      return res.status(400).json({ message: 'Longitude, latitude, and search item are required.' });
    }

    let nearbyUsersWithItems = [];

    // Repeat the query until we find users or we have searched in a sufficiently large radius
    while (nearbyUsersWithItems.length === 0 && distance <= 500000) { // limit search to 500,000 meters (500 km)
      // Geospatial query to find users near the given location within the current distance
      nearbyUsersWithItems = await User.aggregate([
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: [longitude, latitude], // User's location from request body
            },
            distanceField: 'distance', // Field to store calculated distance
            maxDistance: distance * 1000, // Current search distance in meters
            spherical: true, // Use spherical calculations for accuracy
          },
        },
        {
          $lookup: {
            from: 'items', // Name of the Item collection
            localField: '_id', // User's unique ID field in User collection
            foreignField: 'userId', // Field in Item collection that relates to the User
            as: 'items', // Alias for the joined data
          },
        },
        {
          $match: {
            'items.itemName': searchItem, // Check if the user's items contain the searchItem
          },
        },
        {
          $limit: 10, // Limit the number of results to avoid too many responses
        },
      ]);

      // If no users are found within the current distance, increase the distance for the next iteration
      distance += 50000; // Increase by 50,000 meters (50 km) in each iteration
    }

    // Check if any users are found with the searched item
    if (nearbyUsersWithItems.length === 0) {
      return res.status(404).json({ message: 'No users with the specified item found nearby.' });
    }

    // Return the list of nearby users along with their items
    return res.status(200).json(nearbyUsersWithItems);
  } catch (error) {
    console.error('Error in geospatial query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
