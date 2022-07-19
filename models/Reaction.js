const { Schema, model } = require ('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectID,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 200,
            minlength: 1,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: dateFormat,
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    },
);

reactionSchema
    .virtual('getReactionTime')
    //  Getter
    .get(function () {
        return `posted at: ${this.createdAt}`;
    });

const Reaction = model('reaction', reactionSchema);

function dateFormat(date){
    return date.toDateString()
}

module.exports = { reactionSchema, Reaction};
