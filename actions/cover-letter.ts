"use server";

import dbConnect from "@/lib/dbConnect";
import CoverLetterModel from "@/models/CoverLetter";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import ProfileModel from "@/models/Profile";
import { GoogleGenerativeAI } from "@google/generative-ai";
import mongoose from "mongoose";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface CoverLetterInput {
  jobTitle: string;
  companyName: string;
  jobDescription: string;
}

// Define a clean interface for serialized cover letter without Mongoose methods
export interface SerializedCoverLetter {
  _id: string;
  content: string;
  jobDescription: string;
  companyName: string;
  jobTitle: string;
  status: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function generateCoverLetter(data: CoverLetterInput): Promise<SerializedCoverLetter> {
  console.log("Recieved Data:", data);
  
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const userProfile = await ProfileModel.findOne({ userId: session.user.id});
  if (!userProfile) throw new Error("Profile not found");

  const prompt = `
    Write a professional cover letter for a ${data.jobTitle} position at ${data.companyName}.

    About the candidate:
    - Industry: ${userProfile.industry}
    - Years of Experience: ${userProfile.experience}
    - Skills: ${userProfile.skills.join(", ")}
    - Professional Background: ${userProfile.bio}

    Job Description:
    ${data.jobDescription}

    Requirements:
    1. Use a professional, enthusiastic tone
    2. Highlight relevant skills and experience
    3. Show understanding of the company's needs
    4. Keep it concise (max 400 words)
    5. Use proper business letter formatting in markdown
    6. Include specific examples of achievements
    7. Relate candidate's background to job requirements

    Format the letter in markdown.
  `;

  try {
    const result = await model.generateContent(prompt);
    const content = result.response.text().trim();

    const newCoverLetter = await CoverLetterModel.create({
      content,
      jobDescription: data.jobDescription,
      companyName: data.companyName,
      jobTitle: data.jobTitle,
      status: "completed",
      userId: userProfile._id, 
    });

    // Create a clean serialized version
    const serializedCoverLetter: SerializedCoverLetter = {
      _id: newCoverLetter._id.toString(),
      content: newCoverLetter.content,
      jobDescription: newCoverLetter.jobDescription,
      companyName: newCoverLetter.companyName,
      jobTitle: newCoverLetter.jobTitle,
      status: newCoverLetter.status,
      userId: newCoverLetter.userId.toString(),
      createdAt: newCoverLetter.createdAt,
      updatedAt: newCoverLetter.updatedAt,
    };
    
    return serializedCoverLetter;
  } catch (error: any) {
    console.error("Error generating cover letter:", error.message);
    throw new Error("Failed to generate cover letter");
  }
}

export async function getCoverLetters(): Promise<SerializedCoverLetter[]> {
  await dbConnect();
  
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");
  
  const userProfile = await ProfileModel.findOne({ userId: session.user.id });
  if (!userProfile) throw new Error("Profile not found");

  // Use .lean() to return plain objects
  const coverLetters = await CoverLetterModel.find({ userId: userProfile._id })
    .sort({ createdAt: -1 })
    .lean<SerializedCoverLetter[]>();  
  
  const serialized = coverLetters.map(letter => {
    return {
      _id: letter._id.toString(),
      content: letter.content,
      jobDescription: letter.jobDescription || "",
      companyName: letter.companyName,
      jobTitle: letter.jobTitle,
      status: letter.status,
      userId: letter.userId.toString(),
      createdAt: letter.createdAt,
      updatedAt: letter.updatedAt,
    } as SerializedCoverLetter;
  });

  return serialized;
}


export async function getCoverLetter(id: string): Promise<SerializedCoverLetter> {
  if (!id) {
    throw new Error("Cover letter ID is required");
  }
  
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const profile = await ProfileModel.findOne({ userId: session.user.id });
  if (!profile) throw new Error("Profile not found");

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid cover letter ID");
  }

  const coverLetter = await CoverLetterModel.findOne({
    _id: id,
    userId: profile._id,
  }).lean<SerializedCoverLetter>();

  if (!coverLetter) throw new Error("Cover letter not found or unauthorized");

  // Create a clean serialized version
  const serialized: SerializedCoverLetter = {
    _id: coverLetter._id.toString(),
    content: coverLetter.content,
    jobDescription: coverLetter.jobDescription,
    companyName: coverLetter.companyName,
    jobTitle: coverLetter.jobTitle,
    status: coverLetter.status,
    userId: coverLetter.userId.toString(),
    createdAt: coverLetter.createdAt,
    updatedAt: coverLetter.updatedAt,
  };

  return serialized;
}

export async function deleteCoverLetter(id: string) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const profile = await ProfileModel.findOne({ userId: session.user.id });
  if (!profile) throw new Error("Profile not found");

  const deleted = await CoverLetterModel.findOneAndDelete({
    _id: id,
    userId: profile._id,
  });

  if (!deleted) throw new Error("Failed to delete or unauthorized");

  return { success: true, message: "Cover letter deleted successfully" };
}