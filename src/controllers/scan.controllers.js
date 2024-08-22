import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { History } from "../models/history.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import fs from 'fs';

// Your Scan controller
const Scan = asyncHandler(async (req, res) => {
    const fileScan = req.files?.fileScan?.[0];
    // Ensure you’re correctly accessing the file
    if (!fileScan) {
        throw new ApiError(400, "No file uploaded");
    }

    const fileLocalPath = fileScan.path;
    console.log(fileLocalPath)

    try {
        // Upload the file to Cloudinary
        const fileUpload = await uploadOnCloudinary(fileLocalPath);

        // Save the file URL in the History model
        const history = await History.create({
            file: fileUpload.secure_url,
        });

        // Fetch the created history entry
        const createdHistory = await History.findById(history._id);

        if (!createdHistory) {
            throw new ApiError(500, "Something went wrong");
        }

        // Return the created history entry in the response
        return res.status(201).json(new ApiResponse(200, createdHistory));
    } catch (error) {
        // Handle any errors that occur during the process
        throw new ApiError(500, error.message || "Internal Server Error");
    } finally {
        // Optionally, you might want to clean up the local file after uploading it
        fs.unlink(fileLocalPath, (err) => {
            if (err) console.error("Failed to delete local file:", err);
        });
    }
});

export { Scan };

