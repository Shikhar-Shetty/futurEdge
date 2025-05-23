import mongoose, {Schema, Document} from "mongoose";

export interface Profile extends Document{
    userId: mongoose.Schema.Types.ObjectId;
    name: string;
    imageUrl: string;
    industry: string;
    subIndustry: string;
    bio?: string;
    experience: number;
    skills: string[];
}

const ProfileSchema: Schema<Profile> = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: "",

    },
    industry: {
        type: String,
        required: true,
        
    },
    subIndustry: {
        type: String,
        required: true,
    },
    bio: {
        type: String
    },
    experience: {
        type: Number,
        required: true
    },
    skills: [
        {
            type: String,
            required: true
        },
    ],

}, {timestamps: true})

const ProfileModel = mongoose.models.Profile || mongoose.model("Profile", ProfileSchema)

export default ProfileModel;
