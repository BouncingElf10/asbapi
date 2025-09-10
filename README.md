
---

<p align="center"><img src="https://github.com/user-attachments/assets/7795e822-3acb-4ef6-9ab7-6a6967e74127" alt="abs_logo" width="300"></p>
<h1 align="center">asbapi - The Unofficial ASB API</h1>
<p align="center">For any devs at ASB wanting to get their fair share of data</p>

## Table of Contents

- [Getting Started](#getting-started)
- [Reference](#reference)
   - [Endpoints](#endpoints)
   - [Request Parameters](#request-parameters)
   - [Response Parameters](#response-parameters)
- [Getting Your Session Cookie](#getting-your-session-cookie)
- [Error Handling](#error-handling)
- [Examples](#examples)
- [License](#license)
- [Disclaimer](#disclaimer)

---

## Getting Started

### Introduction

The ASB API allows you to retrieve your info from the myasb website (for now only the schedule) by providing your session cookie. Useful for any custom app or need that requires your school info.

### Installation

1. Clone the repository:

```
git clone https://github.com/BouncingElf10/asbapi.git
cd asbapi
```

2. Install dependencies:

```
npm install
```

3. Start the server:

```
npm start
```

4. The API will run on `http://localhost:3000` by default.
(or deploy on Vercel on the ["vercel"](https://github.com/BouncingElf10/asbapi/tree/vercel) branch)
---

## Reference

### Endpoints

Base URL: `https://asbapi.vercel.app`

| Request                 | Description            | Parameter |
|:------------------------|:-----------------------|:----------|
| `GET /schedule/:cookie` | Retrieve your schedule | `cookie`  |

### Request Parameters

| Parameter | Description                      |
| :-------- | :------------------------------- |
| `cookie`  | Your session cookie for scraping |

### Response Parameters

| Parameter  | Description                          |
|:-----------|:-------------------------------------|
| `status`   | HTTP-like status code                |
| `author`   | API author                           |
| `message`  | Instruction or informational message |
| `schedule` | Your scraped schedule object         |
| `error`    | Error message (if any)               |
| `details`  | Detailed error message (for 500)     |
| `contact`  | Contact info of the author           |

---

## Getting Your Session Cookie

To use this API, you need your **ASB session cookie**. Here’s how to obtain it:

1. Open your browser and log in to [myASB](https://myasb.asbarcelona.com/) with your school credentials.
2. Once logged in, open **Developer Tools** (`F12` or `Ctrl+Shift+I` / `Cmd+Option+I`).
3. Go to the **Application** (Chrome) or **Storage** (Firefox) tab.
4. Look for **Cookies** in the sidebar and select the domain for `myasb`.
5. Find the cookie named `sessionid`.
6. Copy its **Value**. This is your session cookie.

**Important:**

* Your cookie is like a password. Do **not** share it publicly or commit it to GitHub.
* Cookies may expire after some time. If requests stop working, repeat the steps above to grab a fresh cookie.

<details>
  <summary> Visual Guide</summary>
   
  <img width="1288" height="915" alt="helptogetcookie" src="https://github.com/user-attachments/assets/fc3cc23c-72af-4f9c-a8d4-791c78141d71" />
  
</details>


---

## Error Handling

* **400 Error** – Cookie not provided:

```
{
  "status": "400",
  "error": "Cookie parameter is required. Example: /schedule/YOUR_COOKIE_HERE",
  "contact": "BouncingElf10"
}
```

* **404 Error** – No schedule found:

```
{
  "status": "404",
  "error": "No schedule found. Cookie might be invalid or expired.",
  "contact": "BouncingElf10"
}
```

* **500 Error** – Server error:

```
{
  "status": "500",
  "error": "An error occurred while fetching the schedule.",
  "details": "Error message here",
  "contact": "BouncingElf10"
}
```

---

## Examples

### Example 1: Welcome Endpoint

```http
GET https://asbapi.vercel.app/
```

### Example 2: Instructions for Schedule

```http
GET https://asbapi.vercel.app/schedule
```

### Example 3: Retrieve Schedule

```http
GET https://asbapi.vercel.app/schedule/YOUR_SESSION_COOKIE
```

---

## License

This project is licensed under the `MIT License`. See LICENSE.

---

## Disclaimer

This API uses your session cookie to scrape schedule data. Use responsibly and do not share your cookies (**_THEY ARE LIKE PASSWORDS_**). I (BouncingElf10) am not responsible for misuse.

---
