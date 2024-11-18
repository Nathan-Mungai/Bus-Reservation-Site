const express = require("express");
const app = express();
const path = require("path");
const buses = require("./data/buses.json");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

// homepage
app.get("/", (req, res) => {
    res.render("home");
});

// results
app.get("/results", (req, res) => {
    const { from, to } = req.query;
    const filteredBuses = buses.filter(
        (bus) =>
            bus.from.toLowerCase() === from.toLowerCase() &&
            bus.to.toLowerCase() === to.toLowerCase()
    );
    res.render("results", { buses: filteredBuses, from, to });
});

// seat selection
app.get("/select-seat/:busId", (req, res) => {
    const busId = parseInt(req.params.busId);
    const bus = buses.find((b) => b.id === busId);
    if (!bus) {
        return res.status(404).send("Bus not found");
    }
    // Pass the layout and the seats to the template
    res.render("select-seat", { bus });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
