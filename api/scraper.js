import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeSchedule(cookie) {
    try {
        const { data } = await axios.get("https://myasb.asbarcelona.com/portal/myschedule/", {
            headers: {
                "Cookie": "sessionid=" + cookie,
                "User-Agent": "Mozilla/5.0" // should make it more reliable?
            }
        });

        const $ = cheerio.load(data);
        const results = {};

        $("tbody tr").each((_, row) => {
            const dayName = $(row).find("th").first().text().trim();
            results[dayName] = {};
            $(row).find("td")
                .each((i, cell) => {
                    const subject = $(cell).find("strong").text().trim();
                    if (!subject) return; // skip empty cells

                    const teacher = $(cell).contents().filter(function () {
                        return this.type === "text" && $(this).text().trim() !== "";
                    }).text().trim();

                    const email = $(cell).find(".email-text").first().text().trim();
                    const room = $(cell).find(".row .col-6").first().text().trim();
                    const code = $(cell).find(".row .col-6").last().text().trim();

                    results[dayName][i + 1] = {
                        subject,
                        teacher,
                        email,
                        room,
                        code
                    };
                });
        });

        return results;
    } catch (error) {
        return `Error scraping site: ${error.message}`;
    }
}

