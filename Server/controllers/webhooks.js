import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
    try {
        // Convert Raw Body to JSON
        const bodyString = req.body.toString('utf8'); 
        const parsedBody = JSON.parse(bodyString);
        console.log("Received Webhook:", parsedBody); 

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        const { data, type } = req.body;

        switch (type) {
            case 'user.created': {
                console.log("User Created Event:", data); 
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0]?.email_address || "", // Handle undefined case
                    name: `${data.first_name} ${data.last_name}`,
                    image: data.image_url,
                    resume: ''
                };

                console.log("Creating user:", userData);
                const newUser = await User.create(userData);
                console.log("User created:", newUser);

                res.json({ success: true, user: newUser });
                break;
            }

            default:
                console.log("Unhandled Webhook Event:", type);
                res.json({});
        }
    } catch (error) {
        console.log("Webhook Error:", error.message);
        res.status(400).json({ success: false, message: 'Webhook error' });
    }
};
