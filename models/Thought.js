const { Schema, Types, model } = require('mongoose');
const {reactionSchema, Reaction} = require('./Reaction.js')

const thoughtSchema = new Schema(
    {
        thoughtID: {
            type: Schema.Types.ObjectID,
            default: () => new Types.ObjectId(),
        },
        thoughtText: {
            type: String,
            required: true,
            maxlength: 200,
            minlength: 1,
            default:"I'm thinking"
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            reactionSchema
        ],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const Thought = model('thought', thoughtSchema);
module.exports = {Thought, thoughtSchema}

// * `thoughtText`
//   * String
//   * Required
//   * Must be between 1 and 280 characters

// * `createdAt`
//   * Date
//   * Set default value to the current timestamp
//   * Use a getter method to format the timestamp on query

// * `username` (The user that created this thought)
//   * String
//   * Required

// * `reactions` (These are like replies)
//   * Array of nested documents created with the `reactionSchema`

// **Schema Settings**:

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.