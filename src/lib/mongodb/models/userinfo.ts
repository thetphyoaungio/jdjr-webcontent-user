import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema(
    {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    }
);

const AddressSchema = new mongoose.Schema(
    {
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        town: {
            type: String,
            //required: true
        },
        municipality: {
            type: String
        },
        state: {
            type: String
        },
        
        country_code: {
            type: String
        },
        house_number: {
            type: String
        },
        postcode: {
            type: String
        },
        quarter: {
            type: String
        },
        road: {
            type: String
        },
        shop: {
            type: String
        },
        suburb: {
            type: String
        }
    }
);

const GeolocationSchema = new mongoose.Schema(
    {
        location: {
            type: LocationSchema,
            required: true
        },
        address: {
            type: AddressSchema,
            required: true
        }
    }
)

const UserInfoSchema = new mongoose.Schema(
    {
        deviceId: {
            type: String,
            required: true,
            unique: true,
        },
        deviceType: {
            type: String,
            required: true,
        },
        browserInfo: {
            type: String,
            required: true,
        },
        geolocation: {
            type: GeolocationSchema,
            required: true
        }
    }, 
    {timestamps:true}
);

export default mongoose.models.UserInfo || mongoose.model('UserInfo', UserInfoSchema);