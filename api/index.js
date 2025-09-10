import express from "express";
import { scrapeSchedule } from "./scraper.js";

const app = express();
const PORT = process.env.PORT || 3000;
const AUTHOR = "@BouncingElf10";

app.get("/", (req, res) => {
    res.json({
        status: "200",
        author: AUTHOR,
        message: "Welcome! For issues, contact " + AUTHOR + ", for documentation visit https://github.com/BouncingElf10/asbapi"
    });
});

app.get("/schedule", (req, res) => {
    res.json({
        status: "200",
        author: AUTHOR,
        message: "Provide your session cookie as a parameter: /schedule/YOUR_COOKIE_HERE"
    });
});

app.get("/schedule/:cookie", async (req, res) => {
    const cookie = req.params.cookie;

    if (!cookie || cookie.trim() === "") {
        return res.status(400).json({
            status: "400",
            error: "Cookie parameter is required. Example: /schedule/YOUR_COOKIE_HERE",
            contact: AUTHOR
        });
    }

    try {
        const schedule = await scrapeSchedule(cookie);

        if (!schedule || Object.keys(schedule).length === 0) {
            return res.status(404).json({
                status: "404",
                error: "No schedule found. Cookie might be invalid or expired.",
                contact: AUTHOR
            });
        }

        res.json({
            status: "200",
            author: AUTHOR,
            schedule
        });
    } catch (error) {
        res.status(500).json({
            status: "500",
            error: "An error occurred while fetching the schedule.",
            details: error.message,
            contact: AUTHOR
        });
    }
});

export default app;
