const { Thoughts, User } = require('../models');

module.exports = {
    // Function to get all of the thoughts by invoking the find() method with no arguments.
    // Then we return the results as JSON, and catch any errors. Errors are sent as JSON with a message and a 500 status code
    getThoughts(req, res) {
        Thoughts.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    // Gets a single thoughts using the findOneAndUpdate method. We pass in the ID of the thoughts and then respond with it, or an error if not found
    getSingleThoughts(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtsId })
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thoughts with that ID' })
                    : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Creates a new thoughts. Accepts a request body with the entire Thoughts object.
    // Because thoughts are associated with Users, we then update the User who created the app and add the ID of the thoughts to the thoughts array
    createThoughts(req, res) {
        Thoughts.create(req.body)
            .then((thoughts) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thoughts._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'Thoughts created, but found no user with that ID',
                    })
                    : res.json('Created the thoughts 🎉')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Updates and thoughts using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
    updateThoughts(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thoughts with this id!' })
                    : res.json(thoughts)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Deletes an thoughts from the database. Looks for an app by ID.
    // Then if the app exists, we look for any users associated with the app based on he app ID and update the thoughts array for the User.
    deleteThoughts(req, res) {
        Thoughts.findOneAndRemove({ _id: req.params.thoughtsId })
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thoughts with this id!' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtsId },
                        { $pull: { thoughts: req.params.thoughtsId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'Thoughts created but no user with this id!',
                    })
                    : res.json({ message: 'Thoughts successfully deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },

    // add reaction
    addReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No thought with this id" })
                    : res.json({ message: 'Reaction added!' })
            )
            .catch((err) => res.json(err));
    },

    // delete reaction
    removeReaction( req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.json(err));
    },
};
