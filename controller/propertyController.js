import Property from "../models/Property.js";
import User from "../models/User.js";

export const fetchProperty = async (req, res) => {
  try {
    // Extract filtering parameters from the request query
    const { city, moveindate, pricerange, propertytype } = req.query;
    
    

    // Construct the filter object based on the provided parameters
    const filter = {};

    // Handle city filtering
    if (city) {
      filter.city = city;
    }

    // Handle moveindate filtering
    if (moveindate) {
      filter.moveindate = { $lte: new Date(moveindate) };
    }
   

    // Handle pricerange filtering
    if (pricerange) {
      const [minPrice, maxPrice] = pricerange.split("-");
      filter.rent = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
    }

    // Handle propertytype filtering
    if (propertytype) {
      filter.propertytype = propertytype;
    }

    // Perform the property search with the constructed filter
    const properties = await Property.find(filter);

    return res.json({ success: true, properties: properties });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching properties", error: error });
  }
};

export const createProperty = async (req, res) => {
  try {
    const {
      imageurl,
      rent,
      name,
      area,
      city,
      country,
      beds,
      bathrooms,
      roomheight,
      roomwidth,
      propertytype,
      moveindate,
    } = req.body;
    const userid = req.user.id;

    const newProperty = await Property.create({
      user: userid,
      imageurl,
      rent,
      name,
      area,
      city,
      country,
      beds,
      bathrooms,
      roomheight,
      roomwidth,
      propertytype,
      moveindate,
    });

    return res.json({ success: true, properties: newProperty });
  } catch (error) {
    return res.json({ message: "Internal Server Error" });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      rent,
      name,
      area,
      city,
      country,
      beds,
      bathrooms,
      roomheight,
      roomwidth,
      propertytype,
      moveindate,
    } = req.body;
    const userid = req.user.id;

    const updatedProperty = await Property.findByIdAndUpdate(id, {
      rent,
      name,
      area,
      city,
      country,
      beds,
      bathrooms,
      roomheight,
      roomwidth,
      propertytype,
      moveindate,
    });

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProperty = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProperty = await Property.findByIdAndDelete(id);

    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchAdminProperty = async (req, res) => {
  try {
    const userId = req.user.id;
    const properties = await Property.find({ user: userId });
    if (!properties) {
      return res.status(404).json({ message: "No Property found" });
    }
    return res.json({ properties });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
