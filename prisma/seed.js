import prisma from "../src/plugins/prisma.js"
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config()
//console.log(process.env.DATABASE_URL);
async function main() {
// Cleanup
await prisma.linkClick.deleteMany();
await prisma.link.deleteMany();
await prisma.oTP.deleteMany();
await prisma.refreshToken.deleteMany();
await prisma.oAuthAccount.deleteMany();
await prisma.subscription.deleteMany();
await prisma.user.deleteMany();

// Admin User
const admin = await prisma.user.create({
data: {
name: "Admin User",
email: "admin@example.com",
passwordHashed: crypto
.createHash("sha256")
.update("admin123")
.digest("hex"),
role: "ADMIN",
isVerified: true,
},
});

// Normal User
const user = await prisma.user.create({
data: {
name: "Shibam Dey",
email: "shibam@example.com",
passwordHashed: crypto
.createHash("sha256")
.update("password123")
.digest("hex"),
role: "USER",
isVerified: true,
},
});

// OAuth Account
await prisma.oAuthAccount.create({
data: {
userId: user.id,
type: "GOOGLE",
providerId: "google-demo-123",
},
});

// Subscription
await prisma.subscription.create({
data: {
userId: user.id,
type: "PAID",
status: "ACTIVE",
expiresAt: new Date(
Date.now() + 30 * 24 * 60 * 60 * 1000
),
},
});

// Refresh Token
await prisma.refreshToken.create({
data: {
userId: user.id,
tokenHashed: crypto
.createHash("sha256")
.update("demo-refresh-token")
.digest("hex"),
expiresAt: new Date(
Date.now() + 7 * 24 * 60 * 60 * 1000
),
},
});

// OTP
await prisma.oTP.create({
data: {
email: user.email,
userId: user.id,
type: "VERIFY",
code: "123456",
expiresAt: new Date(
Date.now() + 10 * 60 * 1000
),
},
});

// Link 1
const githubLink = await prisma.link.create({
data: {
userId: user.id,
slug: "github",
title: "GitHub Profile",
destinationUrl: "https://github.com/ShibamDey69",
tags: ["github", "portfolio"],
color: "#2563eb",
},
});

// Link 2
const portfolioLink = await prisma.link.create({
data: {
userId: user.id,
slug: "portfolio",
title: "Portfolio",
destinationUrl: "https://portfolio.example.com",
tags: ["portfolio"],
color: "#16a34a",
},
});

// Click Analytics
await prisma.linkClick.createMany({
data: [
{
linkId: githubLink.id,
device: "DESKTOP",
browser: "CHROME",
os: "WINDOWS",
ipHashed: "iphash1",
country: "India",
refer: "google.com",
utm_source: "google",
},
{
linkId: githubLink.id,
device: "MOBILE",
browser: "CHROME",
os: "ANDROID",
ipHashed: "iphash2",
country: "India",
refer: "twitter.com",
utm_source: "twitter",
},
{
linkId: portfolioLink.id,
device: "DESKTOP",
browser: "FIREFOX",
os: "LINUX",
ipHashed: "iphash3",
country: "USA",
refer: "github.com",
utm_source: "github",
},
],
});

await prisma.link.update({
where: {
id: githubLink.id,
},
data: {
totalClicks: 2,
},
});

await prisma.link.update({
where: {
id: portfolioLink.id,
},
data: {
totalClicks: 1,
},
});

console.log("✅ Database seeded successfully");
}

main()
.catch(console.error)
.finally(async () => {
await prisma.$disconnect();
});
