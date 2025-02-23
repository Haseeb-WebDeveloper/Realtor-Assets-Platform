import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";

async function createAdmin() {
  try {
    await connectToDatabase();


    const adminData = {
      name: "Aloaye Ali",
      email: "wave.digitalmarketer@gmail.com",
      password: "$2b$10$uDUNOsCodmjAX27jTHfN.uRcIeKvUO3ws45PFCv.cC8/NTrq.0bhC",
      role: "admin",
      isEmailVerified: true,
      subscription: {
        plan: "premium",
        status: "active",
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        autoRenew: true,
        paymentHistory: [],
      },
    };

    const existingAdmin = await User.findOne({ email: adminData.email });
    
    if (existingAdmin) {
      console.log("Admin user already exists!");
      return;
    }

    const admin = await User.create(adminData);
    console.log("Admin user created successfully:", admin);
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    process.exit();
  }
}

createAdmin(); 