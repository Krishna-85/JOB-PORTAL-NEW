import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Verify Webhook Signature
        const payload = JSON.stringify(req.body); 
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        };

        try {
            whook.verify(payload, headers);
        } catch (verificationError) {
            console.error("Webhook verification failed:", verificationError.message);
            return res.status(400).json({ success: false, message: "Invalid webhook signature" });
        }

        // Extract Event Data
        const { data, type } = req.body;

        if (!data || !type) {
            console.error("Invalid webhook payload:", req.body);
            return res.status(400).json({ success: false, message: "Invalid webhook payload" });
        }

        switch (type) {
            case "user.created": {
                console.log("Processing user.created event...");
                
                const userData = {
                    _id: data.id,
                    email: data.email_addresses?.[0]?.email_address || "",
                    name: `${data.first_name} ${data.last_name}`.trim(),
                    image: data.image_url || "",
                    resume: ""
                };

                try {
                    const newUser = await User.create(userData);
                    console.log("User successfully created:", newUser);
                    return res.status(201).json({ success: true, user: newUser });
                } catch (dbError) {
                    console.error("Database error:", dbError.message);
                    return res.status(500).json({ success: false, message: "Database error" });
                }
            }

            default:
                console.log("Unhandled event type:", type);
                return res.status(200).json({ success: true, message: "Event received but not processed" });
        }
    } catch (error) {
        console.error("Webhook processing error:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
