const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought')

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email address is required',
            // validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
        thoughts: {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        },

        // thoughts: [thoughtSchema],
        // friends: [userSchema]

        friends: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

// ADD FRIEND COUNT FEATURE

// * `username`
//   * String
// * Unique
// * Required
// * Trimmed

// * `email`
// * String
// * Required
// * Unique
// * Must match a valid email address (look into Mongoose's matching validation)

// * `thoughts`
// * Array of `_id` values referencing the `Thought` model

// * `friends`
// * Array of `_id` values referencing the `User` model (self-reference)

// **Schema Settings**:

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.

const User = model('user', userSchema);
module.exports = userSchema