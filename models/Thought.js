const { Schema, Types } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtID: {
            type: Schema.Types.ObjectID(),
        },
        thoughtText: {
            type: String,
            required: true,
            maxlength: 200,
            minlength: 1,
            // default?,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: {
            // ???
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = thoughtSchema;

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