const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
const path = require("path");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

// Token bota
const TOKEN = "TWÓJ_BOT_TOKEN"; // wklej tutaj token swojego bota

// --- Express ---
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  const stats = {
    guilds: client.guilds.cache.size,
    users: client.guilds.cache.reduce((acc, g) => acc + g.memberCount, 0),
    ping: client.ws.ping,
    uptime: client.uptime
  };
  res.render("dashboard", { stats });
});

app.get("/stats", (req, res) => {
  const stats = {
    guilds: client.guilds.cache.size,
    users: client.guilds.cache.reduce((acc, g) => acc + g.memberCount, 0),
    ping: client.ws.ping,
    uptime: client.uptime
  };
  res.json(stats);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Panel działa na porcie ${PORT}`));

// --- Bot ---
client.once("ready", () => {
  console.log(`Zalogowano jako ${client.user.tag}`);
});

client.login(TOKEN);
