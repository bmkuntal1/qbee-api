const express = require("express");
const userService = require("../services/user.service");

const router = express.Router();

router.get("/", async (req, res) => {
    const users = await userService.findAll();
    res.status(200).json(users);
});

router.get("/:id", async (req, res) => {
    const user = await userService.findOne(req.params.id);
    if (!user) {
        return res.status(404).end();
    }
    res.status(200).json(user);
});

router.post("/", async (req, res) => {
    const user = await userService.create(req.body);
    res.status(201).json(user);
});

router.put("/:id", async (req, res) => {
    const user = await userService.update(req.params.id, req.body);
    if (!user) {
        return res.status(404).end();
    }
    res.status(200).json(user);
});

router.delete("/:id", async (req, res) => {
    const user = await userService.findOne(req.params.id);
    if (!user) {
        return res.status(404).end();
    }
    await userService.remove(req.params.id);
    res.status(204).end();
});

module.exports = router;