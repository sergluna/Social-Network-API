const router = require("express").Router();
const {
    getThoughts,
    getSingleThoughts,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    addReaction,
    removeReaction,
} = require("../../controllers/thoughtsController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThoughts);

// /api/thoughts/:id
router.route("/:id").get(getSingleThoughts).put(updateThoughts).delete(deleteThoughts);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;