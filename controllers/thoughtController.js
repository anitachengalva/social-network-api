const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // get all thoughts
  getThoughts(req, res) {
    Thought.find({}).then((thought) => res.json(thought)).catch((error)=>{
      console.error(error);
    res.json(error)});
  },
  // get a single thought by ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thoughts found with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thoughts found with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // delete thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thoughts found with that ID" })
          : User.deleteMany({
              _id: { $in: thought.user },
            })
      )
      .then(() => res.json({ message: "Thoughts sucesssfully deleted" }))
      .catch((err) => res.status(500).json(err));
  },

  // add reaction to thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reaction : body } },
      { runValidators: true, new: true }
    )
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: "No thoughts found with that ID" })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  // delete reaction from thought
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reaction: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: "No thoughts found with that ID" })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
};
