const { Schema, Types, model } = require('mongoose');
const {reactionSchema, Reaction} = require('./Reaction.js')

const thoughtSchema = new Schema(
    {
        thoughtId: {
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
            default: Date.now(),
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
            virtuals: true,
        },
        id: false,
    }
);

// reaction count
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);
module.exports = {Thought,thoughtSchema};