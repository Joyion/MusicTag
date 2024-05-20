const express = require("express");
const router = express.Router();


router.get("/login", (req, res) => {
    res.send("login GET");
})

router.post("/login", (req, res) => {
    res.send("Login Request");
})

router.post("/logout", (req, res) => {
    res.send("Logout Request");
})

router.post("/register", (req, res) => {
    res.send("Register Request");
})


module.exports = router;