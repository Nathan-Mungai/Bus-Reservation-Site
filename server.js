const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const buses = require("./data/buses.json");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Homepage
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/help", (req, res) => {
    res.render("help");
});

// Search results
app.get("/results", (req, res) => {
    const { from, to } = req.query;
    const filteredBuses = buses.filter(
        (bus) =>
            bus.from.toLowerCase() === from.toLowerCase() &&
            bus.to.toLowerCase() === to.toLowerCase()
    );
    res.render("results", { buses: filteredBuses, from, to });
});

// Seat selection
app.get("/select-seat/:busId", (req, res) => {
    const busId = parseInt(req.params.busId);
    const bus = buses.find((b) => b.id === busId);
    if (!bus) {
        return res.status(404).send("Bus not found");
    }
    res.render("select-seat", { bus });
});

// Reserve a seat
app.post("/reserve-seat/:busId", (req, res) => {
    const busId = parseInt(req.params.busId);
    const { rowIndex, colIndex } = req.body;

    const bus = buses.find((b) => b.id === busId);
    if (!bus) {
        return res.status(404).json({ error: "Bus not found" });
    }

    if (
        rowIndex < 0 || 
        rowIndex >= bus.seats.length || 
        colIndex < 0 || 
        colIndex >= bus.seats[rowIndex].length
    ) {
        return res.status(400).json({ error: "Invalid seat index" });
    }

    if (bus.seats[rowIndex][colIndex]) {
        return res.status(400).json({ error: "Seat already booked" });
    }

    bus.seats[rowIndex][colIndex] = true;

    // Save the updated buses array back to the JSON file
    const busesFilePath = path.join(__dirname, "data", "buses.json");
    fs.writeFile(busesFilePath, JSON.stringify(buses, null, 2), (err) => {
        if (err) {
            console.error("Error saving seat reservation:", err);
            return res.status(500).json({ error: "Failed to save seat reservation" });
        }
        res.json({ success: true });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
